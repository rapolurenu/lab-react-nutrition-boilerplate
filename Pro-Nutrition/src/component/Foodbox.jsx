import { Component } from "react";
import fooddata from "./Fooddata";
import "./Foodbox.css";

class FoodBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foodMenu: fooddata.map((food) => ({
        id: food.id,
        quantity: 0,
        totalCalories: 0,
      })),
      searchTerm: "",
    };
  }

  handleSearch_button = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  handleAdd_button = (id) => {
    this.setState((prevState) => ({
      foodMenu: prevState.foodMenu.map((foodItem) =>
        foodItem.id === id
          ? {
              ...foodItem,
              quantity: foodItem.quantity + 1,
              totalCalories: (foodItem.quantity + 1) * fooddata.find((food) => food.id === id).cal,
            }
          : foodItem
      ),
    }));
  };

  handleReset_button = (id) => {
    this.setState((prevState) => ({
      foodMenu: prevState.foodMenu.map((foodItem) =>
        foodItem.id === id ? { ...foodItem, quantity: 0, totalCalories: 0 } : foodItem
      ),
    }));
  };
  
  handleQuantity_button = (id, quantity) => {
    this.setState((prevState) => ({
      foodMenu: prevState.foodMenu.map((foodItem) =>
        foodItem.id === id
          ? { ...foodItem, quantity: quantity >= 0 ? quantity : 0 }
          : foodItem
      ),
    }));
  };

  render() {
    const { foodMenu, searchTerm } = this.state;
    const filteredfoodMenu = foodMenu.filter((foodItem) =>
      fooddata.find((food) => food.id === foodItem.id).name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="Food-box">
        <div className="search-box">
          <p>Search</p>
          <input
            type="text"
            value={searchTerm}
            onChange={this.handleSearch_button}
          />
        </div>
        <div>
          {filteredfoodMenu.map((foodItem) => {
            const { id, quantity, totalCalories } = foodItem;
            const { name, cal, img } = fooddata.find((food) => food.id === id);
            return (
              <div key={id}>
                <div style={{ display: "flex" }}>
                  <div className="food">
                    <img src={img} alt={name} />
                    <div>
                      <p>{name}</p>
                      <p>{cal} calories</p>
                    </div>
                    <div className="inputs">
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) => this.handleQuantity_button(id, parseInt(e.target.value, 10))}
                      />
                      <button onClick={() => this.handleAdd_button(id)} className="add-button">+</button>
                    </div>
                  </div>
                  <div className="calories-total">
                    <p>
                      {quantity} {name} = {totalCalories} calories
                    </p>
                    <button onClick={() => this.handleReset_button(id)}>Reset</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default FoodBox;