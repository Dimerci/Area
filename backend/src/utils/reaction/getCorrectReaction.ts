import { Reaction } from "./reactionInterface";
import { postRequestToDiscord } from "./postRequestToDiscord";

export function getCorrectReaction(reaction: Reaction): boolean {
    if (reaction.type === "Discord") {
        const requiredFields = "message"
        if (!(requiredFields in reaction)) {
            return false;
        }

        postRequestToDiscord(reaction.message);
    }
    return true;
}