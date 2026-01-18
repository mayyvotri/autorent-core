require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
let dataconnect;

const CONNECT_DB = async () => {
  await client.connect();
  dataconnect = client.db("phupttde180725");
  console.log("getdata successful");
};

const GET_DB = () => {
  if (!dataconnect) throw new console.error("must connect DB first");

  return dataconnect;
};
module.exports = { CONNECT_DB, GET_DB };
