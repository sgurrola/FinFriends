//run npm install --save-dev jest

//removed following from package.json script: "test": "echo \"Error: no test specified\" && exit 1"


const {userExists,passwordCheck,isAdmin,addToCart,insertFish,removeFish,fishExists,insertUser } = require('./database');
const {handleLogin} = require('./login');
const {addToDatabase} = require('./prodpage');
const {handleStocking} = require('./product_add');
const {handleSignup} = require('./signup');

test('checks if user dnieto exists', () => {
    expect(userExists(dnieto)).toBe(exists);
});

test('checks if user poopy exists', () => {
    expect(userExists(poopy)).toBe(err);
});

test('checks if user dnieto password is valid (yes)', () => {
    expect(passwordCheck(dnieto, pass123)).toBe(match);
});

test('checks if user dnieto password is valid (no)', () => {
    expect(passwordCheck(dnieto, wsfiejf)).toBe(err);
});