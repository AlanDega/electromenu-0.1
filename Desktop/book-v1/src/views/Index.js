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

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import PageHeader from "components/PageHeader/PageHeader.js";
import Footer from "components/Footer/Footer.js";

// sections for this page/view
import Basics from "views/IndexSections/Basics.js";
import Navbars from "views/IndexSections/Navbars.js";
import Tabs from "views/IndexSections/Tabs.js";
import Pagination from "views/IndexSections/Pagination.js";
import Notifications from "views/IndexSections/Notifications.js";
import Typography from "views/IndexSections/Typography.js";
import JavaScript from "views/IndexSections/JavaScript.js";
import NucleoIcons from "views/IndexSections/NucleoIcons.js";
import Signup from "views/IndexSections/Signup.js";
import Examples from "views/IndexSections/Examples.js";
import Download from "views/IndexSections/Download.js";
import classnames from "classnames";
// reactstrap components
import {
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";


class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      iconTabs: 1,
      textTabs: 4
    };  
  }
  toggleTabs = (e, stateName, index) => {
    e.preventDefault();
    this.setState({
      [stateName]: index
    });
  };
  componentDidMount() {
    document.body.classList.toggle("index-page");
  }
  componentWillUnmount() {
    document.body.classList.toggle("index-page");
  }
  render() {
    return (
      <>
        <IndexNavbar />
        <div className="wrapper">
          <PageHeader />
          <div className="main">
            <Basics />
            <Tabs />
            <div style={{ width: "100%"}}>
            <video
            style={{ width: "100%", padding:"0 10%", outline:"none"}}
            src="https://res.cloudinary.com/dalnnaod7/video/upload/v1590891795/v2-native_chngon.mp4" controls height="80%" width="80%">
          </video>
            </div>
            <div className="section section-tabs">
        <Container>
          
          <Row>
            <Col className="ml-auto mr-auto" md="10" xl="6">
              <div className="mb-3">
                <small className="text-uppercase font-weight-bold">
                  Herramientas utilizadas
                </small>
              </div>
              <Card>
                <CardHeader>
                  <Nav className="nav-tabs-info" role="tablist" tabs>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: this.state.iconTabs === 1
                        })}
                        onClick={e => this.toggleTabs(e, "iconTabs", 1)}
                        href="#pablo"
                      >
                        <img height="16px" width="16px" src="https://res.cloudinary.com/dalnnaod7/image/upload/v1590978882/sketch_ct6kv6.svg" />
                        Sketch
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: this.state.iconTabs === 2
                        })}
                        onClick={e => this.toggleTabs(e, "iconTabs", 2)}
                        href="#pablo"
                      >
                      <img height="16px" width="16px" src="https://res.cloudinary.com/dalnnaod7/image/upload/v1590983952/protopie-logo_jls5mn.png" />
                        Protopie
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: this.state.iconTabs === 3
                        })}
                        onClick={e => this.toggleTabs(e, "iconTabs", 3)}
                        href="#pablo"
                      >
                      <img height="16px" width="16px" src="https://res.cloudinary.com/dalnnaod7/image/upload/v1590994823/framer-x_kpnec7.png" />
                          Framer X
                      </NavLink>
                    </NavItem>
                   
                  </Nav>
                </CardHeader>
                <CardBody>
                  <TabContent
                    className="tab-space"
                    activeTab={"link" + this.state.iconTabs}
                  >
                    <TabPane tabId="link1">
                      <p>
                        Sketch me ayudó a diseñar rápidamente esta UI porque usé Symbols y Text Styles para poder 
                        reutilizar mi trabajo.
                      </p>
                    </TabPane>
                    <TabPane tabId="link2">
                      <p>
                      Con Protopie diseñé las animaciones de este prototipo para poder hacer pruebas 
                      de usabilidad.
                      </p>
                    </TabPane>
                    <TabPane tabId="link3">
                      <p>
                      lo usé para poder empezar a transicionar el diseño a un componente
                      de React.
                      </p>
                    </TabPane>
                   
                  </TabContent>
                </CardBody>
              </Card>
            </Col>
            
          </Row>
        </Container>
      </div>
            <div style={{ width: "100%"}}>
            <video
            style={{ width: "100%", padding:"0 10%", outline: "none"}}
            src="https://res.cloudinary.com/dalnnaod7/video/upload/v1591040888/landingpage_yanfia.mov" controls height="80%" width="80%">
          </video>
            </div>
            <div className="section section-tabs">
        <Container>
          
          <Row>
            <Col className="ml-auto mr-auto" md="10" xl="6">
              <div className="mb-3">
                <small className="text-uppercase font-weight-bold">
                  Herramientas utilizadas
                </small>
              </div>
              <Card>
                <CardHeader>
                  <Nav className="nav-tabs-info" role="tablist" tabs>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: this.state.iconTabs === 1
                        })}
                        onClick={e => this.toggleTabs(e, "iconTabs", 1)}
                        href="#pablo"
                      >
                        <img height="16px" width="16px" src="https://res.cloudinary.com/dalnnaod7/image/upload/v1590979109/photoshop-cc_jqzr84.svg" />
                        Photoshop
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: this.state.iconTabs === 2
                        })}
                        onClick={e => this.toggleTabs(e, "iconTabs", 2)}
                        href="#pablo"
                      >
                      <img height="16px" width="16px" src="https://res.cloudinary.com/dalnnaod7/image/upload/v1590978882/sketch_ct6kv6.svg" />
                        Sketch
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: this.state.iconTabs === 3
                        })}
                        onClick={e => this.toggleTabs(e, "iconTabs", 3)}
                        href="#pablo"
                      >
                      <img height="16px" width="16px" src="https://res.cloudinary.com/dalnnaod7/image/upload/v1590983952/protopie-logo_jls5mn.png" />
                          Protopie
                      </NavLink>
                    </NavItem>
                   
                  </Nav>
                </CardHeader>
                <CardBody>
                  <TabContent
                    className="tab-space"
                    activeTab={"link" + this.state.iconTabs}
                  >
                    <TabPane tabId="link1">
                      <p>
                       La imagen Hero (cabecera) la diseñé con Photoshop.
                      </p>
                    </TabPane>
                    <TabPane tabId="link2">
                      <p>
                      Utilizé como base la imagen de Photoshop y con Sketch diseñe todo lo demás de la UI .
                      </p>
                    </TabPane>
                    <TabPane tabId="link3">
                      <p>
                      Con Protopie logré animar las interacciones cuando el usuario hace "hover" sobre la imagen
                       el video se reproduce , la imagen de fondo se expande y el tamaño del video también.
                      </p>
                    </TabPane>
                   
                  </TabContent>
                </CardBody>
              </Card>
            </Col>
            
          </Row>
        </Container>
      </div>
            <div style={{
              width: "100%",
              display: "grid",
              justifyItems: "center"
            }}>
            
           
            </div>
          </div>
          <Download />
       
          <Footer />
        </div>
      </>
    );
  }
}

export default Index;
