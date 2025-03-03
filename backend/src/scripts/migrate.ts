import { createClient } from '@libsql/client';
import { readFileSync } from 'fs';
import { join } from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function runMigrations() {
  const client = createClient({
    url: process.env.DATABASE_URL!,
    authToken: process.env.DATABASE_AUTH_TOKEN,
  });

  try {
    // Read and execute the migration file
    const migrationPath = join(process.cwd(), 'migrations', '0000_create_users_table.sql');
    const migration = readFileSync(migrationPath, 'utf-8');

    // Split the migration into individual statements
    const statements = migration
      .split(';')
      .map(statement => statement.trim())
      .filter(statement => statement.length > 0);

    // Execute each statement
    for (const statement of statements) {
      console.log('Executing:', statement);
      await client.execute(statement);
    }

    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

runMigrations(); 