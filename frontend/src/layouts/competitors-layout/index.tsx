import { Outlet } from "react-router-dom";
import { CompetitorsProvider } from "../../context/competitors-context";

export const CompetitorsLayout = () => {
  return (
    <CompetitorsProvider>
      <Outlet />
    </CompetitorsProvider>
  );
};