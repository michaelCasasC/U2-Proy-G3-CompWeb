import express from 'express';
import cors from 'cors';
import db from './config/db.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post('/api/results', async (req, res) => {
  const { topic, inputs, result } = req.body;
  try {
    const [rows] = await db.query(
      'INSERT INTO results (topic, inputs, result) VALUES (?, ?, ?)',
      [topic, JSON.stringify(inputs), result]
    );
    res.status(201).json({ id: rows.insertId, message: 'Result saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error saving result' });
  }
});

app.get('/api/results', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM results ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching results' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
