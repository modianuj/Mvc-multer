const registerUser = require("../models/registerUser");
const jsonweb = require('jsonwebtoken')

module.exports = {
  api: (req, res) => {
    if (req.body.password == req.body.confirm_password) {
      registerUser.findOne(
        { username: req.body.username },
        (error, userRecord) => {
          if (!userRecord) {
            registerUser.create(
              {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                username: req.body.username,
              },
              (error, record) => {
                if (error) {
                  console.log("register user failed");
                  return res.json({ msg: "register failed" });
                } else {
                  console.log("register data successfully");
                  return res.json({ msg: "register successfully" });
                }
              }
            );
          } else {
            return res.json({ msg: "username already exists" });
          }
        }
      );
    } else {
      return res.json({ msg: "password and confirm password are not match" });
    }
  },
  loginData : (req,res)=> {
    registerUser.findOne({email : req.body.email} , (error,user)=> {
      if (error) {
        console.log(`user login problem`)
        return false
      }
      if (!user || user.password != req.body.password) {
        console.log(`password and user not found`)
        res.json({"msg" : "password or user not match"})
        return false
      }
      console.log(user); 
      let token = jsonweb.sign(user.toJSON(), 'secret' , {expiresIn : "1d"});
      return res.json({"token" : token})
    })
  },
  viewData : async (req,res)=> {
    var record = await registerUser.find({});
    if(!record) {
      console.log(`record not found`)
      return false
    }
    return res.json({'record' : record})
  }
};
