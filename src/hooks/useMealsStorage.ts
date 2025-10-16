import { useState } from 'react';
import type { Meal } from '../types/TheMealDB';

const useMealsStorage = () => {
  const STORAGE_KEY = 'storedMeals';
  const [storedMeals, setStoredMeals] = useState<Meal[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const getStoredMealById = (id: string): Meal | null => {
    try {
      if (!storedMeals) return null;
      return storedMeals.find((meal) => meal.idMeal === id) || null;
    } catch (e) {
      console.error('Error reading from localStorage', e);
      return null;
    }
  };

  const saveMealToStorage = (meal: Meal) => {
    const mealExist = storedMeals.some((storedMeal) => storedMeal.idMeal === meal.idMeal);
    if (mealExist) return;
    const updatedMeals = [...storedMeals, meal];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMeals));
      setStoredMeals(updatedMeals);
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  };

  const onDeleteMeal = (id: string) => {
    const updatedMeals = storedMeals.filter((storedMeal) => storedMeal.idMeal !== id);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMeals));
      setStoredMeals(updatedMeals);
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  };

  return { storedMeals, getStoredMealById, onDeleteMeal, saveMealToStorage };
};

export default useMealsStorage;
