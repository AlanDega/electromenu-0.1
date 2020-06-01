/*!

=========================================================
* BLK Design System React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/blk-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/blk-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import classnames from "classnames";
// plugin that creates slider
import Slider from "nouislider";
// react plugin used to create switch buttons
import Switch from "react-bootstrap-switch";

// reactstrap components
import {
  Button,
  Label,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";

class Basics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputFocus: false
    };
  }
  componentDidMount() {

  }
  render() {
    return (
      <>
        <div style={{ width: "100%" }}>
          <img alt="..." className="path" src={require("assets/img/path1.png")} />
          <p style={{ fontSize: 18, textAlign: "center" }}>Hola! soy Alan De Garay, soy un diseñador/desarrollador web y me dedico a esto porque con estas herramientas </p>
          <p style={{ fontSize: 18, textAlign: "center" }}> puedo expresar mi creatividad para resolver problemas.</p>
          <div style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "8% 82% 8%",
            justifyItems: "left",
            marginTop: 100
          }}>
            <span></span>
            <h1 style={{ marginTop:100, padding: 0 }} className="title"> Mis Fortalezas:</h1>
            <span></span>
          </div>

          <div
            style={{
              marginTop: 25,
              height: "100%",
              width: "100%",
              display: "grid",
              gridTemplateColumns: "repeat(5, auto)",
              justifyItems: "center"
            }}>
            <div></div>
            <img src="https://res.cloudinary.com/dalnnaod7/image/upload/v1590960297/skill1_xmuqpx.png" />
            <img src="https://res.cloudinary.com/dalnnaod7/image/upload/v1590964034/skill2_t9fhkv.png" />
            <img src="https://res.cloudinary.com/dalnnaod7/image/upload/v1590967308/skill3_h0t6tt.png" />

          </div>
          <div>
            <div style={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: "8% 82% 8%",
              justifyItems: "left",
              marginTop: 100
            }}>
              <span></span>
              <h1 style={{ marginTop: 120, padding: 0 }} className="title"> Proyectos:</h1>
              <span></span>
            </div>        </div>
        </div>
        <div style={{
          width: "100%",
          height: "",
          display: "grid",
          justifyItems: "center",
          gridTemplateRows: "20% 80",


        }}>
          <div
            style={{ justifySelf: "center" }}>
            <h1 style={{ marginTop: 50, marginBottom: 10   }}>Qubits</h1>
            <img height="100" width="100" src="https://res.cloudinary.com/dalnnaod7/image/upload/v1589943529/Asset_1_gnns9n.svg" />
          </div>

          <p style={{ fontSize: 16, marginTop: 80, marginBottom:30 }}>
            Qubits es una aplicación en la que puedes comprar Criptomonedas que representan la marca personal de los artistas musicales.
      </p>



        </div>
        <div style={{ width: "100%"}}>
        <video
        style={{ width: "100%", padding:"0 10%", outline: "none"}}
        src="https://res.cloudinary.com/dalnnaod7/video/upload/v1590879315/q2_ymjxvu.mov" controls height="80%" width="80%">
      </video>
        </div>
         
       
      </>
    );
  }
}

export default Basics;
