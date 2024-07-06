const express = require("express");
const signupRoute = require("./routes/Signup");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/user", signupRoute);

app.listen(PORT, () => {
    console.log('server is running on http://localhost:3000');
})