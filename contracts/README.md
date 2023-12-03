## NFTgenerate

- 打开NFTgenerate文件夹
- 推荐node版本14.14.0
### 安装 🔧

```sh
npm install
```
### 使用 ^-&

1. 修改```layers```文件夹，这代表了各图层的图片
2. 修改```config.js```的```layerConfigurations```这代表了生成图片的图层的名称。例如默认的：
```js
const layerConfigurations = [
  {
    growEditionSizeTo: 100,
    layersOrder: [
      { name: "Head" },
      { name: "Mouth" },
      { name: "Eyes" },
      { name: "Eyeswear" },
      { name: "Headwear" },
    ],
  },
];
```
```growEditionSizeTo```：一次性生成的图片个数
```layersOrder```:图层名称及图层顺序
3. 运行
```sh
npm run build
```
4. 生成的图片和metadata在```build```文件夹




## nft-erc721