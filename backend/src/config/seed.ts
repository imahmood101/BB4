import { hash } from 'bcryptjs';
import { prisma } from '../lib/prisma.js';

export async function seedAdmin() {
  try {
    const adminEmail = 'imahmood@bsolpk.org';
    const adminPassword = 'Xerox007!';

    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: adminEmail },
    });

    if (!existingAdmin) {
      const hashedPassword = await hash(adminPassword, 10);

      await prisma.user.create({
        data: {
          email: adminEmail,
          password: hashedPassword,
          firstName: 'Irfan',
          lastName: 'Mahmood',
          role: 'admin',
          status: 'active',
        },
      });

      console.log('Admin user created successfully');
    } else {
      console.log('Admin user already exists');
    }
  } catch (error) {
    console.error('Error seeding admin user:', error);
  }
} 