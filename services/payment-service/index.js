const express = require('express')
const { Consumer, QueueManager } = require('redis-smq');
const redisConfig = require('./configs/redis.config')
const { EQueueType } = require('redis-smq/dist/types');


const app = express()

app.use(express.json())

// QueueManager.createInstance(redisConfig, (err, queueManager) => {
//     if (err) console.log(err);
//     // Creating a LIFO queue
//     else queueManager.queue.save('payment_paid', EQueueType.LIFO_QUEUE, (err) => console.log(err));
// })

const consumer = new Consumer(redisConfig);

const messageHandler = (msg, cb) => {
    const payload = msg.getBody();

    // update tabel payment menjadi paid
    console.log('Message payload', payload);

    // xxxxxx

   cb(); // acknowledging the message
};

consumer.consume('payment_paid', messageHandler, (err) => {
   if (err) console.error(err);
});

consumer.run();

app.listen(10125, () => {
    console.log(`payment service running on port 10125`)
})