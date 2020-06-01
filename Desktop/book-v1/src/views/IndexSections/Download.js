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
// reactstrap components
import { Button, Container, Row, Col, UncontrolledTooltip } from "reactstrap";

class Download extends React.Component {
  render() {
    return (
      <div
        className="section section-download"
        data-background-color="black"
        id="download-section"
      >
        <img alt="..." className="path" src={require("assets/img/path1.png")} />
        <Container>
          <Row className="justify-content-md-center">
          
            <Col className="text-center" lg="8" md="12">
              <Button
                style={{marginRight: 10}}
                className="btn-round"
                color="info"
                href="https://www.behance.net/ardianarki"
                role="button"
                size="lg"
              >
                Ver todos los diseños 
              </Button>
              <Button
                style={{marginLeft: 10}}
                className="btn-round"
                color="info"
                href="https://www.github.com/AlanDega"
                role="button"
                size="lg"
              >
                Ver todos los programas
              </Button>
            </Col>
          </Row>
          <br />
          <br />
          <br />
          <br />
          <br />
          <h1 style={{ margin: 0, padding: 0 }} className="title"> Certificados:</h1>
          <div
           style={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: "33% 33% 33%"
            }}>
            <img style={{ marginTop: 50}} height="180" width="300"  src="https://res.cloudinary.com/dalnnaod7/image/upload/v1591043671/certificado-cinta-roja_nnzr8b.jpg" />
            <img style={{ marginTop: 50}} height="180" width="300"  src="https://res.cloudinary.com/dalnnaod7/image/upload/v1591043668/certificado-cinta-negra_phgiby.jpg" />
            <img style={{ marginTop: 50}} height="180" width="300"  src="https://res.cloudinary.com/dalnnaod7/image/upload/v1578277435/diploma-react_rawf6x.png" />
            <img style={{ marginTop: 30}} height="180" width="300"  src="https://res.cloudinary.com/dalnnaod7/image/upload/v1579053442/diploma-react-ejs_soxsf3.png" />
            <img style={{ marginTop: 30}}height="180" width="300"  src="https://res.cloudinary.com/dhzled9ox/image/upload/c_scale,w_431/v1568760730/diploma-html-css_l6lety.png" />
            <img style={{ marginTop: 30}}height="180" width="300"  src="https://res.cloudinary.com/dhzled9ox/image/upload/c_scale,q_100,w_359/v1568840696/diploma-html5-css3_qcozdp.png" />
          </div>
          <div style={{
            width: "100%",
            display: "grid",
            justifyItems: "center"
          }}>
          <Button
          style={{marginTop: 200, marginRight: 30}}
          className="btn-round"
          color="info"
          href="https://www.linkedin.com/in/alan-de-garay-a3b0b6182/"
          role="button"
          size="lg"
        >
          Ver todos los certificados
        </Button>
          </div>
        </Container>
      </div>
    );
  }
}

export default Download;
