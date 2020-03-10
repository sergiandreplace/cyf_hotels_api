const express = require("express");
const app = express();
const { Pool } = require("pg");
const secrets = require("./secrets");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "cyf_hotels",
  password: secrets.dbPassword,
  port: 5432
});

console.log(secrets);

app.get("/hotels", function(req, res) {
  pool.query("SELECT * FROM hotels", (error, result) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.json(result.rows);
    }
  });
});

app.listen(3000, function() {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});
