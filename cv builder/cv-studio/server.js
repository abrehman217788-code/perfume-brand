const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data', 'cvs.json');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Helper to read data
const readData = () => {
    if (!fs.existsSync(DATA_FILE)) {
        return [];
    }
    const data = fs.readFileSync(DATA_FILE);
    return JSON.parse(data);
};

// Helper to write data
const writeData = (data) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// API Endpoints
app.get('/api/cvs', (req, res) => {
    const cvs = readData();
    res.json(cvs);
});

app.get('/api/cvs/:id', (req, res) => {
    const cvs = readData();
    const cv = cvs.find(c => c.id === req.params.id);
    if (cv) {
        res.json(cv);
    } else {
        res.status(404).send('CV not found');
    }
});

app.post('/api/cvs', (req, res) => {
    const cvs = readData();
    const newCv = req.body;
    
    if (!newCv.id) {
        newCv.id = Date.now().toString();
    }
    
    const index = cvs.findIndex(c => c.id === newCv.id);
    if (index > -1) {
        cvs[index] = newCv;
    } else {
        cvs.push(newCv);
    }
    
    writeData(cvs);
    res.status(201).json(newCv);
});

app.delete('/api/cvs/:id', (req, res) => {
    let cvs = readData();
    cvs = cvs.filter(c => c.id !== req.params.id);
    writeData(cvs);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
