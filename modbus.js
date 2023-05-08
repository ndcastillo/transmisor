const https = require('https');
const axios = require('axios');

const ModbusRTU = require("modbus-serial");
const client = new ModbusRTU();

// Parámetros de conexión
const port = "/dev/ttyUSB0";
const baudRate = 9600;
const parity = "none";
const dataBits = 8;
const stopBits = 1;

// Conección al inversor
client.connectRTUBuffered(port, { baudRate, parity, dataBits, stopBits }, (err) => {
    if (err) {
        console.error("Error al conectar:", err);
        process.exit(1);
    }
    console.log("Conexión exitosa");
});



const serverIdInversor = 1; // Id del puerto a utilizar en el inversor
const startAddress = 3000; // Registro del protocolo
const numRegisters = 83; //Numero de registros a Extraer
const sampleTime = 1000; // Tiempo de Muestreo, tiempo por petición.



    const readLoop = setInterval(() => {
    
        client.setID(serverIdInversor);
        client.readHoldingRegisters(startAddress, numRegisters)
            .then((valores) => {
                // data.data sera un array con todos los valores del inversor
    
                datos = {
                    "energia": valores.data[14],
                    "tension": valores.data[21],
                    "corriente": valores.data[22],
                    "temperatura": valores.data[41],
                    "frecuencia": valores.data[42],
                }
    
                console.log(`Registros Fundamentales:\n\n Energia: ${datos}
                              \nTensión: $${datos.tension}
                              \nCorriente: $${datos.corriente}
                              \nTemperatura: $${datos.temperatura}
                              \nFrecuencia: $${datos.frecuencia}`);
                
                let config = {
                  method: 'get',
                  maxBodyLength: Infinity,
                  url: 'http://137.184.25.28:3000/webhook',
                  headers: { 
                    'Content-Type': 'application/json'
                  },
                  data : datos
                };

                axios.request(config)
                      .then((response) => {
                        console.log(JSON.stringify(response.data));
                      })
                      .catch((error) => {
                        console.log(error);
                      });

                
            })
            .catch((err) => {
                console.error("Error al leer registros:", err);
                clearInterval(readLoop); 
                client.close();
            });
            
    }, sampleTime);


function stopLoopAndCloseConnection() {
    clearInterval(readLoop);
    client.close();
}


