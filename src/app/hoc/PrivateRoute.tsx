import { Context } from "@utils/context";
import { Navigate, useLocation } from "react-router-dom";

export const PrivateRoute = (props: {
  children: React.ReactNode;
}): JSX.Element => {
  const { children } = props;

  const isLoggedIn = !!Context.user;
  const location = useLocation();

  return isLoggedIn ? (
    <>{children}</>
  ) : (
    <Navigate
      replace={true}
      to="/unauthorized"
      state={{ from: `${location.pathname}${location.search}` }}
    />
  );
};
