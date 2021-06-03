import { Request, Response } from "express";
import { NotAuthorizedError } from "../../common/errors/NotAuthorizedError";
import { NotFoundError } from "../../common/errors/NotFoundError";
import { Board } from "./boardModel";

export const GetBoards = async (req: Request, res: Response) => {
    const boards = await Board.find({});

    res.status(200).send({ data: boards });
};

export const CreateBoard = async (req: Request, res: Response) => {
    //TODO: image support
    const { name, description, goal } = req.body;
    const board = await Board.build({
        name,
        description,
        goal,
        ownerRef: req.currentUser!.id,
        image: "/uploads/boards/default.png",
    });

    await board.save();

    res.status(201).send({ data: board });
};

export const GetBoardById = async (req: Request, res: Response) => {
    const board = await Board.findById(req.params.boardId);

    if (!board)
        throw new NotFoundError(
            `Did not find a board with id: ${req.params.boardId}`
        );

    res.status(200).send({ data: board });
};

export const UpdateBoard = async (req: Request, res: Response) => {
    const board = await Board.findById(req.params.boardId);

    if (!board)
        throw new NotFoundError(
            `Did not find a board with id: ${req.params.boardId}`
        );

    console.log(board.ownerRef);
    console.log(req.currentUser!.id);

    if (!req.currentUser!.isAdmin && board.ownerRef != req.currentUser!.id)
        throw new NotAuthorizedError("You do not own this board.");

    const { name, description, goal } = req.body;

    board.name = name || board.name;
    board.description = description || board.description;
    board.goal = goal || board.goal;
    const updatedBoard = await board.save();

    res.status(200).send({ data: updatedBoard });
};

export const deleteBoard = async (req: Request, res: Response) => {
    const board = await Board.findById(req.params.boardId);

    if (!board)
        throw new NotFoundError(
            `Did not find a board with id: ${req.params.boardId}`
        );

    if (!req.currentUser!.isAdmin && board.ownerRef != req.currentUser!.id)
        throw new NotAuthorizedError("You do not own this board.");

    await board.remove();
    res.status(200).send({ data: {} });
};
