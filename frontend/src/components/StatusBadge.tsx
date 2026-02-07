
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import type { Task } from '@/lib/types';


const statusConfig = {
    Pending: {
        label: "Pending",
        variant: "secondary" as const,
        className: "bg-yellow-100 text-yellow-800 border border-yellow-200",
    },
    "In-Progress": {
        label: "In Progress",
        variant: "default" as const,
        className: "bg-blue-100 text-blue-800 border border-blue-200",
    },
    Completed: {
        label: "Completed",
        variant: "outline" as const,
        className: "bg-green-100 text-green-800 border border-green-200",
    },
};


const StatusBadge = ({ task, onStatusChange }: {
    task: Task;
    onStatusChange: (id: string, status: Task['status']) => void;

}) => {

    const curr_status = statusConfig[task.status];




    return (
        <Select
            value={task.status}
            onValueChange={(value) =>
                onStatusChange(task._id, value as Task["status"])
            }
        >
            <SelectTrigger
                className="
                                    w-fit p-0 h-auto border-none shadow-none
                                    focus:outline-none focus:ring-0 focus:ring-offset-0
                                    focus-visible:outline-none focus-visible:ring-0
                                    [&>svg]:hidden
                                "
            >
                <Badge
                    variant={curr_status.variant}
                    className={`${curr_status.className} cursor-pointer select-none hover:opacity-80 transition-opacity`}
                >
                    {curr_status.label}
                </Badge>
            </SelectTrigger>

            <SelectContent
                position="popper"
                side="bottom"
                align="start"
                sideOffset={6}
                className="border-0 w-fit"
            >
                {(Object.keys(statusConfig) as Array<keyof typeof statusConfig>).map(
                    (status) => {
                        if (status === task.status) return null;

                        const item = statusConfig[status];

                        return (
                            <SelectItem
                                key={status}
                                value={status}
                                className="
    bg-transparent
    hover:bg-transparent
    focus:bg-transparent
    data-highlighted:bg-transparent
    data-[state=checked]:bg-transparent
    cursor-pointer
  "
                            >
                                <Badge
                                    variant={item.variant}
                                    className={item.className}
                                >
                                    {item.label}
                                </Badge>
                            </SelectItem>

                        );
                    }
                )}
            </SelectContent>
        </Select>
    )
}

export default StatusBadge