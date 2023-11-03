export type Reaction = {
    type: "Discord";
    message: string
} | {
    type: "Chuck Norris"
    message: string;
} | {
    type: "meal"
    message: string;
} | {
    type: "clock"
    message: string;
}