import { seedAdmin } from './config/seed.js';

async function main() {
  try {
    await seedAdmin();
    console.log('Seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  }
}

main(); 