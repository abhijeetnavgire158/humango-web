import React, { useState } from 'react';
import "../../Styles/loader.scss";
const Loader = () => {
    return (
        <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    );
}

export default Loader;