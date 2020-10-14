$(document).ready(() => {
    $('#div-loggedin').hide();

    $('#btn-name').click(() => {
        $('#div-loggedin').show();
        $('#div-name').hide();
    })
})


// Gegevens van de client.
const mqttHost = "farmer.cloudmqtt.com";
const mqttPort = 34511;
const user = "itiwppsz";
const password = "BkRYsnNyy_tk";


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

// Klikken op de knop, koppelen met een actie...
document.getElementById("btn-send").addEventListener("click", () => {
    const name = getName();
    const inputMessage = $('#input-message').val();
    const fullmsg = `${name} says:<br>${inputMessage}`
    const message = new Paho.MQTT.Message(fullmsg);
    message.destinationName = "demo";       // Moet gelijk zijn aan 'topic'.
    client.send(message);
})

function onConnected() {
    client.subscribe("demo",
        {
            onSuccess: onSubscribed
        }
    );
}

function getName() {
    return $('#input-name').val()
}

function onMessageArrived(message) {
    const d = new Date();
    const h = d.getHours();
    const m = d.getMinutes();
    const s = d.getSeconds();

    document.getElementById("div-sub").innerHTML += `${message.payloadString}<br> (${h}:${m}:${s})<br><br>`;
}

function onSubscribed(invocationContext) {
    console.log("onSubscribed");
}

console.log(client)








