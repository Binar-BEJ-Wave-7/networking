const express = require('express')
const app = express()

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

app.listen(10123, () => {
    console.log(`order service running on port 10123`)
})