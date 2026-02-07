    import User from "@/models/User.model.js";
    import bcrypt from "bcryptjs";
    import jwt from "jsonwebtoken";
    import type { Request, Response } from "express";

    export const register = async (req: Request, res: Response) => {
        try {
            const { name, email, password } = req.body;

            console.log(name)
            console.log(email)
            console.log(password)

            if (!name || !email || !password) {
                return res.status(400).json({ message: "All fields are required" });
            }

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(409).json({ message: "User already exists" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await User.create({
                name,
                email,
                password: hashedPassword,
            });

            const token = jwt.sign(
                { id: user._id },
                process.env.JWT_SECRET!,
                { expiresIn: "7d" }
            );

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            return res.status(201).json({
                success: true,
                user,
                message: "User registered successfully",
            });
        
        } catch (error) {
            return res.status(500).json({ message: "Server error" });
        }
    };


    export const login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email }).select("+password");
            if (!user) {
                return res.status(401).json({ message: "Invalid credentials" });
            }


            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            console.log(user)

            const token = jwt.sign(
                { id: user._id },
                process.env.JWT_SECRET!,
                { expiresIn: "7d" }
            );

            console.log("token", token)

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict", // or "lax" if frontend & backend are on different ports
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            });

            console.log(user)

            return res.status(200).json({
                success: true,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                },
            });
        } catch (error) {
            return res.status(500).json({ message: "Server error" });
        }
    };


    export const logout = async (req: Request, res: Response) => {
    try {
        res.cookie("token", "", {
            httpOnly: true,
            sameSite: "strict",
            expires: new Date(0),
        });

        return res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};
