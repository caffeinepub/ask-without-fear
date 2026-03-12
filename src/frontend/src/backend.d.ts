import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Doubt {
    message: string;
    timestamp: Time;
    category: string;
}
export type Time = bigint;
export interface backendInterface {
    deleteDoubt(doubtId: string): Promise<void>;
    getAllDoubts(): Promise<Array<Doubt>>;
    getDoubtsByCategory(category: string): Promise<Array<Doubt>>;
    submitDoubt(category: string, message: string): Promise<string>;
    updateDoubt(doubtId: string, newCategory: string, newMessage: string): Promise<void>;
}
