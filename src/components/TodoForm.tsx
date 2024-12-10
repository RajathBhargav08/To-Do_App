import React, { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { useTodo } from '../context/TodoContext';
import { Priority } from '../types/todo';

export function TodoForm() {
  const { addTodo } = useTodo();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addTodo({
      title,
      description,
      completed: false,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      priority,
    });

    setTitle('');
    setDescription('');
    setDueDate('');
    setPriority('medium');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
        className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task description"
        className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
      />
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Calendar size={16} /> Due Date
          </label>
          <input
            type="datetime-local"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
          />
        </div>
        <div className="flex-1">
          <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Clock size={16} /> Priority
          </label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
      >
        Add Task
      </button>
    </form>
  );
}