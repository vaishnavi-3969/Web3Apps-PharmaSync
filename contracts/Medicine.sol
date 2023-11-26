// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Medicine {
    // string public name;

    address public owner;

    struct Item {
        uint256 id;
        string name;
        string category;
        string image;
        uint256 cost;
        uint256 rating;
        uint256 stock;
    }

    mapping(uint256 => Item) public items;

    constructor() {
        // name = "Pharma Nexus";
        owner = msg.sender;
    }

    //List Products
    function list(uint256 _id, 
        string memory _name, 
        string memory _category,
        string memory _image,
        uint256 _cost,
        uint256 _rating,
        uint256 _stock
    ) 
        public {
            //item struct
        Item memory item = Item({
            id: _id,
            name: _name,
            category: _category,
            image: _image,
            cost: _cost,
            rating: _rating,
            stock: _stock
        });

        //save item struct to blockchain

    } 

    //Buy products


    //Withdraw funds

}
