import React from 'react';
import { useTodo } from '../context/TodoContext';
import { TodoFilter as FilterType } from '../types/todo';

export function TodoFilter() {
  const { state, setFilter } = useTodo();

  return (
    <div className="flex gap-2 mb-4">
      {(['all', 'completed', 'pending'] as FilterType[]).map((filter) => (
        <button
          key={filter}
          onClick={() => setFilter(filter)}
          className={`px-4 py-2 rounded capitalize ${
            state.filter === filter
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}