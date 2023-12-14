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
    growEditionSizeTo: 1440,
    layersOrder: [
      { name: "Background" },
      { name: "Image" },   
      { name: "Expression" },
      { name: "Medal" },
      { name: "Accessories" },
      { name: "Achievement" },
    ],
  },
];

const configMapping = {
  A: ['A'],
  B: ['A', 'B'],
  C: ['A', 'B', 'C'],
  D: ['A', 'B', 'C', 'D'],
  E: ['A', 'B', 'C', 'D', 'E'],
  F: ['A', 'B', 'C', 'D', 'E', 'F'],
  G: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
  // ...可以继续添加更多的映射
};

// 假设的图片名称映射
const imageNames = {
  "Accessories": {
    "A": "A_Scarf#1.png",
    "B": "B_Tie#1.png"
  },
  "Achievement": {
    "A": "A_Compass#1.png",
    "B": "B_Paper#1.png"
  },
  "Background":{
    "A": "A_BellTower#1.png",
    "B": "B_Library#1.png",
    "C": "C_Playground#1.png",
    "D": "D_ConcertHall#1.png",
    "E": "E_Laboratory#1.png",
    "F": "F_StarSky#1.png"
  },
  "Expression": {
    "A": "A_Excied#1.png",
    "B": "B_Laughing#1.png",
    "C": "C_Neutral#1.png",
    "D": "D_Smile#1.png",
    "E": "E_Thinking#1.png",
    "F": "F_Winking#1.png"
  },
  "Image":{
    "A": "A_Freshman#1.png",
    "B": "B_Junior#1.png",
    "C": "C_Postgraduate#1.png",
    "D": "D_Senior#1.png",
    "E": "E_Sophomore#1.png"
  },
  "Medal":{
    "A": "A_Innovator#1.png",
    "B": "B_Volunteer#1.png"
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
