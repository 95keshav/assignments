import React, { useState, useMemo } from "react";
// You have been given a list of items you shopped from the grocery store
// You need to calculate the total amount of money you spent
let check = [
  { name: "Chocolates", value: 10 },
  { name: "Chips", value: 20 },
  { name: "Onion", value: 30 },
  { name: "Tomato", value: 30 },
  // Add more items as needed
];
export const Assignment3 = () => {
  const [items, setItems] = useState(check);

  // Your code starts here
  const totalValue = useMemo(() => {
    let total = 0;
    for (let item of items) {
      total += item.value;
    }
    return total;
  }, [items]);
  // Your code ends here

  const handleForm = (e) => {
    e.preventDefault();
    let newItem = {
      name: e.target.elements.itemName.value,
      value: parseInt(e.target.elements.itemPrice.value),
    };
    setItems([...items, newItem]);
  };

  return (
    <div>
      <form onSubmit={handleForm}>
        <label htmlFor="itemName">Item Name: </label>
        <input type="text" id="itemName" name="itemName" />
        <br />
        <label htmlFor="itemPrice" name="itemPrice">
          Item Price
        </label>
        <input type="text" id="itemPrice" />
        <br />
        <input type="submit" value="Add Item" />
        <br />
      </form>

      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.name} - Price: ${item.value}
          </li>
        ))}
      </ul>
      <p>Total Value: {totalValue}</p>
    </div>
  );
};
