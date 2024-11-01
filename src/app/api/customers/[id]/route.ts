// app/api/upload/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

interface PhotoData {
  image: string;
  latitude: number;
  longitude: number;
  timestamp: string;
}

const uri = process.env.MONGODB_URI as string;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export async function POST(req: NextRequest) {
  const data: PhotoData = await req.json();

  try {
    const client = await clientPromise;
    const database = client.db('photo-map');
    const collection = database.collection<PhotoData>('photos');

    await collection.insertOne(data);

    return NextResponse.json({ message: 'Photo uploaded successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error inserting document:', error);
    return NextResponse.json({ message: 'Error uploading photo' }, { status: 500 });
  }
}

declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}

if (!global._mongoClientPromise) {
  client = new MongoClient(uri);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;