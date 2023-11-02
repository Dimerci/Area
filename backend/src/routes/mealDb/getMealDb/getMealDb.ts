import { Request, Response, NextFunction } from "express";
import { getRandomMeal } from "./getRandomMeal";
import { postRequestToDiscord } from "../../../utils/reaction/postRequestToDiscord";

export async function getMeal(req: Request, res: Response, next: NextFunction) {
    try {
        const mealData = await getRandomMeal();
        
        // Notice that we no longer access meals[0] since the response doesn't seem to be an array
        const instructions = "Recette:\n" + mealData.strInstructions;
        const ingredients = "Ingrédients:\n" + extractIngredients(mealData);
        const combinedMessage = instructions + "\n\n" + ingredients;

        postRequestToDiscord(combinedMessage);
        res.json({ combinedMessage });
    } catch (err) {
        next(err);
    }
}

function extractIngredients(meal: any): string {
    const ingredients: string[] = [];
    for (let i = 1; i <= 30; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];

        if (ingredient && measure && ingredient.trim() !== "" && measure.trim() !== "") {
            ingredients.push(`${ingredient.trim()} (${measure.trim()})`);
        }
    }
    return ingredients.join('\n');
}
