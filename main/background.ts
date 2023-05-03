import { app,ipcMain } from 'electron';
import serve from 'electron-serve';
import { createWindow } from './helpers';
import { PrismaClient } from "@prisma/client";
import { log } from 'console';

const prisma = new PrismaClient();

const isProd: boolean = process.env.NODE_ENV === 'production';

if (isProd) {
  serve({ directory: 'app' });
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
  });

  if (isProd) {
    await mainWindow.loadURL('app://./login.html');
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/login`);
    mainWindow.webContents.openDevTools();
  }
})();

app.on('window-all-closed', () => {
  app.quit();
});

ipcMain.on('getAllProducts', async (event, args) => {
    var products = await prisma.producto.findMany({include: {
      Marca:true,
      Categoria: true,
      Proveedor: true
    }});
    
    event.returnValue = JSON.stringify(products);
});

ipcMain.on('addProduct', async (event, args) => {
  var props = JSON.parse(args)
  try {
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

     event.returnValue = true;
  } catch (error) {
    event.returnValue = false;
  }
  

   
});

ipcMain.on('login', async (event,args) => {
    var props = JSON.parse(args)
    
  try {
    var user = await prisma.usuario.findFirst({
      where:{
              id : parseInt(props.userId),
              contrasena: props.contrasena
      }
     })
     
     if(user){
      event.returnValue = JSON.stringify({user:user, success:true});
     }  else  {
      event.returnValue = JSON.stringify({user:user, success:false});;
     }   

  } catch (error) {
    event.returnValue = JSON.stringify({user:user, success:false});;
  }
  

   
});

ipcMain.on('getAllUsers', async (event, args) => {
  var users = await prisma.usuario.findMany({include: {
    Tipo_Usuario:true
  }});
  
  event.returnValue = JSON.stringify(users);
});

ipcMain.on('addUser', async (event, args) => {
var props = JSON.parse(args)
console.log(props);

try {
  await prisma.usuario.create({
    data:{
        Tipo_Usuario_Id: parseInt(props.tipoUsuario),
        nombre: props.nombre,
        apellido: props.apellido,
        correo_electronico: props.correo,
        telefono: props.telefono,
        contrasena: props.contrasena
    }
   })
console.log(props);

   event.returnValue = true;
} catch (error) {
  console.log(error);
  event.returnValue = false;
}


 
});

ipcMain.on('getFilteredProducts', async (event, args) => {

  var products = await prisma.producto.findMany({include: {
    Marca:true,
    Categoria: true,
    Proveedor: true
  }});
  
  if(args != ""){
    products = products.filter(x => x.Nombre.toLowerCase().includes(args.toLowerCase()))
  }

  event.returnValue = JSON.stringify(products);
});
ipcMain.on('getFilteredProductsByProvider', async (event, args) => {

  var products = await prisma.producto.findMany({include: {
    Marca:true,
    Categoria: true,
    Proveedor: true
  }});
  console.log(products);
  products = products.filter(x => x.Proveedor.id == args)
  

  event.returnValue = JSON.stringify(products);
});

ipcMain.on('addSale', async (event, args) => {


  var props = args
 
  
  try {
     var precio_total = props.reduce((accumulator, object) => {
      return accumulator + (object.cantidad * object.product.Costo);
    }, 0)
    await prisma.venta.create({
      data:{
        
          Usuario_Id: 1,
          Precio_Total: precio_total,
          Fecha_Venta: new Date(),
          
      }
     })
     const latestQuery = await prisma.venta.findMany({
      orderBy: {
          id: 'desc',
      },
      take: 1,
    })
    
    
for (let obj of props){
  console.log(obj);
  
  await prisma.detalle_Venta.create({
    data:{
        Venta_Id: latestQuery[0].id,
        Producto_Id: obj.product.id,
        Cantidad:obj.cantidad
    }
   })

   await prisma.producto.update({
    where:{
      id: obj.product.id
    },
    data:{
      Inventario: obj.product.Inventario - obj.cantidad
    }
   })
}


    
     event.returnValue = true;
  } catch (error) {
    console.log(error);
    
    event.returnValue = false;
  }

  //Falta restar el stock de los productos
});
ipcMain.on('addCompra', async (event, args) => {


  var props = args
 
  
  try {
     var precio_total = props.reduce((accumulator, object) => {
      return accumulator + (object.cantidad * object.product.Precio);
    }, 0)
    await prisma.compra.create({
      data:{
          Proveedor_Id: 1,
          Usuario_Id: 1,
          Costo_Total: precio_total,
          Fecha_Compra: new Date(),
      }
     })
     const latestQuery = await prisma.compra.findMany({
      orderBy: {
          id: 'desc',
      },
      take: 1,
    })
    
    
for (let obj of props){
  console.log(obj);
  
  await prisma.detalle_Compra.create({
    data:{
        Compra_Id: latestQuery[0].id,
        Producto_Id: obj.product.id,
        Cantidad:obj.cantidad
    }
   })

   await prisma.producto.update({
    where:{
      id: obj.product.id
    },
    data:{
      Inventario: obj.product.Inventario + obj.cantidad
    }
   })
}


    
     event.returnValue = true;
  } catch (error) {
    console.log(error);
    
    event.returnValue = false;
  }

  //Falta restar el stock de los productos
});

ipcMain.on('getAllProviders', async (event, args) => {
  var products = await prisma.proveedor.findMany();
  
  event.returnValue = JSON.stringify(products);
});
ipcMain.on('getAllMarcas', async (event, args) => {
  var products = await prisma.marca.findMany();
  
  event.returnValue = JSON.stringify(products);
});
ipcMain.on('getAllCategorias', async (event, args) => {
  var products = await prisma.categoria.findMany();
  
  event.returnValue = JSON.stringify(products);
});

