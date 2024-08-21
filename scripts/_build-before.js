var fs = require('fs');
var path = require('path');
module.exports = function(context) {

    if (platform == "android") {

        // Cria a pasta ios com os arquivos pre configurados caso não exista
        if (!fs.existsSync('./android')) {
            fs.mkdirSync('./android', {
                recursive: true
            });

        }
    }
    // } else if () {}
    const argumento = process.argv
    const platform = argumento[4]
    // console.log(platform)
    const nomeEmpresa = argumento.find((el) => el.includes("--project")).split("=")[1];
    console.log(nomeEmpresa)
    const SOURCE_GOOGLE_MANIFEST = 'projects/' + nomeEmpresa + '/AndroidManifest.xml';
    const SOURCE_GOOGLE_SERVICES = 'projects/' + nomeEmpresa + '/google-services.json';
    const SOURCE_GOOGLE_SERVICES_INFO = 'projects/' + nomeEmpresa + '/GoogleService-info.plist';

    const TARGET_GOOGLE_MANIFEST = 'android/app/src/main/AndroidManifest.xml';
    const TARGET_GOOGLE_SERVICES = 'android/app/google-services.json';
    const TARGET_GOOGLE_SERVICES_INFO = 'ios/app/GoogleService-info.plist';

    function copyFile(sourcePath, targetPath) {
        fs.copyFile(sourcePath, targetPath, err => {
            if (err) {
                console.log(err)
                throw err
            };
            console.log(`${sourcePath} >> ${targetPath}`);
        });

    }

    if (platform === 'android') copyFile(SOURCE_GOOGLE_SERVICES, TARGET_GOOGLE_SERVICES);
    if (platform === 'android') copyFile(SOURCE_GOOGLE_MANIFEST, TARGET_GOOGLE_MANIFEST);
    else if (platform === 'ios') copyFile(SOURCE_GOOGLE_SERVICES_INFO, TARGET_GOOGLE_SERVICES_INFO)
}