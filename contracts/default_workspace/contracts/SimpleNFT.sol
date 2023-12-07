// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SimpleNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    mapping(address => bool) public whitelist;
    Counters.Counter private _tokenIdCounter;
    // [["101", "https://example.com/metadata/123"],["102", "https://example.com/metadata/345"]]
    struct BadgeInfo {
        uint badgeID;
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

    function mintNFT(address recipient, BadgeInfo[] memory badges)
        public onlyOwner
        returns (BadgeTokenPair[] memory)
    {
        require(whitelist[msg.sender] || whitelist[recipient], "Neither sender nor recipient is whitelisted");
        BadgeTokenPair[] memory badgeTokenPairs = new BadgeTokenPair[](badges.length);
        for (uint i = 0; i < badges.length; i++) {
            uint256 tokenId = _tokenIdCounter.current();
            _tokenIdCounter.increment();
            _mint(recipient, tokenId);
            _setTokenURI(tokenId, badges[i].metadataURI);
            badgeTokenPairs[i] = BadgeTokenPair({
                badgeID: badges[i].badgeID,
                tokenID: tokenId
            });
        }
        return badgeTokenPairs;
    }
}
