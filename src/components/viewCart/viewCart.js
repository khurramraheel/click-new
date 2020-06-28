import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Magnifier from "magnifier-react";
import utilities from "../../utilities";

const totalPrice = items => {
  let price = 0;
  items.forEach(p => {
    price = price + p.price * p.quantity;
  });
  return price;
};

class Cart extends React.Component {

  purchase = evt => {
    evt.preventDefault();


    if(!this.props.ncartInfo.length){
      utilities.say('please add items into your cart');
      return;
    }

    let data = this.props.ncartInfo.map(product => {
      return product.id;
    });

    fetch("/purchase", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user: this.props.userData,
        cart: this.props.ncartInfo
      })
    })
      .then(resp => {
        if (resp.ok) {
          return resp.json();
        }
        const err = new Error(resp.status + " : " + resp.statusText);
      })
      .then(() => {
        alert("Order Sent Successfully");
        this.props.dispatch({ type: "ORDER_CONFIRMED" });
      })
      .catch(err => alert(err.message));
  };
  render() {
    console.log(this.props.ncartInfo);
    return (
      <div className="viewCart_main_container">
        <div className="mainbox_container_cart">
          <div className="cart_items">
            <div className="shopping_bag">
              {" "}
              <h3>Your Shopping Bag</h3>{" "}
            </div>
            {this.props.ncartInfo.map(item => {
              return (
                <li>
                  <div className="cart_list_items">
                    <div className="cart_img_div">
                      {/* <Magnifier src={item.file} width={500} /> */}
                      {/* <img className='cart_img' src={item.file} /> */}
                    </div>
                    {/* <div className='cart_price'>Price : {item.price}</div> */}
                    <div className="cart_item_desc">
                      Description : {item.description}
                    </div>
                    <div className="cart_item_desc">
                      Unit Price : {item.price}
                    </div>{" "}
                    <div className="cart_item_desc">
                      quantity : {item.quantity}
                    </div>
                  </div>
                </li>
              );
            })}
          </div>

          <div className="cart_items_detail">
            <div className="detail_item">
              <li>
                <div className="detailSpan">
                  SubTotal
                  <span className="span_detail">
                    Rs {totalPrice(this.props.ncartInfo)}
                  </span>
                </div>
                <div className="detailSpan">
                  Shipping
                  <span className="span_detail">
                    Rs {this.props.ncartInfo.length === 0 ? 0 : 150}
                  </span>
                </div>
                <div className="detailSpan">Have Coupon Discount?</div>
              </li>
            </div>
            <div className="innerdiv_detail">
              <div>
                Total
                <span className="span_det">
                  {" "}
                  Rs{" "}
                  {totalPrice(this.props.ncartInfo) +
                    (this.props.ncartInfo.length === 0 ? 0 : 150)}
                </span>
              </div>
              <div>
                {/* <Link to="/checkout" className="signUp proceed_btn"> */}

                <button
                  disabled={this.props.ncartInfo.length === 0}
                  className="checkout_button"
                  onClick={this.purchase}
                >
                  Purchase
                </button>
                {/* </Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
let NewVM = connect(function(store) {
  return {
    nimgs: store.imgReducer.imgs,
    ncartInfo: store.authReducer.cartInfo,
    userData: store.authReducer.UserSignUp.data
  };
})(Cart);

export default NewVM;
