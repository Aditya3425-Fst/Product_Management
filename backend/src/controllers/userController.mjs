import userModel from '../models/userModel.mjs';
import jwt from 'jsonwebtoken'
const registerUser = async function (req, res) {
  try {
    const { email } = req.body;
    
    const check = await userModel.findOne({email:email})
    if(check){
      return res.status(400).send({status:false, message:"duplicate email"})
    }
    const data = await userModel.create(req.body)
    console.log(data);
    return res.status(201).send({ status: true, data: data })

  } catch (err) {
    if (err.message.includes('validation')) {
      return res.status(400).send({ status: false, message: err.message })
    }
    else if (err.message.includes('duplicate')) {
      return res.status(400).send({ status: false, message: err.message })
    }
    else {
      return res.status(500).send({ status: false, message: err.message })
    }

  }
}
const login = async function (req, res) {
  try {
    const {email,password} = req.body
    
    const user = await userModel.findOne({email,password})
    if (!user) {
      return res.status(401).send({ status: false, message: "Please Enter correct user name and password" })
    }
    const token = jwt.sign({ userId: user._id.toString() }, "userCreatedToken")
    res.setHeader('x-api-key',token)
    console.log(token);
    return res.status(200).send({ status:true, data:{
      token:token, userId: user.id}});
  } catch (error) {
     return res.status(500).send({status:false, message:error.message})
  }
}

export { registerUser,login }