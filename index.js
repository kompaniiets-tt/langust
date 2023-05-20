const express = require('express');
require('dotenv').config();
require("./config/db").connect();

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

const app = express();
app.use(express.json());


const cors = require("cors");
var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

app.post("/welcome", (req, res) => {
  res.send({ "answer": "Welcome 🙌 " });
});


// app.get('/', (req, res) => res.send('Hello Worldssssss!'));
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


// routes
require('./routes/auth.routes')(app);
require('./routes/system-entities.routes')(app);
require('./routes/words.routes')(app);


// // require('dotenv').config();
// // require("./config/db").connect();
// const express = require("express");
// const app = express();
// // app.use(express.json());
// // const cors = require('cors');
// // app.use(cors({origin: "*"}))

// // const { API_PORT } = process.env;
// const port = 3333;

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

// // routes
// require('./routes/auth.routes')(app);
// require('./routes/system-entities.routes')(app);
// require('./routes/words.routes')(app);