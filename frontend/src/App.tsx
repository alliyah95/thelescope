import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Auth, Home, Root } from "./pages/main";
import { Patient, Patients, Transactions } from "./pages/clinic";
import { ClinicInfo } from "./pages/admin";
import { ProtectedRoute, AdminRoute } from "./routes";

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
            {
                path: "clinic-info",
                element: (
                    <AdminRoute>
                        <ClinicInfo />
                    </AdminRoute>
                ),
            },
        ],
    },
]);

const App: React.FC<{}> = () => <RouterProvider router={router} />;

export default App;
