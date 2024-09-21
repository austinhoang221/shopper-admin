import React, { Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "@pages/authentication/Login";
import { PrivateRoute } from "@hoc/PrivateRoute";
import Layout from "@pages/layout/Layout";

function Router() {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />} />
          {/* <Route
          path="/"
          element={
            <PrivateRoute>
              <Content />
            </PrivateRoute>
          }
        >
          <Route>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Route> */}
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default Router;
