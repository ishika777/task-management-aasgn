import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2, AlertTriangle } from "lucide-react";

export function DeleteTaskDialog({
    onConfirm,
}: {
    onConfirm: () => void;
}) {
    return (
        <Dialog>
            <DialogTrigger asChild>
            <Button
  variant="ghost"
  size="icon"
  className="
    h-8 w-8
    text-destructive
    transition-colors
    hover:bg-orange-500
    hover:text-white
  "
>
  <Trash2 className="h-4 w-4" />
  <span className="sr-only">Delete task</span>
</Button>

            </DialogTrigger>

            <DialogContent
                className="
                    max-w-md
                    rounded-2xl
                    border border-destructive/30
                    shadow-2xl
                    p-0
                    "
            >
                <div className="rounded-xl bg-destructive/5 p-6">
                    <DialogHeader className="">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
                            <AlertTriangle className="h-7 w-7 text-destructive" />
                        </div>

                        <DialogTitle className="text-center text-xl font-semibold text-destructive">
                            Delete this task?
                        </DialogTitle>

                        <DialogDescription className="text-center text-sm text-destructive/80 max-w-xs mx-auto">
                            This action is permanent. Once deleted, the task cannot be recovered.
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter className="mt-6">
                        <Button
                            onClick={onConfirm}
                            className="w-full bg-destructive/90 text-white hover:bg-destructive/90"
                        >
                            Permanently delete task
                        </Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
}
