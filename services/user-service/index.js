const express = require('express')
const axios = require('axios').default
const app = express()

app.use(express.json())

app.get('/v1/users', async (req, res, next) => {
    try {
        const { user_id } = req.query

        const orderApi = `http://localhost:10123/v1/orders?user_id=${user_id}`

        const resp = await axios.get(orderApi)

        const orders = resp.data.data // {"message": "success", "data": [{xxxxxxxx}]}
        
        const user = {
            user_id,
            user_name: 'Saefulloh Maslul',
            user_address: 'Jakarta',
            orders: orders
        }

        return res.status(200).json({
            message: 'success',
            data: user
        })
    } catch (error) {
        next(error)
    }
})

// todo: error handling
app.use((err, req, res, next) => {
    const message = err.message || 'Internal server error'
    const status = err.code || 500

    return res.status(status).json({
        message: 'error',
        error: message
    })
})

app.listen(10124, () => {
    console.log(`user service running on port 10124`)
})