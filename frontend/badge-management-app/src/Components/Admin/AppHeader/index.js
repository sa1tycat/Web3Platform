import { BellFilled, MailOutlined } from "@ant-design/icons";
import { Badge,Space, Typography } from "antd";


function AppHeader() {
  return (
    <div className="AppHeader">
      <Typography.Title>管理员页面</Typography.Title>
      <Space>
        <Badge>
          <MailOutlined
            style={{ fontSize: 24 }}
          />
        </Badge>
        <Badge>
          <BellFilled
            style={{ fontSize: 24 }}
          />
        </Badge>
      </Space>
    </div>
  );
}
export default AppHeader;
