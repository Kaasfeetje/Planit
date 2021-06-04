import { Request, Response } from "express";
import { NotAuthorizedError } from "../../common/errors/NotAuthorizedError";
import { NotFoundError } from "../../common/errors/NotFoundError";
import { Set } from "../set/setModel";
import { Task } from "../task/taskModel";
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

export const getMyBoards = async (req: Request, res: Response) => {
    //TODO: Add joined boards
    const boards = await Board.find({ ownerRef: req.currentUser!.id });

    res.status(200).send({ data: boards });
};

export const getFullBoardById = async (req: Request, res: Response) => {
    const board = await Board.findById(req.params.boardId).populate("ownerRef");

    if (!board)
        throw new NotFoundError(
            `Did not find a board with id: ${req.params.boardId}`
        );

    const sets = await Set.find({ boardRef: board.id }).populate("ownerRef");
    const tasks = await Task.find({ boardRef: board.id }).populate("ownerRef");

    res.status(200).send({ data: { board, sets, tasks } });
};
