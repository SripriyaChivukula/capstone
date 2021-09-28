import PropTypes from "prop-types";

// src imports
import Item from "./Item";

function ItemsList({ items, type, updateItem }) {
  console.log(items);
  console.log(type);

  const filteredItems = items.filter((item) => item.itemtype === type);
  console.log("Filterd Items", filteredItems);

  return (
    <div className ="bakeryclass">
    <div className ="subtitles">
      {type} List
      <ul>
        {filteredItems.map((item, index) => (
          <div key={type + "-" + index}>
            <Item item={item} updateItem={updateItem} />
          </div>
        ))}
      </ul>
    </div>
    </div>
  );
}

ItemsList.propTypes = {
  items: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  updateItem: PropTypes.func.isRequired,
};

export default ItemsList;
