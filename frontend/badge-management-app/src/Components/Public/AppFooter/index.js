import { Typography } from "antd";

function AppFooter() {
  return (
    <div className="AppFooter">
      <Typography.Link href="https://www.google.com" target={"_blank"}>
        联系我们
      </Typography.Link>
      <Typography.Link href="https://github.com/sa1tycat/Web3Platform" target={"_blank"}>
        GitHub仓库
      </Typography.Link>
    </div>
  );
}
export default AppFooter;
