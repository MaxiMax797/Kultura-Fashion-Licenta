const User = require("../models/User");
const bcrypt=require('bcryptjs');
const { sendMail } = require("../utils/Emails");
const { generateOTP } = require("../utils/GenerateOtp");
const Otp = require("../models/OTP");
const { sanitizeUser } = require("../utils/SanitizeUser");
const { generateToken } = require("../utils/GenerateToken");
const PasswordResetToken = require("../models/PasswordResetToken");

exports.signup = async(req, res) => {
    try{
        const existingUser = await User.findOne({email: req.body.email})
        if(existingUser){
            return res.status(400).json({"message":"User already exists"})
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        req.body.password = hashedPassword
        const createdUser = new User(req.body)
        await createdUser.save()
        const secureInfo = sanitizeUser(createdUser)
        const token = generateToken(secureInfo)
        res.cookie('token', token, {
            sameSite: process.env.PRODUCTION === 'true'? 'None':'Lax',
            maxAge : new Date(Date.now() + (parseInt(process.env.COOKIE_EXPIRATION_DAYS * 24 * 60 * 60 * 1000))),
            httpOnly: true,
            secure: process.env.PRODUCTION === 'true'? true:false
        })
        res.status(201).json(sanitizeUser(createdUser))
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Error during signup!"})
    }
};

exports.login = async (req, res) => {
    try{
        const existingUser = await User.findOne({email:req.body.email})
        if(existingUser && (await bcrypt.compare(req.body.password, existingUser.password))){
            const secureInfo = sanitizeUser(existingUser)
            const token = generateToken(secureInfo)
            res.cookie('token', token, {
                sameSite:process.env.PRODUCTION==='true'?"None":'Lax',
                maxAge:new Date(Date.now() + (parseInt(process.env.COOKIE_EXPIRATION_DAYS * 24 * 60 * 60 * 1000))),
                httpOnly:true,
                secure:process.env.PRODUCTION==='true'?true:false
            })
            return res.status(200).json(sanitizeUser(existingUser))
        }
        res.clearCookie('token');
        return res.status(404).json({message:"The credentials are not valid"})
    } catch(error) {
        console.log(error)
        res.status(500).json({message: "Error while logging in!"})
    }
};

exports.verifyOtp = async (req, res) => {
    try{
        const isValidUserId=await User.findById(req.body.userId)
        if(!isValidUserId) {
            return res.status(404).json({message:'The user was not found, for which the otp has been generated'})
        }
        const isOtpExisting = await Otp.findOne({user: isValidUserId._id})
        if(!isOtpExisting) {
            return res.status(404).json({message:'Otp was not found'})
        }
        if(isOtpExisting.expiresAt < new Date()){
            await Otp.findByIdAndDelete(isOtpExisting._id)
            return res.status(400).json({message:"Otp has expired"})
        }
        if(isOtpExisting && (await bcrypt.compare(req.body.otp,isOtpExisting.otp))){
            await Otp.findByIdAndDelete(isOtpExisting._id)
            const verifiedUser=await User.findByIdAndUpdate(isValidUserId._id,{isVerified:true},{new:true})
            return res.status(200).json(sanitizeUser(verifiedUser));
        }
        return res.status(400).json({message: 'Otp is either not valid or has expired'})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Some error occured!'})
    }
};

exports.resendOtp = async (req, res) => {
    try {
        const existingUser=await User.findById(req.body.user)
        if(!existingUser){
            return res.status(404).json({"message":"User not found"})
        }
        await Otp.deleteMany({user:existingUser._id})
        const otp=generateOTP()
        const hashedOtp=await bcrypt.hash(otp,10)
        const newOtp=new Otp({user:req.body.user,otp:hashedOtp,expiresAt:Date.now()+parseInt(process.env.OTP_EXPIRATION_TIME)})
        await newOtp.save()
        await sendMail(existingUser.email,`Verificare OTP pentru contul Kultura Fashion`,`Codul unic pentru verificarea OTP a contului tau este: <b>${otp}</b>.</br>Sa nu impartasesti cu nimeni acest cod OTP din motive de securitate.`)
        res.status(201).json({'message':"OTP sent"})
    } catch (error) {
        res.status(500).json({'message':"Some error occured while resending otp, please try again later"})
        console.log(error);
    }
};

exports.forgotPassword = async(req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if(!user){
            return res.status(404).json({message: "Adresa de e-mail nu există în baza de date"});
        }
        if(!user.isVerified) {
            return res.status(403).json({message: "Contul dumneavoastră nu este verificat. Vă rugăm să verificați contul înainte de a reseta parola."});
        }
        const defaultPassword = "default123";
        const hashedPassword = await bcrypt.hash(defaultPassword, 10);
        await User.findByIdAndUpdate(user._id, {password: hashedPassword});
        res.status(200).json({
            message: "Parola dumneavoastră a fost resetată la default123. Este recomandat să o modificați cât mai repede. Acest lucru se poate face în pagina profilului dumneavoastră, după ce v-ați logat."
        });
    } catch (error) {
        console.log("Error in forgot password:", error);
        res.status(500).json({message: "A apărut o eroare la resetarea parolei"});
    }
};

exports.resetPassword=async(req,res)=>{
    try {
        const isExistingUser=await User.findById(req.body.userId)
        if(!isExistingUser){
            return res.status(404).json({message:"User does not exists"})
        }
        const isResetTokenExisting=await PasswordResetToken.findOne({user:isExistingUser._id})
        if(!isResetTokenExisting){
            return res.status(404).json({message:"Reset Link is Not Valid"})
        }
        const isValidToken = await bcrypt.compare(req.body.token, isResetTokenExisting.token)
        if(isResetTokenExisting && isValidToken && isResetTokenExisting.expiresAt > new Date()){
            await PasswordResetToken.findByIdAndDelete(isResetTokenExisting._id)
            await User.findByIdAndUpdate(isExistingUser._id,{password:await bcrypt.hash(req.body.password,10)})
            return res.status(200).json({message:"Password Updated Successfuly"})
        }
        return res.status(404).json({message:"Reset Link has been expired"})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error occured while resetting the password, please try again later"})
    }
};

exports.skipOtpVerification = async (req, res) => {
    try {
        const userId = req.body.userId;
        const updatedUser = await User.findByIdAndUpdate(userId, { isVerified: true }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        await Otp.deleteMany({ user: userId });
        return res.status(200).json(sanitizeUser(updatedUser));
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error occurred while skipping verification" });
    }
};

exports.logout=async(req,res)=>{
    try {
        res.cookie('token',{
            maxAge:0,
            sameSite:process.env.PRODUCTION==='true'?"None":'Lax',
            httpOnly:true,
            secure:process.env.PRODUCTION==='true'?true:false
        })
        res.status(200).json({message:'Logout successful'})
    } catch (error) {
        console.log(error);
    }
};

exports.checkAuth=async(req,res)=>{
    try {
        if(req.user){
            const user=await User.findById(req.user._id)
            return res.status(200).json(sanitizeUser(user))
        }
        res.sendStatus(401)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
};