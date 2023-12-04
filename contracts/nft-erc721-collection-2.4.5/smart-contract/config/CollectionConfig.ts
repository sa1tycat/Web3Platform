import CollectionConfigInterface from '../lib/CollectionConfigInterface';
import * as Marketplaces from '../lib/Marketplaces';
import * as Networks from '../lib/Networks';
import whitelistAddresses from './whitelist.json';

const CollectionConfig: CollectionConfigInterface = {
  testnet: Networks.ethereumTestnet,
  mainnet: Networks.ethereumMainnet,
  // The contract name can be updated using the following command:
  // yarn rename-contract NEW_CONTRACT_NAME
  // Please DO NOT change it manually!
  contractName: 'Web3PlatformTest',
  tokenName: 'Web3PlatformTest Token',
  tokenSymbol: 'VCAAA',
  hiddenMetadataUri: 'ipfs://QmV1c7AwjKiRM589skn4LUKtnYTM47trhGQ6Js8KkaA7CM/4.json',
  maxSupply: 20,
  whitelistSale: {
    price: 0.05,
    maxMintAmountPerTx: 10,
  },
  preSale: {
    price: 0.07,
    maxMintAmountPerTx: 20,
  },
  publicSale: {
    price: 0.09,
    maxMintAmountPerTx: 50,
  },
  contractAddress: "0xAea16B53E204C596E374BbF7548b9F2630f16571",
  marketplaceIdentifier: 'my-nft-token',
  marketplaceConfig: Marketplaces.openSea,
  whitelistAddresses,
};

export default CollectionConfig;
