import React from "react";
import { withTranslation } from 'react-i18next';
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
  UncontrolledAlert
} from "reactstrap";

import { Redirect } from "react-router-dom";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { adminLogin } from "../apollo/server";
import { validateFunc } from '../constraints/constraints';
const LOGIN = gql`${adminLogin}`

class Login extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      email: "admin@gourmetexpress.co",
      /*email: "admin@enatega.com",*/
      password: "gourmet123",
      /*password: "enatega123",*/
      emailError: null,
      passwordError: null,
      error: null,
      redirectToReferrer: localStorage.getItem("user-enatega") ? true : false
    }
  }

  onBlur = (event, field) => {
    this.setState({ [field + 'Error']: !validateFunc({ [field]: this.state[field] }, field) })
  }

  validate = () => {
    let emailError = !validateFunc({ email: this.state.email }, "email")
    let passwordError = !validateFunc({ password: this.state.password }, "password")
    this.setState({ emailError, passwordError })
    return emailError && passwordError
  }
  
  render() {
    let { from } = this.props.location.state || { from: { pathname: "/" } };
    let { redirectToReferrer } = this.state;
    const { t } = this.props;
    if (redirectToReferrer) return <Redirect to={from} />;
    return (
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            
            <CardHeader className="bg-transparent pb-5">
              <div className="text-muted text-center mt-2 mb-3">
                <small>{t("Sign in credentials")}</small>
              </div>
            </CardHeader>

            <CardBody className="px-lg-5 py-lg-5">
              <Form role="form">
                <FormGroup className={this.state.emailError === null ? "" : this.state.emailError ? "has-success" : "has-danger"}>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      value={this.state.email}
                      onChange={event => {
                        this.setState({ email: event.target.value })
                      }}
                      onBlur={event => { this.onBlur(event, 'email') }}
                      placeholder="Email"
                      type="email" />
                  </InputGroup>
                </FormGroup>
                <FormGroup className={this.state.passwordError === null ? "" : this.state.passwordError ? "has-success" : "has-danger"}>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      value={this.state.password}
                      onChange={event => {
                        this.setState({ password: event.target.value })
                      }}
                      onBlur={event => { this.onBlur(event, 'password') }}
                      placeholder="Password"
                      type="password" />
                  </InputGroup>
                </FormGroup>

                <div className="text-center">
                  
                  <Mutation
                    mutation={LOGIN}
                    onCompleted={(data) => {
                      //localStorage.setItem("user-gourmet", JSON.stringify(data.adminLogin))
                      localStorage.setItem("user-enatega", JSON.stringify(data.adminLogin))
                      this.setState({ redirectToReferrer: true, emailError: null, passwordError: null })
                    }}
                    onError={error => {
                      this.setState({
                        emailError: null, passwordError: null,
                        error: error.networkError.result.errors[0].message
                      })
                    }}
                  >
                    {(adminLogin, { loading, error }) => {
                      return (
                        <Button
                          className="my-4"
                          color="primary"
                          type="button"
                          onClick={() => {
                            this.setState({
                              emailError: null,
                              passwordError: null,
                            })
                            if (this.validate())
                              adminLogin({ variables: { ...this.state } })
                          }}>
                          {t("Sign in")}
                        </Button>
                      )
                    }}

                  </Mutation>
                </div>
                {this.state.error &&
                  <UncontrolledAlert color="danger" fade={true}>
                    <span className="alert-inner--text">
                      {this.state.error}</span>
                  </UncontrolledAlert>}
              </Form>
            </CardBody>
          </Card>
        </Col>
      </>
    );
  }
}

export default withTranslation()(Login);
