// components/TaskList.js
import React, { useState } from 'react';
import styles from '../styles/Dashboard.module.css';

export default function TaskList({ tasks, onTasksUpdated }) {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editDueDate, setEditDueDate] = useState('');

  const startEdit = (task) => {
    setEditingTaskId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description || '');
    setEditDueDate(task.dueDate ? task.dueDate.slice(0, 10) : '');
  };

  const cancelEdit = () => {
    setEditingTaskId(null);
    setEditTitle('');
    setEditDescription('');
    setEditDueDate('');
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
    console.log('Token (update):', token); // Add this line
  
    const res = await fetch(`/api/tasks/${editingTaskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: editTitle,
        description: editDescription,
        dueDate: editDueDate,
      }),
    });
  
    if (res.ok) {
      cancelEdit();
      onTasksUpdated();
    } else {
      const err = await res.json();
      console.error('Update error:', err); // Also add this for better visibility
      alert(`Failed to update task: ${err.error || res.status}`);
    }
  };
  

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    console.log('Token (delete):', token); // Add this line
  
    const res = await fetch(`/api/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (res.ok) {
      onTasksUpdated();
    } else {
      const err = await res.json();
      console.error('Delete error:', err); // Also add this
      alert(`Failed to delete task: ${err.error || res.status}`);
    }
  };
  

  return (
    <div>
      <h3 style={{textAlign: 'center', color: '#3730a3', marginBottom: '1rem'}}>Your Tasks</h3>
      {tasks.length === 0 && <p>No tasks found.</p>}
      <ul className={styles.taskList}>
        {tasks.map((task) => (
          <li key={task.id} className={styles.taskItem}>
            {editingTaskId === task.id ? (
              <div>
                <input
                  className={styles.editInput}
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <textarea
                  className={styles.editTextarea}
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                />
                <input
                  className={styles.editDate}
                  type="date"
                  value={editDueDate}
                  onChange={(e) => setEditDueDate(e.target.value)}
                />
                <div className={styles.taskActions}>
                  <button onClick={handleUpdate}>Save</button>
                  <button onClick={cancelEdit}>Cancel</button>
                </div>
              </div>
            ) : (
              <div>
                <div className={styles.taskTitle}>{task.title}</div>
                <div className={styles.taskMeta}>{task.description} {task.dueDate ? `| Due: ${task.dueDate.slice(0, 10)}` : ''}</div>
                <div className={styles.taskActions}>
                  <button onClick={() => startEdit(task)}>Edit</button>
                  <button onClick={() => handleDelete(task.id)}>Delete</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
