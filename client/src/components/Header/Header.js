import React from "react";
import { Link } from "react-router-dom";

import './Header.sass';
import logoLarge from '../../assets/img/logo-large.png'
import logoSmall from '../../assets/img/logo-small.png'

const Header = ({ onClickToChangeHomePage }) => {

   return (
      <header className="header">
         <Link to='/'
            className="logo"
            onClick={onClickToChangeHomePage}>
            <img className="tab-logo" src={logoLarge} alt="logo" />
            <img className="mob-logo" src={logoSmall} alt="logo" />
         </Link>
      </header>
   )
}

export default Header;