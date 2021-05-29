// Test route for all access -- users that are either logged in or not logged in
exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};
  
// Test route only for users that are logged in
exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};