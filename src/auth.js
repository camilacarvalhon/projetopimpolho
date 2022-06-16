const crypto=  require('crypto');
const alg = 'aes-256-ctr';
const pwd = 'abcdabcd'


function  criptografa(params){
    const cipher = crypto.createCipher(alg, pwd);
    const crypted = cipher.update(text, 'utf8', 'hex');
    return crypted;
}

module.exports = criptografa;