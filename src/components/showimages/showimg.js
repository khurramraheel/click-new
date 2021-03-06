import React from "react";
import store from "../../store/store";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import withMobileDialog from "@material-ui/core/withMobileDialog";
import { ToastContainer, toast } from 'react-toastify';
import PropTypes from "prop-types";

class Showimg extends React.Component {
  HideDropDown = evt => {
    {
      store.dispatch({
        type: "ON_HOVER",
        name: "aaaaa"
      });
    }
  };

  state = {
    open: false,
    price: "",
    description: "",
    image: "",
    category: "",
    SubCategory: [],
    ChildCategory: [],
    getsubcateg: "",
    getChildCateg: ""
  };
  handleChange = price => event => {
    this.setState({ [price]: event.target.value });
  };
  handleChange = description => event => {
    this.setState({ [description]: event.target.value });
  };
  handleimg = event => {
    this.setState({ image: event.target.files[0] });
  };
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleSelect = event => {
    let getCat = this.props.nlinks.find(item => {
      return item == event.target.value;
    });

    // let products = [];
    let products = this.props[event.target.value];
    console.log(this.props[event.target.value])
    // for (let category of this.props[event.target.value]) {
    //   category.categories.forEach(categ => {
    //     products.push(categ.cat);
    //   });
    // }

    let categName = event.target.value;

    if (categName == "Men") {
      // let getSubCat = this.props.Men[0].categories.map((item) => {
      //     return item.cat
      // })
      this.setState({
        SubCategory: products,
        category: event.target.value
      });
    }
    if (categName == "Women") {
      // let getSubCatWomen = this.props.Women[0].categories.map((item) => {
      //     return item.cat
      // })
      this.setState({
        SubCategory: products,
        category: event.target.value
      });
    }
    if (categName == "Kids") {
      // let getSubCat = this.props.Kids[0].categories.map((item) => {
      //     return item.cat
      // })
      this.setState({
        SubCategory: products,
        category: event.target.value
      });
    }
    if (categName == "NewArrivals") {
      // let getSubCat = this.props.Kids[0].categories.map((item) => {
      //     return item.cat
      // })
      this.setState({
        SubCategory: products,
        category: event.target.value
      });
    }
  };
  handleSelectSub = event => {

    let products = [];
    // let products=this.props[event.target.value];

    for (let category of this.props[this.state.category]) {
      if (category.name === event.target.value) {
        category.categories.forEach(categ => {
          products.push(categ.cat);
        });
      }
    }
    this.setState({
      getsubcateg: event.target.value,
      ChildCategory: products
    });

  };
  handleSelectChild = event => {
    this.setState({
      getChildCateg: event.target.value
    })
  }
  addtoCart = (price, description, image, id) => {
    // console.log(price, description)
    // event.preventDefault();
    this.setState({
      price: price,
      description: description,
      file: image,
      id: id
    });
    console.log(this.state);
    store.dispatch({
      type: "Add_To_Cart",
      payload: {
        price: price,
        description: description,
        file: image,
        id: id
      }
    });
  };
  saveData = event => {

    if (!this.state.price) {
      return toast.error("Please enter price for this product");
    }



    if (!this.state.description) {
      return toast.error("Please enter description for this product");
    }


    if (!this.state.image) {
      return toast.error("Please select a thumbnail for this product");
    }


    if (!this.state.category) {
      return toast.error("Please select category for this product");
    }

    if (!this.state.getsubcateg) {
      return toast.error("Please select child category for this product");
    }

    if (!this.state.category) {
      return toast.error("Please select sub-category for this product");
    }

    event.preventDefault();
    let formdata = new FormData();
    formdata.append("price", this.state.price);
    formdata.append("description", this.state.description);
    formdata.append("file", this.state.image);
    formdata.append("category", this.state.category);
    formdata.append("SubCategory", this.state.getsubcateg);
    formdata.append("ChildCategory", this.state.getChildCateg);
    this.setState({ open: false });

    let product = {
      price: this.state.price,
      description: this.state.description,
      image: URL.createObjectURL(this.state.image),
      category: this.state.category,
      SubCategory: this.state.getsubcateg,
      ChildCategory: this.state.getChildCateg
    };

    fetch(window.targetURL + "/uploads", {
      method: "POST",
      body: formdata
    }).then((resp) => resp.json()).then(resp => {
      store.dispatch({
        type: "Product_info",
        payload: product
      });
      if (resp) {
        // alert("DATA SAVED");
        toast.success("Product Added");

        // product.file = product.image;

        store.dispatch({
          type: 'added_new_product',
          payload: resp.user
        });

      } else {
        toast.error("Product could not be Added");
      }
    });
    // console.log(this.state);
  };
  componentDidMount() {
    fetch(window.targetURL + "/showProduct", {
      method: "get"
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        console.log(data);
        store.dispatch({
          type: "Product_info_didmount",
          payload: data
        });
      });
  }
  render() {
    const { fullScreen } = this.props;
    return (
      <div>
        {this.props.userData.role == "admin" && (
            <div style={{position:'relative', 'top':'10px'}}>
              <Button
                variant="outlined"
                color="primary"
                onClick={this.handleClickOpen}
              >
                Add product
                </Button>
              <div className="popup_form">
                <Dialog
                  open={this.state.open}
                  onClose={this.handleClose}
                  aria-labelledby="form-dialog-title"
                >
                  <DialogTitle id="form-dialog-title">Add Product</DialogTitle>
                  <DialogContent>
                    <div>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="price_product"
                        label="Enter Price"
                        type="text"
                        fullWidth
                        onChange={this.handleChange("price")}
                      />
                    </div>
                    <div>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="description"
                        label="Enter Description"
                        type="text"
                        fullWidth
                        onChange={this.handleChange("description")}
                      />
                    </div>
                    <div>

                      <input
                        type="file"
                        name="file"
                        id="myFile"
                        onChange={this.handleimg}
                      />
                    </div>

                    <table>
                      <tr>
                        <td>
                          <small>Choose Parent Category</small>
                        </td>
                        <td>
                          <div>
                            <select onChange={this.handleSelect}>
                              <option value="Men">Select Category</option>
                              {this.props.nlinks.map(item => {
                                return <option value={item}>{item}</option>;
                              })}
                            </select>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <small>Choose Child Category</small>

                        </td>
                        <td>
                          <div>

                            <select onChange={this.handleSelectSub}>
                              <option value="select">Select SubCategory</option>
                              {this.state.SubCategory.map(item => {
                                return <option value={item.name}>{item.name}</option>;
                              })}
                            </select>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <small>Choose SubCategory</small>
                        </td>
                        <td>
                          <div>
                            <select onChange={this.handleSelectChild}>
                              <option value="select">Select ChildCategory</option>
                              {this.state.ChildCategory.map(item => {
                                return <option value={item}>{item}</option>;
                              })}
                            </select>
                          </div>
                        </td>
                      </tr>
                    </table>

                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button
                      onClick={this.handleClose}
                      color="primary"
                      onClick={this.saveData}
                    >
                      Save
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            </div>
          )}
        <div className="flex">
          <div className="main_div_hover" onMouseLeave={this.HideDropDown}>
            <div className="onHover_Cat">
              <div
                hidden={
                  this.props.ndropdownHover &&
                  this.props.ndropdownHover != "Men"
                }
              >
                <h3 className="innercat"> {this.props.Men[0].name} </h3>
                {this.props.Men[0].categories.map(item => {
                  return (
                    <div>
                      <ul className="dropdown_cat">
                        <li className="dropdown_cat_lists">
                          <Link
                            className="product-list"
                            to={"/categories/Men/" + this.props.Men[0].name + "/" + item.cat}
                          >
                            {" "}
                            {item.cat}
                          </Link>
                        </li>
                      </ul>
                    </div>
                  );
                })}
              </div>
              <div
                hidden={
                  this.props.ndropdownHover &&
                  this.props.ndropdownHover != "Men"
                }
              >
                <h3 className="innercat">{this.props.Men[1].name}</h3>
                {this.props.Men[1].categories.map(item => {
                  return (
                    <div>
                      {/* <div className='onHover_Cat'> */}
                      <ul className="dropdown_cat">
                        <li className="dropdown_cat_lists">
                          <Link
                            className="product-list"
                            to={"/categories/Men/" + this.props.Men[1].name + "/" + item.cat}
                          >
                            {" "}
                            {item.cat}
                          </Link>
                        </li>
                      </ul>
                      {/* </div> */}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="onHover_Cat onhvr_1">
              <div
                hidden={
                  this.props.ndropdownHover &&
                  this.props.ndropdownHover != "Men"
                }
              >
                <h3 className="innercat"> {this.props.Men[2].name}</h3>
                {this.props.Men[2].categories.map(item => {
                  return (
                    <div>
                      {/* <div className='onHover_Cat'> */}
                      <ul className="dropdown_cat">
                        <li className="dropdown_cat_lists">
                          <Link
                            className="product-list"
                            to={"/categories/Men/" + this.props.Men[2].name + "/" + item.cat}
                          >
                            {" "}
                            {item.cat}
                          </Link>
                        </li>
                      </ul>
                      {/* </div> */}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="main_div_hover" onMouseLeave={this.HideDropDown}>
            <div className="onHover_Cat">
              <div
                hidden={
                  this.props.ndropdownHover &&
                  this.props.ndropdownHover != "Women"
                }
              >
                <h3 className="innercat"> {this.props.Women[0].name}</h3>
                {this.props.Women[0].categories.map(item => {
                  return (
                    <div>
                      <ul className="dropdown_cat">
                        <li className="dropdown_cat_lists">
                          <Link
                            className="product-list"
                            to={"/categories/Women/" + this.props.Women[0].name + "/" + item.cat}
                          >
                            {" "}
                            {item.cat}
                          </Link>
                        </li>
                      </ul>
                    </div>
                  );
                })}
              </div>

              <div
                hidden={
                  this.props.ndropdownHover &&
                  this.props.ndropdownHover != "Women"
                }
              >
                <h3 className="innercat"> {this.props.Women[1].name}</h3>
                {this.props.Women[1].categories.map(item => {
                  return (
                    <div>
                      <ul className="dropdown_cat">
                        <li className="dropdown_cat_lists">
                          <Link
                            className="product-list"
                            to={"/categories/Women/" + this.props.Women[1].name + "/" + item.cat}
                          >
                            {" "}
                            {item.cat}
                          </Link>
                        </li>
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="onHover_Cat onhvr_1">
              <div
                hidden={
                  this.props.ndropdownHover &&
                  this.props.ndropdownHover != "Women"
                }
              >
                <h3 className="innercat"> {this.props.Women[2].name}</h3>
                {this.props.Women[2].categories.map(item => {
                  return (
                    <div>
                      <ul className="dropdown_cat">
                        <li className="dropdown_cat_lists">
                          <Link
                            className="product-list"
                            to={"/categories/Women/" + this.props.Women[2].name + "/" + item.cat}
                          >
                            {" "}
                            {item.cat}
                          </Link>
                        </li>
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div
            className="onHover_Cat main_div_hover"
            onMouseLeave={this.HideDropDown}
          >
            <div
              hidden={
                this.props.ndropdownHover &&
                this.props.ndropdownHover != "New-Arrival"
              }
            >
              <h3 className="innercat">{this.props.NewArrivals[0].name}</h3>
              {this.props.NewArrivals[0].categories.map(item => {
                return (
                  <div>
                    <ul className="dropdown_cat">
                      <li className="dropdown_cat_lists">
                        <Link
                          className="product-list"
                          to={"/categories/New-Arrival/" + this.props.NewArrivals[0].name + "/" + item.cat}
                        >
                          {" "}
                          {item.cat}
                        </Link>
                      </li>
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          <div
            className="onHover_Cat main_div_hover"
            onMouseLeave={this.HideDropDown}
          >
            <div
              hidden={
                this.props.ndropdownHover && this.props.ndropdownHover != "Kids"
              }
            >
              <h3 className="innercat"> {this.props.Kids[0].name}</h3>
              {this.props.Kids[0].categories.map(item => {
                return (
                  <div>
                    <ul className="dropdown_cat">
                      <li className="dropdown_cat_lists">
                        <Link
                          className="product-list"
                          to={"/categories/Kids/" + this.props.Kids[0].name + "/" + item.cat}
                        >
                          {" "}
                          {item.cat}
                        </Link>
                      </li>
                    </ul>
                  </div>
                );
              })}
            </div>

            <div
              hidden={
                this.props.ndropdownHover && this.props.ndropdownHover != "Kids"
              }
            >
              <h3 className="innercat"> {this.props.Kids[1].name}</h3>
              {this.props.Kids[1].categories.map(item => {
                return (
                  <div>
                    <ul className="dropdown_cat">
                      <li className="dropdown_cat_lists">
                        <Link
                          className="product-list"
                          to={"/categories/Kids/" + this.props.Kids[1].name + "/" + item.cat}
                        >
                          {" "}
                          {item.cat}
                        </Link>
                      </li>
                    </ul>
                  </div>
                );
              })}


            </div>
          </div>

          
        </div>
      </div>
    );
  }
}

let NewVM = connect(function (store) {
  return {
    nimgs: store.imgReducer.imgs,
    ndropdownHover: store.imgReducer.dropdownHover,
    Men: store.imgReducer.dropdownCat,
    Women: store.imgReducer.WomenCat,
    NewArrivals: store.imgReducer.NewArrivalCat,
    Kids: store.imgReducer.kidscat,
    userData: store.authReducer.UserSignUp.data,
    nlinks: store.imgReducer.links
  };
})(Showimg);

export default NewVM;
