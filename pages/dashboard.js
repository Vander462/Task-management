// pages/dashboard.js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { getTasks } from '../lib/api';
import styles from '../styles/Dashboard.module.css';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) router.push('/login');
    else fetchTasks(token);
  }, []);

  async function fetchTasks(token) {
    const fetchedTasks = await getTasks(token);
    if (!fetchedTasks) {
      router.push('/login');
    } else {
      setTasks(fetchedTasks);
    }
  }

  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.dashboardTitle}>Dashboard</h1>
      <div className={styles.taskFormCard}>
        <TaskForm onTaskAdded={() => fetchTasks(localStorage.getItem('token'))} />
      </div>
      <div className={styles.taskListCard}>
        <TaskList tasks={tasks} onTasksUpdated={() => fetchTasks(localStorage.getItem('token'))} />
      </div>
    </div>
  );
}
