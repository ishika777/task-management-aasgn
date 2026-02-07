import axios from "axios";
import type { Task } from "@/lib/types";


const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, // Include cookies in requests for authentication
});


interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
}


// GET /tasks
export const getAllTasks = async (): Promise<Task[]> => {
    const res = await api.get<ApiResponse<Task[]>>("/tasks");
    return res.data.data!;
};

// POST /tasks
export const createTask = async (
    payload: {
        title: string;
        description: string;
    }
): Promise<Task[]> => {
    const res = await api.post<ApiResponse<Task[]>>("/tasks", payload);
    return res.data.data!;
};

// PUT /tasks/:id
export const updateTask = async ({
        id,
        title,
        description,
}: {
        id: string;
        title: string;
        description: string;
}   
): Promise<Task[]> => {
    const res = await api.put<ApiResponse<Task[]>>(`/tasks/${id}`, { title, description });
    return res.data.data!;
};

// PATCH /tasks/:id/status
export const updateTaskStatus = async (
    id: string,
    status: Task["status"]
): Promise<Task[]> => {
    const res = await api.patch<ApiResponse<Task[]>>(
        `/tasks/${id}/status`,
        { status }
    );
    return res.data.data!;
};

// DELETE /tasks/:id
export const deleteTask = async (id: string): Promise<Task[]> => {
    
    const res = await api.delete<ApiResponse<Task[]>>(`/tasks/${id}`);
    return res.data.data!;

};
