import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/user.context";

function HomePage() {
  const { isLoading, user } = useContext(UserContext);
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
      {user?.checkingAccounts &&
        showCheckingAccounts &&
        user.checkingAccounts.map((checkingAccount) => (
          <div className="account-card" key={checkingAccount.accountNumber}>
            <Link
              className="link"
              to={`/accounts/checking/${checkingAccount.accountNumber}`}
            >
              <h2>Checking Account {checkingAccount.accountNumber}</h2>
              <p>Available Balance: ${checkingAccount.balance}</p>
            </Link>
          </div>
        ))}

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
        <h2 className="account-type">
          My Investment Accounts ({user?.investmentAccounts.length})
        </h2>
      </div>
      {user?.investmentAccounts &&
        showInvestmentAccounts &&
        user.investmentAccounts.map((investmentAccount) => (
          <div className="account-card" key={investmentAccount.accountNumber}>
            <Link
              className="link"
              to={`/accounts/investment/${investmentAccount.accountNumber}`}
            >
              <h2>Investment Account {investmentAccount.accountNumber}</h2>
              <p>Total Equity: ${investmentAccount.balance}</p>
            </Link>
          </div>
        ))}

      <div className="card">
        <Link className="card-button" to={`/user/sendMoney/${user.id}`}>
          Send Money
        </Link>
        <Link className="card-button" to={"/summary"}>
          Summary
        </Link>
        <Link className="card-button" to={"/"}>
          Add Checking Account
        </Link>
        <Link className="card-button" to={"/button4"}>
          Add Savings Account
        </Link>
        <Link className="card-button" to={"/button4"}>
          Add Investment Account
        </Link>
        <Link className="card-button" to={"/button4"}>
          Contact Customer Service
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
