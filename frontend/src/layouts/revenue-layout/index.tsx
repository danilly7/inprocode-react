import { Outlet } from "react-router-dom";
import { RevenueProvider } from "../../context/revenue-context";

export const RevenueLayout = () => {
  return (
    <RevenueProvider>
      <Outlet />
    </RevenueProvider>
  );
};