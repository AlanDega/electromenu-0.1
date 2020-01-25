import React, { Component } from 'react'
import { withTranslation } from 'react-i18next';
import {
    Row,
    Col,
    Card,
    CardHeader,
    FormGroup,
    Form,
    Button
} from "reactstrap";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { validateFunc } from '../../../constraints/constraints';
import { Typeahead } from 'react-bootstrap-typeahead';
import { stripeCurrencies } from '../../../config/currencies';
import { saveCurrencyConfiguration } from '../../../apollo/server';


const SAVE_CURRENCY_CONFIGURATION = gql`${saveCurrencyConfiguration}`

class Currency extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currencyCode: props.currencyCode || '',
            currencySymbol: props.currencySymbol || '',
            currencyCodeError: null,
            currencySymbolError: null
        }
    }
    validateInput = () => {
        let currencyCodeError = !validateFunc({ 'currencyCode': this.state.currencyCode }, 'currencyCode')
        let currencySymbolError = !validateFunc({ 'currencySymbol': this.state.currencySymbol }, 'currencySymbol')
        this.setState({ currencyCodeError, currencySymbolError })
        return currencyCodeError && currencySymbolError
    }
    onCompleted = (data) => {
        console.log(data)
    }
    onError = (error) => {
        console.log(error)
    }
    onBlur = (value, field) => {
        this.setState({ [field + 'Error']: !validateFunc({ [field]: value }, field) })
    }
    render() {
        const { t } = this.props;
        var currency_codesT = stripeCurrencies.map(val => val.currency)
        const currency_codes = [...new Set(currency_codesT)]
        var currency_symbolsT = stripeCurrencies.map(val => val.currency_symbol)
        const currency_symbols = [...new Set(currency_symbolsT)]
        return (
            <Row className="mt-3">
                <div className="col">
                    <Card className="shadow">
                        <CardHeader className="border-0">
                            <h3 className="mb-0">{t("Currency")}</h3>
                        </CardHeader>
                        < Form >
                            <div className="pl-lg-4">
                                <Row>
                                    <Col md="6">
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-orderid">
                                            {t("Currency Code")}
                                        </label>
                                        <FormGroup className={this.state.currencyCodeError === null ? "" : this.state.currencyCodeError ? "has-success" : "has-danger"}>
                                            <Typeahead
                                                defaultSelected={[this.state.currencyCode || '']}
                                                onInputChange={value => {
                                                    this.setState({ currencyCode: value })
                                                }}
                                                labelKey="currencyCode"
                                                options={currency_codes}
                                                placeholder={t("Currency Code")}
                                                id="CurrencyCode"
                                                onBlur={() => { this.onBlur(this.state.currencyCode, 'currencyCode') }}
                                                ref={this.currencyCode}
                                                onChange={values => { this.setState({ currencyCode: values[0] }) }}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md="5">
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-orderid">
                                            {t("Currency Symbol")}
                                        </label>
                                        <FormGroup className={this.state.currencySymbolError === null ? "" : this.state.currencySymbolError ? "has-success" : "has-danger"}>
                                            <Typeahead
                                                defaultSelected={[this.state.currencySymbol || '']}
                                                onInputChange={value => {
                                                    this.setState({ currencySymbol: value })
                                                }}
                                                labelKey="currencySymbol"
                                                options={currency_symbols}
                                                placeholder={t("Currency Symbol")}
                                                id="CurrencySymbol"
                                                ref={this.currencySymbol}
                                                onBlur={() => { this.onBlur(this.state.currencySymbol, 'currencySymbol') }}
                                                onChange={values => { this.setState({ currencySymbol: values[0] }) }}
                                            />
                                        </FormGroup>
                                    </Col>

                                </Row>
                                <Row>
                                    <Col md="4">
                                        <Mutation mutation={SAVE_CURRENCY_CONFIGURATION}
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
                                                                        currency: this.state.currencyCode,
                                                                        currency_symbol: this.state.currencySymbol
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

export default withTranslation()(Currency)
