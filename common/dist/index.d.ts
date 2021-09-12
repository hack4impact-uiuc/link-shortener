import mongoose from "mongoose";
export interface AliasedLinkType {
    alias: string;
    destination: string;
    name: string;
    public: boolean;
}
export declare function mongoConnect(): Promise<any>;
export declare const AliasedLink: mongoose.Model<AliasedLinkType, {}, {}>;
