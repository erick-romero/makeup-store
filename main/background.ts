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

ipcMain.on('getAllProducts', async (event, arg) => {
    var products = await prisma.producto.findMany({include: {
      Marca:true,
      Categoria: true,
      Proveedor: true
    }});
    event.returnValue = JSON.stringify(products);
});

ipcMain.on('addProduct', async (event, arg) => {
  var products = await prisma.producto.findMany({include: {
    Marca:true,
    Categoria: true,
    Proveedor: true
  }});
  event.returnValue = JSON.stringify(products);
});


