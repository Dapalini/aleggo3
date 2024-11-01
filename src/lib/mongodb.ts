import mongoose from 'mongoose';

console.log("Trying to connect from start.")

const MONGODB_URI = process.env.MONGODB_URI as string;

console.log(MONGODB_URI, "Trying to connect from start.")


if (!MONGODB_URI) {
  console.log("This is the mongo db")
  throw new Error('Please add your MongoDB URI to .env.local');
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache;
}

global.mongoose = global.mongoose || { conn: null, promise: null };

const cached = global.mongoose;

async function connectMongoDB(): Promise<typeof mongoose> {
  if (cached.conn) {
    console.log('Was already conntected to MongoDB')
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

      console.log('Connect to MongoDB')
      cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectMongoDB;