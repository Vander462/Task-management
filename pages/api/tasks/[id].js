import prisma from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export default async function handler(req, res) {
  const { id } = req.query;

  let user;
  try {
    user = await verifyToken(req);
  } catch {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const task = await prisma.task.findUnique({ where: { id: String(id) } });
  if (!task || task.userId !== user.userId) {
    return res.status(403).json({ error: 'Access denied' });
  }

  if (req.method === 'PUT') {
    try {
      const { title, description, dueDate, status } = req.body;
      const updated = await prisma.task.update({
        where: { id: String(id) },
        data: {
          title,
          description,
          dueDate: dueDate ? new Date(dueDate) : null,
          ...(status && { status }),
        },
      });
      return res.status(200).json(updated);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to update task' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      await prisma.task.delete({ where: { id: String(id) } });
      return res.status(204).end();
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to delete task' });
    }
  }

  return res.status(405).end(); // Method not allowed
}
