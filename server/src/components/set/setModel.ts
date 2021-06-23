import mongoose from "mongoose";
import { UserDoc } from "../user/userModel";

interface SetAttrs {
    name: string;
    description?: string;
    isCompleted?: boolean;
    projectedAt?: Date;
    index: number;
    boardRef: string;
    ownerRef: string;
}

export interface SetDoc extends mongoose.Document {
    name: string;
    description: string;
    isCompleted: boolean;
    finishedAt: Date | undefined;
    projectedAt: Date;
    index: number;
    boardRef: string;
    ownerRef: string | UserDoc;
}

interface SetModel extends mongoose.Model<SetDoc> {
    build(attrs: SetAttrs): SetDoc;
}

const setSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide a name for this set."],
        },
        description: {
            type: String,
            default: "",
        },
        isCompleted: {
            type: Boolean,
            default: false,
        },
        finishedAt: {
            type: Date,
        },
        projectedAt: {
            type: Date,
        },
        index: {
            type: Number,
            required: [true, "Please provide the index of this set."],
        },
        boardRef: {
            type: mongoose.Types.ObjectId,
            ref: "Board",
            required: [true, "Please provide a board this set belongs to."],
        },
        ownerRef: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: [true, "Please provide a user this set belongs to."],
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

setSchema.statics.build = (attrs: SetAttrs) => {
    return new Set(attrs);
};

const Set = mongoose.model<SetDoc, SetModel>("Set", setSchema);
export { Set };
