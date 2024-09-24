import React, { Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "@pages/authentication/Login";
import { PrivateRoute } from "@hoc/PrivateRoute";
import Layout from "@pages/layout/Layout";
import NotFound from "@pages/notfound/NotFound";
import Product from "@pages/layout/product/Product";
import Dashboard from "@pages/layout/dashboard/Dashboard";
import UnSupported from "@pages/unsupported/UnSupported";
import UnAuthorized from "@pages/unauthorized/UnAuthorized";
import ProductCategory from "@pages/layout/product-category/ProductCategory";
import OrderDetail from "@pages/layout/order-details/OrderDetail";

function Router() {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          >
            <Route>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/product" element={<Product />} />
              <Route path="/category" element={<ProductCategory />} />
              <Route path="/order/order-details" element={<OrderDetail />} />
              <Route path="*" element={<UnSupported />} />
            </Route>
          </Route>
          <Route path="/unauthorized" element={<UnAuthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default Router;
