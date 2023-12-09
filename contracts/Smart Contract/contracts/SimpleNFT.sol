// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SimpleNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    mapping(address => bool) public whitelist;
    Counters.Counter private _tokenIdCounter;
    // [["101","0x8a3BC7f5fE946f5827112cd9830028F078C9B142","https://example.com/metadata/123"],["102","0x8a3BC7f5fE946f5827112cd9830028F078C9B142","https://example.com/metadata/345"]]
    // [["103","0x5B38Da6a701c568545dCfcB03FcB875f56beddC4","https://example.com/metadata/456"],["104","0x5B38Da6a701c568545dCfcB03FcB875f56beddC4","https://example.com/metadata/789"]]
    struct BadgeInfo {
        uint badgeID;
        address recipient;
        string metadataURI;
    }

    struct BadgeTokenPair {
        uint badgeID;
        uint256 tokenID;
    }

    constructor() ERC721("SimpleNFT", "SNFT") Ownable(msg.sender) {}

    function addToWhitelist(address _address) external onlyOwner {
        whitelist[_address] = true;
    }

    function removeFromWhitelist(address _address) external onlyOwner {
        whitelist[_address] = false;
    }

    function mintNFT(BadgeInfo[] memory badges)
        public onlyOwner
        returns (BadgeTokenPair[] memory)
    {
        require(whitelist[msg.sender], "Neither sender nor recipient is whitelisted");
        BadgeTokenPair[] memory badgeTokenPairs = new BadgeTokenPair[](badges.length);
        for (uint i = 0; i < badges.length; i++) {
            uint256 tokenId = _tokenIdCounter.current();
            _tokenIdCounter.increment();
            _mint(badges[i].recipient, tokenId);
            _setTokenURI(tokenId, badges[i].metadataURI);
            badgeTokenPairs[i] = BadgeTokenPair({
                badgeID: badges[i].badgeID,
                tokenID: tokenId
            });
        }
        return badgeTokenPairs;
    }

    // Function to view the msg.sender address
    function getMsgSender() external view returns (address) {
        return msg.sender;
    }
}
