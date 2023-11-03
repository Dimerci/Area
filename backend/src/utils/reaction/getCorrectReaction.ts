import { Reaction } from "./reactionInterface";
import { postRequestToDiscord } from "./postRequestToDiscord";
import { getNorrisJoke } from "../../routes/chuckNorris/postNorris/getNorris";
import { getMealFromDB } from "../../routes/mealDb/getMealDb/getMealDb";
import { postClockFromAPI } from "../../routes/clock/postClock/postClock";
import { error } from "console";

export async function getCorrectReaction(reaction: Reaction) {
    if (reaction.type === "Discord") {
        const requiredFields = "message"
        if (!(requiredFields in reaction)) {
        }

        postRequestToDiscord(reaction.message);
    }
    if (reaction.type === "Chuck Norris") {
        const requiredFields = "message"
        if (!(requiredFields in reaction)) {
        }
        const joke = await getNorrisJoke(reaction.message);
        postRequestToDiscord(joke);
    }
    if (reaction.type === "Meal") {
        const requiredFields = "message"
        if (!(requiredFields in reaction)){
        }
        const meal = await getMealFromDB(reaction.message);
        //postRequestToDiscord(meal);
    }
    if (reaction.type === "Clock") {
        const requiredFields = "message"
        if (!(requiredFields in reaction)){
        }
        const clock = await postClockFromAPI(reaction.message);
        postRequestToDiscord(clock);
    }
}