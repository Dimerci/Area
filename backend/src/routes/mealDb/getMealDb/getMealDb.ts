import { Request, Response, NextFunction } from "express";
import { getRandomMeal } from "./getRandomMeal";
import { postRequestToDiscord } from "../../../utils/reaction/postRequestToDiscord";

export async function getMealFromDB(category:string) {
    try {
        if (category != "") {
            const mealData = await getRandomMeal(category)
            if (category.startsWith("filter:")) {
                const mealNames = "Meals name:\n" + extractMealNames(mealData);
                console.log(mealNames)
                return mealNames;
            } else {
                const mealName = extractMealName(mealData) + "\n";
                const instructions = "Recette:\n" + mealData.strInstructions;
                const ingredients = "Ingrédients:\n" + extractIngredients(mealData);
                const combinedMessage = mealName + instructions + "\n\n" + ingredients;
                console.log(combinedMessage)
                return combinedMessage;
            }
        } else {
            const mealData = await getRandomMeal("");
            const instructions = "Recette:\n" + mealData.strInstructions;
            const ingredients = "Ingrédients:\n" + extractIngredients(mealData);
            const combinedMessage = instructions + "\n\n" + ingredients;
            return combinedMessage;
        }
    } catch (err) {
        throw (err);
    }
}

export async function getMeal(req: Request, res: Response, next: NextFunction) {
    try {
        const { category } = req.body as { category: string };
        const mealData = await getRandomMeal(category);

        postRequestToDiscord(mealData);
    } catch (err) {
        next(err);
    }
}

function extractMealName(mealData: any): string {
    if (mealData.strMeal) {
        return "Name: " + `${mealData.strMeal}`;
    }
    return "";
}

function extractMealNames(data: any): string {
    if (!data.meals) {
        return "";
    }

    // Map over the meals array to extract the strMeal values and then join them using newline
    return data.meals.map((meal: any) => meal.strMeal).join('\n');
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
