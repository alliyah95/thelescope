import { Web3 } from "web3";

let web3: Web3 | null = null;

declare global {
    interface Window {
        ethereum?: any;
    }
}

export const getWeb3 = async (): Promise<Web3> => {
    if (web3) {
        return web3;
    }

    if (
        typeof window !== "undefined" &&
        typeof window.ethereum !== "undefined"
    ) {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        web3 = new Web3(window.ethereum);
    } else {
        const provider = new Web3.providers.HttpProvider(
            import.meta.env.VITE_INFURA_ENDPOINT
        );
        web3 = new Web3(provider);
    }

    return web3;
};
