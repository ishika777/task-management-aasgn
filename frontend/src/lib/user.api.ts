import axios from "axios";
import type { User } from "@/lib/types";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, // Include cookies in requests for authentication
});


export const signupUser = async (payload: {
  name: string;
  email: string;
  password: string;
}): Promise<User> => {
  try {
    const res = await api.post<User>("/auth/register", payload);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // backend message
      throw new Error(
        error.response?.data?.message || "Signup failed"
      );
    }
    throw new Error("Something went wrong");
  }
};
export const loginUser = async (payload: {
  email: string;
  password: string;
}): Promise<User> => {
  try {
    const res = await api.post<User>("/auth/login", payload);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Invalid email or password"
      );
    }
    throw new Error("Something went wrong. Please try again.");
  }
};

export const logoutUser = async (): Promise<string> => {
    try {
        const res = await api.post("/auth/logout");
        return res.data.message;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            throw new Error(
                error.response?.data?.message || "Failed to logout"
            );
        }
        throw new Error("Something went wrong");
    }
};
