import userModel from "../model/userModel.js"

export const create = async(req, res)=>{
    try {
        const userData = new userModel( req.body );
        const { email } = userData;

        const userExist = await userModel.findOne( { email } )

        if(userExist){
            return res
            .status(400)
            .json( { message: "user already exist !!" } )
        }

        const savedUser = await userData.save();
        return res
        .status(200)
        .json( { message: "user created successfull", savedUser } )

        
    } catch (error) {
        res
        .status(500)
        .json( { error: "Internal Server error !!" } )

    }
}


export const fetch = async(req, res)=>{
    try {
        const users = await userModel.find();

        if(users.length === 0){
            return res
            .status(404)
            .json( { message: "no user found !!" } )
        }
        return res
        .status(200)
        .json(users)
        
    }catch (error) {
        res
        .status(500)
        .json({error: "Internal Server error !!"})
    }
}


export const update =  async(req, res)=>{
    try {
        const findUser = req.params.email;
        const userExist = await userModel.findOne({ email: findUser }) 
        if (!userExist){
            return res
            .status(404)
            .json( { error: "User is not found yet !!" } )
        }
        const updateUser = await userModel.findOneAndUpdate(
            {email: findUser}, 
            req.body,
            {new:true}
        )
        return res
        .status(200)
        .json({ message: "User updated successfully", updateUser } );

    } catch (error) {
        res
        .status( 500 )
        .json( { error: "Internal Server error !!!" } )

    }
}


export const deleteuser = async(req, res)=>{
    try {
        const finduser = req.params.email;
        const userExist = await userModel.findOne( { email: finduser } )
        if( !userExist ){
            return res
            .status(404)
            .json( { error: "user doesn't exist " } )
        }

        const remove = await userModel.findOneAndDelete( { email: finduser } )
        return res
        .status(200)
        .json({message: "User remove successfull ", remove})
    } catch (error) {
        return res
        .status(500)
        .json({error: "Internal Server error !!"})
    }
}
