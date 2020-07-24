import store from '../../store/store';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';



class Search extends React.Component {


    render() {

        let searchedQuery = this.props.match.params.query;

        return <div>

            {this.props.allData.filter((product) => {

                if(!Object.keys(product).length){
                    return false;
                }

                return product.SubCategory.toLowerCase().includes(searchedQuery.toLowerCase());

            }).map((item) => {
                return <div className="productItem">                    
            <Link to={'/products/' + item._id}> <img src={window.targetURL +  item.file} /></Link>
                    <div>
                        {item.description}
                    </div>
                    <div>
                        <span>{item.price}</span>
                    </div>
                    <button className="cart-btn" onClick={() => this.addtoCart(item.price, item.description, item.file, item._id)}>ADD TO CART</button>
                </div>
            })}

        </div>

    }

}

let SearchVM = connect(function (store) {

    return {
        allData: store.imgReducer.imgs

    }
})(Search);

export default SearchVM;