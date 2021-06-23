import mongoose from "mongoose";
import { UserDoc } from "../user/userModel";
import { BoardDoc } from "../board/boardModel";
import { SetDoc } from "./setModel";

interface SetResponsibilityAttrs {
    userRef: string | UserDoc;
    boardRef: string | BoardDoc;
    setRef: string | SetDoc;
}

export interface SetResponsibilityDoc extends mongoose.Document {
    userRef: string | UserDoc;
    boardRef: string | BoardDoc;
    setRef: string | SetDoc;
}

interface SetResponsibilityModel extends mongoose.Model<SetResponsibilityDoc> {
    build(attrs: SetResponsibilityAttrs): SetResponsibilityDoc;
}

const setResponsibilitySchema = new mongoose.Schema(
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
        setRef: {
            type: mongoose.Types.ObjectId,
            ref: "Set",
            required: [true, "Please provide a set."],
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

setResponsibilitySchema.statics.build = (attrs: SetResponsibilityAttrs) => {
    return new SetResponsibility(attrs);
};

const SetResponsibility = mongoose.model<
    SetResponsibilityDoc,
    SetResponsibilityModel
>("Set_Responsibility", setResponsibilitySchema);

export { SetResponsibility };
