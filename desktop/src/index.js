const { app, BrowserWindow } = require('electron');

let window;// Чтобы не собирать мусор, объявляем window в виде переменной
// Указываем детали окна браузера
function createWindow() {
    window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });
    // Загружаем HTML-файл
    window.loadFile('index.html');
    // При закрытии окна сбрасываем объект
    window.on('closed', () => {
        window = null;
    });
}
// Когда electron готов, создаем окно приложения
app.on('ready', createWindow);

// Выходим при закрытии всех окон
app.on('window-all-closed', () => {
// В macOS выходим, только если пользователь явно закрывает приложение
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
app.on('activate', () => {
// В macOS повторно создаем окно при нажатии иконки в панели dock
    if (window === null) {
        createWindow();
    }
});
