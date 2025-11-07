
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { User } from '../models/User';
import { Task } from '../models/Task';
import { Project } from '../models/project';
import { Category } from '../models/category';
import { Comment } from '../models/comment';

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST!,
  port: Number(process.env.DB_PORT!),
  username: process.env.DB_USER!,
  password: process.env.DB_PASS!,
  database: process.env.DB_NAME!,
  synchronize: true,
  logging: false,
  entities: [User, Task, Project, Category, Comment],
});