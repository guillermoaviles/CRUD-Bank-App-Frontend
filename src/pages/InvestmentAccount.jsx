import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/user.context";
import axios from "axios";
import loading from "../assets/ZKZG.gif";

function InvestmentAccount() {
  const { userId, accountId } = useParams();
  const { user } = useContext(UserContext);

  const [fetching, setFetching] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [account, setAccount] = useState({});
  const [amount, setAmount] = useState("");
  const [availableBalance, setAvailableBalance] = useState(0);
  const [sendButtonEnabled, setSendButtonEnabled] = useState(false);

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        // Fetch transactions
        const transactionsResponse = await axios.get(
          `http://localhost:8080/api/transactions/byAccount/${accountId}`
        );
        const transactionList = transactionsResponse.data;

        // Fetch investment account data
        const investmentAccountResponse = await axios.get(
          `http://localhost:8080/api/accounts/investment/${accountId}`
        );
        const investmentAccount = investmentAccountResponse.data;

        // Fetch available balance
        const availableBalanceResponse = await axios.get(
            `http://localhost:8080/api/accounts/investment/availableBalance/${accountId}`
        )
        const unlockedBalance = availableBalanceResponse.data;

        // Set the transaction list in state
        setTransactions(transactionList);

        // Set the investment account metadata in state
        setAccount(investmentAccount);

        // Set available balance in state
        setAvailableBalance(unlockedBalance);

        setFetching(false);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    fetchAccountData();
  }, [userId, user]);

  useEffect(() => {
    setSendButtonEnabled(parseFloat(amount) > 0);
  }, [amount]);

  const handleWithdraw = () => {
    axios
      .patch(
        `http://localhost:8080/api/accounts/investment/withdraw/${accountId}/${amount}`
      )
      .then((response) => {
        setAmount("");
      });
  };

  return (
    <>
      <h1>Investment Account {accountId}</h1>
      <h2>
        <strong>Current Equity: </strong>${account.balance}
      </h2>
      <h2>
        <strong>Unlocked Equity: </strong>${availableBalance}
      </h2>
      <h2>
        <strong>Annual Percent Yield: </strong>
        {account.apy}%
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
                  <div>
                    <p>
                      <strong>Transaction date: </strong>
                    </p>
                    <p className="transaction-date">
                      {transaction.transactionDate[1]}/
                      {transaction.transactionDate[2]}/
                      {transaction.transactionDate[0]}
                    </p>
                  </div>
                  <p>
                    <strong>Remaining equity: </strong>$
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
            Withdraw
          </button>
        </div>
      </div>
    </>
  );
}

export default InvestmentAccount;
