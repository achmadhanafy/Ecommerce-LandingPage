const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_51Jajm6ELeTbskFEgAYr2U5eW8YMcZJETnYSN8MEZGgfLD3UxkkYtKKrP03UmwHR5aKD7KPFDM2sNl0IIaF3Jw9cS00wS11U2KX")
//API


// App config
const app = express();

// Middlewares
app.use(cors({origin:true}));
app.use(express.json());

//API routes
app.get('/', (request,response)=> response.status(200).send('hell world'))

app.post('/payments/create', async(request,response)=> {
    const total = request.query.total;

    console.log('Payment Request Received ', total)

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, // subunits of the currency
        currency: "usd",
    });

    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
})
// Listen command
exports.api = functions.https.onRequest(app)

//example endpoint
// http://localhost:5001/web-d4f00/us-central1/api
