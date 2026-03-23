import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import type { Task, Column, Priority, LabelType } from '@/lib/types';
import { LABEL_COLORS } from '@/lib/types';
import { cn } from '@/lib/utils';

interface TaskDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  onUpdate?: (id: string, updates: Partial<Task>) => void;
  editTask?: Task | null;
  defaultColumn?: Column;
}

const ALL_LABELS: LabelType[] = ['work', 'personal', 'urgent', 'design', 'bug'];

const TaskDialog = ({ open, onClose, onSave, onUpdate, editTask, defaultColumn = 'todo' }: TaskDialogProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [dueDate, setDueDate] = useState<Date | undefined>();
  const [labels, setLabels] = useState<LabelType[]>([]);
  const [column, setColumn] = useState<Column>(defaultColumn);

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
      setDescription(editTask.description);
      setPriority(editTask.priority);
      setDueDate(editTask.dueDate ? new Date(editTask.dueDate) : undefined);
      setLabels(editTask.labels);
      setColumn(editTask.column);
    } else {
      setTitle('');
      setDescription('');
      setPriority('medium');
      setDueDate(undefined);
      setLabels([]);
      setColumn(defaultColumn);
    }
  }, [editTask, defaultColumn, open]);

  const toggleLabel = (label: LabelType) => {
    setLabels(prev =>
      prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label],
    );
  };

  const handleSubmit = () => {
    if (!title.trim()) return;
    const taskData = {
      title: title.trim(),
      description: description.trim(),
      priority,
      dueDate: dueDate ? dueDate.toISOString() : null,
      labels,
      column,
    };
    if (editTask && onUpdate) {
      onUpdate(editTask.id, taskData);
    } else {
      onSave(taskData);
    }
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{editTask ? 'Edit Task' : 'New Task'}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <Input
              placeholder="Task title..."
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="bg-secondary/50 border-border/50"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              placeholder="Optional description..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={3}
              className="bg-secondary/50 border-border/50 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Priority</label>
              <Select value={priority} onValueChange={v => setPriority(v as Priority)}>
                <SelectTrigger className="bg-secondary/50 border-border/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">🔴 High</SelectItem>
                  <SelectItem value="medium">🟡 Medium</SelectItem>
                  <SelectItem value="low">🟢 Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Due Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal bg-secondary/50 border-border/50',
                      !dueDate && 'text-muted-foreground',
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dueDate ? format(dueDate, 'MMM d') : 'Pick date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dueDate}
                    onSelect={setDueDate}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Labels</label>
            <div className="flex flex-wrap gap-2">
              {ALL_LABELS.map(label => (
                <button
                  key={label}
                  type="button"
                  onClick={() => toggleLabel(label)}
                  className={cn(
                    'rounded-full px-3 py-1 text-xs font-medium capitalize transition-all border',
                    labels.includes(label)
                      ? cn(LABEL_COLORS[label], 'text-white border-transparent')
                      : 'bg-secondary/50 text-muted-foreground border-border/50 hover:border-primary/50',
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!title.trim()}>
            {editTask ? 'Save Changes' : 'Create Task'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDialog;
