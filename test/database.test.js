//run npm install --save-dev jest

//removed following from package.json script: "test": "echo \"Error: no test specified\" && exit 1"

//var connection = require('../middleware/database').databaseConnection;

const {userExists,passwordCheck,isAdmin,addToCart,insertFish,removeFish,fishExists,insertUser } = require('../middleware/database');
//const {userExists, passwordCheck} = require('./__mocks__/database');


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
/*
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
*/
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

test('checks if user Doge is inserted', () => {
    insertUser('DogeMan','doge123', 'Doge','Man', '123 rd', '','San Antonio', 'TX', 78207, (err, result) => {
        expect(result).toBe(true);
        expect(err).toBeNull();
        done();
    } )
})

test('checks if dnieto is admin', () => {
    isAdmin('dnieto', (err, result) => {
        expect(err).toBeNull();
        // Check if the user exists
        expect(result).toBe(true);
        // Call done to indicate that the test is complete
        done();
    });
});

test('checks if bhorn is admin', () => {
    isAdmin('bhorn', (err, result) => {
        expect(result).toBeNull();
        // Check if the user exists
        expect(err).toBe(false);
        // Call done to indicate that the test is complete
        done();
    });
});

test('checks if notReal is admin', () => {
    isAdmin('dnieto', (err, result) => {
        expect(result).toBeNull();
        // Check if the user exists
        expect(err).toBe(false);
        // Call done to indicate that the test is complete
        done();
    });
});

test('dnieto add to cart', () => {
    addToCart('dnieto', (err, result) => {
        expect(err).toBeNull();
        // Check if the user exists
        expect(result).not.toBeNull();
        // Call done to indicate that the test is complete
        done();
    });
});

test('bhorn add to cart', () => {
    addToCart('bhorn', (err, result) => {
        expect(err).toBeNull();
        // Check if the user exists
        expect(result).not.toBeNull();
        // Call done to indicate that the test is complete
        done();
    });
});

test('checks if globglob exists', () => {
    fishExists('globglob', (err, result) => {
        expect(err).toBe(false);
        // Check if the user exists
        expect(result).toBeNull();
        // Call done to indicate that the test is complete
        done();
    });
}); 

test('checks if Mandarinfish exists', () => {
    fishExists('Mandarinfish', (err, result) => {
        expect(err).toBeNull();
        // Check if the user exists
        expect(result).toBe(true);
        // Call done to indicate that the test is complete
        done();
    });
}); 
test('insertion of Mandarinfish', () => {
    insertFish('Mandarinfish', 5, null,'stinky', 2, (err, result) => {
        expect(err).toBe(true);
        // Check if the user exists
        expect(result).toBeNull();
        // Call done to indicate that the test is complete
        done();
    });
});

test('insertion of globglob', () => {
    insertFish('globglob', 5, null,'stinky', 2, (err, result) => {
        expect(err).toBeNull();
        // Check if the user exists
        expect(result).not.toBeNull();
        // Call done to indicate that the test is complete
        done();
    });
}); 

test('removal of Mandarinfish', () => {
    removeFish('Mandarinfish', (err, result) => {
        expect(err).toBeNull();
        // Check if the user exists
        expect(result).not.toBeNull();
        // Call done to indicate that the test is complete
        done();
    });
});

test('removal of globglob', () => {
    removeFish('globglob', (err, result) => {
        expect(err).toBe(true);
        // Check if the user exists
        expect(result).toBeNull();
        // Call done to indicate that the test is complete
        done();
    });
}); 

