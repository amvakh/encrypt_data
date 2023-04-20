import "./App.css";
import { useState} from "react";
import Axios from "axios";

function App() 
{
  var [heading, setHeading] = useState(''); 
  var [password, setPassword] = useState(''); 
  var [passwordList, setPasswordList] = useState([]); 

  useState(() => 
  {
       Axios.get("http://localhost:3001/showpasswords")
      .then(response => setPasswordList(response.data))
      .catch(error => console.error(error));
  }, 
  []
  );

  var inputPassword = () => 
  {
    return Axios.post("http://localhost:3001/inputpassword",
      {
        heading,
        password
      })
      .then(response => {
        setPasswordList(response.data);
      })
      .catch(error => console.error(error));
  }
    //encrypting function//
    var encryptPassword = async (encryption) => 
    {
      try {
        var process = await Axios.post('http://localhost:3001/decryptpassword', {
          password: encryption.password,
          value_required: encryption.value_required,
        });
        var updatePasswordList = passwordList.map((reply) => {
          if (reply.id === encryption.id) 
          {
            return{
              id: reply.id,
              heading: process.data,
              password: reply.password,
              value_required: reply.value_required,
            };
          } else {
            return reply;
          }
        });
        setPasswordList(updatePasswordList);
      } catch (error) 
      {
        console.error(error);
      }
    }; 
    
// button doesn't work until database is added, >_< halp! //
  return(
    <div className="App">
      <h1></h1>
      <text style= {{fontSize: 35}}>encrypt password</text>

     <div className="inputpassword">
        <input
          type="text"
          return="password"
          id="password"
          placeholder="enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={inputPassword}>Click to Encrypt! </button>
      </div>
      <div className="password_value">
  {passwordList.map((reply, primaryKey) => (
    <div
      className="password"
      onClick={() =>
        encryptPassword({
          password: reply.password,
          value_required: reply.value_required,
          id: reply.value_required,
        })
      }
      primaryKey={primaryKey.toString()}
    >
      <h2>{reply.heading}</h2>
      </div>
  ))}
</div>
</div>
  );
}
export default App;
