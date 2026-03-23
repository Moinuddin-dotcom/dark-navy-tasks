import { useState } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { LogOut, Plus, CheckSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Task, Column, User } from '@/lib/types';
import { useTasks } from '@/hooks/useTasks';
import KanbanColumn from '@/components/KanbanColumn';
import TaskDialog from '@/components/TaskDialog';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

const COLUMNS: Column[] = ['todo', 'ongoing', 'completed'];

const Dashboard = ({ user, onLogout }: DashboardProps) => {
  const { addTask, updateTask, deleteTask, moveTask, getColumnTasks } = useTasks();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [defaultColumn, setDefaultColumn] = useState<Column>('todo');

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { draggableId, destination } = result;
    moveTask(draggableId, destination.droppableId as Column, destination.index);
  };

  const handleAddTask = (column: Column) => {
    setEditingTask(null);
    setDefaultColumn(column);
    setDialogOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setDialogOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border/50 px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-lg bg-primary/20">
              <CheckSquare className="h-5 w-5 text-primary" />
            </div>
            <span className="font-bold text-lg text-foreground">TaskFlow</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:inline">
              Hey, <span className="text-foreground font-medium">{user.name}</span>
            </span>
            <Button variant="ghost" size="sm" onClick={onLogout} className="text-muted-foreground hover:text-foreground">
              <LogOut className="h-4 w-4 mr-1.5" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 sm:p-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Board</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Drag tasks between columns to update their status
            </p>
          </div>
          <Button onClick={() => handleAddTask('todo')} size="sm">
            <Plus className="h-4 w-4 mr-1.5" />
            New Task
          </Button>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {COLUMNS.map(col => (
              <KanbanColumn
                key={col}
                column={col}
                tasks={getColumnTasks(col)}
                onAddTask={handleAddTask}
                onEditTask={handleEditTask}
                onDeleteTask={deleteTask}
              />
            ))}
          </div>
        </DragDropContext>
      </main>

      <TaskDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setEditingTask(null);
        }}
        onSave={addTask}
        onUpdate={updateTask}
        editTask={editingTask}
        defaultColumn={defaultColumn}
      />
    </div>
  );
};

export default Dashboard;
