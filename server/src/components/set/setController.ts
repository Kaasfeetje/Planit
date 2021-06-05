import { Request, Response } from "express";
import { NoPermissionError } from "../../common/errors/NoPermissionError";
import { NotFoundError } from "../../common/errors/NotFoundError";
import { board_access_levels } from "../board/boardAccessModel";
import { hasBoardPermission } from "../board/boardController";
import { UserDoc } from "../user/userModel";
import { Set } from "./setModel";

export const getSets = async (req: Request, res: Response) => {
    const sets = await Set.find({});

    res.status(200).send({ data: sets });
};

export const createSet = async (req: Request, res: Response) => {
    const { boardId, name, index } = req.body;
    //permissions
    const canCreate = await hasBoardPermission(
        [board_access_levels.edit, board_access_levels.owner],
        req.currentUser!.id,
        boardId
    );
    if (!canCreate && !req.currentUser!.isAdmin)
        throw new NoPermissionError(
            "You do not have permission to create a set."
        );

    const set = Set.build({
        ownerRef: req.currentUser!.id,
        boardRef: boardId,
        name,
        index,
    });

    await set.save();

    res.status(201).send({ data: set });
};

export const getSetById = async (req: Request, res: Response) => {
    const set = await Set.findById(req.params.setId);
    if (!set)
        throw new NotFoundError(
            `Did not find a set with id: ${req.params.setId}`
        );
    res.status(200).send({ data: set });
};

export const updateSet = async (req: Request, res: Response) => {
    const set = await Set.findById(req.params.setId).populate("ownerRef");
    if (!set)
        throw new NotFoundError(
            `Did not find a set with id: ${req.params.setId}`
        );

    //permissions
    const canUpdate = await hasBoardPermission(
        [board_access_levels.edit, board_access_levels.owner],
        req.currentUser!.id,
        set.boardRef
    );
    const ownerId = (set.ownerRef as UserDoc).id;
    if (
        !canUpdate &&
        ownerId != req.currentUser!.id &&
        !req.currentUser!.isAdmin
    )
        throw new NoPermissionError(
            "You do not have permission to update this set."
        );

    //update
    const { name, description, isCompleted, finishedAt, projectedAt, index } =
        req.body;

    set.name = name || set.name;
    set.description = description || set.description;
    if (isCompleted !== undefined) set.isCompleted = isCompleted;
    if (isCompleted === true) set.finishedAt = new Date(Date.now());
    else if (isCompleted === false) set.finishedAt = undefined;
    set.projectedAt = projectedAt || set.projectedAt;
    set.index = index || set.index;
    const updatedSet = await set.save();

    res.status(200).send({ data: updatedSet });
};

export const deleteSet = async (req: Request, res: Response) => {
    const set = await Set.findById(req.params.setId);
    if (!set)
        throw new NotFoundError(
            `Did not find a set with id: ${req.params.setId}`
        );

    //permissions
    const canDelete = await hasBoardPermission(
        [board_access_levels.edit, board_access_levels.owner],
        req.currentUser!.id,
        set.boardRef
    );
    if (
        !canDelete &&
        set.ownerRef != req.currentUser!.id &&
        !req.currentUser!.isAdmin
    )
        throw new NoPermissionError(
            "You do not have permission to delete this set."
        );

    await set.remove();
    res.status(200).send({ data: {} });
};

export const swapSets = async (req: Request, res: Response) => {
    const { setAId, setBId } = req.body;
    const a = await Set.findById(setAId);
    const b = await Set.findById(setBId);

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
            "You do not have permission to move this set."
        );

    //swap
    const aIndex = a.index;
    a.index = b.index;
    b.index = aIndex;
    await a.save();
    await b.save();

    res.status(200).send({ data: { a: a.id, b: b.id } });
};
