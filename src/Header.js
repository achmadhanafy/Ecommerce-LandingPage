import React from 'react'
import './Header.css'
import SearchIcon from '@material-ui/icons/Search';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import{Link} from "react-router-dom";
import {useStateValue} from "./StateProvider";
import { auth } from './firebase';

function Header() {
    const[{basket,user}, disptach] = useStateValue();
    const handleAuthentication = () => {
        if (user) {
            auth.signOut();
        }
    }

    return (
        <div className='header'>
                <Link to="/">
                    <img
                        className="header__logo"
                        src="https://drive.google.com/uc?id=1F1w9_2ZC0Y7_iTatfelDqQITN0ev_0FX"/>
                </Link>
                
            
                <div
                    className="header__search"
                >
                    <input className="header__searchInput" type="text"></input>
                        <SearchIcon className="header__searchIcon"/>
                </div>
                <div
                    className="header__nav"
                >   
                    <Link to ={!user && '/login'}>
                        <div onClick={handleAuthentication} className='header__option'>
                            <span
                            className='header__optionLineOne'
                            >
                                {user?.email}
                            </span>
                            <span
                            className='header__optionLineTwo'
                            >
                                {user ? 'Sign Out' : 'Sign In'}
                            </span>
                        </div>    
                    </Link>
                    <Link to="/orders">
                        <div className="header__optionOrders">
                        <span
                            className='header__optionLineOne'
                            >
                                Your 
                            </span>
                            <span
                            className="header__optionLineTwo header__basketCount"
                            >
                                Orders
                            </span>
                        </div>
                    </Link>

                    <Link to="/checkout">
                        <div className="header__optionBasket">
                            <AddShoppingCartIcon/>
                            <span
                            className="header__optionLineTwo header__basketCount"
                            >
                                {basket?.length}
                            </span>
                        </div>
                    </Link>
                    
                </div>
        </div>

    )
} 

export default Header
