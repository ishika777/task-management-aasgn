import Task from "../models/Task.model.js";
import type { Request, Response } from "express";



export const getAllTasks = async (req: Request, res: Response) => {
    try {
    const userId = req.user_id;
       
    const tasks = await Task.find({ user: userId })
      .sort({ createdAt: -1 });


        return res.status(200).json({
            success: true,
            data: tasks,
        });

    } catch (error: unknown) {
        return res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "An error occurred",
        });
    }
};

export const createTask = async (req: Request, res: Response) => {
    try {
        const { title, description } = req.body;
            const userId = req.user_id;


        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: "Invalid input",
            });
        }

        console.log(title)
        console.log(description)

        await Task.create({
            title,
            description,
             user: userId
        });

        const allTasks = await Task.find().sort({ createdAt: -1 });

        return res.status(201).json({
            success: true,
            data: allTasks,
            message: "Task created successfully",
        });

    }  catch (error: unknown) {
        return res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "An error occurred",
        });
    }
};

export const updateTask = async (req: Request, res: Response) => {
    try {
            const userId = req.user_id;

        const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: userId },
      req.body,
      { new: true, runValidators: true }
    );


        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }

                const allTasks = await Task.find().sort({ createdAt: -1 });


        return res.status(200).json({
            success: true,
            data: allTasks,
            message: "Task updated successfully",
        });

    }  catch (error: unknown) {
        return res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "An error occurred",
        });
    }
};

export const updateTaskStatus = async (req: Request, res: Response) => {
    try {
        const { status } = req.body;
    const userId = req.user_id;


    
       
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: userId },
      { status },
      { new: true }
    );
        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }

        const allTasks = await Task.find().sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            data: allTasks,
            message: "Task status updated successfully",
        });
    } catch (error: unknown) {
        return res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "An error occurred",
        });
    }
};

export const deleteTask = async (req: Request, res: Response) => {
    try {
            const userId = req.user_id;

       const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: userId,
    });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }

        const allTasks = await Task.find().sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            data: allTasks,
            message: "Task deleted successfully",
        });
        
    } catch (error: unknown) {
        return res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "An error occurred",
        });
    }
};
