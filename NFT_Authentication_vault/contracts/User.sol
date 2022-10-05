pragma solidity >=0.4.21 <8.10.0;

import "./ERC721Full.sol";

//code for the token
contract User is ERC721Full {
    string[] public users;
    mapping(string => bool) _userExists; //checks user

    constructor() ERC721Full("User", "USER") public{
    }

    function mint(string memory _user) public {
        //Require unique user
        require(!_userExists[_user]);
        uint _id = users.push(_user);
        _mint(msg.sender, _id);
        //User - add it
        //Call mint()
        //User - track it
        _userExists[_user] = true;
    }
}

//specific id of token is unique id value of users