import { compare } from 'bcryptjs';
import prisma from '@/lib/db';
import { signToken } from '@/lib/auth';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials (user not found)' });
  }

  const isMatch = await compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ error: 'Invalid credentials (password mismatch)' });
  }

  const token = signToken(user.id);
  return res.status(200).json({ token });
}
