import * as SQLite from 'expo-sqlite';

export type Customer = { id: number; name: string };

let opening: Promise<SQLite.SQLiteDatabase> | undefined;

async function initialize(): Promise<SQLite.SQLiteDatabase> {
  const db = await SQLite.openDatabaseAsync('little-lemon-customers.db');
  try {
    await db.execAsync('PRAGMA foreign_keys = ON;');
    const row = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');
    const version = row?.user_version ?? 0;
    if (version > 1) throw new Error('База має новішу невідому версію.');
    if (version === 0) {
      // Таблиця й номер версії створюються в одній транзакції.
      await db.withTransactionAsync(async () => {
        await db.execAsync(`
          CREATE TABLE customers (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL CHECK(length(trim(name)) BETWEEN 1 AND 80)
          );
          PRAGMA user_version = 1;
        `);
      });
    }
    return db;
  } catch (error: unknown) {
    await db.closeAsync();
    throw error;
  }
}

async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (!opening) {
    opening = initialize().catch((error: unknown) => {
      opening = undefined;
      throw error;
    });
  }
  return opening;
}

function cleanName(input: string): string {
  const name = input.trim();
  if (name.length < 1 || name.length > 80) {
    throw new Error("Введіть ім'я від 1 до 80 символів.");
  }
  return name;
}

export async function listCustomers(): Promise<Customer[]> {
  const db = await getDatabase();
  return db.getAllAsync<Customer>('SELECT id, name FROM customers ORDER BY id DESC');
}

export async function addCustomer(input: string): Promise<void> {
  const name = cleanName(input);
  const db = await getDatabase();
  await db.runAsync('INSERT INTO customers (name) VALUES (?)', name);
}

export async function renameCustomer(id: number, input: string): Promise<void> {
  const name = cleanName(input);
  const db = await getDatabase();
  const result = await db.runAsync('UPDATE customers SET name = ? WHERE id = ?', name, id);
  if (result.changes !== 1) throw new Error('Клієнта вже немає. Оновіть список.');
}

export async function deleteCustomer(id: number): Promise<void> {
  const db = await getDatabase();
  const result = await db.runAsync('DELETE FROM customers WHERE id = ?', id);
  if (result.changes !== 1) throw new Error('Клієнта вже немає. Оновіть список.');
}
