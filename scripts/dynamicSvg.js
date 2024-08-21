var svgns = "http://www.w3.org/2000/svg";
var xlinkns = "http://www.w3.org/1999/xlink";
var empresas = require('./empresas.json')

console.log(empresas.ompplus.primaryColor)
GetParams()
// const SOURCE_SVG = './src/assets/icons/receitas';
// const SOURCE_SVG_FAVS = './src/assets/icons/favs';
// console.log(SOURCE_SVG)

function GetParams() {

    // var sParams = document.defaultView.location.href.split("?")[1].split("&");
    // var oObjects = document.getElementsByClassName('dynamic');
    // console.log(window.getComputedStyle(window.parent.document.body).getPropertyValue("--ion-color-primary"))
    // console.log(window.getComputedStyle(window.parent.document.body).getPropertyValue("--ion-color-primary-yellow"))
    var colors = {
        primary: empresas.ompplus.primaryColor,
        secondary: empresas.ompplus.yellowColor
    }

    document.querySelectorAll('.dynamic-fill-primary').forEach(element => element.setAttribute("fill", colors.primary));
    document.querySelectorAll('.dynamic-fill-secondary').forEach(element => element.setAttribute("fill", colors.secondary));
    document.querySelectorAll('.dynamic-stroke-primary').forEach(element => element.setAttribute("stroke", colors.primary));
    document.querySelectorAll('.dynamic-stroke-secondary').forEach(element => element.setAttribute("stroke", colors.secondary));

    // for (i = 0; i < sParams.length; i++) {
    //     // debugger
    //     var sName = sParams[i].split('=')[0]
    //     // var sValue = sParams[i].split('=')[1]
    //     var sValue = sParams[i].split('=')[1]

    //     for (j = 0; j < oObjects.length; j++) {
    //         oObjects[j].setAttribute(sName, sValue)
    //     }

    // }
}
