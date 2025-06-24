const User = require('../models/User')
const bcrypt = require('bcryptjs')

exports.getById = async (req, res) => {
    try{
        const {id}  = req.params
        const result = (await User.findById(id)).toObject()
        delete result.password
        res.status(200).json(result)

    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Error while trying to get user details!'})
    }
}


exports.updateById = async (req, res) => {
    try {
        const {id}  =req.params
        const updated = (await User.findByIdAndUpdate(id, req.body, {new: true})).toObject()
        delete updated.password
        res.status(200).json(updated);

    } catch (error) { 
        console.log(error);
        res.status(500).json({message: 'Error while trying to update user details!'})
    }
}

exports.changePassword = async (req, res) => {
    try {
        console.log("Change password request received:", req.body);
        console.log("User from token:", req.user);
        
        const { oldPassword, newPassword } = req.body;
        const userId = req.user._id;
        
        // Cautare user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Utilizator negăsit" });
        }
        
        // Verificare parola curenta
        const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Parola curentă este incorectă" });
        }
        
        // Aplicare algoritm hash pe noua parola
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        
        // Update parola utilizator
        await User.findByIdAndUpdate(userId, { password: hashedPassword });
        
        res.status(200).json({ message: "Parola a fost schimbată cu succes" });
    } catch (error) {
        console.error("Change password error:", error);
        res.status(500).json({ message: "Eroare la schimbarea parolei" });
    }
};