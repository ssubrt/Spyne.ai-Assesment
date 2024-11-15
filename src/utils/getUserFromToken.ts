// src/utils/getUserFromToken.ts
import jwt from 'jsonwebtoken';

export function getUserFromToken(token: string | undefined) {
  if (!token) return null;
  
  try {
    if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET is not defined');
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as any;
    return { id: (decoded as { id: string }).id };
    
  } catch (error) {
    return null;
  }
}
