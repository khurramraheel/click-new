import { Link } from "@material-ui/core";

let initialState = {
    links: ["Men", "Women", "NewArrivals", "Kids"],
    imgs:
        [
            {

            }

        ],

    dropdownHover:
        [

        ],

    dropdownCat:
        [
            {
                name: 'Ethnic Wear',
                categories: [
                    {
                        cat: 'Top Picks'
                    },
                    {
                        cat: 'Kurtas And Shalwar-Kameez'
                    },
                    {
                        cat: 'Waiscoats'
                    },
                    {
                        cat: 'unstitched items'
                    },
                    {
                        cat: 'Shawl and Pakol'
                    }
                ],
            },

            {
                name: 'Clothing',
                categories: [
                    {
                        cat: 'Top Picks'
                    },
                    {
                        cat: 'Shirts'
                    },
                    {
                        cat: 'T-Shirts And Polo Shirts'
                    },
                    {
                        cat: 'Jeans'
                    },
                    {
                        cat: 'Pants And Trousers'
                    },
                    {
                        cat: 'Shorts'
                    },
                    {
                        cat: 'Winter Wear'
                    }

                ],
            },

            {
                name: 'Footwear',
                categories: [
                    {
                        cat: 'Top Picks'
                    },
                    {
                        cat: 'Casual Shoes'
                    },
                    {
                        cat: 'Formal Shoes'
                    },
                    {
                        cat: 'Sports Shoes'
                    },
                    {
                        cat: 'Sandals'
                    },
                    {
                        cat: 'Slippers'
                    },
                    {
                        cat: 'Peshawari Chappal'
                    },
                    {
                        cat: 'Khussas'
                    }

                ],
            }


        ],
    WomenCat:
        [

            {
                name: 'Ethnic Wear',
                categories: [
                    {
                        cat: 'top picks'
                    },
                    {
                        cat: 'Unstitched'
                    },
                    {
                        cat: 'Kurtas And Shalwar Kameez'
                    },
                    {
                        cat: 'Dupattas and Shawls'
                    },
                    {
                        cat: 'Pants Pallazos and Capries'
                    },
                    {
                        cat: 'Hijabs'
                    }
                ],
            },

            {
                name: 'Clothing',
                categories: [
                    {
                        cat: 'Sports and Active Wear'
                    },
                    {
                        cat: 'top picks'
                    },
                    {
                        cat: 'Tops & Shirts'
                    },
                    {
                        cat: 'T-Shirts'
                    },
                    {
                        cat: 'Tights'
                    },
                    {
                        cat: 'Skirts'
                    },
                    {
                        cat: 'Jeans'
                    },
                    {
                        cat: 'Shrugs'
                    },
                    {
                        cat: 'Winter Wear'
                    }
                ],
            },
            {
                name: 'Footwear',
                categories: [
                    {
                        cat: 'Top Picks'
                    },
                    {
                        cat: 'Sandals'
                    },
                    {
                        cat: 'Heels '
                    },
                    {
                        cat: 'Sports Shoes'
                    },
                    {
                        cat: 'Flats'
                    },
                    {
                        cat: 'Boots'
                    },
                ],
            },

        ],
    NewArrivalCat:
        [
            {
                name: 'New-Arrival',
                categories: [

                    {
                        cat: 'New-Arrival'
                    },
                    {
                        cat: 'Clearence Sale'
                    },
                ]
            }
            // ,

            // {
            //     name: 'Clearence Sale'
            // }

        ],
    kidscat:
        [
            {
                name: 'Ethnic Wear',
                categories: [
                    {
                        cat: 'top picks'
                    },
                    {
                        cat: 'Unstitched'
                    },
                    {
                        cat: 'Kurtas And Shalwar Kameez'
                    },
                    {
                        cat: 'Dupattas and Shawls'
                    },
                    {
                        cat: 'Pants Pallazos and Capries'
                    },
                    {
                        cat: 'Hijabs'
                    }
                ],
            },

            {
                name: 'Clothing',
                categories: [
                    {
                        cat: 'Sports and Active Wear'
                    },
                    {
                        cat: 'top picks'
                    },
                    {
                        cat: 'Tops & Shirts'
                    },
                    {
                        cat: 'T-Shirts'
                    },
                    {
                        cat: 'Tights'
                    },
                    {
                        cat: 'Skirts'
                    },
                    {
                        cat: 'Jeans'
                    },
                    {
                        cat: 'Shrugs'
                    },
                    {
                        cat: 'Winter Wear'
                    }
                ],
            },
            {
                name: 'Footwear',
                categories: [
                    {
                        cat: 'Top Picks'
                    },
                    {
                        cat: 'Sandals'
                    },
                    {
                        cat: 'Heels '
                    },
                    {
                        cat: 'Sports Shoes'
                    },
                    {
                        cat: 'Flats'
                    },
                    {
                        cat: 'Boots'
                    },
                ],
            },


        ],
    newProduct:
        [
            {

            }
        ],

}

const imgReducer = (state = initialState, action) => {
    // console.log(state);

    let newState = JSON.parse(JSON.stringify(state));

    if (action.type == "ITEM_DELETED") {

        newState.imgs = newState.imgs.filter((img) => {
            return img._id != action.id;
        });

        return newState;
    } else if (action.type == "ON_HOVER") {

        newState.dropdownHover = action.name;
        return newState;
    } else if (action.type == "Product_info") {
        newState.newProduct.push(action.payload);
        // newState.inProcess = false;
        return newState;
    } else if (action.type == "added_new_product") {
        newState.imgs.push(action.payload);
        // newState.inProcess = false;
        return newState;
    }
    else if (action.type == "Product_info_didmount") {
        newState.imgs = action.payload;
        // newState.inProcess = false;
        return newState;
    } else if (action.type == 'CLEAR_SELECTION') {

        newState.dropdownHover = '';
        return newState;

    }
    return newState;
}
export default imgReducer;