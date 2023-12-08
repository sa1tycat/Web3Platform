import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

function Choose() {
    const navigate = useNavigate();
    return (
      <div className="SideMenu">
        <Menu
          className="SideMenuVertical"
          onClick={(item) => navigate(item.key)}
          items={[
            {
              label: "管理员",
              key: "/admin",
            },
            {
              label: "校友",
              key: "/alumni",
            },
            {
              label: "参观人",
              key: "/public",
            },
          ]}
        ></Menu>
      </div>
    );
}

export default Choose;
