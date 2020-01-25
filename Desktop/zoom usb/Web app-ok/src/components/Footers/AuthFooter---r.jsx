/*eslint-disable*/
import React from "react";
import { withTranslation } from 'react-i18next';
// reactstrap components
import { NavItem, NavLink, Nav, Container, Row, Col } from "reactstrap";

class AuthFooter extends React.Component {
  render() {
    const { t } = this.props;
    return (
      <>
        <footer className="py-5">
          <Container>
            <Row className="align-items-center justify-content-xl-between">
              <Col xl="6">
                <div className="copyright text-center text-xl-left text-muted">
                  © {t("2019")}{" "}
                  <a
                    className="font-weight-bold ml-1"
                    href="https://enatega.com/"
                    target="_blank"
                  >
                    Enatega
                  </a>
                </div>
              </Col>
              <Col xl="6">
                <Nav className="nav-footer justify-content-center justify-content-xl-end">
                  <NavItem>
                    <NavLink
                      href="https://enatega.com/"
                      target="_blank"
                    >
                      Enatega
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      href="https://ninjascode.com/pages/ourteam.html"
                      target="_blank"
                    >
                      {t("About Us")}
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      href="https://medium.com/@sharangohar"
                      target="_blank"
                    >
                      {t("Blog")}
                    </NavLink>
                  </NavItem>
                </Nav>
              </Col>
            </Row>
          </Container>
        </footer>
      </>
    );
  }
}

export default withTranslation()(AuthFooter);
