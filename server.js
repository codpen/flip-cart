const express = require("express");
var cookieParser = require("cookie-parser");
var cors = require('cors');
require("dotenv").config({ path: "./config/.env" });

require("./config/DBConnection");
const useRouter = require("./routes/router");

const app = express();

const origin = process.env.FRONTEND_URL;

//app uses
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser({
  origin,
}));
app.use(useRouter);

const port = process.env.PORT || 5000;

app.use((req, res, next) => {
  if (req.header('x-forwarded-proto') !== 'https') {
    res.redirect(`https://${req.header('host')}${req.url}`)
  } else {
    next();
  }
});


/* if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} */

app.listen(port, () => console.log(`Server is running at ${port}`));
