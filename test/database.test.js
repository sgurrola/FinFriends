//run npm install --save-dev jest

//removed following from package.json script: "test": "echo \"Error: no test specified\" && exit 1"

//var connection = require('../middleware/database').databaseConnection;

//const {userExists,passwordCheck,isAdmin,addToCart,insertFish,removeFish,fishExists,insertUser } = require('../middleware/database');
const {userExists, passwordCheck} = require('./__mocks__/database');
const {handleLogin} = require('../middleware/login');
const {addToDatabase} = require('../middleware/prodpage');
const {handleStocking} = require('../middleware/product_add');
const {handleSignup} = require('../middleware/signup');

test('checks if user dnieto exists', (done) => {
    userExists('dnieto', (err, exists) => {
        // Check if there's no error
        expect(err).toBeNull();
        // Check if the user exists
        expect(exists).toBe(true);
        // Call done to indicate that the test is complete
        done();
    });
});
test('checks if user test exists', (done) => {
    userExists('test', (err, exists) => {
        // Check if there's no error
        expect(err).toBeNull();
        // Check if the user exists
        expect(exists).toBe(true);
        // Call done to indicate that the test is complete
        done();
    });
});

test('checks if user notReal exists', () => {
    userExists('notReal', (err, exists) => {
        // Check if there's no error
        expect(exists).toBeNull();
        // Check if the user exists
        expect(err).toBe(false);
        // Call done to indicate that the test is complete
        done();
    });
});

test('checks if user dnieto password is valid (yes)', () => {
    passwordCheck('dnieto', 'pass123', (err, match) => {
        // Check if there's no error
        expect(err).toBeNull();
        // Check if the user exists
        expect(match).toBe(true);
        // Call done to indicate that the test is complete
        done();
    });
});

test('checks if user dnieto password is valid (no)', () => {
    passwordCheck('dnieto', 'wsfiejf', (err, match) => {
        // Check if there's no error
        expect(match).toBeNull();
        // Check if the user exists
        expect(err).toBe(false);
        // Call done to indicate that the test is complete
        done();
    });
});