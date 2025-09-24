import { useEffect, useState } from 'react';
import type { Task } from './types';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Message from './components/Message';
import headerImage from './assets/task.png';
import './styles.scss';

const LOCAL_STORAGE_KEY = 'task_manager_tasks_v1';

export default function App(): React.ReactElement {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<string>('All');
  const [editing, setEditing] = useState<Task | null>(null);
  const [categories, setCategories] = useState<string[]>(['Work', 'Personal', 'Study', 'Other']);
  const [newCategory, setNewCategory] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      try {
        setTasks(JSON.parse(raw));
      } catch (e) {
        console.error('Could not parse tasks from localStorage', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (input: { title: string; category: string }) => {
    const newTask: Task = {
      id: String(Date.now()) + Math.random().toString(36).slice(2, 8),
      title: input.title.trim(),
      category: input.category,
      completed: false,
      createdAt: Date.now(),
    };
    setTasks((p) => [newTask, ...p]);
    setMessage({ type: 'success', text: `Task "${input.title}" added successfully!` });
    setTimeout(() => setMessage(null), 3000);
  };

  const updateTask = (updated: Task) => {
    setTasks((p) => p.map((t) => (t.id === updated.id ? updated : t)));
    setEditing(null);
    setMessage({ type: 'success', text: `Task "${updated.title}" updated successfully!` });
    setTimeout(() => setMessage(null), 3000);
  };

  const deleteTask = (id: string) => setTasks((p) => p.filter((t) => t.id !== id));
  const toggleComplete = (id: string) =>
    setTasks((p) => p.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));

  const tasksToShow = filter === 'All' ? tasks : tasks.filter((t) => t.category === filter);

  const handleAddCategory = () => {
    const trimmed = newCategory.trim();
    if (!trimmed) {
      setMessage({ type: 'error', text: 'Category name cannot be empty.' });
      setTimeout(() => setMessage(null), 3000);
      return;
    }
    if (categories.includes(trimmed)) {
      setMessage({ type: 'error', text: `Category "${trimmed}" already exists.` });
      setTimeout(() => setMessage(null), 3000);
      return;
    }
    setCategories((prev) => [...prev, trimmed]);
    setNewCategory('');
    setMessage({ type: 'success', text: `Category "${trimmed}" added successfully!` });
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div className="container">
      <header className="header-hero">
        <div className="header-content">
          <h1>Task Manager</h1>
          <p className="lead">React + TypeScript • LocalStorage • Accessible</p>
        </div>
        <img src={headerImage} alt="Task illustration" className="header-illustration" />
      </header>

      {/* New Category Input */}
      <div className="new-category">
        <input
          type="text"
          placeholder="Add new category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button type="button" onClick={handleAddCategory}>
          Add Category
        </button>
      </div>

      {/* Message */}
      {message && <Message type={message.type} text={message.text} />}

      {/* Task Form */}
      <TaskForm
        categories={categories}
        onAdd={addTask}
        onUpdate={updateTask}
        editing={editing}
        onCancel={() => setEditing(null)}
      />

      {/* Filter Dropdown */}
      <div className="controls">
        <label htmlFor="filter">Filter:</label>
        <select id="filter" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Task List */}
      <TaskList tasks={tasksToShow} onToggle={toggleComplete} onDelete={deleteTask} onEdit={setEditing} />
    </div>
  );
}
