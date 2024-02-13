// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// import "hardhat/console.sol";
// EOA -> proxy -> Logic1/Logic2

contract Proxy {
    address implementation;
    function changeImplementation(address _implementation) external{
        implementation = _implementation;
    }

    fallback() external {
        (bool success,) = implementation.call(msg.data);
        require(success);
    }

    function changeX(uint _x)external{
        Logic1(implementation).changeX(_x);
    }
}

contract Logic1{
    uint public x = 0;

    function changeX(uint _x) external{
        x = _x;
    }
}

contract Logic2 {
    uint public x = 0;

    function changeX(uint _x) external{
        x = _x;
    }

    function tripleX() external{
        x *= 3;
    }
}
