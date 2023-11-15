import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Auth, Home, Root } from "./pages/main";
import { Patient, Patients } from "./pages/clinic";
import { ClinicInfo, Transactions } from "./pages/admin";
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
                    <AdminRoute>
                        <Transactions />
                    </AdminRoute>
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
