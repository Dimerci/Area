export type Reaction = {
    type: "Discord";
    message: string
} | {
    type: "Chuck Norris"
    message: string;
} | {
    type: "mealDB"
    message: string;
} | {
    type: "clock"
    message: string;
}