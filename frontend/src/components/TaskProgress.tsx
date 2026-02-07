import { Progress } from '@/components/ui/progress';



const TaskProgress = ({ total, completed }: {
  total: number,
  completed: number
}) => {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          {completed} of {total} tasks completed
        </span>
        <span className="font-medium text-primary">{percentage}%</span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  );
}
export default TaskProgress