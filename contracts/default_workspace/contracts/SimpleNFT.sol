// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SimpleNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("SimpleNFT", "SNFT") Ownable(msg.sender) {}


    function mintNFT(address recipient, string memory tokenURI)
        public onlyOwner
        returns (uint256)
    {
        _tokenIds.increment(); // 这行代码调用了 `increment` 函数，它可能是用来递增一个在合约中定义的计数器，用于追踪目前已经生成了多少个NFT。


        uint256 newItemId = _tokenIds.current(); // 这行代码获取计数器当前的值，并将其赋值给一个新的变量`newItemId`，这个值将作为新NFT的唯一标识符（tokenId）。
        _mint(recipient, newItemId); // 这行代码调用`_mint`函数，它将新的tokenId赋予给参数中指定的接收者地址（即创建NFT并将其归属于接收者）。
        _setTokenURI(newItemId, tokenURI); // 这行代码关联了新生成的tokenId和提供的`tokenURI`，即将NFT的元数据链接到具体的NFT上。

        return newItemId; // 最终，函数返回`newItemId`，即新生成的NFT的唯一标识符。
    }
}
