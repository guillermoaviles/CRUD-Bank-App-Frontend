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

  /*
  Imaginemos: 
  Tenemos un componente que se llama Tickets. 
  Sabemos que:
    - Cuando un ticket es de ingreso su amount es positivo
    - Cuando un ticket es de gasto su amount es negativo

  ¿Qué hacemos? Pedimos a la base de datos TODOS los tickets de un usuario y los almacenamos en la varible: 
  ticketsRaw;

  ticketsUpdated = ticketsRaw;

  ticketsUpdated.filter -> amount >0     ===> Esta función almacenará todos los tickets de ingreso
  ticketsUpdated.filter -> amount <0     ===> Esta almacenará solo los de gasto
  ticketsUpdated.filter -> destination.id ====> Esta filtrará por cuenta de destino

  ticketsUpdated => Estoy es un array con objetos en su posición 0,1,2,3,4...

  ticketsUpdated[0] => Esto es un objeto completo. 

  ticketsUpdated[0] = {
    id: id
    accountTotal: 100;
    amount: 20;
    date: fecha
  }

  ======================================================================================
  1º Se genera el ticket de gasto. 
  2º Se añade el ticket de gasto a la cuenta de envio -> True aparezca la cuenta como from y además sea true
  3º Se genera el ticket de ingreso.
  4º Se añade el ticket de ingreso a la cuenta de ingreso -> aparezca la cuenta como destination y además sea false

  Formula es x - i o account total - amount

  ¿Cómo calcular el amount inicial y meterlo en un array?
  Imaginemos que tenemos el array AR con 10 elementos. 
  Hacemos: 
  initialCash = objeto tipo ticket
  initialCash.amount = AR[0].accountTotal - AR[0].amount;
  AR.shift(initialCash); 
  => Hemos conseguido que AR[0].amount tenga almacenado el dinero inicial de la cuenta.

  De ahora en adelante podemos usar el bucle for normalmente, ya que los datos han sido normalizados.


  Ejemplo, una cuenta tiene 0 y se le ha añadido 5, por lo que su valor final es 5. 
  La fórmula es -> Valor final - cantidad = valor inicial. 
  5 - 5 = 0;
  */

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
        const investmentResponse = await axios.get(
          "http://localhost:8080/api/accounts/investment"
        );
        const investmentAccounts = investmentResponse.data;

        // Merge checking and investment accounts into a single array
        mergedAccounts = [...checkingAccounts, ...investmentAccounts];

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
