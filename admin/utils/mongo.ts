/**
 * Helpers related to MongoDB
 */

import mongoose, { Schema, model, ConnectOptions } from "mongoose";
import { AliasedLinkType } from ".";

// @ts-ignore
let cached = global.mongoose as any;

if (!cached) {
  // @ts-ignore
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Initializes a Mongoose connection if it has not done so yet.
 * Caches the connected instance to speed up subsequent calls.
 */
export async function mongoConnect(): Promise<any> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions;

    cached.promise = mongoose.connect(process.env.MONGO_URI!, opts);
    cached.conn = await cached.promise;
    return cached.conn;
  }
}

const AliasedLinkSchema = new Schema<AliasedLinkType>({
  alias: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  hits: {
    type: Number,
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
  public: {
    type: Boolean,
    required: true,
  },
});

export const AliasedLink = model<AliasedLinkType>("Link", AliasedLinkSchema);
