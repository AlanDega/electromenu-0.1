import React from "react";
import { withTranslation } from 'react-i18next';
import {
    Container
} from "reactstrap";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Header from "components/Headers/Header.jsx";
import {
    getConfiguration
} from "../apollo/server";
import OrderConfiguration from '../components/Configuration/Order/Order'
import EmailConfiguration from '../components/Configuration/Email/Email'
import PaypalConfiguration from '../components/Configuration/Paypal/Paypal'
import StripeConfiguration from '../components/Configuration/Stripe/Stripe'
import DeliveryConfiguration from '../components/Configuration/Delivery/Delivery'
import CurrencyConfiguration from '../components/Configuration/Currency/Currency'

const GET_CONFIGURATION = gql`${getConfiguration}`



class Configuration extends React.Component {

    render() {
        const { t } = this.props;
        return (
            <>
                <Header />
                <Query query={GET_CONFIGURATION}>
                    {({ loading, error, data }) => {
                        if (loading) return t("Loading")
                        if (error) return "Error :("
                        return (
                            <Container className="mt--7" fluid>
                                <OrderConfiguration prefix={data.configuration.order_id_prefix} />
                                <EmailConfiguration email={data.configuration.email} password={data.configuration.password} enabled={data.configuration.enable_email} />
                                <PaypalConfiguration clientId={data.configuration.client_id} clientSecret={data.configuration.client_secret} sandbox={data.configuration.sandbox} />
                                <StripeConfiguration publishableKey={data.configuration.publishable_key} secretKey={data.configuration.secret_key} />
                                <DeliveryConfiguration deliveryCharges={data.configuration.delivery_charges} />
                                <CurrencyConfiguration currencyCode={data.configuration.currency} currencySymbol={data.configuration.currency_symbol} />
                            </Container>
                        )
                    }}
                </Query>
            </>
        )
    }
}

export default withTranslation()(Configuration)