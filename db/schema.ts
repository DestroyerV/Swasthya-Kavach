import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  age: integer('age'),
  gender: text('gender'), // 'male', 'female', 'other'
  pin: text('pin'), // Simple 4-digit pin for local "auth"
  createdAt: text('created_at').default(new Date().toISOString()),
});

export const checkups = sqliteTable('checkups', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').references(() => users.id),
  type: text('type').notNull(), // 'anemia', 'skin', 'respiratory', 'dehydration'
  result: text('result'), // JSON string of the analysis result
  imageUri: text('image_uri'),
  audioUri: text('audio_uri'),
  createdAt: text('created_at').default(new Date().toISOString()),
});
