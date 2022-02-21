import React, {useState} from 'react'
import './Product.css';
import {useStateValue} from "./StateProvider";
import {Select, MenuItem, FormControl, InputLabel} from "@material-ui/core";

function Product({id,title, image,price,v}) {
    const [{basket}, dispatch] = useStateValue();
    console.log("this is basket>>>",basket);
    const[size, setValue] = useState("");
    const handleChange = e => setValue(e.target.value)

    const addToBasket = () =>{
        //dispatch the item into the data layer
        dispatch({
            type: "ADD_TO_BASKET",
            item: {
                id: id,
                title: title,
                image: image,
                price: price,
                size: size,
            },   
        });
    };

    return (
        <div className="product">
            <div className="product_info">
                
                <strong><p>{title}</p></strong>
                <p className="product_price">
                    <small>$ </small>
                    <strong>{price}</strong>
                    
                </p>
                <small>Available Size : EUR</small>
                <div className="optionSize">
                    <FormControl className="selectSize">
                        <InputLabel >Size</InputLabel>
                        <Select onChange={handleChange}>
                            <MenuItem value={38}>38</MenuItem>
                            <MenuItem value={39}>39</MenuItem>
                            <MenuItem value={40}>40</MenuItem>
                            <MenuItem value={41}>41</MenuItem>
                            <MenuItem value={42}>42</MenuItem>
                            <MenuItem value={43}>43</MenuItem>
                            <MenuItem value={44}>44</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
            <img src={image}></img>
        <button onClick={addToBasket}>Add to Cart</button>
        </div>
    )
}

export default Product
