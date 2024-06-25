import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = value => value.trim() === '';
const isSixChars = value => value.trim().length === 6;

const Checkout = (props) => {
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    city: true,
    pinCode: true
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const pinCodeInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPinCode = pinCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPinCodeIsValid = isSixChars(enteredPinCode);

    setFormInputValidity({
        name: enteredNameIsValid,
        street: enteredStreetIsValid,
        city: enteredCityIsValid,
        pinCode: enteredPinCodeIsValid
    });

    const formIsValid = 
        enteredNameIsValid &&
        enteredStreetIsValid &&
        enteredPinCodeIsValid &&
        enteredCityIsValid;
    
    if (!formIsValid) {
        return;
    }
    
    props.onConfirm({
        name: enteredName,
        street: enteredStreet, 
        pinCode: enteredPinCode,
        city: enteredCity
    });
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div
       className={`${classes.control} ${
        formInputValidity.name ? '': classes.invalid
        }`}
      >
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef}/>
        {!formInputValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div
       className={`${classes.control} ${
        formInputValidity.street ? '': classes.invalid
        }`}
      >
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef}/>
        {!formInputValidity.street && <p>Please enter a valid street!</p>}
      </div>
      <div
       className={`${classes.control} ${
        formInputValidity.pinCode ? '': classes.invalid
        }`}
      >
        <label htmlFor='pin'>Pin Code</label>
        <input type='text' id='pin' ref={pinCodeInputRef}/>
        {!formInputValidity.pinCode && <p>Please enter a valid Pin Code (6 characters long)!</p>}
      </div>
      <div
       className={`${classes.control} ${
        formInputValidity.city ? '': classes.invalid
        }`}
      >
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef}/>
        {!formInputValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;