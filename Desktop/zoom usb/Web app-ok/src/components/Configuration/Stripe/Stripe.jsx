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
import { saveStripeConfiguration } from '../../../apollo/server';


const SAVE_STRIPE_CONFIGURATION = gql`${saveStripeConfiguration}`

class Stripe extends Component {
    constructor(props) {
        super(props)
        this.state = {
            publishableKey: props.publishableKey || '',
            secretKey: props.secretKey || '',
            publishableKeyError: null,
            secretKeyError: null,
        }
    }

    onBlur = (event, field) => {
        this.setState({ [field + 'Error']: !validateFunc({ [field]: event.target.value.trim() }, field) })
    }
    validateInput = () => {
        let publishableKeyResult = true
        let secretKeyResult = true
        publishableKeyResult = !!this.state.publishableKey
        secretKeyResult = !!this.state.secretKey
        this.setState({ 'publishableKeyError': publishableKeyResult, 'secretKeyError': secretKeyResult })
        return publishableKeyResult && secretKeyResult
    }
    onCompleted = (data) => {
        console.log(data)
    }
    onError = (error) => {
        console.log(error)
    }
    onBlurCurrency = (value, field) => {
        this.setState({ [field + 'Error']: !validateFunc({ [field]: value }, field) })
    }
    render() {
        const { t } = this.props;
        return (
            <Row className="mt-3">
                <div className="col">
                    <Card className="shadow">
                        <CardHeader className="border-0">
                            <h3 className="mb-0">Stripe</h3>
                        </CardHeader>
                        < Form >
                            <div className="pl-lg-4">
                                <Row>
                                    <Col md="8">
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-publishablekey">
                                            {t("Publishable Key")}
                                        </label>
                                        <FormGroup className={this.state.publishableKeyError === null ? "" : this.state.publishableKeyError ? "has-success" : "has-danger"}>
                                            <Input
                                                className="form-control-alternative"
                                                id="input-publishablekey"
                                                placeholder="ej. pk_test_lEaBbVGnTkzja2FyFiNlbqtw"
                                                type="text"
                                                defaultValue={this.state.publishableKey}
                                                onChange={(event) => {
                                                    this.setState({ publishableKey: event.target.value })
                                                }}
                                                onBlur={event => { this.onBlur(event, 'publishableKey') }}>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="8">
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-secretkey">
                                            {t("Secret Key")}
                                        </label>
                                        <FormGroup className={this.state.secretKeyError === null ? "" : this.state.secretKeyError ? "has-success" : "has-danger"}>
                                            <Input
                                                className="form-control-alternative"
                                                id="input-secretkey"
                                                placeholder="ej. sk_test_rKNqVc2tSkdgZHNO3XnPCLn4"
                                                type="text"
                                                defaultValue={this.state.secretKey}
                                                onChange={(event) => {
                                                    this.setState({ secretKey: event.target.value })
                                                }}
                                                onBlur={event => { this.onBlur(event, 'secretKey') }}>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="4">
                                        <Mutation mutation={SAVE_STRIPE_CONFIGURATION}
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
                                                                        publishable_key: this.state.publishableKey,
                                                                        secret_key: this.state.secretKey,
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
export default withTranslation()(Stripe)
