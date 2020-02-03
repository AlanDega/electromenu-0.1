/*eslint-disable*/
import React from "react";
import { withTranslation } from 'react-i18next';
// reactstrap components
import { Row, Col, Nav, NavItem, NavLink } from "reactstrap";

class Footer extends React.Component {
  render() {
    const { t } = this.props;
    return (
      <footer className="footer">
        <Row className="align-items-center justify-content-xl-between">
          <Col xl="6">
            
          </Col>

          <Col xl="6">
            <Nav className="nav-footer justify-content-center justify-content-xl-end">
              <NavItem>
                <NavLink
                  href="https://www.gourmetexpress.co/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Gourmet Express
                </NavLink>
              </NavItem>

              <NavItem>
                
              </NavItem>

              <NavItem>
                
              </NavItem>
            </Nav>
          </Col>
        </Row>
      </footer>
    );
  }
}

export default withTranslation()(Footer);
