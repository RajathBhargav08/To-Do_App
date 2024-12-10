export type Priority = 'low' | 'medium' | 'high';

export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate?: Date;
  priority: Priority;
  createdAt: Date;
}

export type TodoFilter = 'all' | 'completed' | 'pending';