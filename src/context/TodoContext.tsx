import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Todo, TodoFilter } from '../types/todo';

interface TodoState {
  todos: Todo[];
  filter: TodoFilter;
}

type TodoAction =
  | { type: 'ADD_TODO'; payload: Todo }
  | { type: 'DELETE_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: string }
  | { type: 'EDIT_TODO'; payload: Todo }
  | { type: 'SET_FILTER'; payload: TodoFilter };

interface TodoContextType {
  state: TodoState;
  addTodo: (todo: Omit<Todo, 'id' | 'createdAt'>) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  editTodo: (todo: Todo) => void;
  setFilter: (filter: TodoFilter) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case 'ADD_TODO':
      return { ...state, todos: [...state.todos, action.payload] };
    case 'DELETE_TODO':
      return { ...state, todos: state.todos.filter((todo) => todo.id !== action.payload) };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
        ),
      };
    case 'EDIT_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? action.payload : todo
        ),
      };
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    default:
      return state;
  }
}

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(todoReducer, {
    todos: JSON.parse(localStorage.getItem('todos') || '[]'),
    filter: 'all',
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }, [state.todos]);

  const addTodo = (todo: Omit<Todo, 'id' | 'createdAt'>) => {
    const newTodo: Todo = {
      ...todo,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    dispatch({ type: 'ADD_TODO', payload: newTodo });
  };

  const deleteTodo = (id: string) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };

  const toggleTodo = (id: string) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  };

  const editTodo = (todo: Todo) => {
    dispatch({ type: 'EDIT_TODO', payload: todo });
  };

  const setFilter = (filter: TodoFilter) => {
    dispatch({ type: 'SET_FILTER', payload: filter });
  };

  return (
    <TodoContext.Provider
      value={{ state, addTodo, deleteTodo, toggleTodo, editTodo, setFilter }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) throw new Error('useTodo must be used within TodoProvider');
  return context;
};