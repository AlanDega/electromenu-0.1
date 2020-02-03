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
import { saveOrderConfiguration } from '../../../apollo/server';

const SAVE_ORDER_CONFIGURATION = gql`${saveOrderConfiguration}`

class Order extends Component {
    constructor(props) {
        super(props)
        this.state = {
            prefix: props.prefix || '',
            prefixError: null
        }
    }

    onBlur = (event, field) => {
        this.setState({ [field + 'Error']: !validateFunc({ [field]: event.target.value.trim() }, field) })
    }
    validateInput = () => {
        let result = true
        result = !validateFunc({ 'prefix': this.state.prefix }, 'prefix')
        this.setState({ 'prefixError': result })
        return result

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
                            <h3 className="mb-0">{t("Order")}</h3>
                        </CardHeader>
                        < Form >
                            <div className="pl-lg-4">
                                <Row>
                                    <Col md="8">
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-orderid">
                                            {t("OrderID prefix")}
                                        </label>
                                        <FormGroup className={this.state.prefixError === null ? "" : this.state.prefixError ? "has-success" : "has-danger"}>
                                            <Input
                                                className="form-control-alternative"
                                                id="input-orderid"
                                                placeholder="e.g FOOD-"
                                                type="text"
                                                defaultValue={this.state.prefix}
                                                onChange={(event) => {
                                                    this.setState({ prefix: event.target.value })
                                                }}
                                                onBlur={event => { this.onBlur(event, 'prefix') }}>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="4">
                                        <Mutation mutation={SAVE_ORDER_CONFIGURATION}
                                            onCompleted={this.onCompleted}
                                            onError={this.onError}>
                                            {(saveConfiguration, { loading, error }) => {
                                                if (loading) return "Saving..."
                                                if (error) return "Error :("
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
                                                                        order_id_prefix: this.state.prefix
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


export default withTranslation()(Order)
