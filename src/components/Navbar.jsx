import { NavLink } from "react-router-dom";
import bpprLogo from "../assets/bpprLogo.png";

function Navbar() {
  return (
    <nav className="Navbar">
      <NavLink
        to="/"
      >
        <img src={bpprLogo} alt="Banco Popular logo" />
      </NavLink>
    </nav>
  );
}

export default Navbar;
