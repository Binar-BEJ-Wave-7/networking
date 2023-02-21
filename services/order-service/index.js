const express = require('express')
const {Message, Producer} = require('redis-smq');
const redisConfig = require('./configs/redis.config')

const app = express()
const producer = new Producer(redisConfig);

const publishEvent = (topic, body) => {
    producer.run((err) => {
        if (err) throw err;
        const message = new Message();

        message
                .setBody(body)
                .setTTL(3600000) // message expiration (in millis)
                .setQueue(topic); // setting up a direct exchange 

        producer.produce(message, (err) => {
           if (err) console.log(err);
           else {
              const msgId = message.getId(); // string
              console.log('Successfully produced. Message ID is ', msgId);
           }
        });
     })
}

app.use(express.json())

app.get('/v1/orders', (req, res, next) => {
    const { user_id } = req.query

    const orders = [
        {
            user_id,
            item_id: 1,
            item_name: 'Jeruk Bali',
            qty: 3,
            total: 6000
        },
        {
            user_id,
            item_id: 2,
            item_name: 'Jeruk Jakarta',
            qty: 5,
            total: 10000
        }
    ]

    return res.status(200).json({
        message: 'success',
        data: orders
    })
})

app.put('/v1/orders/paid/:order_no', (req, res, next) => {
    const orderNo = req.params.order_no
    const { amount } = req.body

    // update status order

    // deduct stock

    // update payment jadi paid
    publishEvent('payment_paid', {
        order_no: orderNo,
        amount,
        status: 'paid'
    })

    // xxxx

    return res.status(201).json({
        message: 'success',
        data: {
            order_no: orderNo
        }
    })
})

app.listen(10123, () => {
    console.log(`order service running on port 10123`)
})