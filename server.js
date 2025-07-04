const express = require('express');
const app = express();
const PORT = 8080;

// Middleware to parse JSON requests
app.use(express.json());

// In-memory storage for quotes (replace with a database in production)
let quotes = [];

// POST endpoint to add a quote
app.post('/quotes', (req, res) => {
    const { quote } = req.body; // Extract quote from request body

    if (!quote) {
        return res.status(400).json({ error: 'Quote is required' });
    }

    quotes.push(quote); // Store the quote
    res.status(201).json({ message: 'Quote added successfully', quote });
});

// GET endpoint to retrieve all quotes
app.get('/quotes', (req, res) => {
    res.status(200).json({ quotes });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});