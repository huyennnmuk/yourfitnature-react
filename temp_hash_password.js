const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const saltRounds = 10;
const myPlaintextPassword = 'yourfitnature_test_password';

const userId = uuidv4();

bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
    if (err) {
        console.error(err);
        return;
    }
    console.log(`Generated UUID: ${userId}`);
    console.log(`Hashed Password: ${hash}`);
});
