import React, { Component } from 'react';

const CheckBoxInput = ({name, formik,chechBoxOptions}) => {
    return (   
    <div className="formControl">
    {chechBoxOptions.map((item) => {
      return (
        <React.Fragment key={item.value}>
          <input
            type="checkBox"
            id={item.value}
            name={name}
            value={item.value}
            onChange={formik.handleChange}
            checked={formik.values[name].includes(item.value)}
          />
          <label htmlFor={item.value}>{item.label}</label>
        </React.Fragment>
      );
    })}
  </div> );
}
 
export default CheckBoxInput;