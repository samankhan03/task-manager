import React from 'react';
import type { Task } from '../types';
import { FaBriefcase, FaUser, FaBook, FaQuestion } from 'react-icons/fa';

interface Props {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'work':
      return <FaBriefcase />;
    case 'personal':
      return <FaUser />;
    case 'study':
      return <FaBook />;
    default:
      return <FaQuestion />;
  }
};

const TaskItem: React.FC<Props> = ({ task, onToggle, onDelete, onEdit }) => {
  return (
    <li className={`task-card ${task.completed ? 'completed' : ''}`}>
      <div className="task-info">
        <span className="task-title">{task.title}</span>
        <span className={`task-category ${task.category.toLowerCase()}`}>
          {getCategoryIcon(task.category)} {task.category}
        </span>
        <span className="task-date">{new Date(task.createdAt).toLocaleString()}</span>
      </div>
      <div className="task-actions">
        <button onClick={() => onToggle(task.id)}>Toggle</button>
        <button onClick={() => onEdit(task)}>Edit</button>
        <button onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </li>
  );
};

export default TaskItem;
