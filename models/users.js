import mongoose from "mongoose";

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new mongoose.Schema({
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    email: {
        type: String,
        required: [true, 'Missed required email field'],
        unique: true,
        match: emailRegex,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    token: {
        type: String,
        default: null,
    },
    avatarUrl: {
        type: String,
        default: null,
    },

    verify: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
        default: null,
        required: [true, 'Verify token is required'],
    },


}, {
    versionKey: false, timestamps: true,
}
)

export default mongoose.model("User", userSchema);