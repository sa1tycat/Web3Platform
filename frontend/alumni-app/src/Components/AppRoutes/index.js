import { Route, Routes } from "react-router-dom";
import HomePage from "../../Pages/HomePage";
import ActivityPage from "../../Pages/BadgePage";
import StuinfoPage from "../../Pages/ActivityPage";
import UpdatePage from "../../Pages/UpdatePage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/alumni" element={<HomePage />}></Route>
      <Route path="/alumni/view-badges" element={<ActivityPage />}></Route>
      <Route path="/alumni/view-activities" element={<StuinfoPage />}></Route>
      <Route path="/alumni/update" element={<UpdatePage />}></Route>
    </Routes>
  );
}
export default AppRoutes;
