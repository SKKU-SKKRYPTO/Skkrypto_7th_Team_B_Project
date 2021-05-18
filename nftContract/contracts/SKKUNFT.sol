// SPDX-License-Identifier: MIT
pragma solidity ^0.7.3;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SKKUNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    mapping (address => uint256) shouldSendBalance;

    constructor() public payable ERC721("SKKUNFT", "NFT"){
    }

    function purchaseToken(uint256 tokenId, address buyer) public payable{
        uint256 tokenPrice = getTokenPrice(tokenId);
        address tokenSeller = ownerOf(tokenId);
        sendToken(tokenSeller, buyer, tokenId);
        payable(tokenSeller).transfer(msg.value);
    }

    function mintNFT(address recipient, string memory tokenURI, uint256 _price)
        public
        returns (uint256)
    {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        _setTokenPrice(newItemId,_price);
        return newItemId;
    } 
    
}