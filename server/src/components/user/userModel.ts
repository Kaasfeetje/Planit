import mongoose from "mongoose";

interface UserAttrs {
    username: string;
    profilePicture?: string;
    email: string;
    password: string;
    isAdmin?: boolean;
}

interface UserDoc extends mongoose.Document {
    username: string;
    profilePicture: string;
    email: string;
    password: string;
    isAdmin: boolean;
}

interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please provide a username."],
        },
        profilePicture: {
            type: String,
            default: "/uploads/users/default.png",
        },
        email: {
            type: String,
            required: [true, "Please provide a valid email."],
        },
        password: {
            type: String,
            required: [true, "Please provide a password."],
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
    },
    {
        toJSON: {
            transform(ret, doc) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            },
        },
    }
);

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);
export { User };
