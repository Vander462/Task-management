import { hash } from 'bcryptjs';
import prisma from '@/lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, username, email, password } = req.body;
  
  // Check for required fields and validate password length
  if (!name || !username || !email || !password || password.length < 6) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  // Hash the password
  const hashedPassword = await hash(password, 10);

  try {
    // Check if the user already exists by email or username
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: email.toLowerCase() },
          { username: username.toLowerCase() },
        ],
      },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'User with this email or username already exists' });
    }

    // Create the new user
    const user = await prisma.user.create({
      data: {
        name,
        username,
        email: email.toLowerCase(),
        password: hashedPassword,
      },
    });
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error, please try again later' });
  }
}
