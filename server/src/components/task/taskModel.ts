import mongoose from "mongoose";
import { UserDoc } from "../user/userModel";

interface TaskAttrs {
    task: string;
    description?: string;
    isCompleted?: boolean;
    projectedAt?: Date;
    finishedAt?: Date;
    index: number;
    boardRef: string;
    setRef: string;
    ownerRef: string;
}

interface TaskDoc extends mongoose.Document {
    task: string;
    description: string;
    isCompleted: boolean;
    projectedAt: Date;
    finishedAt: Date | undefined;
    index: number;
    boardRef: string;
    setRef: string;
    ownerRef: string | UserDoc;
}

interface TaskModel extends mongoose.Model<TaskDoc> {
    build(attrs: TaskAttrs): TaskDoc;
}

const taskSchema = new mongoose.Schema(
    {
        task: {
            type: String,
            required: [true, "Please provide a task."],
        },
        description: {
            type: String,
            default: "",
        },
        isCompleted: {
            type: Boolean,
            default: false,
        },
        projectedAt: {
            type: Date,
        },
        finishedAt: {
            type: Date,
        },
        index: {
            type: Number,
            required: [true, "Please provide an index for this task."],
        },
        boardRef: {
            type: mongoose.Types.ObjectId,
            ref: "Board",
            required: [true, "Please provide a board this task belongs to."],
        },
        setRef: {
            type: mongoose.Types.ObjectId,
            ref: "Set",
            required: [true, "Please provide a set this task belongs to."],
        },
        ownerRef: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: [true, "Please provide a user this task belongs to."],
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

taskSchema.statics.build = (attrs: TaskAttrs) => {
    return new Task(attrs);
};

const Task = mongoose.model<TaskDoc, TaskModel>("Task", taskSchema);

export { Task };
