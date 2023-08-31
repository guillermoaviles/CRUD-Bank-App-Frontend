import "./App.css";
import { Routes, Route } from "react-router-dom";
 
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import CheckingAccount from "./pages/CheckingAccount";
import SavingsAccount from "./pages/SavingsAccount";
import InvestmentAccount from "./pages/InvestmentAccount";
 
function App() {
  return (
    <div className="App">
      <Navbar />
 
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/accounts/checking/:accountId" element={<CheckingAccount />} />
        <Route path="/accounts/savings/:accountId" element={<SavingsAccount />} />
        <Route path="/accounts/investment/:accountId" element={<InvestmentAccount />} />
      </Routes>
    </div>
  );
}
 
export default App;