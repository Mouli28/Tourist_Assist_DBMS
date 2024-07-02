const express = require('express');
const app = express();
const db = require('./db');
const routeFunctions = require('./routeFunctions');
const bodyParser = require('body-parser'); // Require body-parser for parsing POST data

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/findRoute', async (req, res) => {
    const { start, end } = req.body;
    try {
        const route = await routeFunctions.findRoute(start, end);
        res.json({ route });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error finding route' });
    }
});
// Example endpoint to fetch coordinates
app.get('/getCoordinates', async (req, res) => {
    try {
        const query = 'SELECT latitude, longitude FROM roads'; // Adjust query based on your table structure
        const { rows } = await db.query(query);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Example endpoint to add coordinates
app.post('/addCoordinates', async (req, res) => {
    try {
        const { latitude, longitude } = req.body;
        const query = 'INSERT INTO roads (latitude, longitude) VALUES ($1, $2)';
        await db.query(query, [latitude, longitude]);
        res.status(200).send('Coordinates added to roads table');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Other middleware and server setup...

const PORT = 5500;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});