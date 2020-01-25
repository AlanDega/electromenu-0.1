
import React, { Component } from 'react'
import { withTranslation } from 'react-i18next';
import {
    Row,
    Col,
    Card,
    CardHeader,
    FormGroup,
    Form,
    Input,
    Button
} from "reactstrap";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { validateFunc } from '../../../constraints/constraints';
import { saveEmailConfiguration } from '../../../apollo/server';

const SAVE_EMAIL_CONFIGURATION = gql`${saveEmailConfiguration}`


class Email extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: props.email || '',
            password: props.password || '',
            enableEmail: !!props.enabled,
            emailError: null,
            passwordError: null
        }
    }

    onBlur = (event, field) => {
        this.setState({ [field + 'Error']: !validateFunc({ [field]: event.target.value.trim() }, field) })
    }
    validateInput = () => {
        let emailResult = true
        let passwordResult = true
        emailResult = !validateFunc({ 'email': this.state.email }, 'email')
        passwordResult = !validateFunc({ 'password': this.state.password }, 'password')
        this.setState({ 'emailError': emailResult, 'passwordError': passwordResult })
        return emailResult && passwordResult
    }
    onCompleted = (data) => {
        console.log(data)
    }
    onError = (error) => {
        console.log(error)
    }
    render() {
        const { t } = this.props;
        return (
            <Row className="mt-3">
                <div className="col">
                    <Card className="shadow">
                        <CardHeader className="border-0">
                            <h3 className="mb-0">{t("Email")}</h3>
                        </CardHeader>
                        < Form >
                            <div className="pl-lg-4">
                                <Row>
                                    <Col md="8">
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-email">
                                            {t("Email")}
                                        </label>
                                        <FormGroup className={this.state.emailError === null ? "" : this.state.emailError ? "has-success" : "has-danger"}>
                                            <Input
                                                className="form-control-alternative"
                                                id="input-email"
                                                placeholder="ej. mail@email.com"
                                                type="text"
                                                defaultValue={this.state.email}
                                                onChange={(event) => {
                                                    this.setState({ email: event.target.value })
                                                }}
                                                onBlur={event => { this.onBlur(event, 'email') }}>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="8">
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-password">
                                            {t("Password")}
                                        </label>
                                        <FormGroup className={this.state.passwordError === null ? "" : this.state.passwordError ? "has-success" : "has-danger"}>
                                            <Input
                                                className="form-control-alternative"
                                                id="input-password"
                                                placeholder="ej. PLATILLO-"
                                                type="text"
                                                defaultValue={this.state.password}
                                                onChange={(event) => {
                                                    this.setState({ password: event.target.value })
                                                }}
                                                onBlur={event => { this.onBlur(event, 'password') }}>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="8">
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-enable">
                                            {t("Enable/Disable")}
                                        </label>
                                        <FormGroup >
                                            <label className="custom-toggle">
                                                <input defaultChecked={this.state.enableEmail} type="checkbox" onChange={event => {
                                                    this.setState({ enableEmail: event.target.checked })
                                                }} />
                                                <span className="custom-toggle-slider rounded-circle" />
                                            </label>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="4">
                                        <Mutation mutation={SAVE_EMAIL_CONFIGURATION}
                                            onCompleted={this.onCompleted}
                                            onError={this.onError}>
                                            {(saveConfiguration, { loading, error }) => {
                                                if (loading) return t("Saving")
                                                if (error) return t("Error")
                                                return (<Button
                                                    className="btn-block mb-2"
                                                    type="button"
                                                    color="primary"
                                                    onClick={e => {
                                                        e.preventDefault()
                                                        if (this.validateInput())
                                                            saveConfiguration({
                                                                variables: {
                                                                    configurationInput: {
                                                                        email: this.state.email,
                                                                        password: this.state.password,
                                                                        enable_email: this.state.enableEmail
                                                                    }
                                                                }
                                                            })
                                                    }}
                                                    size="lg"
                                                >
                                                    {t("Save")}</Button>)
                                            }}

                                        </Mutation>
                                    </Col>
                                </Row>
                            </div>
                        </ Form>
                    </Card>
                </div>
            </Row>

        )
    }
}
export default withTranslation()(Email)