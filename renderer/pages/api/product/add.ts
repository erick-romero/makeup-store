import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
   try{
    if (req.method === 'POST') {
        var props = req.body
       

       await prisma.producto.create({
        data:{
            Categoria_Id: props.categoria,
            Nombre: props.nombre,
            Descripcion: props.descripcion,
            Marca_Id: props.marca,
            Proveedor_Id: props.proveedor,
            Costo: props.costo,
            Precio: props.precio,
            Inventario: props.inventario
        }
       })
     
        res.status(200).json({ text:"Producto creado correctamente" });
       
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