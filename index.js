const https = require('https');
function getRandomNumber(max){
    return Math.floor(Math.random()*max);
}

// console.log(getRandomNumber(125))

setInterval(
    ()=>{
        try{
            const axios = require('axios');
let data = JSON.stringify({
  "timestamp": new Date().getTime(),
  "data": [
    getRandomNumber(101),
    getRandomNumber(60),
    getRandomNumber(175),
    getRandomNumber(62),
    getRandomNumber(302),
    getRandomNumber(306),
    getRandomNumber(604),
  ]
});

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'http://137.184.25.28:3000/webhook',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});

        }catch(e){
            console.log(e)
        }
    }
    
    ,1000
);
