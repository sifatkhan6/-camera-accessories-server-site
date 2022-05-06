const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express());

// user: cameraAccessoriesUser
// pass: 8ikF2fabcLnFx6Q9

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nwui0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    console.log('DB Connected');
    // perform actions on the collection object
    client.close();
});


app.get('/', (req, res) => {
    res.send('Server running for Camera Accessories');
})

app.listen(port, () => {
    console.log('Listening to port', port);
})