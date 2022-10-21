import React from "react";
import './Button.sass'

const Button = ({ className, type, onClickEvent, titleBtn, disabled }) => {
   // console.log(className)

   return (
      <button className={className}
         type={type}
         onClick={onClickEvent}
         disabled={disabled}>{titleBtn}</button>
   )
}
export default Button;