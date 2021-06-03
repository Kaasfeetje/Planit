import mongoose from "mongoose";
import { Password } from "../../common/Password";

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

export interface UserToken {
    id: string;
    username: string;
    email: string;
    isAdmin: boolean;
}

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please provide a username."],
            unique: [true, "This username is already in use."],
        },
        profilePicture: {
            type: String,
            default: "/uploads/users/default.png",
        },
        email: {
            type: String,
            required: [true, "Please provide a valid email."],
            unique: [true, "This email is already in use."],
            lowercase: true,
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
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret.password;
                delete ret._id;
                delete ret.__v;
            },
        },
    }
);

userSchema.pre("save", async function (done) {
    if (this.isModified("password")) {
        const hashed = await Password.toHash(this.get("password"));
        this.set("password", hashed);
    }
    done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);
export { User };
