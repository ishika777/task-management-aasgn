import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Sparkles, LogOut } from "lucide-react";
import type { Task } from "@/lib/types";
import TaskProgress from "@/components/TaskProgress";
import { TaskCard } from "@/components/TaskCard";
import { TaskDrawer } from "@/components/TaskDrawer";
import {
    getAllTasks,
    createTask,
    updateTask,
    updateTaskStatus,
    deleteTask,
} from "@/lib/tasks.api";
import { toast } from "sonner";
import { logoutUser } from "@/lib/user.api";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/Loader";

type TaskFilter = "all" | "pending" | "in-progress" | "completed";


const TasksPage = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    const [filter, setFilter] = useState<TaskFilter>("all");
    const [titles, setTitles] = useState<string[]>([]);

    const navigate = useNavigate();

    const completedCount = tasks.filter(
        (t) => t.status === "Completed"
    ).length;

    const filteredTasks = tasks.filter((task) => {
        if (filter === "completed") return task.status === "Completed";
        if (filter === "in-progress") return task.status === "In-Progress";
        if (filter === "pending") return task.status !== "Completed" && task.status !== "In-Progress";
        return true;
    });


    useEffect(() => {
        const fetchAllTasks = async () => {
            const res = await getAllTasks();
            setTasks(res);
            setTitles(res.map((t) => t.title));
            setLoading(false);
        };
        fetchAllTasks();
    }, []);

    /* -------------------- handlers -------------------- */
    const handleCreateTask = async (title: string, description: string) => {
        if (titles.includes(title)) {
            toast.error(
                "A task with this title already exists. Please choose a different title."
            );
            return false;
        }

        const allTasks = await createTask({ title, description });
        toast.success("Task created successfully!");
        setTasks(allTasks);
        setTitles(allTasks.map((t) => t.title));
        return true;
    };

    const handleUpdateTask = async (
        id: string,
        title: string,
        description: string
    ) => {
        if (titles.includes(title)) {
            toast.error(
                "A task with this title already exists. Please choose a different title."
            );
            return false;
        }

        const allTasks = await updateTask({ id, title, description });
        toast.success("Task updated successfully!");
        setTasks(allTasks);
        setTitles(allTasks.map((t) => t.title));
        return true;
    };

    const handleDeleteTask = async (id: string) => {
        const allTasks = await deleteTask(id);
        toast.success("Task deleted successfully!");
        setTasks(allTasks);
        setTitles(allTasks.map((t) => t.title));
    };

    const handleStatusChange = async (
        id: string,
        status: Task["status"]
    ) => {
        const allTasks = await updateTaskStatus(id, status);
        setTasks(allTasks);
    };

    const handleLogout = async () => {
        try {
            const message = await logoutUser();
            toast.success(message);
            navigate("/login");
        } catch {
            toast.error("Failed to logout");
        }
    };

    const handleUpdate = (task: Task) => {
        setEditingTask(task);
        setDrawerOpen(true);
    };

    const handleOpenDrawer = () => {
        setEditingTask(null);
        setDrawerOpen(true);
    };

    return (
        <div className="relative min-h-screen bg-background">
            {/* Soft background glow */}
            <div className="pointer-events-none absolute -top-40 left-1/2 h-125 w-125 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

            {/* Logout */}
            <div className="absolute top-6 right-6 z-10">
                <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="
      flex items-center gap-2
      text-black/70
      transition-colors
      hover:bg-primary
      hover:text-white
    "
                >
                    <LogOut className="h-4 w-4" />
                    Logout
                </Button>
            </div>
            {/* Main container */}
            <div className="relative mx-auto max-w-6xl px-4 pt-20 pb-12">
                {/* Header */}
                <div className="mb-14 text-center">
                    <div className="inline-flex items-center gap-2 mb-4 rounded-full bg-primary/10 px-4 py-1.5">
                        <Sparkles className="h-5 w-5 text-primary" />
                        <span className="text-xs font-medium text-primary uppercase tracking-wide">
                            Task Manager
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                        Get stuff done,
                        <span className="text-primary"> one task at a time</span>
                    </h1>

                    <p className="text-muted-foreground text-lg max-w-lg mx-auto">
                        Stay organized, stay productive. Your daily companion for crushing goals.
                    </p>
                </div>

                {/* Progress + CTA */}
                {!loading && tasks.length > 0 && (
                    <div className="mb-10 flex flex-col gap-4 rounded-2xl border bg-card p-6 shadow-sm sm:flex-row sm:items-center">
                        <div className="flex-1">
                            <TaskProgress
                                total={tasks.length}
                                completed={completedCount}
                            />
                        </div>

                        <Button
                            onClick={handleOpenDrawer}
                            size="lg"
                            className="sm:self-end"
                        >
                            <Plus className="mr-2 h-5 w-5" />
                            New Task
                        </Button>
                    </div>
                )}

                {/* Filters (segmented control style) */}
                {!loading && tasks.length > 0 && (
                    <div className="mb-10 flex justify-center">
                        <div className="inline-flex rounded-xl border bg-orange-50/70 p-2">
                            {(["all", "pending", "in-progress", "completed"] as TaskFilter[]).map(
                                (value) => (
                                    <Button
                                        key={value}
                                        variant={filter === value ? "default" : "ghost"}
                                        size="sm"
                                        onClick={() => setFilter(value)}
                                        className="capitalize rounded-lg mx-2"
                                    >
                                        {value === "in-progress" ? "In Progress" : value}
                                    </Button>
                                )
                            )}

                        </div>
                    </div>
                )}

                {/* Task List */}
                {loading ? (
                    <div className="text-center py-20">
                        <Loader />
                    </div>
                ) : filteredTasks.length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredTasks.map((task) => (
                            <TaskCard
                                key={task._id}
                                task={task}
                                onUpdate={handleUpdate}
                                onDelete={handleDeleteTask}
                                onStatusChange={handleStatusChange}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="mx-auto max-w-md text-center text-lg font-medium text-muted-foreground leading-relaxed tracking-tight">
                            {filter === "completed"
                                ? "No completed tasks yet. Finish one and it’ll show up here."
                                : filter === "in-progress"
                                    ? "No tasks in progress. Pick one and get moving."
                                    : filter === "pending"
                                        ? "No pending tasks. Looks like you’re all caught up!"
                                        : "No tasks yet. Time to add your first one 🚀"}
                        </p>


                        {filter === "all" && (
                            <Button size="lg" onClick={handleOpenDrawer}>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Your First Task
                            </Button>
                        )}
                    </div>
                )}
            </div>

            {/* Drawer */}
            <TaskDrawer
                open={drawerOpen}
                onOpenChange={setDrawerOpen}
                task={editingTask}
                createTask={handleCreateTask}
                updateTask={handleUpdateTask}
            />
        </div>
    );

};

export default TasksPage;
