import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/user.context";
import axios from "axios";

function SendMoney() {
  const { userId } = useParams();
  const { user } = useContext(UserContext);

  const [fromAccount, setFromAccount] = useState("");
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [sendButtonEnabled, setSendButtonEnabled] = useState(false);
  const [allAccounts, setAllAccounts] = useState([]);

  let checkingAccounts = user?.checkingAccounts || [];
  let mergedAccounts = [];

  useEffect(() => {
    if (checkingAccounts.length > 0) {
      setFromAccount(checkingAccounts[0].accountNumber);
    }

    const fetchAccounts = async () => {
      try {
        // Fetch checking accounts
        const checkingResponse = await axios.get(
          "http://localhost:8080/api/accounts/checking"
        );
        const checkingAccounts = checkingResponse.data;

        // Fetch investment accounts
        const savingsResponse = await axios.get(
          "http://localhost:8080/api/accounts/savings"
        );
        const savingsAccounts = savingsResponse.data;

        // Fetch investment accounts
        const investmentResponse = await axios.get(
          "http://localhost:8080/api/accounts/investment"
        );
        const investmentAccounts = investmentResponse.data;

        // Merge checking and investment accounts into a single array
        mergedAccounts = [...checkingAccounts, ...savingsAccounts, ...investmentAccounts];

        // Set the merged accounts in state
        setAllAccounts(mergedAccounts);

        // Initialize with the first account if available
        if (mergedAccounts.length > 0) {
          setFromAccount(mergedAccounts[0].accountNumber);
        }
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    fetchAccounts();
  }, [userId, user]);

  useEffect(() => {
    setSendButtonEnabled(
      fromAccount !== "" && toAccount !== "" && parseFloat(amount) > 0
    );
  }, [fromAccount, toAccount, amount]);

  const handleSendMoney = () => {
    axios
      .patch(
        `http://localhost:8080/api/users/sendMoney/${fromAccount}/${toAccount}/${amount}`
      )
      .then((response) => {
        setFromAccount(checkingAccounts[0].accountNumber);
        setToAccount(allAccounts[0].accountNumber);
        setAmount("");
      });
  };

  return (
    <div>
      <h1>Send Money</h1>
      <div className="send-money-card">
        <div className="card">
          <div>
            <h4>From</h4>
            <select
              value={fromAccount}
              onChange={(e) => setFromAccount(e.target.value)}
            >
              {user?.checkingAccounts.map((account) => (
                <option
                  key={account.accountNumber}
                  value={account.accountNumber}
                >
                  {`Checking Account ${account.accountNumber}: $${account.balance}`}
                </option>
              ))}
            </select>
          </div>
          <div>
            <h4>To</h4>
            <select
              value={toAccount}
              onChange={(e) => setToAccount(e.target.value)}
            >
              {allAccounts.map((account) => (
                <option
                  key={account.accountNumber}
                  value={account.accountNumber}
                >
                  {`Account ${account.accountNumber}`}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <h4>Amount</h4>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button
          className="send-button"
          onClick={handleSendMoney}
          disabled={!sendButtonEnabled}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default SendMoney;
