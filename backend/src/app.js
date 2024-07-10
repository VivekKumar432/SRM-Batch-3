const express = require("express");
const signupRoute = require("./routes/signup");
const loginRoute = require("./routes/login");
const userRoute = require("./routes/user"); // Corrected import
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const createAdminAccount = require("./scripts/admin");
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

createAdminAccount();

app.use("/user", signupRoute); 
app.use("/auth", loginRoute);
app.use("/api", userRoute); // Corrected route

app.listen(PORT, () => {
    console.log(`Server is running on : http://localhost:${PORT}`);
});