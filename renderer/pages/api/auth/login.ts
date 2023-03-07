import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
   
    
    if (req.method === 'POST') {
        var props = req.body
        console.log(typeof props);
        
        
       var user = await prisma.usuario.findFirst({
        where:{
            AND: {
                id : props.userId,
                contrasena: props.contraseña
            }
        }
       })
       
       console.log(user);

       if(user){
        res.status(200).json({ user: user, text: "Access Granted!"});
       }  else  {
        res.status(200).json({ text: "Access Denied!", user:user});
       }   
      } else {
        res.status(405).json({ text: 'Method Not Allowed' });
      }
    
}