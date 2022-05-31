const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const ObjectId = require("mongodb").ObjectId;
// username: hospital
// password: iAEs1egG0t8iood5

app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://hospital:iAEs1egG0t8iood5@cluster0.ilyp9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const doctorCollection = client.db("hospital").collection("doctor");
    const newsCollection = client.db("hospital").collection("latestNews");
    const provideCollection = client.db("hospital").collection("provide");

    // doctor data create api
    app.get("/doctor", async (req, res) => {
      const query = {};
      const cursor = doctorCollection.find(query);
      const doctor = await cursor.toArray();
      res.send(doctor);
    });

    // latest news data get api
    app.get("/news", async (req, res) => {
      const query = {};
      const cursor = newsCollection.find(query);
      const doctor = await cursor.toArray();
      res.send(doctor);
    });
    // provide data get  api
    app.get("/provide", async (req, res) => {
      const query = {};
      const cursor = provideCollection.find(query);
      const doctor = await cursor.toArray();
      res.send(doctor);
    });

    // create api
    // POST mathod : add a new services
    app.post("/doctor", async (req, res) => {
      const addService = req.body;
      console.log("adding new user", addService);
      const result = await doctorCollection.insertOne(addService);
      res.send(result);
    });

    // get data spesific email address

    app.get("/doctorprofile", async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const cursor = doctorCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
      console.log(result);
    });
  } finally {
  }
}

run().catch(console.dir());

app.get("/", (req, res) => {
  res.send("Running Hospital Server");
});

// db users
app.listen(port, () => {
  console.log("Hospital server is Running");
});
