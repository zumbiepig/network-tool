import { app, BrowserWindow, protocol } from 'electron';
//import indexHtml from "./index.html" with { type: "file"};

const createWindow = (): void => {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
	});

	void win.loadFile('./index.html');
};

void app.whenReady().then(() => {
	protocol.registerFileProtocol('file', (request, callback) => {
    const url = request.url.substring(7); // Remove 'file://' prefix
    const filePath = decodeURIComponent(url);
    
    try {
      // Override MIME type for TypeScript files
      if (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) {
        callback({
          path: filePath,
          headers: {
            'Content-Type': 'application/x-typescript'
          }
        });
      } else {
        callback({ path: filePath });
      }
    } catch (error) {
      console.error(error);
      callback({ error: -6 }); // NET::ERR_FILE_NOT_FOUND
    }
  });

	createWindow();

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});

app.on('web-contents-created', (event, contents) => {
  contents.setWindowOpenHandler(() => {
    return { action: 'deny' };
  });
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});
