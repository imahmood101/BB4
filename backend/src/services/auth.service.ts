import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { db } from '../index.js';
import { users, type NewUser } from '../models/user.js';

export class AuthService {
  static async createUser(userData: Omit<NewUser, 'id' | 'createdAt' | 'updatedAt'>): Promise<NewUser> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const [user] = await db.insert(users).values({
      ...userData,
      password: hashedPassword,
    }).returning();
    return user;
  }

  static async findUserByEmail(email: string) {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  static async validatePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  static async updateUserStatus(userId: number, status: 'active' | 'inactive' | 'pending') {
    const [user] = await db
      .update(users)
      .set({ status })
      .where(eq(users.id, userId))
      .returning();
    return user;
  }
} 