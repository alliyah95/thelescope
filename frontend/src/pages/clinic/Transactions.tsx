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
    const [selectedFilter, setSelectedFilter] = useState<string>("none");

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

    const filteredTransactions = () => {
        switch (selectedFilter) {
            case "create":
                return transactions?.filter(
                    (transaction) => transaction.operation === "Create"
                );
            case "update":
                return transactions?.filter(
                    (transaction) => transaction.operation === "Update"
                );
            case "delete":
                return transactions?.filter(
                    (transaction) => transaction.operation === "Delete"
                );
            default:
                return transactions;
        }
    };

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
                <p className="text-ths-pink-300">No transactions found</p>
            </div>
        );
    }

    return (
        <div className="main-page-wrapper rounded-lg lg:bg-white/10 min-h-[90vh]">
            <h1 className="main-page-heading mb-4">Clinic Transactions</h1>

            {transactions?.length === 0 && (
                <p className="text-ths-pink-300">No transactions found</p>
            )}

            {transactions && transactions?.length > 0 && (
                <>
                    <div className="flex items-center gap-8 mb-6">
                        <h3>Filter:</h3>
                        <div className="flex gap-6">
                            <select
                                className="form-input"
                                onChange={(e) =>
                                    setSelectedFilter(e.target.value)
                                }
                            >
                                <option value="none">All</option>
                                <option value="create">Create</option>
                                <option value="update">Update</option>
                                <option value="delete">Delete</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {filteredTransactions()?.map((transaction, index) => (
                            <TransactionCard
                                transactionInfo={transaction}
                                key={index}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Transactions;
