const express = require("express");
const { ConnectToMongoDb } = require("./connect");
const cookieParser = require("cookie-parser");
const path = require("path");
const URL = require("./models/url");
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");
const { restrictToLoggedinUserOnly, checkAuth } = require("./middlewares/auth");
const { version } = require("os");

const app = express();
const PORT = 4000;

ConnectToMongoDb("mongodb://localhost:27017/short-url").then(() =>
  console.log("MongoDb Connected")
);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkAuth);
app.use("/", staticRoute);
app.use("/url", restrictToLoggedinUserOnly, urlRoute);
app.use("/user", userRoute);

// app.use(cookieParser());

// app.use("/", checkAuth, staticRoute);
// app.use("/url", restrictToLoggedinUserOnly, urlRoute);
// app.use("/user", userRoute);

// app.get("/url/:shortId", async (req, res) => {
//   const shortId = req.params.shortId;
//   const entry = await URL.findOneAndUpdate(
//     {
//       shortId,
//     },
//     {
//       $push: {
//         visitHistory: { timestamp: Date.now() },
//       },
//     }
//   );
//   res.redirect(entry.redirectURL);
// });

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  // Log the shortId for debugging purposes
  console.log(`Received shortId: ${shortId}`);

  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: { timestamp: Date.now() },
      },
    },
    { new: true } // This option returns the updated document
  );

  if (entry) {
    res.redirect(entry.redirectURL);
  } else {
    res.status(404).send("URL not found");
  }
});

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
