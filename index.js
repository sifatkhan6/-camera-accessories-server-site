const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express());

app.get('/', (req, res) => {
    res.send('Server running for Camera Accessories');
})

app.listen(port, () => {
    console.log('Listening to port', port);
})