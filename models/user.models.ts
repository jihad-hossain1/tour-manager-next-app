import mongoose, { models } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please add a name"],
            maxlength: [100, "Name can not be more than 100 characters"],
        },
        mobile: {
            type: String,
            required: [true, "Please add a mobile number"],
        },
        email: {
            type: String,
            required: [true, "Please add an email"],
            unique: [true, "Email already exists"],
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Please add a valid email",
            ],
        },
        password: {
            type: String,
            required: [true, "Please add a password"],
            minlength: [6, "Password must be at least 6 characters"],
            maxlength: [40, "Password can not be more than 40 characters"],
        },
        role: {
            type: String,
            enum: ["user"],
            default: "user",
        },
        verifyed: {
            type: String,
            enum: ["active", "inactive"],
            default: "inactive",
        },
        verifiedToken: {
            type: String,
        },
    },
    { timestamps: true },
);

userSchema.pre("save", async function (next) {
    const user = this;
    if (user.isModified("password") || user.isNew) {
        try {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            user.password = hashedPassword;
        } catch (err) {
            return next(err);
        }
    }
    next();
});

const User = models.User || mongoose.model("User", userSchema);

export default User;
