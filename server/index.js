import { encrypt, decrypt } from "./handleEncryption.js";
import mysql from "mysql2";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const PORT = 3001;
app.use(bodyParser.json());
app.use(cors());

//mysql connection not working for my device :( //
const db = mysql.createPool({
  host: "localhost",
  user: 'root',
  password: " ",
  database: "encryption_password", //this was my workbench file called//
});

  app.post('/inputpassword', ({ body }, res) => {
    var { heading, password } = body;
    var hashPassword = encrypt(password);
  });

  var SQL = "INSERT INTO passwords (heading, password, value_required) VALUES (?, ?, ?)";
  
  try 
  {
    var[result] = await db.query(SQL, [heading, hashPassword.password, hashPassword.code_required]);
    console.log(result);
    } catch (err)
    {
    console.log(err);
  }

app.get("/showpasswords", async (req, res) => {
  try {
    var SQL = "SELECT * FROM passwords";
    var [result] = await db.query(SQL);
    res.send(result);
  } catch (err)
   {
    console.log(err);
  }
});

app.post("/encryptpassword", ({ body }, res) => {
  res.send(encrypt(body));
});

app.listen(PORT, () => {
  console.log("Server running on port: http://localhost:${PORT}");
});
