import { Response, Request } from "express";
import { NotAuthorizedError } from "../../common/errors/NotAuthorizedError";
import { NotFoundError } from "../../common/errors/NotFoundError";
import { UserDoc } from "../user/userModel";
import { Task } from "./taskModel";

export const getTasks = async (req: Request, res: Response) => {
    const tasks = await Task.find({});

    res.status(200).send({ data: tasks });
};

export const createTask = async (req: Request, res: Response) => {
    const { task, index, boardId, setId } = req.body;

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

    const ownerId = (task.ownerRef as UserDoc).id;

    if (!req.currentUser!.isAdmin && ownerId != req.currentUser!.id)
        throw new NotAuthorizedError("You do not own this task.");

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

    if (!req.currentUser!.isAdmin && task.ownerRef != req.currentUser!.id)
        throw new NotAuthorizedError("You do not own this task.");

    await task.remove();
    res.status(200).send({ data: {} });
};

export const swapTasks = async (req: Request, res: Response) => {
    const { taskAId, taskBId } = req.body;
    const a = await Task.findById(taskAId);
    const b = await Task.findById(taskBId);

    if (!a || !b)
        throw new NotFoundError("Did not find one or both of the tasks");

    const aIndex = a.index;
    a.index = b.index;
    b.index = aIndex;
    await a.save();
    await b.save();

    res.status(200).send({ data: { a: a.id, b: b.id } });
};
