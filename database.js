const client = require("index.js")
const bcrypt = require('bcrypt');
const { genPassword } = require("./logic");

const dbClient = client.db("HRHIRE");

//Getting or Checking users in the list
async function getEmployer(mail){
    const ce = await dbClient.collections("Employers").findOne({mail : mail});
    return ce;
}

async function getJobSeeker(mail){
    const cj = await dbClient.collections("JobSeeker").findOne({mail : mail});
    return cj;
}

async function checkUser(mail){
    const checkEmployer = await getEmployer(mail);
    if(checkEmployer == null){
        const checkJobSeeker = await getJobSeeker(mail);
        if(checkJobSeeker == null){
            return null;
        }
        return checkJobSeeker;
    }
    return checkEmployer;
}

//Validating users
async function validateEmployer(mail,password){
    const ce = await dbClient.collections("Employers").findOne({mail : mail,password : password});
    return ce;
}

async function validateJobSeeker(mail,password){
    const cj = await dbClient.collections("JobSeeker").findOne({mail : mail,password : password});
    return cj;
}

async function validateUser(mail,password){
    const checkEmployer = await checkUser(mail);
    if(checkEmployer == null){
        return null;
    }
    const cb = await bcrypt.compare(password,checkEmployer.password);
    return cb ? "success" : "failed"
}


//Registering User
async function registerUser(userDetail){
    const checkUser = await checkUser(userDetail.mail);
    if(checkUser == null){
        switch(userDetail.type){
            case "Employer":
                await dbClient.collections("Employers").insertOne({
                    type : "Employer",
                    mail : userDetail.mail,
                    firstName : userDetail.firstName,
                    lastName : userDetail.lastName,
                    password : await genPassword(userDetail.password)
                })
                return "success";
            case "JobSeeker":
                await dbClient.collections("Employers").insertOne({
                    type : "Employer",
                    mail : userDetail.mail,
                    firstName : userDetail.firstName,
                    lastName : userDetail.lastName,
                    password : await genPassword(userDetail.password)
                })
                return "success";
        }
        return "failed";
    }
    return null;
}

module.exports = {registerUser,checkUser,getEmployer, getJobSeeker, validateUser}