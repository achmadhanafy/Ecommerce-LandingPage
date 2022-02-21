import React, {useState, useEffect} from 'react'
import './Payment.css'
import { useStateValue } from './StateProvider'
import CheckoutProduct from './CheckoutProduct'
import {Link, useHistory} from "react-router-dom";
import { CardElement,useElements, useStripe } from '@stripe/react-stripe-js';
import CurrencyFormat from "react-currency-format";
import {getBasketTotal} from "./reducer";
import axios from './axios';
import {db} from "./firebase";

function Payment() {
    const [{basket,user}, dispatch] = useStateValue();
    const history = useHistory();

    const stripe= useStripe();
    const elements = useElements()

    const [error, setError] = useState(null);
    const [disabled,setDisabled] = useState(true);
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
        //generate the special stripe secret which allows us to charge a customer
        const getClientSecret = async () => {
            const response = await axios ({
                method: 'post',
                //Stripe expects the total in a currencies subunits
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            });
            setClientSecret(response.data.clientSecret)
        }
        getClientSecret();
    },[basket])

    console.log('The secre is >>>', clientSecret)

    const handleSubmit = async (event) =>{
        //do all the fancy stripe stuff
        event.preventDefault();
        setProcessing(true)

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({paymentIntent})=>{
            // paymentIntent = payment confirmation

            db.collection('users')
            .doc(user?.uid)
            .collection('orders')
            .doc(paymentIntent.id)
            .set({

                basket: basket,
                amount: paymentIntent.amount,
                created: paymentIntent.created
            })

            setSucceeded(true);
            setError(null)
            setProcessing(false)

            dispatch({
                type: 'EMPTY_BASKET'
            })

            history.replace('/orders')
        })
        //const payload = await stripe 
    }
    const handleChange = event =>{
        setDisabled(event.empty);
        setError(event.error ? event.error.message: "");
    }

    return (
        <div className="payment">
            <div className="payment_container">
                
                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment_address">
                        <p>{user?.email}</p>
                        <p>
                            Jln.Moch Kahfi 2, 
                        </p>
                        <p>
                        Jagakarsa,Jakarta Selatan
                        </p>
                    </div>
                </div>
                <div className="payment_section">
                    <div className="payment_title">
                        <h3> Review items and delivery</h3>
                    
                        <div className="payment_item">
                            {basket.map(item=>(
                                <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                size={item.size}
                                />
                            ))}
                        </div>
                    </div>

                </div>
                <div className ="payment_detail">
                    <div className="payment_title">
                            <h3>Payment Method</h3>
                            
                    </div>
                    <div className ="payment_price">
                             <form onSubmit={handleSubmit}>
                                <CardElement onChange={handleChange}/>
                            
                                <CurrencyFormat
                                    renderText={(value)=>(
                                        <>
                                            <h3>
                                                Order Total : {value}
                                            </h3>
                                            
                                        </>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />    
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing? <p>Processing</p> : "Buy Now"}</span>
                                </button>
                                </form>
                            </div>
                            {error && <div>{error}</div>}
                            
                    </div>
            </div>
        </div>
    )
}

export default Payment
