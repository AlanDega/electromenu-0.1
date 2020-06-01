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
import { Container } from "reactstrap";
import ALAN from "../../assets/ALAN.svg"
import DEGA from "../../assets/DEGA.svg"

class PageHeader extends React.Component {
  render() {
    return (
      <div className="page-header header-filter">
        <div className="squares square1" />
        <div className="squares square2" />
        <div className="squares square3" />
        <div className="squares square4" />
        <div className="squares square5" />
        <div className="squares square6" />
        <div className="squares square7" />
        <Container>
          <div style={{
            height: "100%",
            display: "grid",
            gridTemplateRows: "37% 26% 37%",
            justifyItems: "center",
            alignItems: "center"
          }}>
            <img
              style={{ alignSelf: "flex-end" }}
              src={ALAN} />
            <div
              style={{
                width: "100%",
                display: "grid",
                gridTemplateColumns: "35% 30% 35%"
              }}
              >
              <h4 style={{ 
                justifySelf: "right", alignSelf: "center", paddingRight: 20, fontWeight: 600}}
                >DISEÑADOR</h4>
            <img
              style={{ justifySelf: "center", }}
              height="120"
              width="120"
              className="img-fluid rounded-circle shadow-lg"
              src="https://res.cloudinary.com/dalnnaod7/image/upload/v1585523621/IMG_-rp94kw_xkmep4.jpg" />
              <h4 style={{alignSelf: "center", fontWeight: 600}}>DESARROLLADOR</h4>

            </div>
            <img
              style={{ alignSelf: "flex-start",  }}
              src={DEGA} />
          </div>
        </Container>
      </div>
    );
  }
}

export default PageHeader;
