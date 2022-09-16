import mongoose from "mongoose"
import userModel from "../Models/todomodel.js"
import Jwt from "jsonwebtoken";
class todolist{
    static loginPage=(req,res)=>{
        res.render('Login.ejs',{title:"Login",file:"login",status:[]});
    }
    static registerPage=(req,res)=>{
        res.render('Signup.ejs',{title:"Sign-up",file:"signup",status:[]});
    }
    static createUser=async(req,res)=>{
        try {
            const{name,email,password,confirm_password}=req.body
            if(name && email && password && confirm_password){
                const check_user=await userModel.findOne({email:email})
                if(check_user){
                    res.send({"status":"User already exists"})
                }
                else{
                    if(password===confirm_password){
                        const create_user=new userModel({
                            name:name,
                            email:email,
                            password:password
                        })
                        await create_user.save()
                        const display_user=await userModel.findOne({email:email})
                        // Generatr Token
                        const token="Bearer "+Jwt.sign({userID:display_user._id},process.env.JWT_secret_key,{expiresIn:'180m'})
                        // res.send({"User":display_user,"token":token,"headers":req.headers.authorization})
                        res.cookie("authorization",token)
                        console.log(token);
                        res.redirect('/home')
                    }
                    else{
                        res.send({"status":"Password dosent match"})
                    }
                }
            }
            else{
                res.send({"status":"All fields are required"})
            }
        } catch (error) {
            console.log(error);
            res.send({"status":"not entered in try"})
        }
    }
    static userLogin=async (req,res)=>{
        try {
            const{email,password}=req.body;
            if(email && password){
                const check_user=await userModel.findOne({email:email})
                if(check_user && check_user.password===password){
                    const token="Bearer "+Jwt.sign({userID:check_user._id},process.env.JWT_secret_key,{expiresIn:'180m'})
                    // res.send({"User":display_user,"token":token,"headers":req.headers.authorization})
                    res.cookie("authorization",token)
                    console.log(token);
                    res.redirect('/home')
                }
                else{
                    res.send({"status":"Dosent match"})
                }
            }
            else{
                res.send({"status":"All fields required"})
            }

        } catch (error) {
            console.log(error);
        }
    }
    static home=async(req,res)=>{
        try {
            let active_task=[]
            let active_index=[]
            let stats=req.user.status
            let todo=req.user.tasks
            for(let index in stats ) {
                if(stats[index]=="Active"){
                    active_task.push(todo[index])
                    active_index.push(index)
                }
            }
            res.render('index.ejs',{title:"Home",data:active_task,db_index:active_index,user_name:req.user.name,file:"style",status:req.user.status})
        } catch (error) {
            console.log(error);
        }
    }
    static insertTask=async(req,res)=>{
        try {
            const status="Active"
            const {task}=req.body;
            if(task && status){
                await userModel.updateOne({_id:req.user._id},{$push:{tasks:task,status:status}})
                res.redirect("/home")
            }
            else{
                res.send({"Status":"No task to insert"})
            }
        } catch (error) {
            console.log(error);
        }
    }
    static options= async(req,res)=>{
        const{db_index,task,action}=req.body;
        console.log(req.body);
        if(action==="delete"){
            await userModel.updateOne({_id:req.user._id},{$set:{[`status.${db_index}`]:"Removed"}})
            res.redirect('/home')
        }
        else if(action==="done"){
            await userModel.updateOne({_id:req.user._id},{$set:{[`status.${db_index}`]:"Completed"}})
            res.redirect('/home')
        }
        else if(action==="edit"){
            await userModel.updateOne({_id:req.user._id},{$set:{[`tasks.${db_index}`]:`${task}`}})
            res.redirect('/home')
        }
    }
    static history=(req,res)=>{
        res.render('history.ejs',{title:"Tasks history",data:req.user.tasks,status:req.user.status,user_name:req.user.name,file:"style"})
    }
}
export default todolist;