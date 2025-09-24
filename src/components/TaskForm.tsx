import React, { useState, useEffect } from 'react';
import type { Task } from '../types';

interface Props {
  categories: string[];
  onAdd: (input: { title: string; category: string }) => void;
  onUpdate: (task: Task) => void;
  editing: Task | null;
  onCancel: () => void;
}

const TaskForm: React.FC<Props> = ({ categories, onAdd, onUpdate, editing, onCancel }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(categories[0]);

  useEffect(() => {
    if (editing) {
      setTitle(editing.title);
      setCategory(editing.category);
    } else {
      setTitle('');
      setCategory(categories[0]);
    }
  }, [editing, categories]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editing) {
      onUpdate({ ...editing, title: title.trim(), category });
    } else {
      onAdd({ title: title.trim(), category });
    }
    setTitle('');
    setCategory(categories[0]);
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="What needs doing?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <button type="submit" className="add-task">
        {editing ? 'Update' : 'Add'}
      </button>
      {editing && (
        <button type="button" className="cancel-task" onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default TaskForm;
