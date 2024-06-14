import User from "../models/users.js"
import ctrlWrapper from "../middleware/ctrlWrapper.js";
import HttpError from "../middleware/HttpError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import * as fs from "node:fs/promises";
import path from "node:path";
import Jimp from "jimp";
import { randomUUID } from "crypto";

const { SECRET_KEY } = process.env;



const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })

    if (user) {
        throw HttpError(409, "Email in use")
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);



    const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL })

    res.status(201).json({
        users: {
            email: newUser.email,
            subscription: newUser.subscription,
            avatarUrl: newUser.avatarUrl,
        }
    })
}

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email })

    if (!user) {
        throw HttpError(401, "Email or password is wrong")
    }

    const passwordCompare = await bcrypt.compare(password, user.password)

    if (!passwordCompare) {
        throw HttpError(401, "Email or password is wrong")
    }


    const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: "23h" });

    await User.findByIdAndUpdate(user._id, { token }, { new: true });
    res.status(200).json({ token: token, user: { email: user.email, subscription: user.subscription } })
}

const getCurrent = async (req, res) => {
    const { email, subscription } = req.user;
    res.json({ email, subscription })
}

const logOut = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: null });
    res.status(204).json()
}

const updateSub = async (req, res) => {
    const { _id } = req.user;
    const { subscription } = req.body;

    if (!['starter', 'pro', 'business'].includes(subscription)) {
        throw new HttpError(400, "Invalid subscription type");
    }

    const updatedUser = await User.findByIdAndUpdate(_id, { subscription }, { new: true });

    res.json({
        email: updatedUser.email,
        subscription: updatedUser.subscription
    });
}

const updateAvatar = async (req, res, next) => {

    const tempPath = req.file.path;
    const newFilename = `${req.user.id}-${randomUUID()}${path.extname(req.file.originalname)}`;
    const newPath = path.resolve("public", "avatars", newFilename);

    const image = await Jimp.read(tempPath);
    await image.resize(250, 250).writeAsync(newPath);


    await fs.unlink(tempPath);

    const avatarURL = `/avatars/${newFilename}`;

    const user = await User.findByIdAndUpdate(
        req.user.id,
        { avatarURL },
        { new: true }
    );

    if (!user) {
        return res.status(401).send({ message: "Not authorized" });
    }

    res.status(200).send({ avatarURL: user.avatarURL });

};

export default {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logOut: ctrlWrapper(logOut),
    updateSub: ctrlWrapper(updateSub),
    updateAvatar: ctrlWrapper(updateAvatar),
}