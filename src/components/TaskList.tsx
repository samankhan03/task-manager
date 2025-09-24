import React from 'react';
import type { Task } from '../types';
import TaskItem from './TaskItem';

interface Props {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

const TaskList: React.FC<Props> = ({ tasks, onToggle, onDelete, onEdit }) => {
  if (!tasks.length) return <p className="empty">No tasks yet — add one above.</p>;

  return (
    <ul className="task-list" aria-live="polite">
      {tasks.map((t) => (
        <TaskItem key={t.id} task={t} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </ul>
  );
};

export default TaskList;
