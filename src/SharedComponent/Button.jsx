import React from 'react';
import { PropTypes } from "prop-types";

function Button({children , type , version}) {
  return (
    <button type={type} className={`btn btn-${version}`} >
        {children}
    </button>
  )

  

}

Button.defaultProps = {
    version: "primary",
    type : 'submit'
}

Button.propTypes ={
    children : PropTypes.node.isRequired,
    type : PropTypes.string,
    version : PropTypes.string,

}


export default Button