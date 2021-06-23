import { Request, Response } from "express";
import { BadRequestError } from "../../common/errors/BadRequestError";
import { NoPermissionError } from "../../common/errors/NoPermissionError";
import { NotAuthorizedError } from "../../common/errors/NotAuthorizedError";
import { NotFoundError } from "../../common/errors/NotFoundError";
import { Set } from "../set/setModel";
import { Task } from "../task/taskModel";
import { BoardAccess, board_access_levels } from "./boardAccessModel";
import { Board } from "./boardModel";

export const GetBoards = async (req: Request, res: Response) => {
    const boards = await Board.find({});

    res.status(200).send({ data: boards });
};

export const CreateBoard = async (req: Request, res: Response) => {
    //TODO: image support
    const { name, description, goal, image } = req.body;
    const board = await Board.build({
        name,
        description,
        goal,
        ownerRef: req.currentUser!.id,
        image,
    });

    await board.save();

    await BoardAccess.build({
        boardRef: board.id,
        userRef: req.currentUser!.id,
        access: board_access_levels.owner,
    }).save();

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
        throw new NoPermissionError(
            "You do not have permission to edit this board."
        );

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
        throw new NoPermissionError(
            "You do not have the permission to delete this board."
        );

    await Task.deleteMany({ boardRef: board.id });
    await Set.deleteMany({ boardRef: board.id });
    await BoardAccess.deleteMany({ boardRef: board.id });

    await board.remove();
    res.status(200).send({ data: {} });
};

export const getMyBoards = async (req: Request, res: Response) => {
    //TODO: Add joined boards
    // const boards = await Board.find({ ownerRef: req.currentUser!.id });

    const boardAccesses = await BoardAccess.find({
        userRef: req.currentUser!.id,
    })
        .populate("boardRef")
        .select("boardRef");

    const boards = boardAccesses.map((board) => board.boardRef);

    res.status(200).send({ data: boards });
};

export const getFullBoardById = async (req: Request, res: Response) => {
    //permissions
    const canMove = await hasBoardPermission(
        [
            board_access_levels.view,
            board_access_levels.move,
            board_access_levels.edit,
            board_access_levels.owner,
        ],
        req.currentUser!.id,
        req.params.boardId
    );
    if (!canMove && !req.currentUser!.isAdmin)
        throw new NoPermissionError(
            "You do not have permission to view this board"
        );

    const board = await Board.findById(req.params.boardId).populate("ownerRef");

    if (!board)
        throw new NotFoundError(
            `Did not find a board with id: ${req.params.boardId}`
        );

    const sets = await Set.find({ boardRef: board.id }).populate("ownerRef");
    const tasks = await Task.find({ boardRef: board.id }).populate("ownerRef");

    res.status(200).send({ data: { board, sets, tasks } });
};

//BOARD ACCESS
export const joinBoard = async (req: Request, res: Response) => {
    const board = await Board.findById(req.params.boardId);
    if (!board)
        throw new NotFoundError(
            `Did not find a board with id: ${req.params.boardId}`
        );

    const existingBoardAccess = await BoardAccess.findOne({
        boardRef: board.id,
        userRef: req.currentUser!.id,
    });

    if (existingBoardAccess)
        throw new BadRequestError("You have already joined this board.");

    const boardAccess = BoardAccess.build({
        boardRef: board.id,
        userRef: req.currentUser!.id,
        access: board_access_levels.view,
    });

    await boardAccess.save();

    res.status(201).send({ data: boardAccess });
};

export const hasBoardPermission = async (
    access_levels: board_access_levels[],
    userId: string,
    boardId: string
) => {
    const boardAccess = await BoardAccess.findOne({
        boardRef: boardId,
        userRef: userId,
    });

    if (!boardAccess) return false;

    if (access_levels.includes(boardAccess.access)) return true;
};

export const getBoardsUsers = async (req: Request, res: Response) => {
    //permissions
    const canMove = await hasBoardPermission(
        [
            board_access_levels.view,
            board_access_levels.move,
            board_access_levels.edit,
            board_access_levels.owner,
        ],
        req.currentUser!.id,
        req.params.boardId
    );
    if (!canMove && !req.currentUser!.isAdmin)
        throw new NoPermissionError(
            "You do not have permission to view this board."
        );

    const boardAccesses = await BoardAccess.find({
        boardRef: req.params.boardId,
        access: { $ne: board_access_levels.owner },
    }).populate("userRef");

    const users = boardAccesses.map((access) => {
        return { userRef: access.userRef, access: access.access };
    });
    res.status(200).send({ data: users });
};

export const updateBoardsUserAccess = async (req: Request, res: Response) => {
    //permissions
    const canMove = await hasBoardPermission(
        [board_access_levels.owner],
        req.currentUser!.id,
        req.params.boardId
    );
    if (!canMove && !req.currentUser!.isAdmin)
        throw new NoPermissionError(
            "You do not have permission to edit users access to this board."
        );

    const { userId, access } = req.body;
    const boardAccess = await BoardAccess.findOne({ userRef: userId }).populate(
        "userRef"
    );
    console.log(userId);
    if (!boardAccess)
        throw new NotFoundError("This user does not have access to this room.");

    boardAccess.access = access || boardAccess.access;
    await boardAccess.save();

    res.status(200).send({ data: boardAccess });
};
