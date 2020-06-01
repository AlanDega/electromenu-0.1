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

class Tabs extends React.Component {
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
  render() {
    return (
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
                      <img height="16px" width="16px" src="https://res.cloudinary.com/dalnnaod7/image/upload/v1590978985/iconfinder_React.js_logo_1174949_dx3wlj.png" />
                      React
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
                      <img height="16px" width="16px" src="https://res.cloudinary.com/dalnnaod7/image/upload/v1590979109/photoshop-cc_jqzr84.svg" />
                        Photoshop
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
                        Codifiqué las interacciones con React y gracias a esto puedo generar prototipos de alta fidelidad.
                      </p>
                    </TabPane>
                    <TabPane tabId="link3">
                      <p>
                      Con Photoshop pude lograr el efecto "Fade" en la fotografía de perfil del artista 
                      </p>
                    </TabPane>
                   
                  </TabContent>
                </CardBody>
              </Card>
            </Col>
            
          </Row>
        </Container>
      </div>
    );
  }
}

export default Tabs;
