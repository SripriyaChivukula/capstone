import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

function SelectedItems({ items }) {
  const itemsSelected = items.filter((item) => item.checked === true);
  
  function calculateTotal(itemsSelectedArgs) {
    var sum = 0;
    itemsSelectedArgs.map((item) => {
      sum = sum + item.price;

      console.log(sum);
      return sum
      
    });
  }

    const handleSubmit = async e => {
      e.preventDefault();
      
      return(<label>{calculateTotal(itemsSelected)}</label>)
//       sessionStorage.setItem('token', JSON.stringify(token));
//        props.setToken(token);
  }
 
  
  return (
    <div className="bakeryclass">
      <div className="subtitles">
        <h3> Bakery Items Cart</h3>
        <ul>
          {itemsSelected.map((item) => (
            <li>
              {item.name}({item.itemtype}) - ${item.price}
            </li>
          ))}
        </ul>
        <form>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Checkout
          </Button>
          
        </form>
      </div>
    </div>
  );
}

SelectedItems.propTypes = {
  items: PropTypes.array.isRequired,
};

export default SelectedItems;
