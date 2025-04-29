import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import User from '../model/user.js'
import Token  from '../model/token.js'


dotenv.config();

export const signupHandler = async(request, response) =>{
    try{
        const {name , username, password} = request.body;
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({name, username, password : hashedPassword});
        await newUser.save();
        return response.status(200).json({msg : "signup successfully"})
    }catch(error){
        return response.status(500).json({msg :"some error while signing up"});
    }
    
}


export const loginUser = async (request, response) => {
    let user = await User.findOne({ username : request.body.username})

    if(!user){
        return response.status(400).json({ msg : "user not found"})
    }

    try{
        let match = await bcrypt.compare(request.body.password , user.password)

        const payload = { username: user.username, id: user._id };

        if(match){
            const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, { expiresIn: '15m'})
            const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET )
            const newToken = new Token ({token : refreshToken})
            await newToken.save();
            return response.status(200).json({accessToken: accessToken, refreshToken : refreshToken, username: user.username, name: user.name})
        }
        else{
            return response.status(400).json({ msg : 'something went wrong'})
        }

    }catch(error){
        return response.status(400).json({msg : "password not match"})
    }
}