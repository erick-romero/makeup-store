import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
   try{
    if (req.method === 'GET') {
        

       var products = await prisma.producto.findMany({include: {
        Marca:true,
        Categoria: true,
        Proveedor: true
       }});
     
        res.status(200).json({ text:"Producto obtenidos correctamente", products: products});
       
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