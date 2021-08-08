import mongoose from "mongoose";

interface CommentAttrs {
    comment: string;
    boardRef: string;
    ownerRef: string;
}

export interface CommentDoc extends mongoose.Document {
    comment: string;
    boardRef: string;
    ownerRef: string;
}

interface CommentModel extends mongoose.Model<CommentDoc> {
    build(attrs: CommentAttrs): CommentDoc;
}

const commentSchema = new mongoose.Schema(
    {
        comment: {
            type: String,
            required: [true, "Please provide a comment."],
        },
        boardRef: {
            type: mongoose.Types.ObjectId,
            ref: "Board",
            required: [true, "Please provide a board."],
        },
        ownerRef: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: [true, "Please provide a user."],
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

commentSchema.statics.build = (attrs: CommentAttrs) => {
    return new Comment(attrs);
};

const Comment = mongoose.model<CommentDoc, CommentModel>(
    "Comment",
    commentSchema
);

export { Comment };
