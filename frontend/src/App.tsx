import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ContractDeploymentPage } from "./pages/admin";
import { Auth, Home, Root } from "./pages/main";
import { AdminRoute, ProtectedRoute } from "./routes";

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
                path: "deploy-contract",
                element: (
                    <AdminRoute>
                        <ContractDeploymentPage />
                    </AdminRoute>
                ),
            },
        ],
    },
]);

const App: React.FC<{}> = () => <RouterProvider router={router} />;

export default App;
