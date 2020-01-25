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
import { saveDeliveryConfiguration } from '../../../apollo/server';


const SAVE_DELIVERY_CONFIGURATION = gql`${saveDeliveryConfiguration}`

class Delivery extends Component {
    constructor(props) {
        super(props)
        this.state = {
            deliveryCharges: props.deliveryCharges || 0,
            deliveryChargesError: null
        }
    }

    onBlur = (event, field) => {
        this.setState({ [field + 'Error']: !validateFunc({ [field]: event.target.value.trim() }, field) })
    }
    validateInput = () => {
        let deliveryChargesError = !isNaN(this.state.deliveryCharges)
        this.setState({ deliveryChargesError })
        return deliveryChargesError
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
                            <h3 className="mb-0">{t("Delivery Charges")}</h3>
                        </CardHeader>
                        < Form >
                            <div className="pl-lg-4">
                                <Row>
                                    <Col md="8">
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-deliverycharges">
                                            {t("Price")}
                                        </label>
                                        <FormGroup className={this.state.deliveryChargesError === null ? "" : this.state.deliveryChargesError ? "has-success" : "has-danger"}>
                                            <Input
                                                ref={elem => { this.deliveryChargesRef = elem }}
                                                className="form-control-alternative"
                                                id="input-deliverycharges"
                                                placeholder="e.g 30.00"
                                                type="number"
                                                defaultValue={this.state.deliveryCharges}
                                                onChange={(event) => {
                                                    this.setState({ deliveryCharges: event.target.value })
                                                }}
                                                onBlur={event => { this.onBlur(event, 'deliveryCharges') }}>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="4">
                                        <Mutation mutation={SAVE_DELIVERY_CONFIGURATION}
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
                                                                        delivery_charges: Number(this.state.deliveryCharges),
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
export default withTranslation()(Delivery)