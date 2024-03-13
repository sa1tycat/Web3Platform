import {
    HomeOutlined,
    ShopOutlined,
    ShoppingCartOutlined,
    UserOutlined,
  } from "@ant-design/icons";
  import { Menu } from "antd";
  //import { useEffect, useState } from "react";
  import { useLocation, useNavigate } from "react-router-dom";
  
  function SideMenu() {
  //  const location = useLocation();
  //  const [selectedKeys, setSelectedKeys] = useState("/");
  
  //  useEffect(() => {
  //    const pathName = location.pathname;
  //    setSelectedKeys(pathName);
  //  }, [location.pathname]);
  
    const navigate = useNavigate();
    return (
      <div className="SideMenu">
        <Menu
          className="SideMenuVertical"
          // mode="vertical"
          onClick={(item) => {
            //item.key
            navigate(item.key);
          }}
          // selectedKeys={[selectedKeys]}
          items={[
            {
              label: "首页",
              icon: <HomeOutlined />,
              key: "/admin",
            },
            {
              label: "活动管理",
              key: "/admin/activity",
              icon: <ShopOutlined />,
            },
            {
              label: "学生管理",
              key: "/admin/stuinfo",
              icon: <UserOutlined />,
            },
            // {
            //   label: "等待更新",
            //   key: "/admin/update",
            //   icon: <ShoppingCartOutlined />,
            // },
          ]}
        ></Menu>
      </div>
    );
  }
  export default SideMenu;
  