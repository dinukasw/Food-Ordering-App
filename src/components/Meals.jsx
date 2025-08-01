import { useEffect, useState } from "react";
import MealItem from "./MealItem";

const Meals = () => {
    const [loadedMeals, setLoadedMeals] = useState([]);

    useEffect(() => {
        async function fetchMeal() {
            const response = await fetch("http://localhost:3000/meals");

            if (!response.ok) {
                //......
            }

            const meals = await response.json();
            setLoadedMeals(meals);
        }

        fetchMeal();
    }, []);

    return (
        <ul id="meals">
            {loadedMeals.map((meals) => (
                <MealItem key={meals.id} meal={meals} />
            ))}
        </ul>
    );
};

export default Meals;
