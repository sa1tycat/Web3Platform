const basePath = process.cwd();
const { MODE } = require(`${basePath}/constants/blend_mode.js`);
const { NETWORK } = require(`${basePath}/constants/network.js`);

const network = NETWORK.eth;

// General metadata for Ethereum
const namePrefix = "pigeon NFT";
const description = "This is preliminary try...";
const baseUri = "ipfs://QmW7C1USz1BaL2uo1BDcpkrejkQGQsQU743ARNRKXQqjL2";

const solanaMetadata = {
  symbol: "YC",
  seller_fee_basis_points: 1000, // Define how much % you want from secondary market sales 1000 = 10%
  external_url: "https://www.youtube.com/c/hashlipsnft",
  creators: [
    {
      address: "7fXNuer5sbZtaTEPhtJ5g5gNtuyRoKkvxdjEjEnPN4mC",
      share: 100,
    },
  ],
};

// If you have selected Solana then the collection starts from 0 automatically
const layerConfigurations = [
  {
    growEditionSizeTo: 62,
    layersOrder: [
      { name: "Background" },
      { name: "Eyeball" },   
      { name: "Eye color" },
      { name: "Iris" },
      { name: "Shine" },
      { name: "Bottom lid" },
      { name: "Top lid" },
    ],
  },
];

const configMapping = {
  A: ['A'],
  B: ['A', 'B'],
  C: ['A', 'B', 'C'],
  D: ['A', 'B', 'C', 'D'],
  E: ['A', 'B', 'C', 'D', 'E'],
  // ...可以继续添加更多的映射
};

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

const shuffleLayerConfigurations = false;

const debugLogs = false;

const format = {
  width: 512,
  height: 512,
  smoothing: false,
};

const gif = {
  export: false,
  repeat: 0,
  quality: 100,
  delay: 500,
};

const text = {
  only: false,
  color: "#ffffff",
  size: 20,
  xGap: 40,
  yGap: 40,
  align: "left",
  baseline: "top",
  weight: "regular",
  family: "Courier",
  spacer: " => ",
};

const pixelFormat = {
  ratio: 2 / 128,
};

const background = {
  generate: true,
  brightness: "80%",
  static: false,
  default: "#000000",
};

const extraMetadata = {};

const rarityDelimiter = "#";

const uniqueDnaTorrance = 10000;

const preview = {
  thumbPerRow: 5,
  thumbWidth: 50,
  imageRatio: format.height / format.width,
  imageName: "preview.png",
};

const preview_gif = {
  numberOfImages: 5,
  order: "ASC", // ASC, DESC, MIXED
  repeat: 0,
  quality: 100,
  delay: 500,
  imageName: "preview.gif",
};

module.exports = {
  format,
  baseUri,
  description,
  background,
  uniqueDnaTorrance,
  layerConfigurations,
  rarityDelimiter,
  preview,
  shuffleLayerConfigurations,
  debugLogs,
  extraMetadata,
  pixelFormat,
  text,
  namePrefix,
  network,
  solanaMetadata,
  gif,
  imageNames,
  configMapping,
  preview_gif,
};
