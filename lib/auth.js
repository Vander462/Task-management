import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET;

export function signToken(userId) {
  return jwt.sign({ userId }, SECRET, { expiresIn: '1d' });
}

export function verifyToken(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader) throw new Error('No token');
  const token = authHeader.split(' ')[1];
  return jwt.verify(token, process.env.JWT_SECRET);
}
