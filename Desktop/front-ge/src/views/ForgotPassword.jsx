import React from "react";

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

import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { resetPassword } from "../apollo/server";
import { validateFunc } from '../constraints/constraints';
const RESET_PASSWORD = gql`${resetPassword}`

class ResetPassword extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            password: "",
            confirmPassword: "",
            confirmPasswordError: null,
            passwordError: null,
            error: null,
            success: null
        }
    }
    onBlur = (event, field) => {
        if (field === 'password')
            this.setState({ 'passwordError': !validateFunc({ password: this.state.password }, 'password') })
        else if (field === 'confirmPassword')
            this.setState({ 'confirmPasswordError': !validateFunc({ confirmPassword: this.state.confirmPassword, password: this.state.password }, 'confirmPassword') })
    }
    validate = () => {
        let confirmPasswordError = !validateFunc({ password: this.state.password, confirmPassword: this.state.confirmPassword }, "confirmPassword")
        let passwordError = !validateFunc({ password: this.state.password }, "password")
        this.setState({ confirmPasswordError, passwordError })
        return confirmPasswordError && passwordError
    }
    onCompleted = (data) => {
        this.setState({
            confirmPasswordError: null,
            passwordError: null,
            success: 'Password has been updated'
        })
    }
    render() {

        return (
            <>
                <Col lg="5" md="7">
                    <Card className="bg-secondary shadow border-0">
                        <CardHeader className="bg-transparent pb-5">
                            <div className="text-muted text-center mt-2 mb-3">
                                <small>Reset Password</small>
                            </div>
                        </CardHeader>
                        <CardBody className="px-lg-5 py-lg-5">
                            <Form role="form">

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
                                <FormGroup className={this.state.confirmPasswordError === null ? "" : this.state.confirmPasswordError ? "has-success" : "has-danger"}>
                                    <InputGroup className="input-group-alternative">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="ni ni-lock-circle-open" />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            value={this.state.confirmPassword}
                                            onChange={event => {
                                                this.setState({ confirmPassword: event.target.value })
                                            }}
                                            onBlur={event => { this.onBlur(event, 'confirmPassword') }}
                                            placeholder="Confirm Password"
                                            type="password" />
                                    </InputGroup>
                                </FormGroup>
                                <div className="text-center">
                                    <Mutation
                                        mutation={RESET_PASSWORD}
                                        onCompleted={this.onCompleted}
                                        onError={error => {
                                            this.setState({
                                                confirmPasswordError: null, passwordError: null,
                                                error: error.networkError.result.errors[0].message
                                            })
                                        }}
                                    >
                                        {(resetPassword, { loading, error }) => {
                                            return (
                                                <Button
                                                    className="my-4"
                                                    color="primary"
                                                    type="button"
                                                    onClick={() => {
                                                        this.setState({
                                                            confirmPasswordError: null,
                                                            passwordError: null,
                                                            error:null,
                                                            success:null
                                                        })
                                                        let params = new URLSearchParams(this.props.location.search)
                                                        if (this.validate() && params.get('reset')) {
                                                            resetPassword({ variables: { password: this.state.password, token: params.get('reset') } })
                                                        }
                                                    }}>
                                                    Reset
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
                                {this.state.success &&
                                    <UncontrolledAlert color="success" fade={true}>
                                        <span className="alert-inner--text">
                                            {this.state.success}</span>
                                    </UncontrolledAlert>}
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </>
        );
    }
}

export default ResetPassword;
