const express = require('express');
const app = express();
const path = require('path');

this.winners = []

app.use(express.json());
app.use(express.static(path.join(__dirname, '.')));

app.get('/', (req, res) => {
res.send('Hello World.')
})

app.get('/games/tebakheroml', (req, res) => {
res.sendFile(path.join(__dirname,'games/tebakhero/tebak-heroml.html'));
});

app.get('/games/susunkata', (req, res) => {
res.sendFile(path.join(__dirname,'games/susunkata/susun-kata.html'));
});

app.get('/games/tebakgambar', (req, res) => {
res.sendFile(path.join(__dirname,'games/tebakgambar/tebak-gambar.html'));
});


app.post('/api/winners', (req, res) => {
const { phone, game, timestamp } = req.body;
if (!phone || !game || !timestamp) return res.status(400).json({ error: 'Invalid data' });
this.winners.push({ phone, game, timestamp });
res.json({ success: true, message: 'Winner recorded successfully' });
});

app.get('/api/winners', (req, res) => {
const winners = [...this.winners];
this.winners = []; 
res.json(winners)
});


app.listen(process.env.PORT, () => console.log('Server started on port 3000'));
