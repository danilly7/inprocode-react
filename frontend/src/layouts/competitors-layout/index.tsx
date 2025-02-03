import { Outlet } from "react-router-dom";
import { CompetitorsProvider } from "../../context/competitors-context";

const CompetitorsLayout = () => {
  return (
    <CompetitorsProvider>
      <Outlet />
    </CompetitorsProvider>
  );
};

export default CompetitorsLayout;