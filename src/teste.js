const bcrypt = require('bcrypt');

let senha = 1234

let hashpassword= bcrypt.hashSync(senha, 10)

console.log(hashpassword);