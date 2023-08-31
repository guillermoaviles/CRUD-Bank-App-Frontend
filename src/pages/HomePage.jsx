import { useState } from "react";
import { Link } from "react-router-dom";

function HomePage() {
  const [showCheckingAccounts, setShowCheckingAccounts] = useState(false);
  const [showSavingsAccounts, setShowSavingsAccounts] = useState(false);
  const [showInvestmentAccounts, setShowInvestmentAccounts] = useState(false);

  const handleCheckingAccountsClick = () => {
    setShowCheckingAccounts(!showCheckingAccounts);
  };

  const handleSavingsAccountsClick = () => {
    setShowSavingsAccounts(!showSavingsAccounts);
  };

  const handleInvestmentAccountsClick = () => {
    setShowInvestmentAccounts(!showInvestmentAccounts);
  };

  return (
    <div className="home-container">
      <h1 className="welcome">Welcome to your account, Guillermo.</h1>
      <div className="link-card" onClick={handleCheckingAccountsClick}>
        <h2 className="account-type">My Checking Accounts (2)</h2>
      </div>
      {showCheckingAccounts && (
        <>
          <div className="link-card">
            <Link className="link" to={"/checking-account-1"}>
              <h2>Checking Account 1</h2>
              <p>Available Balance: $100</p>
            </Link>
          </div>
          <div className="link-card">
            <Link className="link" to={"/checking-account-2"}>
              <h2>Checking Account 2</h2>
              <p>Available Balance: $100</p>
            </Link>
          </div>
          {/* Add more checking account link cards here */}
        </>
      )}
      <div className="link-card" onClick={handleSavingsAccountsClick}>
        <h2 className="account-type">My Savings Accounts (1)</h2>
      </div>
      {showSavingsAccounts && (
        <>
          <div className="link-card">
            <Link className="link" to={"/checking-account-1"}>
              <h2>Savings Account 1</h2>
              <p>Available Balance: $100</p>
            </Link>
          </div>
        </>
      )}
      <div className="link-card" onClick={handleInvestmentAccountsClick}>
        <h2 className="account-type">My Investment Accounts (2)</h2>
      </div>
      {showInvestmentAccounts && (
        <>
          <div className="link-card">
            <Link className="link" to={"/checking-account-1"}>
              <h2>Investment Account 1</h2>
              <p>Total Equity: $24,502</p>
            </Link>
          </div>
          <div className="link-card">
            <Link className="link" to={"/checking-account-2"}>
              <h2>Investment Account 2</h2>
              <p>Total Equity: $2,212</p>
            </Link>
          </div>
          {/* Add more checking account link cards here */}
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
