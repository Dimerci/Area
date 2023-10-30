import { ErrorStatus } from "../../../middleware/errors/ErrorStatus";

export async function getRandomMeal() {
    try {
        const apiUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';

        console.log(apiUrl);
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new ErrorStatus("Error fetching random meal", response.status);
        }

        const mealData = await response.json();
        const meal = mealData.meals[0];

        console.log('Random Meal:', meal);
        return meal;
    } catch (err) {
        console.error(err);
        return { data: null, error: err };
    }
}
