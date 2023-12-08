import { Route, Routes } from "react-router-dom";
import HomePage1 from "../Pages/Admin/App";
import HomePage2 from "../Pages/Alumni/App";
import HomePage3 from "../Pages/Public/App";

function Routes() {
  return (
    <Routes>
      <Route path="/admin" element={<HomePage1 />}></Route>
      <Route path="/alumni" element={<HomePage2 />}></Route>
      <Route path="/public" element={<HomePage3 />}></Route>
    </Routes>
  );
}
export default Routes;
