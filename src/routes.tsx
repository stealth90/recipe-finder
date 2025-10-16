import { createBrowserRouter } from 'react-router';
import Home from './pages/Home';
import RecipeList from './pages/RecipeList';
import Recipe from './pages/Recipe';
import MainLayout from './layouts/MainLayout';

const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    children: [
      { index: true, Component: Home },
      {
        path: 'recipes',
        children: [
          { index: true, Component: RecipeList },
          {
            path: ':id',
            Component: Recipe,
          },
        ],
      },
    ],
  },
]);

export default router;
