const { MongoClient } = require('mongodb');
import { Client } from './connectToDb';

export async function createListing(Client: typeof MongoClient, newListing: any) {
  const result = await Client
    .db("user_info")
    .collection("user_info")
    .insertOne(newListing);
  console.log(`New listing created with the following id: ${result.insertedId}`);
}

export async function readListingByName(Client: typeof MongoClient, clientId: string): Promise<any> {
  const result = await Client
    .db("user_info")
    .collection("user_info")
    .findOne({ clientId: clientId });
  if (result) {
    console.log(`Found a listing in the collection with the name '${clientId}':`);
    return result;
  } else {
    console.log(`No listings found with the name '${clientId}'`);
    return null;
  }
}

export async function updateListingByName(Client: typeof MongoClient, nameOfListing: string, updatedListing: any) {
  const result = await Client
    .db("user_info")
    .collection("user_info")
    .updateOne({ name: nameOfListing }, { $set: updatedListing });

  console.log(`${result.matchedCount} document(s) matched the query criteria.`);
  console.log(`${result.modifiedCount} document(s) was/were updated.`);
}

export async function deleteListingByName(Client: typeof MongoClient, nameOfListing: string) {
  const result = await Client
    .db("user_info")
    .collection("user_info")
    .deleteOne({ name: nameOfListing });

  console.log(`${result.deletedCount} document(s) was/were deleted.`);
}

export async function listDb(Client: typeof MongoClient) {
  const databasesList = await Client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach((db: { name: string }) => console.log(` - ${db.name}`));
}

export async function readListingByClientId(Client: typeof MongoClient, filter: { clientId: number }): Promise<any> {
    const result = await Client
      .db("user_info")
      .collection("user_info")
      .findOne(filter);

    if (result) {
      console.log(`Found a listing in the collection with the clientId '${filter.clientId}':`);
      return result;
    } else {
      console.log(`No listings found with the clientId '${filter.clientId}'`);
      return null;
    }
}

export async function addActionToDocument(Client: typeof MongoClient, filter: { clientId: string }, newAction: any) {
  const update = {
    $push: {
      data: newAction
    }
  };

  const result = await Client
    .db("user_info")
    .collection("user_info")
    .updateOne(filter, update);

  if (result.modifiedCount > 0) {
    console.log(`New action added to the document with clientId '${filter.clientId}'`);
  } else {
    console.log(`No document found with clientId '${filter.clientId}'`);
  }
}