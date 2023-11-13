// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract TransactionManager {
    struct Transaction {
        string id;
        string recordId; 
        string operation;
        string performedBy;
        string description;
        uint256 timeStamp; 
    }

    Transaction[] public transactions;
    string public clinicId;
    string public clinicName;
    address public clinicAdmin;

    
    constructor(string memory _clinicName, string memory _clinicId) {
        clinicName = _clinicName;
        clinicId = _clinicId;
        clinicAdmin = msg.sender;
    }

    function createTransaction(string memory _id, string memory _recordId, string memory _operation, string memory _performedBy, string memory _description) 
        public {
            Transaction memory newTransaction;
            newTransaction.id = _id;
            newTransaction.recordId = _recordId;
            newTransaction.operation = _operation;
            newTransaction.performedBy = _performedBy;
            newTransaction.timeStamp = block.timestamp;
            newTransaction.description = _description;
            transactions.push(newTransaction);
    }
    
    function getTransactionCount() public view returns(uint256) {
        return transactions.length;
    }
}
