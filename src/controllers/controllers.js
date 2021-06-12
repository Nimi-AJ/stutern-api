import {User} from '../model/user.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUserController = async(request, response) => {
    const {firstName, email, password} = request.body;
    

    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            firstName,
            email,
            password: hashedPassword
        })
        const res = await newUser.save();
        if(res){
            return response.json({
                status: 'success',
                message: 'Created Successfully',
                data: res
            })
        }
        
        response.status(500).json({
            status: 'fail',
            message: 'Damn, an error occurred'
        });
    } catch(err) {
        response.send(err);
        console.log(err)
    }
}

export const loginController = async (request, response) => {
    const {email, password} = request.body;

    try{
        //validate input
        if(!email || !password){
            return response.status(400).json({
                status: "fail",
                message: "email or password can not be empty"
            })
        }
        //find user
        const authUser = await User.findOne({email});
        if(!authUser){
            return response.status(400).json({
                status: "fail",
                message: "User not found"
            })
        }
        //compare password
        const isMatch =  await bcrypt.compare(password, authUser.password);

        if(isMatch){
            const payload =  {
                id: authUser.id,
                email: authUser
            }

            //create token
            const authToken = await jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: 86400});
            return response.status(200).json({
                status: "success",
                message: "success",
                token: "Bearer" + authToken
            })
        }
        
    }catch(err){
        console.log(err);
        response.status(500).json({
            status: "fail",
            err
        }) 
    }
    
}