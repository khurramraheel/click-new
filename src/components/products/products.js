import React from "react";
import { connect } from "react-redux";
import store from "../../store/store";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { baseUrl } from "../../shared";
import ReactImageMagnify from 'react-image-magnify';

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";



class Product extends React.Component {
  state = {}
  HideDropDown = evt => {
    {
      store.dispatch({
        type: "ON_HOVER",
        name: "aaaaa"
      });
    }
  };
  addtoCart = (price, description, image) => {

    if (!this.state.size) {
      toast.error("Please select a size for this item!", {
        autoClose: 3000
      });
      return;
    }

    // console.log(price, description)
    // event.preventDefault();
    this.setState({
      price: price,
      description: description,
      file: image
    });
    console.log(this.state);
    debugger;
    store.dispatch({
      type: "Add_To_Cart",
      payload: {
        size: this.state.size,
        waistSize: this.state.size,
        neckCollarSize: this.state.neckCollarSize,
        price: price,
        description: description,
        file: image
      }

    });

    toast.success("Item Added To Cart!", {
      autoClose: 3000
    });

  };
  onSizeChange = (evt) => {
    this.setState({
      size: evt.target.value
    });
  }
  componentDidMount = () => {

    toast.configure();

  }
  render() {
    return (
      <div>
        <div>
          {this.props.nimgs
            .filter(item => {
              return item._id == this.props.match.params.pid;
            })
            .map(item => {
              return (
                <div className="card_div">
                  <div className="product_image_div">
                    <ReactImageMagnify {...{
                      smallImage: {
                        alt: 'Wristwatch by Ted Baker London',
                        isFluidWidth: true,
                        src: baseUrl + '/' + item.file
                      },
                      largeImage: {
                        src: baseUrl + '/' + item.file,
                        width: 1200,
                        height: 800
                      }
                    }} />
                    {/* <img src={baseUrl + '/' + item.file} className="img_product" /> */}
                  </div>

                  <div className="product_info">
                    <div className="product_price_desc_div">
                      <div className="desc_div_1">{item.description}</div>
                      <div className="price_div_1">Rs : {item.price}</div>
                    </div>

                    <div className="shoeSize_div">
                      <div className="label_men">
                        {/* <label>All Sizes Avaiable</label> */}
                      </div>
                      <div>
                        <select style={{ 'display': 'inline' }} onChange={this.onSizeChange} className="shoesize_selectbox">
                          <option>Select Size</option>
                          <option>Medium</option>
                          <option>Large</option>
                          <option>Extra Large</option>
                          <option>Small</option>
                          <option>Extra Small</option>

                        </select>
                      </div>
                    </div>
                    <div class="shoeSize_div">

                      {/* <input type="number" min="10" max="40" placeholder="Enter Waist Size" /> */}

                      <select style={{ 'display': 'inline' }} onChange={(evt) => {
                        this.setState({
                          waistSize: evt.target.value
                        });
                      }} className="shoesize_selectbox">
                        <option>Select Waist Size</option>
                        <option>10</option>
                        <option>11</option>
                        <option>13</option>
                        <option>14</option>
                        <option>15</option>
                        <option>16</option>
                        <option>17</option>
                        <option>18</option>
                        <option>19</option>
                        <option>20</option>
                        <option>21</option>
                        <option>22</option>
                        <option>23</option>
                        <option>24</option>
                        <option>25</option>
                        <option>26</option>
                        <option>27</option>
                        <option>28</option>
                        <option>29</option>
                        <option>30</option>
                        <option>31</option>
                        <option>32</option>
                        <option>33</option>
                        <option>34</option>
                        <option>35</option>
                        <option>36</option>
                        <option>37</option>
                        <option>38</option>
                        <option>39</option>
                        <option>40</option>


                      </select>

                    </div>

                    <div class="shoeSize_div">

                      <select style={{ 'display': 'inline' }} onChange={(evt) => {
                        this.setState({
                          neckCollarSize: evt.target.value
                        });
                      }} className="shoesize_selectbox">
                        <option>Select Neck/Collar Size</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                        <option>11</option>
                        <option>12</option>
                        <option>13</option>
                        <option>14</option>
                        <option>15</option>
                        <option>16</option>
                        <option>17</option>
                        <option>18</option>
                      </select>

                    </div>
                    {/* <div className="sizechart">
                      <a className="sizeChart_link" href="#">
                        SIZE CHART
                      </a>
                    </div> */}
                    <div>
                      <button style={{
                        width: "200px",
                        position: "relative",
                        top: "44px",
                        left: "10px"
                      }}
                        class=" button1"
                        onClick={() =>
                          this.addtoCart(
                            item.price,
                            item.description,
                            item.file,
                            // this.state.size
                          )
                        }
                      >
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                  <div className="about_products_info">
                    <ul>
                      <li className="about_product">+ Cash On Delivery</li>
                      <li className="about_product">+ 3 Days Return Policy</li>
                      <li className="about_product">
                        + Flat Rate (All over Pakistan) Rs:150
                      </li>
                    </ul>
                  </div>
                </div>
              );
            })}
        </div>
        {/* {this.props.userData.role == "admin" && (
          <div className="reports">
            <Button
              variant="outlined"
              color="primary"
              onClick={this.handleClickOpen}
            >
              Reports
            </Button>
          </div>
        )} */}
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
    // nproductsinfo: store.authReducer.Productinfo,
    userData: store.authReducer.UserSignUp.data
  };
})(Product);
export default NewVM;
