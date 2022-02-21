import React from 'react'
import "./Checkout.css";
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from './StateProvider';
import Subtotal from "./Subtotal";

function Checkout() {
    const [{basket,user}, dispatch] = useStateValue();
    return (
        
        <div className="checkout">
            <div className="checkout_left">
                <div>
                    <h3 className="checkout_title">
                        Your Shopping Cart

                    </h3>
                    {basket.map(item =>(
                            <CheckoutProduct
                                id = {item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                size={item.size}
                            />
                        ))}
                </div>
                <div className="space"> </div>
            </div>
            <div className="checkout_right">
                <h2>
                    <Subtotal/>
                </h2>
                
            </div>
        </div>
    )
}

export default Checkout
