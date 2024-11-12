
import {connectMongoose} from "@/app/db/database"
import user from "../db/schema/user";


export async function createUser(email:String, password:String){
    await connectMongoose()
    return await new user({ email,password}).save();
}