import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import Header from "./components/header/header";
import Signup from "./components/signup/signup";
import SignIn from "./components/signin/signin";
import Admin from "./components/admin/admin";
import Showimg from "./components/showimages/showimg";
import Product from "./components/products/products";
import Category from "./components/category/category";
import Footer from "./components/footer/footer";
import DeepFooter from "./components/deep-Footer/deepFooter";
import Cart from "./components/viewCart/viewCart";
import ProductCat from "./components/productCategories/productCategories";
import OnHover from "./components/productCategories/productCategories";
import original from "./images/original.png";
import Search from "./components/search/search";
import Grid from "@material-ui/core/Grid";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Launcher } from "react-chat-window";
import UserChat from "./components/UserChat";
import AdminChat from "./components/AdminChat";
import utilities from "./utilities";
import {baseUrl} from './shared';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Checkout from './components/checkout/checkout'

window.targetURL = "http://localhost:1001";

var appID = "78e2b97d-f8fa-41b4-8a05-c3aa8039d620";
var key = "3e18d0fcb582439cb58ddd9a2d1eef04";

let $ = window.$;

let recognition;

let AI_COMMANDS = [
  {
    id: 0,
    command: "show me the ### category",
    onMatch: function (text, args) {
      debugger;
      console.log(text);
      switch (text[0]) {
        case "main":
        case "man":
        case "men":
          playSound.call(args.ctx, "man");
          args.ctx.props.history.push("/categories/men");
          break;

        case "kids":
        case "kiss":
          // case 'men':
          args.ctx.props.history.push("/categories/kids");
          break;

        case "woman":
        case "women":
          // case 'men':
          playSound.call(args.ctx, "woman");
          args.ctx.props.history.push("/categories/women");
          break;

        case "new-arrival":
          playSound.call(args.ctx, "woman");
          args.ctx.props.history.push("/new-arrival");
          break;
      }
    }
  },
  //For nested cateogry
  {
    id: 3,
    command: "show me ### for ###",
    onMatch: function (text, args) {

      // http://localhost:3000/categories/Men/Clothing/Shirts

      let data = {
        men: {
          kurtas: function () {

            return "Kurtas And Shalwar Kameez";
          },
          "shirts": "clothing",
          "jeans": "clothing",
          "shrugs": "clothing",
          "shorts": "clothing",
          "tights": "clothing",
          "waiscoats": "Ethnic Wear",
          "slippers": "Footwear",
        },
        women: {
          sandals: "Footwear",
          heels: "Footwear",
          flats: "Footwear",
          boots: "Footwear",
          topics: function () {

            return {
              target: "Footwear",
              name: "top picks"
            };
          },
          topics: function () {

            return {
              target: "Ethnic Wear",
              name: "top picks"
            };
          },
          kurtas: function () {

            return {
              target: "Ethnic Wear",
              name: "Kurtas And Shalwar Kameez"
            };
          },
          dupatta: function () {

            return {
              target: "Ethnic Wear",
              name: "Dupattas and Shawls"
            };

          },
          "shirts": "clothing",
          "jeans": "clothing",
          "shrugs": "clothing",
          "tights": "clothing",
          "hijab": "Ethnic Wear",
          "hijabs": "Ethnic Wear",
          "unstitched": "Ethnic Wear"
        },
        kids: {
          topics: function () {

            return {
              target: "Ethnic Wear",
              name: "top picks"
            };
          },
          kurtas: function () {

            return {
              target: "Ethnic Wear",
              name: "Kurtas And Shalwar Kameez"
            };
          },
          dupatta: function () {

            return {
              target: "Ethnic Wear",
              name: "Dupattas and Shawls"
            };

          },
          "jeans": "clothing",
          "shrugs": "clothing",
          "tights": "clothing",
          "hijab": "Ethnic Wear",
          "hijab": "Ethnic Wear",
          "hijabs": "Ethnic Wear",
        },

      };

      try {

        let processed = data[text[1]][text[0]];

        if (typeof processed == "function") {

          let result = processed();

          processed = result.target;
          text[0] = result.name;
        }

        args.ctx.props.history.push("/categories/" + text[1] + "/" + processed + "/" + text[0]);
      } catch (ex) {


      }
    }
  },
  {
    id: 4,
    command: "OPEN MY CART",
    onMatch: function (text, args) {
      document.getElementById('cartIcon').click();

      if (!args.ctx.props.auth.cartInfo.length) {
        playSound.call(args.ctx, "cart-empty");
      }

    }

  },
  {
    id: 5,
    command: "ORDER MY PURChASES",
    onMatch: function (text, args) {
      // document.getElementById('cartIcon').click();

      if (!args.ctx.props.auth.cartInfo.length) {
        utilities.say("please add items into your cart");
        // playSound.call(args.ctx, "please add items into your cart");
      }

    }

  },
  {
    id: 6,
    command: "I WANT TO SIGNIN",
    onMatch: function (text, args) {

      if (Object.keys(args.ctx.props.auth.UserSignUp.data).length) {
        utilities.say("You are already logged in!");
        return;
      }

      args.ctx.props.history.push('/signin');

      utilities.say("signin form has been opened, please tell me your username");


      document.getElementById('email').focus();

    }
  },
  {
    id: 7,
    command: "my username is #####",
    onMatch: function (text, args) {

      console.log(text);

      if (document.getElementById('email')) {

        window.signincomponent.setState({
          email:text
        });

        document.getElementById('email').value = text;
        utilities.say("thanks, now password please");

      }

    },

  },
  {
    id: 10,
    command: "my password is #####",
    onMatch: function (text, args) {

      console.log(text);

      if (document.getElementById('password')) {

        document.getElementById('password').value = text;
        utilities.say("please wait, we are checking your login details");

        debugger;
        window.signincomponent.setState({
          password:text
        })

        setTimeout(() => {
          document.getElementById('signINBTN').click();
          
        }, 1000);

      }

    }
  },
  {
    id: 9,
    command: "please log me out",
    onMatch: function (text, args) {

      store.dispatch({
        type: "USER_LOGOUT",
        history: args.ctx.props.history
      });

      utilities.say("you have been logged out");

    }
  }
];

function searchCommand(text) {
  let results = [];

  AI_COMMANDS.forEach(command => {
    var chMatched = 0;
    var index = 0;

    for (let item of command.command) {
      if (item == text[index]) {
        chMatched++;
      }
      index++;
    }

    results.push({
      matched: (chMatched / command.command.length) * 100,
      target: command
    });
  });

  return results;
}

window.traceParameter = traceParameter;

function traceParameter(matched, target) {


  let params = [];
  let totalEles = matched.match(/###/g);

  if (!totalEles) {
    return params;
  }

  for (var i = 0; i < totalEles.length; i++) {

    let tIndex = matched.indexOf('###');

    let text = extractText(tIndex, target);
    target = target.slice(tIndex + text.length);
    matched = matched.slice(tIndex + 3);
    params.push(text);

  }

  return params;

  function extractText(start, string) {

    let str = '';

    for (var i = start; i < string.length; i++) {

      if (string[i] != ' ') {
        str += string[i];
      } else {
        return str;
      }

    }

    return str;
  }

  // let index = 0;

  // var extracted = "";
  // let params = [];

  // for (let item of matched) {
  //   if (item == "#") {
  //     let matchedAt = matched.indexOf("#");

  //     for (var i = matchedAt; i < target.length; i++) {
  //       if (target[i] == " ") {
  //         params.push(extracted);
  //         extracted = "";
  //         matched = matched.slice(i);
  //       }

  //       extracted += target[i];
  //     }

  //     // target.charAt(matchedAt);;i

  //     break;
  //   }

  //   index++;
  // }
  // return params;
}

function process(query) {
  let results = searchCommand(query);
  return results.sort((p, n) => {
    return n.matched - p.matched
  })
  // return results.filter(item => {
  //   return item.matched >= 50;
  // });
}

function playSound(sound) {
  debugger;
  // this.props.history.push('man');
  this.audio.src = "/sounds/" + sound + ".mp3";
  this.audio.play();
}

class App extends Component {
  constructor(props) {
    super(props);
    var that = this;

    this.audio = document.createElement("audio");

    let recording = false;

    function stopRecording() {
      recognition.stop();
    }

    function startRecording() {
      recognition = new window.webkitSpeechRecognition();

      recognition.onerror = function (err) {
        alert(err.message);
      };
      recognition.onresult = event => {
        const speechToText = event.results[0][0].transcript;

        console.log(speechToText);
        let resutls = process(speechToText);
        if (resutls[0]) {
          // resutls[0].target.onMatch(speechToText);

          let param = traceParameter(resutls[0].target.command, speechToText);

          if (param) {
            // alert(param);
            resutls[0].target.onMatch(param, { ctx: that });
          }
        }

        // botManager.process({
        //   query: speechToText
        // })
      };

      recognition.start();
    }

    var core = {
      bots: {
        actionController: {
          openMan() {
            document.getElementById("sounder").click();
          },

          drawCircle: function (args) {
            // d3.select('#svgBox').append('circle').attr({
            //     r: 100,
            //     fill: 'blue',
            //     stroke: 'white',
            //     'stroke-width': 15,
            //     cx: Math.random() * innerWidth,
            //     cy: Math.random() * innerHeight
            // });
          },
          drawTriangle: function (args) {
            // d3.select('#svgBox').append('image').attr({
            //     'xlink:href': './triangle.png',
            //     width: 50 + Math.random() * innerWidth * 0.2,
            //     height: 50 + Math.random() * innerHeight * 0.2,
            //     cx: Math.random() * innerWidth,
            //     cy: Math.random() * innerHeight
            // });
          },
          drawRectangle: function (args) {
            // d3.select('#svgBox').append('rect').attr({
            //     fill: 'pink',
            //     stroke: 'white',
            //     'stroke-width': 15,
            //     x: Math.random() * innerWidth * 0.5,
            //     y: Math.random() * innerHeight * 0.5,
            //     width: 50 + (Math.random() * 400),
            //     height: 50 + (Math.random() * 200)
            // });
          },
          drawShape: function () { }
        }
      }
    };

    // console.log(results);

    var botManager = {
      getEndPoint: function (args) {
        var str =
          "https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/" +
          args.appID +
          "?verbose=true&timezoneOffset=-360&subscription-key=" +
          args.key +
          "&q=" +
          args.query;
        return new $.get(str);
      },
      process: function (args) {
        this.getEndPoint({
          appID: appID,
          key: key,
          //query: 'create a component with name hello'
          query: args.query
        }).then(
          function (resp) {
            var data = resp;

            if (resp) {
              //TBC: Why iterate over entities
              if (data.entities.length) {
                let item = data.entities[0].entity;

                core.bots.actionController["draw" + item.capitalize()] &&
                  core.bots.actionController["draw" + item.capitalize()]();
                core.bots.actionController["deleteAll" + item.capitalize()] &&
                  core.bots.actionController["deleteAll" + item.capitalize()]();
                core.bots.actionController["khani" + item.capitalize()] &&
                  core.bots.actionController["khani" + item.capitalize()]();

                // var targetAction = data.topScoringIntent.intent;

                // data.entities.forEach(function (item) {

                //     if (core.bots.actionController[targetAction]) {
                //         core.bots.actionController[targetAction](item);
                //     }

                // });
              } else {
                if (data.topScoringIntent.intent != "None") {
                  if (
                    core.bots.actionController[data.topScoringIntent.intent]
                  ) {
                    core.bots.actionController[data.topScoringIntent.intent](
                      data
                    );
                  }
                }
              }
            }
            console.log(resp);
          },
          function (err) {
            console.log(err);
          }
        );
      }
    };

    document.onkeydown = evt => {
      // core.bots.actionController.openMan.call(this);

      if (evt.ctrlKey) {
        if (!recording) {
          recording = true;
          startRecording();
        } else {
          recording = false;
          stopRecording();
        }
      }
    };

    let user = localStorage.getItem("logged_user");

    if (user) {
      store.dispatch({
        type: "USER_LOGIN_SUCCESS",
        payload: JSON.parse(user)
      });
    }

    // fetch(window.targetURL + '/checklogin', {
    //   method: 'POST',
    // }).then((resp) => resp.json()).then((resp) => {

    //   if (resp._id) {
    //     store.dispatch({
    //       type: 'USER_LOGIN_SUCCESS',
    //       payload: resp
    //     });
    //   }

    // });
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      anchorEl: null,
      [side]: open
    });
  };
  render() {
    return (
      <>
        <div className="App">
          <header className="App-header">
            <Header />
            <button id="sounder" hidden onClick={playSound.bind(this, "man")} />

            <Showimg />

            <Route
              path="/"
              exact
              render={() => {
                return (
                  <Carousel
                    showIndicators={true}
                    showStatus={true}
                    showThumbs={true}
                    showThumbs={false}
                  >
                    {this.props.allData
                      .filter(item => {
                        return item.category == "NewArrivals";
                      })
                      .map(item => {
                        return (
                          <div className="adjustedParent">
                            <>
                              <img src={baseUrl +'/' + item.file} />
                              {/* <p className="legend">{item.description}</p> */}
                              <Link to="/categories">
                                <div className="s-label">
                                  <div className="ni-item-title">
                                    {item.title}
                                  </div>
                                  <div className="ni-item-price">{item.price + "Rs."}</div>
                                  <div className="ni-item-description">
                                    {item.description}
                                  </div>
                                </div>
                              </Link>
                            </>
                          </div>
                        );
                      })}
                  </Carousel>
                );
              }}
            />

            <Route path="/signup" component={Signup} />
            <Route path="/signin" component={SignIn} />
            {this.props.userData.role === "admin" && (
              <Route
                path="/inbox"
                component={props => (
                  <AdminChat {...props} user={this.props.userData} />
                )}
              />
            )}
            {/* <Route path="/admin" component={Admin} /> */}
            {/* <Link to="/admin" className="admin">Admin Emultor</Link>
          <Route path="/admin/categories/:categID" component={Category} /> */}
            <Route path="/products/:pid" component={Product} />

            <Route path="/search/:query" component={Search} />

            {/* <Route path="/categories/:qid" component={ProductCat} /> */}
            <Route path="/categories/:pid/:qid/:cid" component={ProductCat} />

            <Route exact path="/categories/:pid" component={ProductCat} />

            <Route path="/cart" component={Cart} />
            {/* <Route path="/checkout" component={Checkout}/> */}
            {/* <Route path="/adminpanel" component={AdminPanel} /> */}
          </header>
        </div>
        <div className="footer">
          <Footer />
        </div>
        <div className="deep_footer">
          <DeepFooter />
        </div>

        <div className="footer-part-original">
          <Grid container>
            <Grid item xs={4}>
              <a href="#">Have issues? Contact Us</a>
            </Grid>

            <Grid item xs={4}>
              <img src={original} />
            </Grid>

            <Grid item xs={4}>
              <a href="#">© 2015-2019 Darazee.pk</a>
            </Grid>
          </Grid>
        </div>
        <ToastContainer />
        {this.props.userData.role === "user" && (
          <UserChat user={this.props.userData} />
        )}
      </>
    );
  }
}

let cApp = connect(store => {
  return {
    ncartInfo: store.authReducer.cartInfo,
    auth: store.authReducer,
    allData: store.imgReducer.imgs,
    userData: store.authReducer.UserSignUp.data
  };
})(App);

export default withRouter(cApp);
