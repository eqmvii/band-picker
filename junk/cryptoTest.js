// crypto example from bcrypt docs

var bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';

var secretPassword;

bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {
        secretPassword = hash;
        console.log(`Original password: ${myPlaintextPassword}; Hash: ${hash}`);
        checkPassword(myPlaintextPassword, hash, function (res) {
            console.log(res);
            checkPassword("awalrus", hash, function (res) {
                console.log(res);
            })

        })

    });
});


function checkPassword(original, hash, cb) {
    console.log(`Checking...`);
    bcrypt.compare(original, hash, function (err, res) {
        console.log("Compared!");
        cb(res);
    });
}
