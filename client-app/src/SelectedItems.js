import PropTypes from "prop-types";


function SelectedItems({ items }) {
  const itemsSelected = items.filter(item => item.checked === true);

  return (
  <div className ="bakeryclass">
  <div className ="subtitles">
    <h3> Bakery Items Cart</h3>
    <ul>
     {itemsSelected.map(item => <li>{item.name}({item.itemtype}) - ${item.price}</li>)}
    </ul>
    </div>
    </div>
  )

}

SelectedItems.propTypes = {
  items: PropTypes.array.isRequired,
};


export default SelectedItems;