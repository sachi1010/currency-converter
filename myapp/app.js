import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import indexRouter from './routes/index.js'; 

dotenv.config();

const app = express();

// For __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(cors());
app.use(express.json());

// Static files (optional, if you have front-end files)
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter); 
export default app;
