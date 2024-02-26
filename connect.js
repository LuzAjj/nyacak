const ping = require('ping');
const network = require('network');

// Function to ping a server
function pingServer(host, callback) {
    ping.sys.probe(host, (isAlive) => {
        callback(isAlive);
    });
}

// Function to get network information
function getNetworkInfo(callback) {
    network.get_gateway_ip((err, gatewayIp) => {
        if (err) {
            callback(err);
            return;
        }
        
        network.get_interfaces_list((err, interfaces) => {
            if (err) {
                callback(err);
                return;
            }

            callback(null, {
                gatewayIp: gatewayIp,
                interfaces: interfaces
            });
        });
    });
}

// Usage example
const serverHost = 'YOUR_SERVER_HOST_IP'; // Replace with your server's IP address

pingServer(serverHost, (isAlive) => {
    if (isAlive) {
        console.log(`Ping to ${serverHost} successful.`);
    } else {
        console.log(`Unable to ping ${serverHost}.`);
    }
});

getNetworkInfo((err, info) => {
    if (err) {
        console.error('Error retrieving network information:', err);
        return;
    }
    
    console.log('Gateway IP:', info.gatewayIp);
    console.log('Interfaces:', info.interfaces);
});
