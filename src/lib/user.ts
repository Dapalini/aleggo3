export {}

// // lib/user.ts
// import { ObjectId } from 'mongodb';
// import { connectToDatabase } from './mongodb';

// const DB_NAME = 'aleggo';
// const COLLECTION_NAME = 'users';

// export async function getUserById(id: string) {
//   const client = await connectToDatabase();
//   console.log("Hello")
//   const db = client.db(DB_NAME);
//   const users = db.collection(COLLECTION_NAME);
//   const user = await users.findOne({ _id: new ObjectId(id) });
//   return user;
// }

// export async function createUser(data: any) {
  // const { database }: any = await connectToDatabase()
  // const client = await connectToDatabase(process.env.MONGODB_URI);
  // const db = client.db(DB_NAME);
  // const users = db.collection(COLLECTION_NAME);
  // const result = await users.insertOne(data);
  // console.log(result);
  // return result;


// export async function updateUser(id: string, data: any) {
//   const client = await connectToDatabase(process.env.MONGODB_URI);
//   const db = client.db(DB_NAME);
//   const users = db.collection(COLLECTION_NAME);
//   const result = await users.updateOne(
//     { _id: new ObjectId(id) },
//     { $set: data }
//   );
//   return result.modifiedCount > 0;
// }

// export async function deleteUser(id: string) {
//   const client = await connectToDatabase(process.env.MONGODB_URI);
//   const db = client.db(DB_NAME);
//   const users = db.collection(COLLECTION_NAME);
//   const result = await users.deleteOne({ _id: new ObjectId(id) });
//   return result.deletedCount > 0;
// }

// export async function getAllUsers() {
//   const client = await connectToDatabase(process.env.MONGODB_URI);
//   const db = client.db(DB_NAME);
//   const users = db.collection(COLLECTION_NAME);
//   const allUsers = await users.find().toArray();
//   return allUsers;
// }
