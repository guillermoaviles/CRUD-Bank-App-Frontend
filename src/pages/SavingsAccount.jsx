import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { UserContext } from "../context/user.context";
import axios from "axios";
import loading from "../assets/ZKZG.gif";

function SavingsAccount() {
  const { userId, accountId } = useParams();
  const { user } = useContext(UserContext);

  const [fetching, setFetching] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [account, setAccount] = useState({});
  const [sendButtonEnabled, setSendButtonEnabled] = useState(false);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        // Fetch transactions
        const transactionsResponse = await axios.get(
          `http://localhost:8080/api/transactions/byAccount/${accountId}`
        );
        const transactionList = transactionsResponse.data;

        // Fetch checking account data
        const savingsAccountResponse = await axios.get(
          `http://localhost:8080/api/accounts/savings/${accountId}`
        );
        const savingsAccount = savingsAccountResponse.data;

        // Set the transaction list in state
        setTransactions(transactionList);

        // Set the checking account metadata in state
        setAccount(savingsAccount);

        setFetching(false);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    fetchAccountData();
  }, [userId, user, fetching]);

  useEffect(() => {
    setSendButtonEnabled(parseFloat(amount) > 0);
  }, [amount]);

  const handleWithdraw = () => {
    axios
      .patch(
        `http://localhost:8080/api/accounts/savings/withdraw/${accountId}/${amount}`
      )
      .then((response) => {
        setFetching(true);
        setAmount("");
      });
  };

  return (
    <>
      <h1>Savings Account {accountId}</h1>
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
                      <h2 className="received">
                        Received ${transaction.amount}
                      </h2>
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
          <div>
            <h2>Withdraw</h2>
            <h4>Amount</h4>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <button
            className="send-button"
            onClick={handleWithdraw}
            disabled={!sendButtonEnabled}
          >
            Withdraw to Checking
          </button>
        </div>
      </div>
    </>
  );
}

export default SavingsAccount;
