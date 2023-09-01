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
        <Route path="/accounts/checking/:accountId" element={<CheckingAccount />} />
        <Route path="/accounts/savings/:accountId" element={<SavingsAccount />} />
        <Route path="/accounts/investment/:accountId" element={<InvestmentAccount />} />
        <Route path="/accounts/investment/:accountId" element={<SendMoney />} />
        <Route path="/accounts/investment/:accountId" element={<Summary />} />
      </Routes>
    </div>
  );
}
 
export default App;