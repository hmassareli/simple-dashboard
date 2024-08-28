import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CreateProduct } from "./components/CreateProduct/CreateProduct.tsx";
import Dashboard from "./components/Dashboard/index.tsx";
import { LoginForm } from "./components/Login/Login.tsx";
import Products from "./components/Products/index.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import ThemeWrapper from "./components/ThemeWrapper/ThemeWrapper.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import "./index.css";
import { EditProduct } from "./components/EditProduct/EditProduct.tsx";
import Sales from "./components/Sales/Sales.tsx";
import { EditSales } from "./components/EditSales/EditSales.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <ThemeWrapper>
          <Dashboard />
        </ThemeWrapper>
      </ProtectedRoute>
    ),
  },
  {
    path: "/products/:productId",
    element: (
      <ProtectedRoute>
        <h1>Opa </h1>
      </ProtectedRoute>
    ),
  },
  {
    path: "/products/create",
    element: (
      <ProtectedRoute>
        <ThemeWrapper>
          <CreateProduct />
        </ThemeWrapper>
      </ProtectedRoute>
    ),
  }, 
  {
    path: "/product/edit/:id",
    element: (
      <ProtectedRoute>
        <ThemeWrapper>
          <EditProduct />
        </ThemeWrapper>
      </ProtectedRoute>
    ),
  },
  {
    path: "/products",
    element: (
      <ProtectedRoute>
        <ThemeWrapper>
          <Products />
        </ThemeWrapper>
      </ProtectedRoute>
    ),
  },
  {
    path: "/sales",
    element: (
      <ProtectedRoute>
        <ThemeWrapper>
          <Sales />
        </ThemeWrapper>
      </ProtectedRoute>
    ),
  },
  {
    path: "/sales/edit/:id",
    element: (
      <ProtectedRoute>
        <ThemeWrapper>
          <EditSales />
        </ThemeWrapper>
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
