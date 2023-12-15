import { BellFilled, MailOutlined } from "@ant-design/icons";
import { Badge, /* Drawer, */ Image, /* List, */ Space, Typography } from "antd";
// import { useEffect, useState } from "react";

function AppHeader() {
  return (
    <div className="AppHeader">
      <Image
        width={40}
        src="https://www.tjut.edu.cn/__local/A/17/99/4C114284E3EF002244B95EACC3C_6D74E2F8_1178D.jpg"
      ></Image>
      <Typography.Title>校友页面</Typography.Title>
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
