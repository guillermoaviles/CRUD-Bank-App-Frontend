import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="home-container">
  <h2>Welcome to your Account</h2>
  <div className="link-card">
    <Link className="link" to={"/beers"}>
      <h2>My Checking Accounts</h2>
    </Link>
  </div>
  <div className="link-card">
    <Link className="link" to={"/random-beer"}>
      <h2>My Savings Accounts</h2>
    </Link>
  </div>
  <div className="link-card">
    <Link className="link" to={"/new-beer"}>
      <h2>My Investment Accounts</h2>
    </Link>
  </div>
  <div className="card">
    <Link className="card-button" to={"/button1"}>Send Money</Link>
    <Link className="card-button" to={"/button2"}>Summary</Link>
    <Link className="card-button" to={"/button3"}>Button 3</Link>
    <Link className="card-button" to={"/button4"}>Button 4</Link>
  </div>
</div>

  );
}

export default HomePage;
