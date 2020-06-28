import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import withMobileDialog from "@material-ui/core/withMobileDialog";
import store from "../../store/store";
import emptyStore from "../../images/store-empty.jpg";
import { Grid } from "@material-ui/core";
import utilities from '../../utilities';

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

// import logo from './logo.svg';
// import './App.css';

import { BrowserRouter, Route, Link } from "react-router-dom";
import DeletProduct from "../admin/DeleteProduct";

class ProductCategories extends React.Component {
  constructor(props) {
    super(props);
    store.dispatch({
      type: "CLEAR_SELECTION"
    });
    this.state = {
      filter: {
        price: []
      },
      targetItems: []
    };
  }
  componentDidMount() {
    this.filterItems();
    toast.configure();
  }

  filterItems = () => {
    
    // let {productSubCateg,productCateg}=this.state
    let productChildCateg = this.props.match.params.cid ? this.props.match.params.cid.toLowerCase() : "";
    let productSubCateg = this.props.match.params.qid ? this.props.match.params.qid.toLowerCase(): "";
    let productCateg = this.props.match.params.pid ? this.props.match.params.pid.toLowerCase(): "";
    let targetitems = this.props.nimgs.filter(product => {

      if(Object.keys(product).length == 0){
        return false;
      }

      if (
        productChildCateg &&
        productSubCateg &&
        this.state.filter.price.length > 0
      )
        return (
          product.category.toLowerCase() == productCateg &&
          product.SubCategory.toLowerCase() == productSubCateg &&
          product.ChildCategory.toLowerCase() == productChildCateg &&
          this.checkPrice(product.price)
        );
      else if (productChildCateg && productSubCateg)
        return (
          product.category.toLowerCase() == productCateg &&
          product.SubCategory.toLowerCase() == productSubCateg &&
          product.ChildCategory.toLowerCase() == productChildCateg
        );
      else if (
        !productChildCateg &&
        !productSubCateg &&
        this.state.filter.price.length > 0
      )
        return (
          product.category.toLowerCase() == productCateg.toLowerCase() && this.checkPrice(product.price)
        );
      else return product.category.toLowerCase() == productCateg.toLowerCase();
      // return productSubCateg ? (productSubCateg == product.SubCategory) : true && productCateg == product.category;
    });

    // utilities.say("I have found "+targetitems.length+" items for this");

    this.setState({
      targetItems: targetitems
    });
  };
  changeFilter = ev => {
    if (ev.target.name == "price" && ev.target.checked) {
      this.state.filter.price.push(ev.target.value);
    } else {
      var nprice = this.state.filter.price.filter(pr => {
        return pr !== ev.target.value;
      });
      this.setState({ filter: { ...this.state.filter, price: nprice } });
    }

    this.filterItems();
  };
  componentDidUpdate(prev, st) {

    !prev.match.params.pid && (prev.match.params.pid = "");
    !prev.match.params.cid && (prev.match.params.cid = "");

    if (
      (prev.match.params.pid || "").toLowerCase() != (this.props.match.params.pid || "").toLowerCase() ||
      (prev.match.params.cid || "").toLowerCase() != (this.props.match.params.cid || "").toLowerCase()
    ) {
      this.filterItems();
    }
    if ((prev.match.params.qid || "").toLowerCase() != (this.props.match.params.qid || "").toLowerCase()) {
      this.filterItems();
    }
    if (prev.nimgs != this.props.nimgs) {
      this.filterItems();
    }
    if (st.filter != this.state.filter) {
      this.filterItems();
    }
  }
  checkPrice = price => {
    let filterPrice = this.state.filter.price;
    let result = false;
    filterPrice.map(val => {
      if (val === "1") {
        if (price >= 100 && price <= 500) result = true;
      } else if (val === "2") {
        if (price >= 500 && price <= 1000) result = true;
      } else if (val === "3") {
        if (price >= 1000 && price <= 1500) result = true;
      } else if (val === "4") {
        if (price >= 1500 && price <= 2000) result = true;
      } else if (val === "5") {
        if (price >= 2000 && price <= 2500) result = true;
      }
    });
    return result;
  };
  addItemToCart = item => {
    // alert(20)
    this.props.dispatch({ type: "Add_To_Cart", payload: item });
    toast.success("Item Added To Cart!", {
      autoClose: 3000
    });
  };
  render() {
    let { targetItems } = this.state;
    // let targetItems = this.props.nimgs.filter((product) => {
    //         return product.category==productCateg&&product.SubCategory==productSubCateg;
    //         // return productSubCateg ? (productSubCateg == product.SubCategory) : true && productCateg == product.category;

    //     });
    return (
      <div className="mainDiv">
        <Grid container={true} spacing={2} xl={12} lg={12}>
          <Grid item xl={3} lg={3} sm={3} alignContent="center">
            <div className="sideBar">
              <div className="item">
                <p style={{ fontWeight: "bold" }}>Price</p>
                <input
                  type="checkbox"
                  name="price"
                  value="1"
                  onClick={e => this.changeFilter(e)}
                />{" "}
                100 to 500
                <br />
                <input
                  type="checkbox"
                  name="price"
                  value="2"
                  onClick={e => this.changeFilter(e)}
                />{" "}
                500 to 1000
                <br />
                <input
                  type="checkbox"
                  name="price"
                  value="3"
                  onClick={e => this.changeFilter(e)}
                />{" "}
                1000 to 1500
                <br />
                <input
                  type="checkbox"
                  name="price"
                  value="4"
                  onClick={e => this.changeFilter(e)}
                />{" "}
                1500 to 2000
                <br />
                <input
                  type="checkbox"
                  name="price"
                  value="5"
                  onClick={e => this.changeFilter(e)}
                />{" "}
                2000 to 2500
                <br />
              </div>
            </div>
          </Grid>

          <Grid item={true} xl={9} lg={9} sm={9}>
            {!targetItems.length && (
              <div className="emptyStore">
                <Grid container>
                  <div className="text-center">
                    <img src={emptyStore} />
                    <p>Oops, seems this section is currently empty!</p>
                  </div>
                </Grid>
              </div>
            )}

            {/* {this.props.nimgs.filter((item) => {
                return item.cat == this.props.match.params.qid
            }).map((item)=>{
                // console.log(item)
                if(item.SubCategory == 'TopPicks'){
                    return <div>
                        {item}
                    </div>
                }
            })
            } */}

            <Grid container style={{ borderLeft: "1px solid #3f51b5" }}>
              {targetItems.map(item => {
                return (
                  <Grid item={true}>
                    <div className="productItem">
                      <Link to={"/products/" + item._id}>
                        <div className="imgDiv">
                          <img src={window.targetURL + item.file} />
                        </div>
                      </Link>
                      <div className="dataDiv">
                          {item.description}
                          <div class="price-box">{'Rs.' + item.price}</div>
                        </div>
                      <div className="product-control">
                        
                        {this.props.userData.role === "admin" && (
                          <DeletProduct item={item} />
                        )}
                        <button
                          className="cart-btn"
                          onClick={() => this.addItemToCart(item)}
                        >
                          ADD TO CARD
                      </button>
                      </div>
                    </div>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

let NewVM = connect(function (store) {
  return {
    nimgs: store.imgReducer.imgs,
    ndropdownHover: store.imgReducer.dropdownHover,
    ndropdownCat: store.imgReducer.dropdownCat,
    ndropdownWomen: store.imgReducer.WomenCat,
    ndropdownNewArrival: store.imgReducer.NewArrivalCat,
    ndropdownKids: store.imgReducer.kidscat,
    userData: store.authReducer.UserSignUp.data,
    newPrdct: store.imgReducer.newProduct
  };
})(ProductCategories);

export default NewVM;
