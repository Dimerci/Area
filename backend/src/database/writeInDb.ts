const { MongoClient, Db } = require('mongodb');
// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "mongodb+srv://ar3aepitech:aaaaaaaaaaaaaaaaaa@area.l8hemky.mongodb.net/";
const client = new MongoClient(uri);
async function run() {
  try {
    await client.connect();
    await listDb(client);
    await createListing(client, {
      name: "Léo",
      email: "leo@gmail.com",
      action: "meteo",
      reaction: "discord",
    });
    await readListingByName(client, "Léo");
    await updateListingByName(client, "Léo", { name: "Léonard" });
    await readListingByName(client, "Léonard");
    await createListing(client, {
      name: "Léo",
      email: "leo@gmail.com",
      action: "meteo",
      reaction: "discord",
    });
  } catch (e) {
    console.error(e);
    console.log("error");
  } finally {
  }
}

//run().catch(console.error);

async function createListing(client: typeof MongoClient, newListing: any) {
  const result = await client
    .db("user_info")
    .collection("user_info")
    .insertOne(newListing);
  console.log(`New listing created with the following id: ${result.insertedId}`);
}

async function readListingByName(client: typeof MongoClient, nameOfListing: string) {
  const result = await client
    .db("user_info")
    .collection("user_info")
    .findOne({ name: nameOfListing });
  if (result) {
    console.log(`Found a listing in the collection with the name '${nameOfListing}':`);
    console.log(result);
  } else {
    console.log(`No listings found with the name '${nameOfListing}'`);
  }
}

async function updateListingByName(client: typeof MongoClient, nameOfListing: string, updatedListing: any) {
  const result = await client
    .db("user_info")
    .collection("user_info")
    .updateOne({ name: nameOfListing }, { $set: updatedListing });

  console.log(`${result.matchedCount} document(s) matched the query criteria.`);
  console.log(`${result.modifiedCount} document(s) was/were updated.`);
}

async function deleteListingByName(client: typeof MongoClient, nameOfListing: string) {
  const result = await client
    .db("user_info")
    .collection("user_info")
    .deleteOne({ name: nameOfListing });

  console.log(`${result.deletedCount} document(s) was/were deleted.`);
}

async function listDb(client: typeof MongoClient) {
  const databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach((db: { name: string }) => console.log(` - ${db.name}`));
}
export default run;