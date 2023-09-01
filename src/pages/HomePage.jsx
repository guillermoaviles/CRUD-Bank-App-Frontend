import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function HomePage() {
  const [showCheckingAccounts, setShowCheckingAccounts] = useState(false);
  const [showSavingsAccounts, setShowSavingsAccounts] = useState(false);
  const [showInvestmentAccounts, setShowInvestmentAccounts] = useState(false);

  const [checkingAccounts, setCheckingAcounts] = useState([]);
  const [savingsAccounts, setSavingsAccounts] = useState([]);
  const [investmentAccounts, setInvestmentAccounts] = useState([]);

  const [fetching, setFetching] = useState(true);

  const apiURL = "http://localhost:8080/api/accounts/checking";

  // const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJndWlsbGUiLCJyb2xlcyI6WyJST0xFX1VTRVIiXSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2FwaS9sb2dpbiIsImV4cCI6MTY5MzUzNjMxM30.fEyUCD9QgV0v24v5NEdQOJhY7Ned481jssDxovtOoFg";

  // const config = {
  //   headers: { Authorization: `Bearer ${token}` },
  // };

  // const bodyParameters = {
  //   key: "value",
  // };

  useEffect(() => {
    console.log("useEffect - Initial render (Mounting)");
    axios.get(apiURL).then((response) => {
      setCheckingAcounts(response.data);
      setFetching(false);
    });
  }, []);

  const handleCheckingAccountsClick = () => {
    setShowCheckingAccounts(!showCheckingAccounts);
  };

  const handleSavingsAccountsClick = () => {
    setShowSavingsAccounts(!showSavingsAccounts);
  };

  const handleInvestmentAccountsClick = () => {
    setShowInvestmentAccounts(!showInvestmentAccounts);
  };

  console.log("checkingAccounts", checkingAccounts);

  return (
    <div className="home-container">
      <h1 className="welcome">Welcome to your account, Guillermo.</h1>
      <div className="link-card" onClick={handleCheckingAccountsClick}>
        <h2 className="account-type">My Checking Accounts (2)</h2>
      </div>
      {showCheckingAccounts && (
        checkingAccounts.map((checkingAccount) => {
          <div className="account-card">
            <Link className="link" to={`/accounts/checking/${checkingAccount.accountNumber}`}>
              <h2>Checking Account {checkingAccount.accountNumber}</h2>
              <p>Available Balance: ${checkingAccount.balance}</p>
            </Link>
          </div>
        })
        // <>
        //   <div className="account-card">
        //     <Link className="link" to={"/accounts/checking/test"}>
        //       <h2>Checking Account 1</h2>
        //       <p>Available Balance: $100</p>
        //     </Link>
        //   </div>
        //   <div className="account-card">
        //     <Link className="link" to={"/accounts/checking/test"}>
        //       <h2>Checking Account 2</h2>
        //       <p>Available Balance: $85.50</p>
        //     </Link>
        //   </div>
        // </>
      )}
      <div className="link-card" onClick={handleSavingsAccountsClick}>
        <h2 className="account-type">My Savings Accounts (1)</h2>
      </div>
      {showSavingsAccounts && (
        <>
          <div className="account-card">
            <Link className="link" to={"/accounts/savings/test"}>
              <h2>Savings Account 1</h2>
              <p>Available Balance: $150</p>
            </Link>
          </div>
        </>
      )}
      <div className="link-card" onClick={handleInvestmentAccountsClick}>
        <h2 className="account-type">My Investment Accounts (2)</h2>
      </div>
      {showInvestmentAccounts && (
        <>
          <div className="account-card">
            <Link className="link" to={"/accounts/investment/test"}>
              <h2>Investment Account 1</h2>
              <p>Total Equity: $24,502</p>
            </Link>
          </div>
          <div className="account-card">
            <Link className="link" to={"/accounts/investment/test"}>
              <h2>Investment Account 2</h2>
              <p>Total Equity: $2,212</p>
            </Link>
          </div>
        </>
      )}
      <div className="card">
        <Link className="card-button" to={"/button1"}>
          Send Money
        </Link>
        <Link className="card-button" to={"/button2"}>
          Summary
        </Link>
        <Link className="card-button" to={"/button3"}>
          Button 3
        </Link>
        <Link className="card-button" to={"/button4"}>
          Button 4
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
