import mongoose from "mongoose";
import { UserDoc } from "../user/userModel";
import { BoardDoc } from "../board/boardModel";

export enum board_access_levels {
    view = "view",
    move = "move",
    edit = "edit",
    owner = "owner",
}

interface BoardAccessAttrs {
    userRef: string | UserDoc;
    boardRef: string | BoardDoc;
    access?: board_access_levels;
}

interface BoardAccessDoc extends mongoose.Document {
    userRef: string | UserDoc;
    boardRef: string | BoardDoc;
    access: board_access_levels;
}

interface BoardAccessModel extends mongoose.Model<BoardAccessDoc> {
    build(attrs: BoardAccessAttrs): BoardAccessDoc;
}

const boardAccessSchema = new mongoose.Schema(
    {
        userRef: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: [true, "Please provide a user."],
        },
        boardRef: {
            type: mongoose.Types.ObjectId,
            ref: "Board",
            required: [true, "Please provide a board."],
        },
        access: {
            type: String,
            default: board_access_levels.view,
            enum: board_access_levels,
        },
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            },
        },
    }
);

boardAccessSchema.statics.build = (attrs: BoardAccessAttrs) => {
    return new BoardAccess(attrs);
};

const BoardAccess = mongoose.model<BoardAccessDoc, BoardAccessModel>(
    "Board_Access",
    boardAccessSchema
);
export { BoardAccess };
