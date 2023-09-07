import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/user.context";
import axios from "axios";
import loading from "../assets/ZKZG.gif"

function CheckingAccount() {
  const { userId, accountId } = useParams();
  const { user } = useContext(UserContext);

  const [fetching, setFetching] = useState(true);
  const [transactions, setTransactions] = useState([]);

  const apiURL = `http://localhost:8080/api/transactions/byAccount/${accountId}`;

  useEffect(() => {
    console.log("useEffect - Initial render (Mounting)");
    axios.get(apiURL).then((response) => {
      setTransactions(response.data);
      setFetching(false);
    });
  }, []);

  return (
    <>
      <h1>Checking Account {accountId}</h1>
      <div className="container">
        {fetching && (
          <img src={loading} alt="transaction-loading" className="loading-transaction" />
        )}

        {transactions.map((transaction) => {
          return (
            <div key={transaction.id} className="card">
              <div className="details-div">
                <div className="transaction-card-details">
                  <p>
                    <strong>Transaction date: </strong>
                    {transaction.transactionDate}
                  </p>
                  <p>
                    <strong>Remaining balance: </strong>
                    ${transaction.accountTotal}
                  </p>
                  <p>
                    <strong>Amount: </strong>
                    ${transaction.amount}
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
