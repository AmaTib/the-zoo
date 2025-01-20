import { createBrowserRouter } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { Layout } from "./pages/Layout";
import { PageNotFound } from "./pages/PageNotFound";
import { OneAnimal } from "./pages/OneAnimal";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <LandingPage />,
        },
        {
          path: "/animal/:animalId",
          element: <OneAnimal />,
        },
      ],
      errorElement: <PageNotFound />,
    },
  ],
  {
    basename: "/the-zoo",
  }
);
