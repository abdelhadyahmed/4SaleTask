import React, {useCallback, useEffect, useState, useRef} from 'react';
import styles from './select.module.scss';
import ICustomedSelect from '@/Types/ICustomSelect';
import { LightGray } from '@/styles/colors';

const CustomedSelect = (props:ICustomedSelect) => {
    const {options, setValue, type ,from ,to} = props;
    const selectedValue = (type=="from" && from) ? from : (type=="to" && to) ? to :"Currancy";
    const [isAppeared, setIsAppeared] = useState<boolean>(false);
    const componentRef = useRef(null);
    
    const handleChange = (e:any)=>{
        setValue(e.target.value)
        setIsAppeared(false);
    }

    const isDisable = (value:string):boolean=>{
        if(type== "from" && value==to)return true;
        if(type=="to" && value==from)return true;
        return false;
    }

    const handleClickOutside = useCallback((event:MouseEvent) => {
        if (componentRef.current && !(componentRef.current as HTMLElement).contains(event.target as Node))
            setIsAppeared(false);
    },[]);

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
        document.removeEventListener('click', handleClickOutside);
        setIsAppeared(false);
        };
    }, [handleClickOutside]);

    const toggle = ()=>{setIsAppeared(!isAppeared)}

    return (
        <div ref={componentRef} className={styles.custom_select}>
            <button className={styles.select_button} onClick={()=>toggle()}>
                <span className={styles.selected_value}>{selectedValue}</span>
                <span className={styles.arrow}></span>
            </button>
            <ul className={styles.select_dropdown} style={isAppeared?{ visibility:"visible",opacity:1,transform:"scaleY(1)" }:{visibility:"hidden",opacity:0,transform:"scaleY(0)"}}>
                {options?.map((value,idx)=>{
                return(
                    <li  key={idx} style={{ color: isDisable(value) ? LightGray :'' }} >
                        <input disabled={isDisable(value)} type="radio" checked={false} id={`${value}+${type}`} value={value} onChange={e=>handleChange(e)} />
                        <label htmlFor={`${value}+${type}`}>{value}</label>
                    </li>
                )
                })}
            </ul>
        </div>
    )
}

export default React.memo(CustomedSelect);