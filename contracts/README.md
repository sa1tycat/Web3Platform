# 为了方便调试我在此文件夹下建了一个react1，用来实现前端需要智能合约这块的功能
## NFTgenerate

- 打开NFTgenerate文件夹
- 推荐node版本14.14.0
### 安装 🔧

```sh
npm  install
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
```growEditionSizeTo```：一次性生成的图片个数，这里为了一下子全部生成，值应该等于各图层可能图片分别乘积。

```layersOrder```:图层名称及图层顺序
以及修改```configMapping```,让它对应的映射更多什么的...如果用的到的话（映射关系应该很好理解吧）
```js
const configMapping = {
  A: ['A'],
  B: ['A', 'B'],
  C: ['A', 'B', 'C'],
  D: ['A', 'B', 'C', 'D'],
  E: ['A', 'B', 'C', 'D', 'E'],
  // ...可以继续添加更多的映射
};
```
还有```imageNames```,修改成你要组合的图片名称即可（主要是不想写读文件才这样写的，就当人工读文件吧，JavaScript真没学过，写不明白）。
```js
// 假设的图片名称映射
const imageNames = {
  "Background": {
    "A": "A_Black#1.png"
  },
  "Eyeball": {
    "A": "A_Red#50.png",
    "B": "B_White#50.png"
  },
  "Eye color":{
    "A": "A_Cyan#1.png",
    "B": "B_Green#1.png",
    "C": "C_Pink#1.png"
  },
  "Iris": {
    "A": "A_Large#20.png",
    "B": "B_Medium#20.png",
    "C": "C_Small#20.png"
  },
  "Shine":{
    "A": "A_Shapes#100.png"
  },
  "Bottom lid":{
    "A": "A_High#20.png",
    "B": "B_Low#20.png",
    "C": "C_Middle#20.png"
  },
  "Top lid":{
    "A": "A_High#30.png",
    "B": "B_Low#30.png",
    "C": "C_Middle#30.png"
  },
};
```

3. 运行
```sh
npm run build
```

4. 生成的图片和metadata在```build```文件夹




## nft-erc721