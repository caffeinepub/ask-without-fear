import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface Doubt {
    id: string;
    message: string;
    timestamp: Time;
    category: string;
    answer: Option<string>;
    answeredBy: Option<string>;
    answeredAt: Option<Time>;
}
export interface backendInterface {
    deleteDoubt(doubtId: string): Promise<void>;
    getAllDoubts(): Promise<Array<Doubt>>;
    getUnansweredDoubts(): Promise<Array<Doubt>>;
    getAnsweredDoubts(): Promise<Array<Doubt>>;
    submitDoubt(category: string, message: string): Promise<string>;
    answerDoubt(doubtId: string, teacherName: string, answer: string): Promise<void>;
}
