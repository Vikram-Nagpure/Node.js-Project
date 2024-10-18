const express = require('express');
const fs = require('fs');
const cors = require('cors'); 
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors()); 


const readDB = () => {
  const data = fs.readFileSync('db.json');
  return JSON.parse(data);
};

const writeDB = (data) => {
  fs.writeFileSync('db.json', JSON.stringify(data, null, 2));
};

// READ Data
app.get('/items', (req, res) => {
  const items = readDB();
  res.json(items);
});

// CREATE data
app.post('/items', (req, res) => {
  const items = readDB();
  const newItem = { id: Date.now(), ...req.body };
  items.push(newItem);
  writeDB(items);
  res.status(201).json(newItem);
});

//UPDATE Data
app.put('/items/:id', (req, res) => {
  const items = readDB();
  const index = items.findIndex((i) => i.id === parseInt(req.params.id));
  if (index !== -1) {
    items[index] = { id: parseInt(req.params.id), ...req.body };
    writeDB(items);
    res.json(items[index]);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

// DELETE Data
app.delete('/items/:id', (req, res) => {
  const items = readDB();
  const filteredItems = items.filter((i) => i.id !== parseInt(req.params.id));
  writeDB(filteredItems);
  res.status(204).send();
});

// server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
