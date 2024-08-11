const bcrypt = require('bcrypt');

async function genPassword(saltRounds = 10, password){
    const salt = await bcrypt.salt(saltRounds);
    return await bcrypt.hash(password,salt);
}


module.exports = {genPassword}