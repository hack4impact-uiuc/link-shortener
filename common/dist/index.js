"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoConnect = exports.AliasedLink = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const AliasedLinkSchema = new mongoose_1.Schema({
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
    public: {
        type: Boolean,
        required: true,
    },
});
exports.AliasedLink = (0, mongoose_1.model)("Link", AliasedLinkSchema);
let cached = global.mongoose;
if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}
async function mongoConnect() {
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        const opts = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };
        cached.promise = mongoose_1.default
            .connect(process.env.MONGO_URI, opts)
            .then((mongoose) => {
            return mongoose;
        });
        cached.conn = await cached.promise;
        return cached.conn;
    }
}
exports.mongoConnect = mongoConnect;
