import { Request, Response } from "express";
import { NotAuthorizedError } from "../../common/errors/NotAuthorizedError";
import { BoardAccess } from "../board/boardAccessModel";
import { Comment } from "./commentModel";

export const createComment = async (req: Request, res: Response) => {
    console.log(req.params);
    const { comment } = req.body;
    const { boardId } = req.params;

    if (!hasBoardAccess(boardId, req.currentUser!.id))
        throw new NotAuthorizedError(
            "You do not have permission to access this board."
        );

    const createdComment = await Comment.build({
        comment,
        boardRef: boardId,
        ownerRef: req.currentUser!.id,
    }).save();

    res.status(201).send({ data: createdComment });
};

export const fetchComment = async (req: Request, res: Response) => {
    if (!hasBoardAccess(req.params.boardId, req.currentUser!.id))
        throw new NotAuthorizedError(
            "You do not have permission to access this board."
        );

    const comment = await Comment.findById(req.params.commentId).populate(
        "ownerRef"
    );
    res.status(200).send({ data: comment });
};

const hasBoardAccess = async (boardId: string, userId: string) => {
    const boardAccess = await BoardAccess.findOne({
        boardRef: boardId,
        userRef: userId,
    });

    return boardAccess !== undefined;
};

export const fetchBoardComments = async (req: Request, res: Response) => {
    if (!hasBoardAccess(req.params.boardId, req.currentUser!.id))
        throw new NotAuthorizedError(
            "You do not have permission to access this board."
        );

    const comments = await Comment.find({ boardRef: req.params.boardId })
        .populate("ownerRef")
        .sort({
            createdAt: -1,
        })
        .limit(20);

    res.status(200).send({ data: comments });
};
