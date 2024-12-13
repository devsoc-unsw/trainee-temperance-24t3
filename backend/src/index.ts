// src/index.ts
import express, { Request, Response } from 'express';
import { createClient } from '@supabase/supabase-js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
// Create an Express app
const app = express();
const port = 3000;
const supabaseUrl = process.env.SUPABASE_URL || '';
console.log(supabaseUrl);
const apiKey = process.env.SUPABASE_KEY || '';
console.log(apiKey);
const supabase = createClient(supabaseUrl, apiKey)

// Enable CORS for requests from http://localhost:5173
app.use(cors({
  origin: 'http://localhost:5173'
}));


// Middleware to parse JSON bodies
app.use(express.json());

// Sample post endpoint
app.post('/fetch', async (req: Request, res: Response) => {
  const { name, category } = req.body;

  const products = await fetchProducts(name as string, category as string[]);
  res.json(products);
});

async function fetchProducts(name?: string, category?: string[]) {
  // If no name or no category, return an empty list
  if (name === undefined && category === undefined) {
    console.error("did not enter anything");
    return [];
  }

  let query = supabase.from('products').select('*');

  if (name) {
    query = query.ilike('name', `%${name}%`); // Use ILIKE for case-insensitive partial match
  }
  if (category) {
    query = query.contains('category', category); // Checks if 'category' array contains the value
  }
  const { data, error } = await query;

  if (error) {
    console.error("Error fetching products based on query: ", error.message);
    return [];
  }

  return data;
};

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});