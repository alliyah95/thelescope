// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Transaction {
    string public id;
    string public operation;
    string public performedBy;
    string public description;
    string public involvedData;
    string public involvedDataId;
    uint256 public timestamp;

    constructor(string memory _id, string memory _involvedData, string memory _involvedDataId, string memory _operation, string memory _performedBy, string memory _description){
        id = _id;
        operation = _operation;
        performedBy = _performedBy;
        description = _description;
        involvedData = _involvedData;
        involvedDataId = _involvedDataId;
    }
}
