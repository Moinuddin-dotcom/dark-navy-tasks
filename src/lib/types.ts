export type Priority = 'high' | 'medium' | 'low';
export type Column = 'todo' | 'ongoing' | 'completed';
export type LabelType = 'work' | 'personal' | 'urgent' | 'design' | 'bug';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  dueDate: string | null;
  labels: LabelType[];
  column: Column;
  createdAt: string;
}

export interface User {
  name: string;
  email: string;
}

export const LABEL_COLORS: Record<LabelType, string> = {
  work: 'bg-[hsl(var(--label-work))]',
  personal: 'bg-[hsl(var(--label-personal))]',
  urgent: 'bg-[hsl(var(--label-urgent))]',
  design: 'bg-[hsl(var(--label-design))]',
  bug: 'bg-[hsl(var(--label-bug))]',
};

export const PRIORITY_COLORS: Record<Priority, string> = {
  high: 'bg-[hsl(var(--priority-high))]',
  medium: 'bg-[hsl(var(--priority-medium))]',
  low: 'bg-[hsl(var(--priority-low))]',
};

export const COLUMN_TITLES: Record<Column, string> = {
  todo: 'To Do',
  ongoing: 'On Going',
  completed: 'Completed',
};
