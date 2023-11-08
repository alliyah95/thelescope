import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Auth, Root } from "./pages";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                index: true,
                element: <Auth />,
            },
        ],
    },
]);

const App: React.FC<{}> = () => <RouterProvider router={router} />;

export default App;
