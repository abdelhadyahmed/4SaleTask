import React, { useCallback, useEffect, useState } from 'react'
import { exchange } from '@/pages/api/currency';
import CustomedSelect from '../CustomedSelect';
import NumberInput from '../NumberInput';
import swapIcon from '../../public/images/swap.svg';
import styles from './card.module.scss';
import Image from 'next/image';
import { PuffLoader } from 'react-spinners';
import ICard from '@/Types/ICard';
import { primaryColor } from '@/styles/colors';


const Card = ({ currancyList }:ICard) => {
  const [exhangeValue,setExchangeValue] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [timeOutId, setTimeOutId] = useState<any>(null);
  const [quantity,setQuantity] = useState<number>(1.0);
  const [from,setFrom] =useState<string>('');
  const [to,setTo] =useState<string>('');
  
  
  const fetchData = useCallback(async () => {
    if (quantity > 0 && from && to) {
      setIsLoading(true);
      try {
        const res = await exchange({ from, to, quantity });
        setExchangeValue(res);
      } catch (error) {
        console.error('Error exchanging currency:', error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [from, to]);

  useEffect(() => {
    if (quantity > 0 && quantity.toString().length && from && to)
      fetchData();
  }, [fetchData, from, to]);

  const handleChangeQty = (e:any) => {
    setQuantity(e.target.value);
    clearTimeout(timeOutId);
    if(from && to){
        const newTimeOut = setTimeout(() => {
          let newQuantity: string = e.target.value;
          setIsLoading(true);
          exchange({from:from, to:to, quantity:parseInt(newQuantity)})
          .then((res:number) => {
            setExchangeValue(res)
            setIsLoading(false);
          }).catch(() => setIsLoading(false));
      }, 2000);
      setTimeOutId(newTimeOut); 
    }
  }

  const Swap = ()=>{
    setFrom(to);
    setTo(from);
  }
  
  const reset = ()=>{
    setQuantity(1.0);
    setFrom("");
    setTo("");
  }

  return (
    <div className={styles.card}>
      <div className={styles.inputs}>
        <div className={styles.formControl}>
          <p className={styles.label}>Amount</p>
          <NumberInput  value={quantity} placeholder={quantity ? quantity.toString() : "0.0"} min={1} onChange={handleChangeQty}/>
        </div>

        <div className={styles.formControl}>
          <p className={styles.label}>From</p>
          <CustomedSelect options={currancyList} from={from} to={to} newValue={from} setValue={setFrom} type={"from"}/>
        </div>

        <button className={styles.swap} onClick={()=>Swap()}>
          <Image src={swapIcon} alt=''/>
        </button>

        <div className={styles.formControl}>
          <p className={styles.label}>To</p>
          <CustomedSelect options={currancyList} from={from} to={to} newValue={to} setValue={setTo} type={"to"}/>
        </div>
      </div>

      {(exhangeValue && to && from && quantity.toString().length && quantity > 0)? <button className={styles.resetButton} onClick={()=>reset()}>Reset</button>:<></>}
      {isLoading && quantity.toString().length ? <PuffLoader color={primaryColor} className={styles.loader} />:<div>
        {(exhangeValue && to && from && quantity.toString().length && quantity > 0) ? <p className={styles.result}>{`${quantity} ${from} Equals ${quantity * exhangeValue} ${to}`}</p>:<></>}
      </div>}
    </div>
  )
}

export default React.memo(Card);
