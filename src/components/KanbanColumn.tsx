import { Droppable } from '@hello-pangea/dnd';
import { Plus } from 'lucide-react';
import type { Task, Column } from '@/lib/types';
import { COLUMN_TITLES } from '@/lib/types';
import TaskCard from './TaskCard';
import { cn } from '@/lib/utils';

interface KanbanColumnProps {
  column: Column;
  tasks: Task[];
  onAddTask: (column: Column) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
}

const columnAccents: Record<Column, string> = {
  todo: 'border-t-primary',
  ongoing: 'border-t-[hsl(var(--priority-medium))]',
  completed: 'border-t-[hsl(var(--priority-low))]',
};

const KanbanColumn = ({ column, tasks, onAddTask, onEditTask, onDeleteTask }: KanbanColumnProps) => {
  return (
    <div
      className={cn(
        'flex flex-col rounded-xl border border-border/50 bg-secondary/30 border-t-4',
        columnAccents[column],
      )}
    >
      <div className="flex items-center justify-between p-4 pb-2">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-foreground text-sm">{COLUMN_TITLES[column]}</h3>
          <span className="flex items-center justify-center h-5 w-5 rounded-full bg-muted text-[11px] font-medium text-muted-foreground">
            {tasks.length}
          </span>
        </div>
        <button
          onClick={() => onAddTask(column)}
          className="p-1 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <Droppable droppableId={column}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={cn(
              'flex-1 p-2 space-y-2 min-h-[200px] transition-colors rounded-b-xl',
              snapshot.isDraggingOver && 'bg-primary/5',
            )}
          >
            {tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                column={column}
                onEdit={onEditTask}
                onDelete={onDeleteTask}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default KanbanColumn;
