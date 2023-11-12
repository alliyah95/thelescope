export const TransactionManagerABI = [
    {
        inputs: [
            {
                internalType: "string",
                name: "_clinicName",
                type: "string",
            },
            {
                internalType: "string",
                name: "_clinicId",
                type: "string",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_address",
                type: "address",
            },
        ],
        name: "addAllowedTransactionCreator",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_address",
                type: "address",
            },
        ],
        name: "addAllowedTransactionViewer",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{ internalType: "address", name: "", type: "address" }],
        name: "allowedTransactionCreators",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "address", name: "", type: "address" }],
        name: "allowedTransactionViewers",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "clinicAdmin",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "clinicId",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "clinicName",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "string", name: "_id", type: "string" },
            {
                internalType: "string",
                name: "_recordId",
                type: "string",
            },
            {
                internalType: "string",
                name: "_operation",
                type: "string",
            },
            {
                internalType: "string",
                name: "_performedBy",
                type: "string",
            },
            {
                internalType: "string",
                name: "_description",
                type: "string",
            },
        ],
        name: "createTransaction",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "getTransactionCount",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_address",
                type: "address",
            },
        ],
        name: "removeAllowedTransactionCreator",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_address",
                type: "address",
            },
        ],
        name: "removeAllowedTransactionViewer",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        name: "transactions",
        outputs: [
            { internalType: "string", name: "id", type: "string" },
            {
                internalType: "string",
                name: "recordId",
                type: "string",
            },
            {
                internalType: "string",
                name: "operation",
                type: "string",
            },
            {
                internalType: "string",
                name: "performedBy",
                type: "string",
            },
            {
                internalType: "string",
                name: "description",
                type: "string",
            },
            {
                internalType: "uint256",
                name: "timeStamp",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
] as const;
