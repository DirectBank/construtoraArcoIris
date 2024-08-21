var fs = require('fs-extra');
var plist = require('plist');
var path = require('path');
var pkg = require('../package.json');
var empresas = require('./empresas.json')
let date = new Date();
var buildCode = `${date.getFullYear() - Number.parseInt(pkg.anoCriacao) + 1}.${date.getDate().toString()}.${(date.getUTCMonth() + 1).toString()}.${date.getHours().toString()}.${date.getMinutes().toString()}`;
const { exec } = require("child_process");
const { execSync } = require('child_process');

function copyFile(sourcePath, targetPath) {
    fs.copyFile(sourcePath, targetPath, err => {
        if (err) {
            console.log(err)
            throw err
        };
        console.log("\x1b[32m", `${sourcePath} >> ${targetPath}`);
    });
}

const deleteFolderRecursive = function (directoryPath) {

    if (fs.existsSync(directoryPath)) {
        fs.readdirSync(directoryPath).forEach((file, index) => {
            const curPath = path.join(directoryPath, file);
            // console.log(curPath);
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

//Fim Funções uteis

// console.log("====env v ======================================")
// console.log(process.env)
// console.log("====env ^ = argv v =============================")
// console.log(process.argv)
// console.log("====argv ^ ======================================")
// console.log("====CI v =======================================")
// console.log(process.env)
// console.log("====CI ^ =======================================")

let SOURCE_GOOGLE_SERVICES, SOURCE_GOOGLE_SERVICES_INFO, TARGET_GOOGLE_SERVICES, TARGET_GOOGLE_SERVICES_INFO;
let nomeEmpresa;
let platform;
let production;

if (process.env.CI_GIT_COMMIT_MSG) {
    platform = process.env.CI_PLATFORM;
    nomeEmpresa = process.env.APP_NAME;
    // platform = platform == "web" ? "android" : platform;
    platform = process.env.CI_PLATFORM;
    // production = process.env.ENVIRONMENT === 'PRODUCTION' ? true : false
    if (platform === 'android') {
        production = process.env.BUILD_TYPE === 'release' ? true : false
    } else if (platform === 'ios') {
        production = process.env.GYM_EXPORT_METHOD === 'development' ? false : true
    }
    else {
        production = true;
    }
}
else {
    nomeEmpresa = process.env.npm_config_project;
    platform = process.env.npm_config_platform ? process.env.npm_config_platform : "android";
    production = process.env.npm_config_production ? true : false;
    // console.log(process.env.npm_config_platform )
}
// console.log(process.env.npm_config_production)

console.log(process.env)
console.log(production)

const targetPath = './src/environments/choosen-project.ts';
const choosenProjectContent = `const project = "${nomeEmpresa}";\n export default project;`

fs.writeFileSync(targetPath, choosenProjectContent, function (err) {
    if (err) {
        throw console.error("\x1b[31m", err);
    } else {
        console.log("\x1b[32m", `Angular choosen-project.ts file generated correctly at ${targetPath} \n`);
    }
});
// console.log(process.env)
// console.log(production)
// Configuracoes do capacitor config
var capacitorConfig = 'capacitor.config.json';
var capConfigFile = JSON.parse(fs.readFileSync(capacitorConfig).toString());
const currentEmpresa = empresas[nomeEmpresa];

if (platform == "android") {
    capConfigFile.appId = currentEmpresa.appId;
}
if (platform == "ios") {
    capConfigFile.appId = currentEmpresa.appId_ios;
}

capConfigFile.appName = currentEmpresa.appName;

fs.writeFileSync(capacitorConfig, JSON.stringify(capConfigFile), function (err) {
    if (err) {
        throw console.error("\x1b[31m", err);
    } else {
        console.log("\x1b[32m", `capacitor.config.json file generated correctly at ${targetPath} \n`);
    }
});

if (platform == "android") {
    try {
        // Cria a pasta ios com os arquivos pre configurados caso não exista
        if (!fs.existsSync('./android')) {
            fs.mkdirSync('./android', {
                recursive: true
            });

        }
        // execSync('ng build --project=' +nomeEmpresa)

        // var versionCode = `${date.getFullYear() - 2000}.${(date.getUTCMonth() + 1).toString().padStart(2, "0")}.${date.getDate().toString().padStart(2, "0")}.${date.getHours().toString().padStart(2, "0")}`;

        // versionCode = versionCode.replace(/\./g, '');
        // versionCode = parseInt(versionCode.replace(/\./g, ''));

        // if (nomeEmpresa === 'ompplus') {
        //     pkgFile.versionCode = empresas[nomeEmpresa].versionCode + 1;
        // } else {
        //     pkgFile.versionCode = versionCode;
        // }
        // pkgFile.version = empresas[nomeEmpresa].version

        var pkgFileName = 'package.json';
        var pkgFile = JSON.parse(fs.readFileSync(pkgFileName).toString());
        pkgFile.bundleName = empresas[nomeEmpresa].appId;

        fs.writeFileSync(pkgFileName, JSON.stringify(pkgFile));
        if (fs.existsSync('./android')) {
            deleteFolderRecursive('./android')
        }
        
        execSync('ionic build  --project=' + nomeEmpresa)
        execSync('ng build --project=' + nomeEmpresa)
        execSync('npx cap add android')

        fs.copySync('./projects/' + nomeEmpresa + '/android/res/', './android/app/src/main/res');
        fs.copySync('./projects/' + nomeEmpresa + '/android/build.gradle', './android/app/build.gradle');
        fs.copySync('./projects/' + nomeEmpresa + '/android/AndroidManifest.xml', './android/app/src/main/AndroidManifest.xml');
        //  fs.copySync('./projects/' + nomeEmpresa + '/android/variables.gradle', './android/app/variables.gradle');

    } catch (err) {
        console.log(err);
    }

}

if (platform == 'ios') {

    try {

        // Deleta a pasta ios caso exista
        if (fs.existsSync('./ios')) {
            deleteFolderRecursive('./ios')
        }

        fs.mkdirSync('./ios', {
            recursive: true
        });
        // Copia Assets.xcassets dos icones e splash com base na empresa
        fs.copySync('./projects/' + nomeEmpresa + '/ios', './ios/');

        console.log("\x1b[32m", `Custom ios generated correctly at ./ios \n`);

        //Configurações no arquivo info.plist
        let path = './ios/App/App/Info.plist';
        let plistObj = plist.parse(fs.readFileSync(path).toString(), 'utf8');


        //Adição da versão
        console.log("\x1b[33m", `==== version build (IOS): ${buildCode} ==== `);
        plistObj.CFBundleShortVersionString = pkg.version;
        plistObj.CFBundleVersion = buildCode;

        //Adiçao das permissões
        plistObj.NSBluetoothAlwaysUsageDescription = 'To Access Contacts Nearby';
        plistObj.NSBluetoothPeripheralUsageDescription = 'To Access Contacts Nearby';
        plistObj.NSCalendarsUsageDescription = 'To Access Contacts Agenda';
        plistObj.NSCameraUsageDescription = 'The application needs access to your camera to capture photos so you can send them to register ocorrences, ask for mainenance, lost and founds and more.';
        plistObj.NSContactsUsageDescription = 'To Access Contacts Number';
        plistObj.NSHumanReadableCopyright = '';
        plistObj.NSLocationAlwaysUsageDescription = 'Always allow Geolocation?';
        plistObj.NSLocationWhenInUseUsageDescription = 'Allow Geolocation?';
        plistObj.NSMicrophoneUsageDescription = 'To Record Audio With Video';
        plistObj.NSBluetoothPeripheralUsageDescription = 'To Access Contacts Nearby';
        plistObj.NSMotionUsageDescription = 'To Access Phone Movement';
        plistObj.NSPhotoLibraryAddUsageDescription = 'Store camera photos to camera';
        plistObj.NSPhotoLibraryUsageDescription = 'To Pick Photos from Library';
        plistObj.UIBackgroundModes = ['remote-notification'];
        plistObj.NSFaceIDUsageDescription = 'Required for authentication';
        plistObj.NSLocationAlwaysAndWhenInUseUsageDescription = 'This app requires constant access to your location in order to track your position, even when the screen is off or the app is in the background.';
        plistObj.NSRemindersUsageDescription = 'This app requires reminders access to function properly.';
        plistObj.IonChannelName = production === true ? 'Production' : 'Development';
        plistObj.IonUpdateMethod = 'none';
        plistObj.IonMinBackgroundDuration = '30';
        plistObj.IonMaxVersions = pkg.version;
        plistObj.IonAppId = currentEmpresa.appFlow_appId;
        plistObj.IonApi = 'https://api.ionicjs.com';

        let plisArq = plist.build(plistObj);

        fs.writeFile(path, plisArq, function (err) {
            if (err) {
                throw console.error("\x1b[31m", err);
            } else {
                console.log("\x1b[32m", `Angular info.plist file generated correctly at ${path} \n`);
            }
        });

    } catch (err) {
        console.log("\x1b[31m", err);
    }

    // // Remove a pasta de Assets.xcassets dos icones e splash
    // deleteFolderRecursive("./ios/App/App/Assets.xcassets");

    // // Copia Assets.xcassets dos icones e splash com base na empresa
    // fs.copy('./projects/' + nomeEmpresa + '/ios/Assets.xcassets', './ios/App/App', function (err) {
    //     if (err) {
    //         throw console.error(err);
    //     } else {
    //         console.log(`Angular Assets.xcassets file generated correctly at ./ios/App/App \n`);
    //     }
    // });

}

SOURCE_GOOGLE_SERVICES = 'projects/' + nomeEmpresa + '/google-services.json';
SOURCE_GOOGLE_SERVICES_INFO = 'projects/' + nomeEmpresa + '/GoogleService-info.plist';
TARGET_GOOGLE_SERVICES = 'android/app/google-services.json';
TARGET_GOOGLE_SERVICES_INFO = 'ios/App/GoogleService-info.plist';

if (platform === 'android') copyFile(SOURCE_GOOGLE_SERVICES, TARGET_GOOGLE_SERVICES);
//else if (platform === 'ios') copyFile(SOURCE_GOOGLE_SERVICES_INFO, TARGET_GOOGLE_SERVICES_INFO);

// Reset = "\x1b[0m"
// Bright = "\x1b[1m"
// Dim = "\x1b[2m"
// Underscore = "\x1b[4m"
// Blink = "\x1b[5m"
// Reverse = "\x1b[7m"
// Hidden = "\x1b[8m"

// FgBlack = "\x1b[30m"
// FgRed = "\x1b[31m"
// FgGreen = "\x1b[32m"
// FgYellow = "\x1b[33m"
// FgBlue = "\x1b[34m"
// FgMagenta = "\x1b[35m"
// FgCyan = "\x1b[36m"
// FgWhite = "\x1b[37m"

// BgBlack = "\x1b[40m"
// BgRed = "\x1b[41m"
// BgGreen = "\x1b[42m"
// BgYellow = "\x1b[43m"
// BgBlue = "\x1b[44m"
// BgMagenta = "\x1b[45m"
// BgCyan = "\x1b[46m"
// BgWhite = "\x1b[47m"

console.log("\x1b[37m", "==========================");
console.log("\x1b[34m", "=== Iniciando a build ===");
console.log("\x1b[36m", "=== Produto: " + nomeEmpresa + " ===");
console.log("\x1b[36m", "=== Bundle ID: " + capConfigFile.appId + " ===");
console.log("\x1b[36m", "=== Version: " + pkg.version + " ===");
console.log("\x1b[36m", "=== Plataforma: " + platform + " ===");
console.log("\x1b[37m", "==========================");
console.log("\x1b[0m");

let command;
if (platform == 'android') {
    command = production ? "ng build --project=" + nomeEmpresa + ' --prod' : "ng build --project=" + nomeEmpresa;
} else if (platform == 'ios') {
    command = production ? `ionic cap build ${platform} --project=${nomeEmpresa} --prod` : `ionic cap build ${platform} --project=${nomeEmpresa}`;
}
// console.log(command)
// if (platform == 'android') {
    // execSync(`ionic deploy configure  --update-method=none --app-id="${currentEmpresa.appFlow_appId}" --channel-name="${production ? 'Production' : 'Development'}"`)
// }


exec(command, (error, stdout, stderr) => {
    if (error) {
        console.log("\x1b[31m", `error: ${error.message}`);
        return;
    }
    if (stderr) {
        if (stderr.toString().indexOf('WARNING')) {
            console.log("\x1b[33m", `stderr: ${stderr}`);
            console.log("\x1b[32m")
            return
        }
        console.log("\x1b[32m", `stderr: ${stderr}`);
        console.log("\x1b[32m")
        return;
    }
    console.log("\x1b[32m", `stdout: ${stdout}`);
});