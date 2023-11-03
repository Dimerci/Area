import { ErrorStatus } from "../../../middleware/errors/ErrorStatus";

export async function getRandomMeal(input:string) {
    try {
        let apiUrl;
        if (input === "") {
            apiUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';
        } 
        else if (input.startsWith("filter:")) {
            const filterValue = input.split("filter:")[1].trim();  // Extract the value after "filter:"
            apiUrl = "https://www.themealdb.com/api/json/v1/1/filter.php?i=" + filterValue;
            console.log(apiUrl);
        } 
        else {
            apiUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + input;
        }

        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new ErrorStatus("Error fetching meal data", response.status);
        }
        const mealData = await response.json();
        console.log(mealData);
        const meal = mealData.meals[0];
        return meal;

    } catch (err) {
        console.error(err);
        return { data: null, error: err };
    }
}
