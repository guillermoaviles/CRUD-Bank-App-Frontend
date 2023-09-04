import "./App.css";
import { Routes, Route } from "react-router-dom";
 
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import CheckingAccount from "./pages/CheckingAccount";
import SavingsAccount from "./pages/SavingsAccount";
import InvestmentAccount from "./pages/InvestmentAccount";
import SendMoney from "./pages/SendMoney";
import Summary from "./pages/Summary";
 
function App() {
  return (
    <div className="App">
      <Navbar />
 
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/user/accounts/checking/:userId/:accountId" element={<CheckingAccount />} />
        <Route path="/user/accounts/savings/:userId/:accountId" element={<SavingsAccount />} />
        <Route path="/user/accounts/investment/:userId/:accountId" element={<InvestmentAccount />} />
        <Route path="/user/sendMoney/:userId" element={<SendMoney />} />
        <Route path="/user/summary/:userId" element={<Summary />} />
      </Routes>
    </div>
  );
}
 
export default App;