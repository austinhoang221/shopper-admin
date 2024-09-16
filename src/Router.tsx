import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "@pages/authentication/Login";
import { PrivateRoute } from "@hoc/PrivateRoute";
import Content from "@pages/content/Content";

function App() {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Content />
            </PrivateRoute>
          }
        >
          <Route>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
