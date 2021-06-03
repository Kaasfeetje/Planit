import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { NotAuthorizedError } from "../../common/errors/NotAuthorizedError";
import { NotFoundError } from "../../common/errors/NotFoundError";
import { Password } from "../../common/Password";
import { User, UserToken } from "./userModel";

const signToken = async (attrs: UserToken) => {
    const token = await jwt.sign(attrs, process.env.JWT_SECRET!);

    return token;
};

export const signup = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    const user = User.build({ username, email, password, isAdmin: false });

    await user.save();

    const token = await signToken({
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        id: user.id,
    });

    res.status(201).cookie("jwt", token).send({ data: user });
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user)
        throw new NotFoundError(`Did not find a user with email ${email}`);

    const isValidPassword = await Password.compare(user.password, password);
    if (!isValidPassword) throw new NotAuthorizedError("Invalid credentials");

    const token = await signToken({
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        id: user.id,
    });

    res.status(200).cookie("jwt", token).send({ data: user });
};

export const logout = async (req: Request, res: Response) => {
    //TODO: maybe check user and stuff but shh
    res.status(200).clearCookie("jwt").send({ data: {} });
};

//admin
export const createUser = async (req: Request, res: Response) => {
    //TODO: add profile pic support
    const { username, email, password, isAdmin } = req.body;

    const user = User.build({ username, email, password, isAdmin });

    await user.save();

    res.status(201).send({ data: user });
};

export const getUsers = async (req: Request, res: Response) => {
    //TODO: add pagination/query support
    const users = await User.find({});

    res.status(200).send({ data: users });
};

export const getUserById = async (req: Request, res: Response) => {
    const user = await User.findById(req.params.userId);
    if (!user)
        throw new NotFoundError(
            `Did not find a user with id: ${req.params.userId}`
        );

    res.status(200).send({ data: user });
};

export const updateUser = async (req: Request, res: Response) => {
    const user = await User.findById(req.params.userId);

    if (!user)
        throw new NotFoundError(
            `Did not find a user with id: ${req.params.userId}`
        );

    //TODO: add profile pic support
    const { username, email, password, isAdmin } = req.body;

    user.username = username || user.username;
    user.email = email || user.email;
    user.password = password || user.password;
    user.isAdmin = isAdmin || user.isAdmin;
    const updatedUser = await user.save();

    res.status(200).send({ data: updatedUser });
};

export const deleteUser = async (req: Request, res: Response) => {
    const user = await User.findById(req.params.userId);
    if (!user)
        throw new NotFoundError(
            `Did not find a user with id: ${req.params.userId}`
        );

    await user.remove();
    res.status(200).send({ data: {} });
};
