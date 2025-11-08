import bcrypt from 'bcryptjs';
import User from '../models/user.js';
import speakeasy from 'speakeasy';
import qrcode from 'qrcode';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            password: hashedPassword,
            isMfaActive: false,
        });
        console.log("new user", newUser);
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: "error registering user", message: "Server error" });
    }
};


export const login = async (req, res) => {
    console.log("The authenticated user is :", req.user);
    res.status(200).json({ message: "Login successful", user: req.user.username });
    isMfaActive: req.user.isMfaActive
};
export const authStatus = async (req, res) => {
    if(req.user){
        res.status(200).json({ authenticated: true, user: req.user.username, isMfaActive: req.user.isMfaActive });
    }else{
        res.status(401).json({ message: "Unauthorized user" });
    }
};
export const logout = async (req, res) => {

    if(!req.user) res.status(401).json({ message: "Unauthorized user" });
    req.logout((err) => {
        if (err)  return res.status(400).json({  message: "User not logged in " });
        res.status(200).json({ message: "Logout successful" });
    });

};


export const setup2FA = async (req, res) => {
    try {
        console.log("The req.user is ", req.user);
        const user = req.user;
        var secret = speakeasy.generateSecret();
        console.log("The secret object is : ", secret)
        user.twoFactorSecret = secret.base32;
        user.isMfaActive = true;
        await user.save();
        const url =  speakeasy.otpauthURL({
            secret: secret.base32,
            label: `MyApp (${user.username})`,
            issuer: 'MyApp',
            encoding: 'base32'
        })
        const qrImageUrl = await qrcode.toDataURL(url);
        res.status(200).json({ message: "2FA setup successful", qrImageUrl });
    } catch (error) {
        res.status(500).json({ error: "error setting up 2FA", message: "Server error" });
    }
};

export const verify2FA = async (req, res) => {
    const { token } = req.body;
    const user = req.user;
    const verified = speakeasy.totp.verify({
        secret: user.twoFactorSecret,
        encoding: 'base32',
        token,
    });
    if (verified) {
        const jwtToken = jwt.sign(
            {username: user.username},
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.status(200).json({ message: "2FA verification successful", token: jwtToken }
        )
    } else {
        res.status(400).json({ message: "Invalid 2FA token" });
    }
};

export const reset2FA = async (req, res) => {
    try {
        const user = req.user;
        user.twoFactorSecret = null;
        user.isMfaActive = false;
        await user.save();
        res.status(200).json({ message: "2FA reset successful" });
    } catch (error) {
        res.status(500).json({ error: "error resetting 2FA", message: "Server error" });
    }
};