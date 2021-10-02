import PropTypes from "prop-types";
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import {useState} from 'react';
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useElements,
  useStripe
} from "@stripe/react-stripe-js";
import "./styles.css";

function SelectedItems({ items }) {
  
  const [flag,setFlag]=useState(false);
  const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");
  var total=0;
  const itemsSelected = items.filter(item => item.checked === true);
  itemsSelected.forEach(item =>total+=item.price);


  const ELEMENTS_OPTIONS = {
    fonts: [
      {
        cssSrc: "https://fonts.googleapis.com/css?family=Roboto"
      }
    ]
  };
  
   const handleSubmit = async e => {
    e.preventDefault();
    setFlag(true);
    
   }
    
  return (
    <div className="bakeryclass">
      <div className="subtitles">
        <h3>Checkout:  BakeryItems</h3>
    <ul>
     {itemsSelected.map(item => <li>{item.name} ( {item.author}) = ${item.price}</li>)}   
    </ul>
    <p>Total Price:{total.toFixed(2)}</p>
    <Form>
     <Button variant="primary" type="submit" onClick={handleSubmit}>
      Checkout
    </Button> 
    <div>
     {flag ? 
     <div className="AppWrapper">  
     <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
     <CheckoutForm total = {total} /> 
     </Elements>
      </div>
     
     
     :null}
   </div>
    </Form>   
    </div>
    </div>
  )
   }
 
SelectedItems.propTypes = {
  items: PropTypes.array.isRequired,
};

export default SelectedItems;