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
import { savePaypalConfiguration } from '../../../apollo/server';

const SAVE_PAYPAL_CONFIGURATION = gql`${savePaypalConfiguration}`

class Paypal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            clientId: props.clientId || '',
            clientSecret: props.clientSecret || '',
            sandbox: !!props.sandbox,
            clientIdError: null,
            clientSecretError: null
        }
    }

    onBlur = (event, field) => {
        this.setState({ [field + 'Error']: !validateFunc({ [field]: event.target.value.trim() }, field) })
    }
    validateInput = () => {
        let clientIdResult = true
        let clientSecretResult = true
        clientIdResult = !!this.state.clientId
        clientSecretResult = !!this.state.clientSecret
        this.setState({ 'clientIdError': clientIdResult, 'clientSecretError': clientSecretResult })
        return clientIdResult && clientSecretResult
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
                            <h3 className="mb-0">{t("Paypal")}</h3>
                        </CardHeader>
                        < Form >
                            <div className="pl-lg-4">
                                <Row>
                                    <Col md="8">
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-clientid">
                                            {t("Client ID")}
                                        </label>
                                        <FormGroup className={this.state.clientIdError === null ? "" : this.state.clientIdError ? "has-success" : "has-danger"}>
                                            <Input
                                                className="form-control-alternative"
                                                id="input-clientid"
                                                placeholder="ej. AeGIgSX--JEVwoQgLjGOb8gh1DUJG0MFVgLc2mBIe6_V5NefV0LM3L78m01fLLI6U2FFB-qJr4ErrtL1"
                                                type="text"
                                                defaultValue={this.state.clientId}
                                                onChange={(event) => {
                                                    this.setState({ clientId: event.target.value })
                                                }}
                                                onBlur={event => { this.onBlur(event, 'clientId') }}>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="8">
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-clientsecret">
                                            {t("Client Secret")}
                                        </label>
                                        <FormGroup className={this.state.clientSecretError === null ? "" : this.state.clientSecretError ? "has-success" : "has-danger"}>
                                            <Input
                                                className="form-control-alternative"
                                                id="input-clientsecret"
                                                placeholder="ej. EHAP6CSZt3kwzcpdxrpw16PqHEspw5wtJCVVux_95e2Qcwbeh6mQp9GncEbxnVFkEbJu4z1i-GuDDthf"
                                                type="text"
                                                defaultValue={this.state.clientSecret}
                                                onChange={(event) => {
                                                    this.setState({ clientSecret: event.target.value })
                                                }}
                                                onBlur={event => { this.onBlur(event, 'clientSecret') }}>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="8">
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-enable">
                                            {t("Sandbox")}
                                        </label>
                                        <FormGroup >
                                            <label className="custom-toggle">
                                                <input defaultChecked={this.state.sandbox} type="checkbox" onChange={event => {
                                                    this.setState({ sandbox: event.target.checked })
                                                }} />
                                                <span className="custom-toggle-slider rounded-circle" />
                                            </label>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="4">
                                        <Mutation mutation={SAVE_PAYPAL_CONFIGURATION}
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
                                                                        client_id: this.state.clientId,
                                                                        client_secret: this.state.clientSecret,
                                                                        sandbox: this.state.sandbox
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

export default withTranslation()(Paypal)