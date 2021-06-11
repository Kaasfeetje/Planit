import { Response, Request } from "express";
import { NoPermissionError } from "../../common/errors/NoPermissionError";
import { NotFoundError } from "../../common/errors/NotFoundError";
import { board_access_levels } from "../board/boardAccessModel";
import { hasBoardPermission } from "../board/boardController";
import { Set } from "../set/setModel";
import { UserDoc } from "../user/userModel";
import { Task } from "./taskModel";

export const getTasks = async (req: Request, res: Response) => {
    const tasks = await Task.find({});

    res.status(200).send({ data: tasks });
};

export const createTask = async (req: Request, res: Response) => {
    const { task, index, boardId, setId } = req.body;

    //permissions
    const canCreate = await hasBoardPermission(
        [board_access_levels.edit, board_access_levels.owner],
        req.currentUser!.id,
        boardId
    );
    if (!canCreate && !req.currentUser!.isAdmin)
        throw new NoPermissionError(
            "You do not have permission to create a task."
        );

    const createdTask = Task.build({
        task,
        index,
        boardRef: boardId,
        setRef: setId,
        ownerRef: req.currentUser!.id,
    });

    await createdTask.save();

    res.status(201).send({ data: createdTask });
};

export const getTaskById = async (req: Request, res: Response) => {
    const task = await Task.findById(req.params.taskId);

    if (!task)
        throw new NotFoundError(
            `Did not find a task with id: ${req.params.taskId}`
        );

    res.status(200).send({ data: task });
};

export const updateTask = async (req: Request, res: Response) => {
    const task = await Task.findById(req.params.taskId).populate("ownerRef");

    if (!task)
        throw new NotFoundError(
            `Did not find a task with id: ${req.params.taskId}`
        );

    //permissions
    const canUpdate = await hasBoardPermission(
        [board_access_levels.edit, board_access_levels.owner],
        req.currentUser!.id,
        task.boardRef
    );
    const ownerId = (task.ownerRef as UserDoc).id;
    if (
        !canUpdate &&
        ownerId != req.currentUser!.id &&
        !req.currentUser!.isAdmin
    )
        throw new NoPermissionError(
            "You do not have permission to update this task."
        );

    const { task: name, description, isCompleted, projectedAt } = req.body;

    task.task = name || task.task;
    task.description = description || task.description;
    if (isCompleted !== undefined) task.isCompleted = isCompleted;
    task.projectedAt = projectedAt || task.projectedAt;
    if (isCompleted === true) {
        task.finishedAt = new Date(Date.now());
    } else if (isCompleted === false) {
        task.finishedAt = undefined;
    }
    const updatedTask = await task.save();

    res.status(200).send({ data: updatedTask });
};

export const deleteTask = async (req: Request, res: Response) => {
    const task = await Task.findById(req.params.taskId);

    if (!task)
        throw new NotFoundError(
            `Did not find a task with id: ${req.params.taskId}`
        );

    //permissions
    const canDelete = await hasBoardPermission(
        [board_access_levels.edit, board_access_levels.owner],
        req.currentUser!.id,
        task.boardRef
    );
    const ownerId = (task.ownerRef as UserDoc).id;
    if (
        !canDelete &&
        ownerId != req.currentUser!.id &&
        !req.currentUser!.isAdmin
    )
        throw new NoPermissionError(
            "You do not have permission to delete this task."
        );

    await task.remove();
    res.status(200).send({ data: { id: req.params.taskId } });
};

export const swapTasks = async (req: Request, res: Response) => {
    const { taskAId, taskBId } = req.body;
    const a = await Task.findById(taskAId);
    const b = await Task.findById(taskBId);

    if (!a || !b)
        throw new NotFoundError("Did not find one or both of the tasks");

    //permissions
    const canMove = await hasBoardPermission(
        [
            board_access_levels.move,
            board_access_levels.edit,
            board_access_levels.owner,
        ],
        req.currentUser!.id,
        a.boardRef
    );
    if (!canMove && !req.currentUser!.isAdmin)
        throw new NoPermissionError(
            "You do not have permission to move this task."
        );

    const aIndex = a.index;
    a.index = b.index;
    b.index = aIndex;

    const aSet = a.setRef;
    a.setRef = b.setRef;
    b.setRef = aSet;

    await a.save();
    await b.save();

    res.status(200).send({ data: { a: a.id, b: b.id } });
};

export const switchTaskSet = async (req: Request, res: Response) => {
    const { setId, taskId, index } = req.body;
    const set = await Set.findById(setId);
    const task = await Task.findById(taskId);

    if (!set) throw new NotFoundError(`Did not find a set with id: ${setId}`);
    if (!task)
        throw new NotFoundError(`Did not find a task with id: ${taskId}`);

    //permissions
    const canMove = await hasBoardPermission(
        [
            board_access_levels.move,
            board_access_levels.edit,
            board_access_levels.owner,
        ],
        req.currentUser!.id,
        task.boardRef
    );
    if (!canMove && !req.currentUser!.isAdmin)
        throw new NoPermissionError(
            "You do not have permission to move this task."
        );

    task.setRef = set.id;
    task.index = index;
    await task.save();

    res.status(200).send({ data: { id: task.id } });
};
