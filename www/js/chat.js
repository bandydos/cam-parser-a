$(document).ready(() => {
    $('#div-loggedin').hide();
    $('#p-errormsg').css('color', 'red');
    $('#btn-name').click(() => {
        const inputName = $('#input-name').val();
        if (inputName) {
            $('#div-loggedin').show();
            $('#div-name').hide();
            $('#p-errormsg').hide();
        } else $('#p-errormsg').text('Please fill in name.');
    })

    $('#btn-send').click(() => {
        send();
    })
})

// Client specs.
const mqttHost = "farmer.cloudmqtt.com";
const mqttPort = 34511;
const user = "itiwppsz";
const password = "BkRYsnNyy_tk";
const topic = "demo";

// Generate id and create client.
const clientId = Math.floor(Math.random() * 10001);
const client = new Paho.MQTT.Client(mqttHost, Number(mqttPort), String(clientId));

client.onMessageArrived = onMessageArrived;

// Connection to broker.
client.connect(
    {
        onSuccess: onConnected,
        userName: user,
        password: password,
        useSSL: true
    }
);

// When connected.
function onConnected() {
    client.subscribe(topic,
        {
            onSuccess: onSubscribed
        }
    );
}

function onSubscribed(invocationContext) {
    console.log("onSubscribed");
}

// Send.
function send() {
    const name = $('#input-name').val();
    const inputMessage = $('#input-message').val();
    const fullmsg = `${name} says:<br>${inputMessage}`
    const message = new Paho.MQTT.Message(fullmsg);
    message.destinationName = topic;       // Moet gelijk zijn aan 'topic'.
    if (inputMessage) {
        $('#p-errormsg').hide();
        client.send(message);
    } else {
        $('#p-errormsg').show();
        $('#p-errormsg').text('Please fill in message.');
    }
}

function displayMessage(message) {
    const ptaghead = '<p class="border border-success" style="border-radius:20px">';
    return ptaghead + message + '</p><br>';
}

// When something comes in - goes out.
function onMessageArrived(message) {
    const d = new Date();
    const h = d.getHours();
    const m = d.getMinutes();
    const s = d.getSeconds();

    document.getElementById("div-sub").innerHTML += displayMessage(`${message.payloadString}<br> (${h}:${m}:${s})`);

    const dSub = document.getElementById('div-sub');
    dSub.scrollTop = dSub.scrollHeight; // Scroll to bottom.
}