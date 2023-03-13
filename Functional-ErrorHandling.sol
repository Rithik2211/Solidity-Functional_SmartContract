//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;
contract electionData{
    function votingEligibility(uint _data) public pure {
        require(_data < 18, "You are not eligible for voting!");
    }
    function eligibility(uint _i) public pure {
        if (_i >=0){
            revert("Age can't be under Zero!");
        }
    }
    uint public num;

    function assertCheck()public view{
        assert(num==0);
    }
}

