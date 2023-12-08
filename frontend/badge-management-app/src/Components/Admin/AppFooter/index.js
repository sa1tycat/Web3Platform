import { Typography } from "antd";

function AppFooter() {
  return (
    <div className="AppFooter">
      <Typography.Link href="https://web3platform.notion.site/69d52a0dc1274be9b27f4c0ddf07ee1b?pvs=4" target={"_blank"}>
        Notion文档
      </Typography.Link>
      <Typography.Link href="https://github.com/sa1tycat/Web3Platform" target={"_blank"}>
        GitHub仓库
      </Typography.Link>
    </div>
  );
}
export default AppFooter;
