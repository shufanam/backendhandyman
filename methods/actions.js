var User = require('../models/user')
var jwt = require('jwt-simple')
var config = require('../config/dbconfig')
const multer = require('multer')
const proPic = require('../models/proPic')
const nicFront = require('../models/nicFront')
const nicBack = require('../models/nicBack')
// const cloudinary = require('cloudinary')



var functions = {

    addNewCustomer: function (req,res){
        if((!req.body.email) || (!req.body.password) || (!req.body.phone) || (!req.body.fName) || (!req.body.gender) || (!req.body.district)){
            res.json({success: false, msg: 'Please fill all the required fields'})
        }
        else{
            var newCustomer = User({
                fName: req.body.fName,
                lName: req.body.lName,
                phone: req.body.phone,
                email: req.body.email,
                password: req.body.password,
                gender: req.body.gender,
                district: req.body.district
            });
            newCustomer.save(function(err, newCustomer){
                if(err){
                    res.json({success:false , msg:'Failed to save'})
                }
                else{
                    res. json({success: true, msg: 'Successfully Registered'})
                }
            })
        }
    },
    addNewWorker: function (req,res){
        if((!req.body.email) || (!req.body.password) || (!req.body.phone) || (!req.body.fName) || (!req.body.gender) || (!req.body.district) || (!req.body.city) || (!req.body.jobType)){
            res.json({success: false, msg: 'Please fill all the required fields'})
        }
        else{
            var newWorker = User({
                fName: req.body.fName,
                lName: req.body.lName,
                phone: req.body.phone,
                email: req.body.email,
                password: req.body.password,
                gender: req.body.gender,
                district: req.body.district,
                city: req.body.city,
                jobType: req.body.jobType
            });
            newWorker.save(function(err, newWorker){
                if(err){
                    res.json({success:false , msg:'Failed to save'})
                }
                else{
                    res. json({success: true, msg: 'Successfully Registered'})
                }
            })
        }
    },
    uploadProPic: function (req,res){
        if((!req.body.email) || (!req.body.url)){
            res.json({success: false, msg: 'Please fill all the required fields'})
        }
        else{
            var newPropic = proPic({
                email: req.body.email,
                url: req.body.url,
            });
            newPropic.save(function(err, newPropic){
                if(err){
                    res.json({success:false , msg:'Failed to save'})
                }
                else{
                    res. json({success: true, msg: 'Successfully Registered'})
                }
            })
        }
    },
    uploadNicFront: function (req,res){
        if((!req.body.email) || (!req.body.url)){
            res.json({success: false, msg: 'Please fill all the required fields'})
        }
        else{
            var newNicFront = nicFront({
                email: req.body.email,
                url: req.body.url,
            });
            newNicFront.save(function(err, newNicFront){
                if(err){
                    res.json({success:false , msg:'Failed to save'})
                }
                else{
                    res. json({success: true, msg: 'Successfully Registered'})
                }
            })
        }
    },
    uploadNicBack: function (req,res){
        if((!req.body.email) || (!req.body.url)){
            res.json({success: false, msg: 'Please fill all the required fields'})
        }
        else{
            var newNicBack = nicBack({
                email: req.body.email,
                url: req.body.url,
            });
            newNicBack.save(function(err, newNicBack){
                if(err){
                    res.json({success:false , msg:'Failed to save'})
                }
                else{
                    res. json({success: true, msg: 'Successfully Registered'})
                }
            })
        }
    },
    loginCustomer: function(req,res){
        User.findOne({
            email: req.body.email
        }, function(err,user){
            if(err) throw err
            if(!user){
                res.json({success:true, msg: 'User not found!'})  
            }
            else{
                user.comparePassword(req.body.password, function(err,isMatch){
                    if(isMatch && !err){
                        var token = jwt.encode(user, config.secret)
                        res.json({success:true, token: token})  
                    }
                    else{
                        res.json({success:true, msg: 'Incorrect Credentials!'})  
                    }
                })
            }
        })
    },
    checkEmailAvailability: function(req,res){
        User.findOne({
            email: req.body.email
        }, function(err,user){
            if(err) throw err
            if(!user){
                res.json({success:true})
            }
            else{
                res.json({success:false})
            }
        })
    },
    checkPhoneAvailability: function(req,res){
        User.findOne({
            phone: req.body.phone
        }, function(err,user){
            if(err) throw err
            if(!user){
                res.json({success:true})
            }
            else{
                res.json({success:false})
            }
        })
    },
    // getPropic: async function(req,res){
    //     try{
    //         const propic = await proPicModel.findOne({
    //             email: "abcd@gmail.com"
    //         })
    //         // console.log(propic+"asdsda")
    //         res.json(propic)
    //     }catch(err){
    //         res.send('Error'+err)
    //     }
        
    // },
    getinfo: function(req,res){
        if(req.headers.authorization && req.headers.authorization.split(' ')[0]==='Bearer'){
            var token = req.headers.authorization.split(' ')[1]
            var decodedToken = jwt.decode(token,config.secret)
            return res.json({success:true,msg:'Hello '+decodedToken.fName})
        }
        else{
            return res.json({success:false, msg:'No headers'})
        }
    },

} 

module.exports = functions