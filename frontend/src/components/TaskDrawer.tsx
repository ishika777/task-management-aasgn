import { useEffect, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerDescription,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { Task } from "@/lib/types";
import { toast } from "sonner";

export function TaskDrawer({
  open,
  onOpenChange,
  task,
  createTask,
  updateTask,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task?: Task | null;
  createTask: (title: string, description: string) => Promise<boolean>;
  updateTask: (id: string, title: string, description: string) => Promise<boolean>;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const clickHandler = async () => {
    if (!title.trim() || !description.trim()) {
      toast.error("Title and description cannot be empty.");
      return;
    }

    const success = task
      ? await updateTask(task._id, title, description)
      : await createTask(title, description);

    if (success) {
      setTitle("");
      setDescription("");
      onOpenChange(false);
    }
  };

  useEffect(() => {
    if (task) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTitle(task.title);
      setDescription(task.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [task]);

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="right">
      <DrawerContent className="h-full w-[420px] ml-auto rounded-none border-l bg-background">
        {/* Header */}
        <DrawerHeader className="space-y-2 border-b px-6 py-6">
          <DrawerTitle className="text-2xl font-semibold tracking-tight">
            {task ? "Refine your task" : "Create a new task"}
          </DrawerTitle>

          <DrawerDescription className="text-muted-foreground text-sm max-w-sm">
            {task
              ? "Update the details to keep your task clear and actionable."
              : "Add a task with just enough detail to stay focused and get it done."}
          </DrawerDescription>
        </DrawerHeader>

        {/* Body */}
        <div className="flex flex-col gap-6 px-6 py-8">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">
              Task title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Finish project report"
              className="h-11"
              onKeyDown={(e) => {
                if (e.key === "Enter") clickHandler();
              }}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add context, notes, or next steps..."
              rows={4}
              className="resize-none"
              onKeyDown={(e) => {
                if (e.key === "Enter") clickHandler();
              }}
            />
          </div>
        </div>

        {/* Footer */}
        <DrawerFooter className="mt-auto border-t px-6 py-5">
          <Button size="lg" className="w-full" onClick={clickHandler}>
            {task ? "Save changes" : "Create task"}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
