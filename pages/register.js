import { useState } from 'react';
import { useRouter } from 'next/router';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleRegister(e) {
    e.preventDefault();
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      router.push('/login');
    } else {
      const data = await res.json();
      setError(data.error);
    }
  }

  return (
    <form onSubmit={handleRegister}>
      <h1>Register</h1>
      <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Username" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} />
      <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Password" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
      <button type="submit">Register</button>
      {error && <p>{error}</p>}
    </form>
  );
}
