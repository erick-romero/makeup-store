import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
   try{

   
    if (req.method === 'POST') {
        var props = req.body
        console.log(props.contraseña);
        

       var user = await prisma.usuario.findFirst({
        where:{
                id : parseInt(props.userId),
                contrasena: props.contraseña
        }
       })
       
       if(user){
        console.log("here");
        
        res.status(200).json({ user: user, text: "Access Granted!", props: props});
       }  else  {
        res.status(200).json({ text: "Access Denied!", user:user});
       }   
    } 
    else 
    {
    res.status(405).json({ text: 'Method Not Allowed' });
    }
} catch(ex){
    console.log(ex)
    res.status(500).json({ text: 'Server Error!' });
   }
}