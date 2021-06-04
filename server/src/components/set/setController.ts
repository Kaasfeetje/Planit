import { Request, Response } from "express";
import { NotAuthorizedError } from "../../common/errors/NotAuthorizedError";
import { NotFoundError } from "../../common/errors/NotFoundError";
import { Set } from "./setModel";

export const getSets = async (req: Request, res: Response) => {
    const sets = await Set.find({});

    res.status(200).send({ data: sets });
};

export const createSet = async (req: Request, res: Response) => {
    const { boardId, name, index } = req.body;

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
    const set = await Set.findById(req.params.setId);
    if (!set)
        throw new NotFoundError(
            `Did not find a set with id: ${req.params.setId}`
        );

    if (!req.currentUser!.isAdmin && set.ownerRef != req.currentUser!.id)
        throw new NotAuthorizedError("You do not own this set");

    const { name, description, isCompleted, finishedAt, projectedAt, index } =
        req.body;

    set.name = name || set.name;
    set.description = description || set.description;
    set.isCompleted = isCompleted || set.isCompleted;
    set.finishedAt = finishedAt || set.finishedAt;
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

    if (!req.currentUser!.isAdmin && set.ownerRef != req.currentUser!.id)
        throw new NotAuthorizedError("You do not own this set");

    await set.remove();
    res.status(200).send({ data: {} });
};

export const swapSets = async (req: Request, res: Response) => {
    const { setAId, setBId } = req.body;
    const a = await Set.findById(setAId);
    const b = await Set.findById(setBId);

    if (!a || !b)
        throw new NotFoundError("Did not find one or both of the tasks");

    const aIndex = a.index;
    a.index = b.index;
    b.index = aIndex;
    await a.save();
    await b.save();

    res.status(200).send({ data: { a: a.id, b: b.id } });
};
