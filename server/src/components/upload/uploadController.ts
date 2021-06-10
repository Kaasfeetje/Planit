import { NextFunction, Request, Response } from "express";
import path from "path";
import multer, { FileFilterCallback } from "multer";
import { BadRequestError } from "../../common/errors/BadRequestError";
import sharp from "sharp";

function checkIsImage(file: Express.Multer.File, cb: FileFilterCallback) {
    const filetypes = /jpg|jpeg|png/;
    const extname = filetypes.test(
        path.extname(file.originalname.toLowerCase())
    );
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        return cb(new BadRequestError("Images only"));
    }
}

const pictureStorage = multer.memoryStorage();
export const pictureUpload = multer({
    storage: pictureStorage,
    fileFilter: function (req, file, cb) {
        checkIsImage(file, cb);
    },
});
export const resizeProfilePicture = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const file = req.file;
    const filename = `uploads/${file.fieldname}/${
        req.currentUser!.id
    }${path.extname(file.originalname)}`;

    await sharp(file.buffer)
        .resize(255, 255)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(filename);

    req.file.path = filename;

    next();
};

export const uploadProfilePicture = (req: Request, res: Response) => {
    res.status(201).send({ data: { filePath: req.file.path } });
};

export const resizeBoardImage = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const file = req.file;
    const filename = `uploads/${file.fieldname}/${Date.now()}${path.extname(
        file.originalname
    )}`;

    await sharp(file.buffer)
        .resize(1580, 560)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(filename);

    req.file.path = filename;

    next();
};

export const uploadBoardImage = async (req: Request, res: Response) => {
    res.status(201).send({ data: { filePath: req.file.path } });
};
