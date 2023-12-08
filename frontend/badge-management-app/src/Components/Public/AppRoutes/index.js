import { Route, Routes } from "react-router-dom";
import HomePage from "../../../Pages/Public/HomePage";
import ActivityPage from "../../../Pages/Public/ActivityPage";
import StuinfoPage from "../../../Pages/Public/StuinfoPage";
import UpdatePage from "../../../Pages/Public/UpdatePage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/public" element={<HomePage />}></Route>
      <Route path="/public/activity" element={<ActivityPage />}></Route>
      <Route path="/public/stuinfo" element={<StuinfoPage />}></Route>
      <Route path="/public/update" element={<UpdatePage />}></Route>
    </Routes>
  );
}
export default AppRoutes;
