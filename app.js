const express = require('express');
const app = express();
const axios = require('axios')
const Redis = require('ioredis')



/*  */

const redis = new Redis({
    host: "redis-16563.c212.ap-south-1-1.ec2.redns.redis-cloud.com",
    port: 16563,
    password: "JwTM1KtbvH238eviebLo2cj5xYUrUTTe"
})

redis.on('connect', () => {
    console.log("redis connected")
})


app.get('/', (req, res) => {
    res.send('Hello World')
})

app.get('/create-ride', async (req, res) => {


    const isDataCached = await redis.get("indraPuri&MP")

    if (isDataCached) {
        return res.send(isDataCached)
    }


    const result = await axios.get('http://localhost:3001/distance')
    const data = result.data

    redis.set('indraPuri&MP', JSON.stringify(data))

    res.send(data)

})


app.listen(3000, () => {
    console.log(`Server is running http://localhost:3000`);
});