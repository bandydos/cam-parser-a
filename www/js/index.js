document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}

// document.getElementById('p-text').innerHTML = "sqf"

// const options = {
//     quality: 50,
//     destinationType: Camera.DestinationType.FILE_URI,
//     sourceType: Camera.PictureSourceType.CAMERA,
//     mediaType: Camera.MediaType.PICTURE,
//     encodingType: Camera.EncodingType.JPEG,
//     cameraDirection: Camera.Direction.BACK,
//     targetWidht: 300,
//     targetHeight: 400
// }

const options = {
    quality: 50,
    targetWidth:400,
    targetHeight: 400
}

function takePicture() {
    navigator.camera.getPicture(onSuccess, onFail, options);
}

document.getElementById('btn-takepicture').addEventListener('click', () => {
    takePicture();
})

function onSuccess(imgURI) {
    const d = new Date()
    const h = d.getHours();
    const m = d.getMinutes();
    const s = d.getSeconds();

    document.getElementById('img-msg').textContent = `Your image from ${h}:${m}:${s}!`;
    document.getElementById('img-src').src = imgURI;
}

function onFail(msg) {
    alert(`Failed: ${msg}`);
}
