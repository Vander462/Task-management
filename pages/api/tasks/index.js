import prisma from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export default async function handler(req, res) {
  let user;
  try {
    user = verifyToken(req);
  } catch {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    const tasks = await prisma.task.findMany({ where: { userId: user.userId } });
    res.status(200).json(tasks);
  } else if (req.method === 'POST') {
    const { title, description, dueDate } = req.body;
    const task = await prisma.task.create({
      data: { title, description, dueDate: new Date(dueDate), userId: user.userId },
    });
    res.status(201).json(task);
  } else {
    res.status(405).end();
  }
}
