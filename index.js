const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
const res = require('express/lib/response');
const port = process.env.PORT || 5000;
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nwui0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const inventoryCollection = client.db('cameraAccessoriesUser').collection('inventory');

        app.get('/inventory', async (req, res) => {
            const query = {};
            const cursor = inventoryCollection.find(query);
            const inventory = await cursor.toArray();
            res.send(inventory);
        });

        app.get('/inventory/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const inventory = await inventoryCollection.findOne(query);
            res.send(inventory);
        })

        app.post('/inventory', async (req, res) => {
            const newItem = req.body;
            const result = await inventoryCollection.insertOne(newItem);
            res.send(result);
        });

        // quantity decreasing
        app.put('/inventory/:id', async (req, res) => {
            const id = req.params.id;
            const updateQuantity = req.body;
            const query = { _id: ObjectId(id) };
            const options = {upsert: true};
            const updateDatabase = {
                $set: {
                    quantity: updateQuantity.quantity
                }
            }
            const result = await inventoryCollection.updateOne(query, updateDatabase, options);
            res.send(result);
        });

        app.delete('/inventory/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await inventoryCollection.deleteOne(query);
            res.send(result);
        });

        // find myItem api 
        app.get('/myitem', async (req, res) => {
            const email = req.query?.email;
            const query = { email: email };
            const cursor = inventoryCollection.find(query);
            const myitems = await cursor.toArray();
            res.send(myitems);
        });

        app.delete('/myitem/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await inventoryCollection.deleteOne(query);
            res.send(result);
        });
    }
    finally {

    }
}

run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Server running for Camera Accessories');
})

app.listen(port, () => {
    console.log('Listening to port', port);
})