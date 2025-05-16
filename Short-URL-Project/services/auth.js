// const sessionIdToUserMap = new Map();

// function setUser(id, user) {
//   sessionIdToUserMap.set(id, user);
// }

// function getUser(id) {
//   return sessionIdToUserMap.get(id);
// }

// module.exports = {
//   setUser,
//   getUser,
// };

const sessionIdToUserMap = new Map();

function setUser(id, user) {
  sessionIdToUserMap.set(id, user);
}

async function getUser(id) {
  // Simulate async operation if fetching from a database
  return new Promise((resolve) => {
    resolve(sessionIdToUserMap.get(id));
  });
}

module.exports = {
  setUser,
  getUser,
};
