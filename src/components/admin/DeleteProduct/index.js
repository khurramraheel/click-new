import React from "react";
import { baseUrl } from "../../../shared";
import store from "../../../store/store";

class DeletProduct extends React.Component {
  deleteProduct = () => {
    fetch(baseUrl + "products/" + this.props.item._id, {
      method: "DELETE"
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        const err = new Error(res.status + " : " + res.statusText);
        throw err;
      })
      .then(res => {
        try{
        store.dispatch({
          type:"ITEM_DELETED",
          id:this.props.item._id
        });
        alert("Product successfully deleted")
        console.log(res);

      }catch(e){
        console.log(e.mesage);
      }
      })
      .catch(err => {
        alert(err.message);
      });
  };
  render() {
    return (
      <div>
        <button
          onClick={this.deleteProduct}
          className="cart-btn"
          style={{ backgroundColor: "red", marginBottom: 5 }}
        >
          Delete
        </button>
      </div>
    );
  }
}
export default DeletProduct;
