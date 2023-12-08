// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLayout from './components/AdminLayout';
import HomePage from './pages/admin/HomePage';
import ActivityPage from './pages/admin/ActivityPage';
import OtherPage from './pages/admin/OtherPage';
// ...导入其他页面组件

const App = () => {
  return (
    <Router>
      <Routes>
        {/* 为管理员相关的页面使用AdminLayout */}
        <Route path="/admin/*" element={<AdminLayout />}>
          <Route index element={<HomePage />} />
          <Route path="activity" element={<ActivityPage />} />
          <Route path="other" element={<OtherPage />} />
          {/* ...其他管理员相关的路由 */}
        </Route>
        {/* ...其他非管理员的路由 */}
      </Routes>
    </Router>
  );
};

export default App;
