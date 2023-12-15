import { Route, Routes } from "react-router-dom";
import HomePage from "../../Pages/HomePage";
import ActivityPage from "../../Pages/BadgePage";
import StuinfoPage from "../../Pages/ChatbotPage";
import UpdatePage from "../../Pages/UpdatePage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/alumni" element={<HomePage />}></Route>
      <Route path="/alumni/activity" element={<ActivityPage />}></Route>
      <Route path="/alumni/chatbot" element={<StuinfoPage />}></Route>
      <Route path="/alumni/update" element={<UpdatePage />}></Route>
    </Routes>
  );
}
export default AppRoutes;
