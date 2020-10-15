document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}

// Options for image.
const options = {
    quality: 50,
    targetWidth:400,
    targetHeight: 400
}

//  Take piceture (when succes => onSuccess callback).
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
    
    // Display image and some text.
    document.getElementById('img-msg').textContent = `Your image from ${h}:${m}:${s}`;
    document.getElementById('img-src').src = imgURI;
}

function onFail(msg) {
    // When image is cancelled.
    alert(`Failed: ${msg}`);
}
