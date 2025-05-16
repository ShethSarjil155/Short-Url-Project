// const { getUser } = require("../services/auth");

// async function restrictToLoggedinUserOnly(req, res, next) {
//   const userUid = req.cookies?.uid;
//   if (!userUid) return res.redirect("/login");
//   const user = getUser(userUid);
//   if (!user) return res.redirect("/login");
//   req.user = user;
//   next();
// }

// async function checkAuth(req, res, next) {
//   const userUid = req.cookies?.uid;

//   const user = getUser(userUid);

//   req.user = user;
//   next();
// }

// module.exports = {
//   restrictToLoggedinUserOnly,
//   checkAuth,
// };

const { getUser } = require("../services/auth");

async function restrictToLoggedinUserOnly(req, res, next) {
  const userUid = req.cookies?.uid;
  if (!userUid) return res.redirect("/login");

  try {
    const user = await getUser(userUid);
    if (!user) return res.redirect("/login");

    req.user = user;
    next();
  } catch (error) {
    console.error("Error fetching user:", error);
    res.redirect("/login");
  }
}

async function checkAuth(req, res, next) {
  const userUid = req.cookies?.uid;

  try {
    const user = await getUser(userUid);
    req.user = user;
  } catch (error) {
    console.error("Error fetching user:", error);
  }

  next();
}

module.exports = {
  restrictToLoggedinUserOnly,
  checkAuth,
};
