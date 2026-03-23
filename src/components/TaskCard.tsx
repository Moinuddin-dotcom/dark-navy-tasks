import { useState } from 'react';
import { format } from 'date-fns';
import { CalendarIcon, X, GripVertical, Pencil, Trash2 } from 'lucide-react';
import { Draggable } from '@hello-pangea/dnd';
import type { Task, LabelType, Priority } from '@/lib/types';
import { LABEL_COLORS, PRIORITY_COLORS } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

import type { Column } from '@/lib/types';

const columnCardBg: Record<Column, string> = {
  todo: 'bg-card',
  ongoing: 'bg-[hsl(38,92%,50%,0.08)] border-[hsl(var(--priority-medium)/0.3)]',
  completed: 'bg-[hsl(142,71%,45%,0.08)] border-[hsl(var(--priority-low)/0.3)]',
};

interface TaskCardProps {
  task: Task;
  index: number;
  column: Column;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const priorityLabels: Record<Priority, string> = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};

const TaskCard = ({ task, index, column, onEdit, onDelete }: TaskCardProps) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={cn(
            'group rounded-lg border border-border/50 p-3 space-y-2.5 transition-all',
            columnCardBg[column],
            snapshot.isDragging && 'shadow-xl shadow-primary/10 rotate-2 scale-105',
          )}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-start gap-2 flex-1 min-w-0">
              <div
                {...provided.dragHandleProps}
                className="mt-0.5 text-muted-foreground/50 hover:text-muted-foreground cursor-grab active:cursor-grabbing"
              >
                <GripVertical className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-foreground leading-snug truncate">
                  {task.title}
                </h4>
                {task.description && (
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                    {task.description}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => onEdit(task)}
                className="p-1 rounded hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
              >
                <Pencil className="h-3 w-3" />
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="p-1 rounded hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-colors"
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap pl-6">
            <span
              className={cn(
                'inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold text-white',
                PRIORITY_COLORS[task.priority],
              )}
            >
              {priorityLabels[task.priority]}
            </span>
            {task.labels.map(label => (
              <span
                key={label}
                className={cn(
                  'inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold text-white capitalize',
                  LABEL_COLORS[label],
                )}
              >
                {label}
              </span>
            ))}
          </div>

          {task.dueDate && (
            <div className="flex items-center gap-1.5 pl-6 text-xs text-muted-foreground">
              <CalendarIcon className="h-3 w-3" />
              {format(new Date(task.dueDate), 'MMM d, yyyy')}
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
