import React, { Component } from "react";
// import logo from './logo.svg';
// import './App.css';

import { BrowserRouter, Route, Link } from "react-router-dom";

let array = [
  {
    category: "Desktop",
    image:
      "https://static-01.daraz.pk/p/mdc/b2081dd6998b20b217709ae72543c991.jpg",
    desc:
      "HP Compaq Elite 8300 Core i7 3770 3.4 GHz - 8 GB - 1 TB - Black - Tower -Gaming Pc - Certified Pc"
  },
  {
    category: "Desktop",
    image: "https://static-01.daraz.pk/p/bb276d6c15b215177b1b743ec240d382.jpg",
    desc:
      "badgeHP ELITEDESK 800G4 CI5,8500,Intel® Q370,4GB, 1TB, DVD/RW,DOS , KB/MOUSE 1Y (4FW49AV) "
  },
  {
    category: "Desktop",
    image: "https://static-01.daraz.pk/p/f77635e41589912f7ec2bf4a533b7117.jpg",
    desc: "hp 6000 cpu"
  },
  {
    category: "Desktop",
    image:
      "https://static-01.daraz.pk/p/mdc/7cd824ed7fdb108dfcd8c9ac0ffa1e08.jpg",
    desc:
      "HP Desktop 6300 - Intel Core i3 3rd Gen 3220 (3.30 GHz) 4GB DDR3 - 500GB HDD - Certified PC Refurbished "
  },
  {
    category: "Desktop",
    image: "https://static-01.daraz.pk/p/e0af2e47554a28f5700d0053d410a0c0.jpg",
    desc:
      'badgeHP AIO 22-C0055I Intel Ci5 -8250U 1.6GHz, 4G - 1TB - DOS DVD/RW Lan - Web Cam - USB KB/MOUSE - Dos, 21.5" Display (4EA50AA)'
  },
  {
    category: "Desktop",
    image: "https://static-01.daraz.pk/p/20c10eadf0b335ce16f0a8ea11144d39.jpg",
    desc:
      "HP Elite Desk G1-600 Intel Core i5-4440 8GB, 500GB, Gaming PC Win10 Pro(Microsoft Certified) "
  },
  {
    category: "Desktop",
    image:
      "https://static-01.daraz.pk/original/00416147ff32a50e46ca1aeb3019780a.jpg",
    desc:
      "HP EliteDesk Tower Business 600Intel Core i3-4130 4TH Gen 3.4GHz, 2GB RAM, 250GB Hard Drive, DVDRW, HD Graphics, Gaming PC Windows 10 Pro 64Bit (Cerfified Refurbished)"
  },
  {
    category: "Desktop",
    image:
      "https://static-01.daraz.pk/original/89bea34c6f334cf62b7bf66ac6e700e9.jpg",
    desc: "Compaq 8300 Minitower "
  },
  {
    category: "Desktop",
    image:
      "https://static-01.daraz.pk/p/mdc/043af682ecf2e363747255db79bdbf0b.jpg",
    desc:
      "HP ProDesk 400 G5 MT - 8th Gen Core i7 8700 - 4GB - 1TB - DVDRW - Keyboard & Mouse (Brand Warranty)"
  },
  {
    category: "Desktop",
    image:
      "https://static-01.daraz.pk/p/mdc/b5a5a77aa8fa0599a2b600b11c4e18a9.jpg",

    desc:
      "HP EliteDesk Tower Business 600 G1 SFF, Intel Core i3-4130 3.4GHz, 2GB RAM, 250GB Hard Drive, DVDRW, HD Graphics, Gaming PC Windows 10 Pro 64Bit (Cerfified Refurbished) "
  },
  {
    category: "Laptops",
    image:
      "https://static-01.daraz.pk/original/b1cef1036ade9dbc6dc8e9a766e3c43a.jpg",
    desc:
      'Da0000Tx Notebook - 15.6" Fhd - 8Th.Gen Intel® Core™ I5-8250U - Nvidia® Geforce® 2Gb - Freedos 2.0'
  },
  {
    category: "Laptops",
    image: "https://static-01.daraz.pk/p/28de551bd565ef5107986cbb38734c45.jpg",
    desc: "15-Da1012TU CI3 8145U"
  },
  {
    category: "Laptops",
    image:
      "https://static-01.daraz.pk/original/85de27feafd8a475914de8ae77155ceb.jpg ",
    desc: '6550 Core i7 Laptop 4GB Ram 15.6 " Display Win 10 ( Refurb) '
  },
  {
    category: "Laptops",
    image:
      "https://static-01.daraz.pk/original/60acdbefcb09359ec5fab000597d05b3.jpg",
    desc:
      'EliteBook 840 G2 - 14" Antiglare LED-Backlit Display - 5th Gen. Intel Core i5-5200U - Win 10 activated (Refurbished)'
  },
  {
    category: "Laptops",
    image:
      "https://static-01.daraz.pk/original/46296e862ca29e82d948c6c73d4c7075.jpg",
    desc:
      'Chromebook - 14-Ak004Na G4 (Energy Star) - 14" Display - N2840 - 4 Gb Ddr3L - 32 Gb Emmc - (Refurbished)'
  },
  {
    category: "Laptops",
    image:
      "https://static-01.daraz.pk/original/4a17979a252b13d465ce66ad92f35dc7.jpg",
    desc:
      'ProBook 650 G1 - 15.6" HD LED Display - 4th Gen. Intel® Core™ i5-4300M - Intel® HD Graphics 4600 - Windows® 10 (Refurbished) '
  },
  {
    category: "Laptops",
    image:
      "https://static-01.daraz.pk/original/7ec1532d28e7f899789cad1d477ef19b.jpg",
    desc:
      'ProBook 650 G1 - Core i7 4610M - 8 GB RAM - 500 GB HDD - 15.6" Full HD Display Laptop '
  },
  {
    category: "Laptops",
    image:
      "https://static-01.daraz.pk/original/3c60380ab04c4ff995484d670dc6e91f.jpg",
    desc: '250 G6 - 7th Gen Ci3 04GB 1TB 15.6" HD - 7th Gen. '
  },
  {
    category: "Laptops",
    image:
      "https://static-01.daraz.pk/original/30cdaa6c57e1df66695542699511beaf.jpg",
    desc:
      'HP EliteBook 840 G1 - 14" Antiglare LED-Display - Core i5-4200u - FreeDOS 2.0 - Black'
  },
  {
    category: "Laptops",
    image:
      "https://static-01.daraz.pk/original/a1c40140a5d9a59b9d6af3fe3c70309c.jpg",
    desc:
      'EliteBook 840 G4 i5-7200U - 4GB - 1TB - 14" FINGER PRINT - BACKLIT K/B - WEBCAM - DOS - Silver'
  },
  {
    category: "Tablets",
    image: "",
    desc: ""
  },

  {
    category: "Mobile phones",
    image: "https://cdn.pricespy.co.nz/product/standard/280/4722332.jpg",
    desc: "Mama & Baby with daddy 4+2 JUMBO DRAWER LOVE STORY PURPLE NA-665833",
    price: 20
  },
  {
    category: "Computers",
    image:
      "https://static-01.daraz.pk/original/05a9ea33dd47b4c3123287aef1ca109e.jpg",
    desc: "Imported Baby Swing Cot & Cradle with dual stand support - Blue",
    price: 20
  },
  {
    category: "Mobile phones",
    image:
      "https://static-01.daraz.pk/p/mdc/388ce598fc78aa63ef718dac3058bf79.jpg",
    desc: "High Quality New Born Folding Baby Cradle (Ghodiya)",
    price: 135
  },
  {
    image:
      "https://static-01.daraz.pk/original/0f8e040a10add54820589c0fab5e9d67.jpg",
    desc: "Citizen Kids Cartoon Table With Chairs - Multicolor",
    price: 1000
  },
  {
    image:
      "https://static-01.daraz.pk/original/9cffc3e984d1db1eaf712ea2359ab562.jpg",
    desc: "Imported Baby Swing Cot & Cradle With Dual Stand Support - Pink",
    price: 1000
  },
  {
    image:
      "https://static-01.daraz.pk/original/2afe72f8fa63a023a4c89e2589a606ce.jpg",
    desc: "Imported Baby Swing Cot & Cradle with dual stand support - Blue",
    price: 5000
  },
  {
    image:
      "https://static-01.daraz.pk/original/7f24dab793908e89a8a666cb7d5a5d83.jpg",
    desc: "Citizen Kids Cartoon Table With Chairs - Multicolor",
    price: 2000
  }
];

export default class Category extends React.Component {
  render() {
    let updatedItems = array.filter(item => {
      console.log(this.props.match.params.categID);
      return item.category == this.props.match.params.categID;
    });

    return (
      <div>
        <div className="flex">
          {updatedItems.map(item => {
            return (
              <div className="productItem">
                <img
                  onClick={this.say}
                  src={window.targetURL + item.image}
                />
                <div>{item.desc}</div>
                <div>
                  <span>{item.price}</span>
                </div>
                <button className="cart-btn">ADD TO CARD</button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
