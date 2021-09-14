import mongoose, { Schema, model, ConnectOptions } from "mongoose";

export interface AliasedLinkType {
  alias: string;
  destination: string;
  name: string;
  order: number;
  public: boolean;
}

// @ts-ignore
let cached = global.mongoose as any;

if (!cached) {
  // @ts-ignore
  cached = global.mongoose = { conn: null, promise: null };
}

export async function mongoConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions;

    cached.promise = mongoose
      .connect(process.env.MONGO_URI!, opts)
      .then((mongoose) => {
        return mongoose;
      });
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
