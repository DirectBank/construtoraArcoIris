var fs = require('fs');
var path = require('path');
const argumento = process.argv;

var empresasFileName = './scripts/empresas.json';
var empresasFile = JSON.parse(fs.readFileSync(empresasFileName).toString());

var name = 'capacitor.config.json';

var capConfigFile = JSON.parse(fs.readFileSync(name).toString());
// const platform = argumento.slice(2).toString()
// console.log(platform)
console.log(argumento.slice(2).toString())
const nomeEmpresa = argumento.slice(2).toString()

const currentEmpresa = empresasFile[nomeEmpresa]

capConfigFile.appId = currentEmpresa.appId;
capConfigFile.appName = currentEmpresa.appName;

fs.writeFileSync(name, JSON.stringify(capConfigFile));

const SOURCE_ANDROID_ICON = 'projects/' + nomeEmpresa + '/icon.png';
const SOURCE_ANDROID_SPLASH = 'projects/' + nomeEmpresa + '/splash.png';

const TARGET_ANDROID_ICON = './resources/icon.png';
const TARGET_ANDROID_SPLASH = './resources/splash.png';
copyFile(SOURCE_ANDROID_ICON, TARGET_ANDROID_ICON);
copyFile(SOURCE_ANDROID_SPLASH, TARGET_ANDROID_SPLASH);

function copyFile(sourcePath, targetPath) {
    fs.copyFile(sourcePath, targetPath, err => {
        if (err) {
            console.log(err)
            throw err
        };
        console.log(`${sourcePath} >> ${targetPath}`);
    });
}

const deleteFolderRecursive = function (directoryPath) {
    if (fs.existsSync(directoryPath)) {
        fs.readdirSync(directoryPath).forEach((file, index) => {
            const curPath = path.join(directoryPath, file);
            if (fs.lstatSync(curPath).isDirectory()) {
                // recurse
                deleteFolderRecursive(curPath);
            } else {
                // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(directoryPath);
    }
};

deleteFolderRecursive("./android")