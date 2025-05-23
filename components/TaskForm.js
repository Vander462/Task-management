// components/TaskForm.js
import React, { useState } from 'react';
import styles from '../styles/Dashboard.module.css';

export default function TaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const res = await fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, description, dueDate }),
    });

    if (res.ok) {
      setTitle('');
      setDescription('');
      setDueDate('');
      onTaskAdded(); // refresh task list
    } else {
      alert('Failed to add task');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 style={{textAlign: 'center', color: '#3730a3', marginBottom: '1rem'}}>Add Task</h3>
      <input
        className={styles.editInput}
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <br />
      <textarea
        className={styles.editTextarea}
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />
      <input
        className={styles.editDate}
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <br />
      <button type="submit">Add Task</button>
    </form>
  );
}
