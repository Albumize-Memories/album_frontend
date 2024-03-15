import React from "react";
import "./header.css";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import MenuBar from "./MenuBar";
const Header = () => {  
  return (
    <div className="header">
         <div className="menu">
        <MenuBar/>
        </div>
      <img
        className="header__logo"
        src={require('./Screenshot 2024-03-09 at 12.05.15 AM.png')}
        alt=''
      />
      <div className="header__nav">
        <div className="header__option">
        <PermIdentityIcon/>
        </div>
        <div className="header__optionBasket">
          <ShoppingBasketIcon />
        </div>
      </div>
    </div>
  );
}

export default Header;
