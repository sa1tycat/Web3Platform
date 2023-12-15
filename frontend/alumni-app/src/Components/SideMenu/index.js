import {
    HomeOutlined,
    ShopOutlined,
    ShoppingCartOutlined,
    RobotOutlined,
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
              key: "/alumni",
            },
            {
              label: "我的徽章",
              key: "/alumni/activity",
              icon: <ShopOutlined />,
            },
            {
              label: "AI(beta)",
              key: "/alumni/chatbot",
              icon: <RobotOutlined />,
            },
            {
              label: "等待更新",
              key: "/alumni/update",
              icon: <ShoppingCartOutlined />,
            },
          ]}
        ></Menu>
      </div>
    );
  }
  export default SideMenu;
  