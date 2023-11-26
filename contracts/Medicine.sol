// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

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

    struct Order {
        uint256 time;
        Item item;
    }

    mapping(uint256 => Item) public items;
    mapping(address => uint256) public orderCount;
    mapping(address => mapping(uint256 => Order)) public orders;

    event List(string name, uint256 cost, uint256 quantity);

    modifier onlyOwner () {
        require(msg.sender == owner);
        _;
    }

    constructor() {
        // name = "Pharma Nexus";
        owner = msg.sender;
    }

    //list Products
    function list(
        uint256 _id,
        string memory _name,
        string memory _category,
        string memory _image,
        uint256 _cost,
        uint256 _rating,
        uint256 _stock
    ) public onlyOwner {
        // require(msg.sender == owner);

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
        items[_id] = item;

        //emit an event
        emit List(_name, _cost, _stock);

    }

    //buy medicine
    function buy(uint256 _id) public payable{
        //fetch item
        Item memory item = items[_id];

        //create an order
        Order memory order = Order(
            block.timestamp,
            item
        );

        //save order to chain


        //substrack stock


        //emit an event
    }

    //withdraw funds
}


