import React from 'react'
import styles from './input.module.scss';
import INumberInput from '../../Types/INumberInput';

const  NumberInput = (props:INumberInput) => {
  const {value, placeholder, min, max, step, onChange} = props;
  
  return (
    <div className={styles.input_container}>
      <input
        value={value}
        type="number"
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        onChange={(e)=>onChange?.(e)}
      />
    </div>
  )
}

export default React.memo(NumberInput);