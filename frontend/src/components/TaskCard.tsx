import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import type { Task } from "@/lib/types";
import StatusBadge from "./StatusBadge";
import { DeleteTaskDialog } from "./DeleteTaskDialog";



export function TaskCard({ task, onUpdate, onDelete, onStatusChange }: {
    task: Task;
    onUpdate: (task: Task) => void;
    onDelete: (id: string) => void;
    onStatusChange: (id: string, status: Task['status']) => void;
}) {


    return (
        <Card className="group transition-shadow hover:shadow-md overflow-visible">
            <CardHeader className="p-0">

                <div className="flex items-start gap-4 px-6">
                    <div className="flex-1 flex gap-5">
                        <h3 className="text-2xl font-semibold leading-tight">
                            {task.title}
                        </h3>

                        <StatusBadge
                            task={task}
                            onStatusChange={onStatusChange}
                        />
                    </div>

                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onUpdate(task)}
                            className="h-8 w-8"
                        >
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Update task</span>
                        </Button>


                        <DeleteTaskDialog
                            onConfirm={() => onDelete(task._id)}
                        />

                    </div>

                </div>
            </CardHeader>

            <CardContent className="-mt-5 flex flex-col gap-4">
                <p className="text-sm  line-clamp-3">
                    {task.description}
                </p>

                <span className="text-xs text-muted-foreground">
                    Created on{" "}
                    {new Date(task.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                    })}
                </span>

            </CardContent>
        </Card>
    );
}