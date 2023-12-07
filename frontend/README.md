到badge-management-app目录下运行npm start
第一次运行需要使用npm install安装依赖（可能，要是npm start失败了）
有时候npm start 会报一大推错误，可能时modules受损，按照如下步骤解决即可：
rm -rf node_modules
npm cache clean --force
npm install
npm start