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
import Customer from "@pages/layout/partner/customer/Customer";
import Carrier from "@pages/layout/partner/carrier/Carrier";
import Supplier from "@pages/layout/partner/supplier/Supplier";
import TransactionOrder from "@pages/layout/transactions/transaction-order/transaction-order-drawer/TransactionOrder";
import ReportSale from "@pages/layout/report/sale/report-sale";
import Tags from "@pages/layout/setting/tags/tags";
import Invoice from "@pages/layout/transactions/invoice/Invoice";
import Return from "@pages/layout/transactions/return/Return";
import Shipping from "@pages/layout/transactions/shipping/Shipping";
import PurchaseReceipt from "@pages/layout/transactions/purchase-receipt/PurchaseReceipt";

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
              <Route path="/product" element={<Product />}>
                <Route path=":config/:id?" />
                <Route />
              </Route>

              <Route path="/category" element={<ProductCategory />}>
                <Route path=":config/:id?" />
              </Route>
              <Route path="/partner/partner-customer" element={<Customer />} />
              <Route path="/partner/partner-suppliers" element={<Supplier />} />
              <Route path="/partner/partner-carrier" element={<Carrier />} />
              <Route path="/setting/tags" element={<Tags />} />
              <Route
                path="/transaction/transaction-order"
                element={<OrderDetail />}
              />
              <Route
                path="/transaction/transaction-invoice"
                element={<Invoice />}
              >
                <Route path=":config/:id?" />
                <Route />
              </Route>
              <Route
                path="/transaction/transaction-return"
                element={<Return />}
              />
              <Route
                path="/transaction/transaction-shipping"
                element={<Shipping />}
              />
              <Route
                path="/transaction/purchase-receipt"
                element={<PurchaseReceipt />}
              />
              <Route path="/report/report-sale" element={<ReportSale />} />
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
