import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/user.context";
import axios from "axios";
import loading from "../assets/ZKZG.gif";

function CheckingAccount() {
  const { userId, accountId } = useParams();
  const { user } = useContext(UserContext);

  const [fetching, setFetching] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [account, setAccount] = useState({});

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        // Fetch transactions
        const transactionsResponse = await axios.get(
          `http://localhost:8080/api/transactions/byAccount/${accountId}`
        );
        const transactionList = transactionsResponse.data;

        // Fetch checking account data
        const checkingAccountResponse = await axios.get(
          `http://localhost:8080/api/accounts/checking/${accountId}`
        );
        const checkingAccount = checkingAccountResponse.data;

        // Set the transaction list in state
        setTransactions(transactionList);

        // Set the checking account metadata in state
        setAccount(checkingAccount);

        setFetching(false);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    fetchAccountData();
  }, [userId, user]);

  return (
    <>
      <h1>Checking Account {accountId}</h1>
      <h2>
        <strong>Available Balance: </strong>${account.balance}
      </h2>
      <div className="container">
        {fetching && (
          <img
            src={loading}
            alt="transaction-loading"
            className="loading-transaction"
          />
        )}

        {transactions.map((transaction) => {
          return (
            <div key={transaction.id} className="card">
              <div className="details-div">
                <div className="transaction-card-details">
                  <p>
                    <strong>Transaction date: </strong>
                    <p className="transaction-date">
                      {transaction.transactionDate[1]}/
                      {transaction.transactionDate[2]}/
                      {transaction.transactionDate[0]}
                    </p>
                  </p>
                  <p>
                    <strong>Remaining balance: </strong>$
                    {transaction.accountTotal}
                  </p>
                  <p>
                    <strong>Amount: </strong>${transaction.amount}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default CheckingAccount;
