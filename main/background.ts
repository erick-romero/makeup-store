import { app,ipcMain } from 'electron';
import serve from 'electron-serve';
import { createWindow } from './helpers';
import { PrismaClient } from "@prisma/client";

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
    await mainWindow.loadURL('app://./home.html');
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
