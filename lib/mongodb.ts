import mongoose, { type Mongoose } from "mongoose";

/**
 * Cached connection state.
 * Stored on global to survive Next.js hot reloads in development.
 */
interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local",
  );
}

/**
 * Global cache for the Mongoose connection and connect promise.
 * In development this avoids creating a new connection on every hot reload.
 */
const cached: MongooseCache = global.mongoose ?? { conn: null, promise: null };

if (process.env.NODE_ENV !== "production") {
  global.mongoose = cached;
}

/**
 * Connects to MongoDB using Mongoose and returns the same connection when
 * called again. Connection is cached to prevent multiple connections in
 * serverless and development.
 *
 * @returns The Mongoose instance (connected)
 */
export async function connectDB(): Promise<Mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
    };
    cached.promise = mongoose.connect(MONGODB_URI!, opts);
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
