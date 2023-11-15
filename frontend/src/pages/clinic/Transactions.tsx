import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../context";
import { AuthContextType, StoredTransaction } from "../../types";
import { getAllTransactions } from "../../utils/clinic";
import TransactionCard from "../../components/clinic/TransactionCard";

const Transactions: React.FC<{}> = () => {
    const { userInfo } = useAuthContext() as AuthContextType;
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [transactions, setTransactions] = useState<
        StoredTransaction[] | null
    >([]);
    const [isError, setIsError] = useState<boolean>(false);

    const retrieveTransactions = async () => {
        try {
            setIsLoading(true);
            const clinicTransactions = await getAllTransactions(
                `${userInfo.clinicId}`
            );
            setTransactions(clinicTransactions);
        } catch (err) {
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        retrieveTransactions();
    }, [userInfo.clinicId]);

    if (isLoading || !userInfo) {
        return (
            <div className="main-page-wrapper rounded-lg lg:bg-white/10 min-h-[90vh]">
                <p className="animate-bounce text-ths-pink-300">
                    Transactions loading...
                </p>
            </div>
        );
    }

    if ((!transactions && !isLoading) || isError) {
        return (
            <div className="main-page-wrapper rounded-lg lg:bg-white/10 min-h-[90vh]">
                <p className=" text-ths-pink-300">No transactions found</p>
            </div>
        );
    }

    return (
        <div className="main-page-wrapper rounded-lg lg:bg-white/10 min-h-[90vh]">
            <h1 className="main-page-heading mb-4">Clinic Transactions</h1>

            {transactions?.length === 0 && (
                <p className=" text-ths-pink-300">No transactions found</p>
            )}

            {transactions && transactions?.length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {transactions.map((transaction, index) => (
                        <TransactionCard
                            transactionInfo={transaction}
                            key={index}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Transactions;
