function getRandomNumber(max){
    return Math.floor(Math.random()*max);
}

// console.log(getRandomNumber(125))

try{
    const datosCodificados = {
        "3001": getRandomNumber(120),
        "3002": getRandomNumber(110),
        "3003": getRandomNumber(60),
        "3004": getRandomNumber(11),
        "3005": getRandomNumber(16),
        "3006": getRandomNumber(123),
        "3007": getRandomNumber(178),
        "3008": getRandomNumber(10),
        "3009": getRandomNumber(60),
        "3010": getRandomNumber(14),
    }

    const options = {
        method:"POST",
        host:"10.116.0.2",
        path:"/webhook",
        body: datosCodificados,
        headers:{
            "Content-Type":"application",
        }
    }

    const req = https.request(options,res =>{
        res.on("data", d=>{
            process.stdout.write(d)
        })
    })

    req.on("error", error=>{
        console.log(error);
    })

    req.write(datosCodificados)
    req.end()
    
}catch(e){
    console.log(e)
}