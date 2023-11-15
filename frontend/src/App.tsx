import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Auth, Home, Root } from "./pages/main";
import { Patient, Patients, Transactions } from "./pages/clinic";
import { ProtectedRoute } from "./routes";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                index: true,
                element: <Auth />,
            },
            {
                path: "/home",
                element: (
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/patients",
                element: (
                    <ProtectedRoute>
                        <Patients />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/patients/:customId",
                element: (
                    <ProtectedRoute>
                        <Patient />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/transactions",
                element: (
                    <ProtectedRoute>
                        <Transactions />
                    </ProtectedRoute>
                ),
            },
        ],
    },
]);

const App: React.FC<{}> = () => <RouterProvider router={router} />;

export default App;
