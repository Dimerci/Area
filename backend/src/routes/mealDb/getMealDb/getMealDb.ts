import { Request, Response, NextFunction } from "express";
import { getRandomMeal } from "./getRandomMeal";

export async function getMeal(req: Request, res: Response, next: NextFunction) {
    try {
        const mealData = await getRandomMeal();
        
        // Notice that we no longer access meals[0] since the response doesn't seem to be an array
        const instructions = mealData.strInstructions;
        const ingredients = extractIngredients(mealData);

        res.json({ instructions, ingredients });
    } catch (err) {
        next(err);
    }
}

function extractIngredients(meal: any) {
    const ingredients: string[] = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];

        if (ingredient && measure && ingredient.trim() !== "" && measure.trim() !== "") {
            ingredients.push(`${ingredient.trim()} (${measure.trim()})`);
        }
    }
    return ingredients;
}
