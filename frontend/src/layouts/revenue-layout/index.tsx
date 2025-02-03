import { Outlet } from "react-router-dom";
import { RevenueProvider } from "../../context/revenue-context";

const RevenueLayout = () => {
  return (
    <RevenueProvider>
      <Outlet />
    </RevenueProvider>
  );
};

export default RevenueLayout;