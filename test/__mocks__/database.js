function userExists(username, callback) {
  // Simulate user existence check
  if (username === 'dnieto' || username === 'test') {
    callback(null, true); // User exists
  } else {
    callback(err); // User does not exist
  }
}

function passwordCheck(username, password, callback) {
  // Simulate password check
  if (username === 'dnieto' && password === 'pass123') {
    callback(null, true); // Password is valid
  } else {
    callback(null, false); // Password is invalid
  }
}

// Export mock functions
module.exports = { userExists, passwordCheck };