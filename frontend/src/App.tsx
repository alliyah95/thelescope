import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Auth, Home, Root, ContractDeploymentPage } from "./pages";
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
                    <ProtectedRoute>
                        <AdminRoute>
                            <ContractDeploymentPage />
                        </AdminRoute>
                    </ProtectedRoute>
                ),
            },
        ],
    },
]);

const App: React.FC<{}> = () => <RouterProvider router={router} />;

export default App;
