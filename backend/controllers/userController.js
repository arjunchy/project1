import bcrypt from 'bcrypt'

import User from '../model/user.js'


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