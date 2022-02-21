import React from 'react'
import "./Home.css";
import Product from "./Product";

function Home() {
    return (
        <div className="home">
            <div className="home_container">
                <img className="home_image"src="https://drive.google.com/uc?id=1KZ--nOYUzKWfu4ckuakMj_1wl25MibX1"/>
            
                <div className="row_title">
                <img className="image_title" src="https://drive.google.com/uc?id=17kymNC9Mc9HGW1NtE0baSGfBXtEIIrnX"/>
                </div>
                <div className="home_row">
                    
                    <Product id='1' title='Air Jordan 1 Union Blue Toe' price={299} image='https://drive.google.com/uc?id=1-XhoTE8On8fi4potPIfM6uFaje4LOf-d'size='38-44' />

                    <Product id='2' title='Air Jordan 1 Facetasme' image='https://drive.google.com/uc?id=1dUyvACkKIha0dFmsbxNeJGg2u86IUCVH' price={388} size='38-44'/>
                </div>
                <img className="image_title" src="https://drive.google.com/uc?id=1pyhvfWzif77Sv-OHHQ9lMGw_xtqKD5L5"/>

                <div className="home_row">
                <Product id='3' title='Adidas Yeezy Boost V2' image='https://drive.google.com/uc?id=1PTGL1FGQaRSJB_w3NgJGPMPxMLiVE8qr' price={310} size='38-44'/>

                <Product id='4' title='Adidas Yeezy 500 High' image='https://drive.google.com/uc?id=1_dwoJrQfy6HSRkfgfSAkiJyx2aGwryEc' price={799} size='38-44'/>

                </div>
                <img className="image_title" src="https://drive.google.com/uc?id=1ZSSuBHCWvMunU68_3dN14eRHfNVFsVVA"/>

                <div className="home_row">
                <Product id='6' title='Balenciaga Triple S' image='https://drive.google.com/uc?id=1JS1uXBLj3osHKEIWVdTjTBO0QOZcY0fH' price={1215} size='38-44'/>
                </div>
            </div>
        </div>
    )
}

export default Home
