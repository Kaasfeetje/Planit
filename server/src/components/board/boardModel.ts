import mongoose from "mongoose";

interface BoardAttrs {
    name: string;
    image: string;
    description?: string;
    goal?: string;
    ownerRef: string;
}

export interface BoardDoc extends mongoose.Document {
    id: string;
    name: string;
    image: string;
    description: string;
    goal: string;
    ownerRef: string;
}

interface BoardModel extends mongoose.Model<BoardDoc> {
    build(attrs: BoardAttrs): BoardDoc;
}

const boardSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please supply a name for this board."],
        },
        image: {
            type: String,
            default: "/uploads/boards/default.png",
        },
        description: {
            type: String,
            default: "",
        },
        goal: {
            type: String,
            default: "",
        },
        ownerRef: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: [true, "Please provide a user this board belongs to."],
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

boardSchema.statics.build = (attrs: BoardAttrs) => {
    return new Board(attrs);
};

const Board = mongoose.model<BoardDoc, BoardModel>("Board", boardSchema);

export { Board };
