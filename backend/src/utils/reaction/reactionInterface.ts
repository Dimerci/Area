export type Reaction = {
    type: "Discord";
    message: string
} | {
    type: "Chuck Norris"
    message: string;
} | {
    type: "Meal"
    message: string;
} | {
    type: "Clock"
    message: string;
}