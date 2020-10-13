document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}

const options = {
    quality: 50,
    destinationType: Camera.DestinationType.FILE_URI,
    sourceType: Camera.PictureSourceType.CAMERA,
    mediaType: Camera.MediaType.PICTURE,
    encodingType: Camera.EncodingType.JPEG,
    cameraDirection: Camera.Direction.BACK,
    targetWidht: 300,
    targetHeight: 400
}

function takePicture() {
    navigator.camera.getPicture(onSuccess, onFail, options);
}

document.getElementById('btn-takepicture').addEventListener('click', () => {
    takePicture();
})

function onSuccess(imgURI) {
    document.getElementById('img-msg').textContent = imgURI;
    document.getElementById('img-src').src = imgURI;
}

function onFail(msg) {
    alert(`Failed: ${msg}`);
}
