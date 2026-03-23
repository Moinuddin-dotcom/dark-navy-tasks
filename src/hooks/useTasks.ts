import { useState, useEffect } from 'react';
import type { Task, Column } from '@/lib/types';

const TASKS_KEY = 'kanban_tasks';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const stored = localStorage.getItem(TASKS_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setTasks(prev => [...prev, newTask]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, ...updates } : t)));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const moveTask = (taskId: string, toColumn: Column, newIndex?: number) => {
    setTasks(prev => {
      const updated = prev.map(t => (t.id === taskId ? { ...t, column: toColumn } : t));
      if (newIndex !== undefined) {
        const task = updated.find(t => t.id === taskId)!;
        const others = updated.filter(t => t.id !== taskId);
        const columnTasks = others.filter(t => t.column === toColumn);
        const restTasks = others.filter(t => t.column !== toColumn);
        columnTasks.splice(newIndex, 0, task);
        return [...restTasks, ...columnTasks];
      }
      return updated;
    });
  };

  const getColumnTasks = (column: Column) => tasks.filter(t => t.column === column);

  return { tasks, addTask, updateTask, deleteTask, moveTask, getColumnTasks };
}
