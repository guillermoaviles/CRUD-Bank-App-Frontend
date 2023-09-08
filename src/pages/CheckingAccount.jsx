import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
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
                  <div className="box">
                    {transaction.amount > 0 ? (
                      <h2 className="received">Received ${transaction.amount}</h2>
                    ) : (
                      <h2 className="sent">Sent ${transaction.amount * -1}</h2>
                    )}
                    {transaction.amount > 0 ? (
                      <p>
                        <strong>From: </strong>
                        {transaction.counterparty}
                      </p>
                    ) : (
                      <p>
                        <strong>To: </strong>
                        {transaction.counterparty}
                      </p>
                    )}
                  </div>
                  <div className="box">
                    <div className="date">
                      <p>
                        <strong>Date: </strong>
                      </p>
                      <p className="transaction-date">
                        {transaction.transactionDate[1]}/
                        {transaction.transactionDate[2]}/
                        {transaction.transactionDate[0]}
                      </p>
                    </div>

                    <p>
                      <strong>Remaining balance: </strong>$
                      {transaction.accountTotal}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div className="card">
          <Link className="card-button" to={`/user/sendMoney/${user?.id}`}>
            Send Money
          </Link>
        </div>
      </div>
    </>
  );
}

export default CheckingAccount;
