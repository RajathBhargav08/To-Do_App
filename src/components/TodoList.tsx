import React from 'react';
import { Check, Trash2, Edit2 } from 'lucide-react';
import { useTodo } from '../context/TodoContext';
import { Todo } from '../types/todo';

export function TodoList() {
  const { state, toggleTodo, deleteTodo, editTodo } = useTodo();

  const filteredTodos = state.todos.filter((todo) => {
    if (state.filter === 'completed') return todo.completed;
    if (state.filter === 'pending') return !todo.completed;
    return true;
  });

  const getPriorityColor = (priority: Todo['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-green-500';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-4">
      {filteredTodos.map((todo) => (
        <div
          key={todo.id}
          className="p-4 border rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleTodo(todo.id)}
                className={`p-1 rounded-full border ${
                  todo.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'
                }`}
              >
                <Check size={16} className={todo.completed ? 'text-white' : 'invisible'} />
              </button>
              <div>
                <h3
                  className={`font-medium ${
                    todo.completed ? 'line-through text-gray-500' : ''
                  }`}
                >
                  {todo.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {todo.description}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-sm ${getPriorityColor(todo.priority)}`}>
                {todo.priority}
              </span>
              {todo.dueDate && (
                <span className="text-sm text-gray-500">
                  {new Date(todo.dueDate).toLocaleDateString()}
                </span>
              )}
              <button
                onClick={() => deleteTodo(todo.id)}
                className="p-1 text-red-500 hover:bg-red-100 rounded"
              >
                <Trash2 size={16} />
              </button>
              <button
                onClick={() => {
                  const newTitle = prompt('Edit title:', todo.title);
                  const newDesc = prompt('Edit description:', todo.description);
                  if (newTitle !== null && newDesc !== null) {
                    editTodo({ ...todo, title: newTitle, description: newDesc });
                  }
                }}
                className="p-1 text-blue-500 hover:bg-blue-100 rounded"
              >
                <Edit2 size={16} />
              </button>
            </div>
          </div>
        </div>
      ))}
      {filteredTodos.length === 0 && (
        <p className="text-center text-gray-500">No tasks found</p>
      )}
    </div>
  );
}