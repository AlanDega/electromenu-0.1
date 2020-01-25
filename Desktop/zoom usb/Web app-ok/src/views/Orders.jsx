import React from 'react';
import { withTranslation } from 'react-i18next';
import {
    Container,
    Row,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Table,
    Media,
    Pagination,
    PaginationItem,
    PaginationLink,
    Modal
} from "reactstrap";
import OrderComponent from '../components/Order/Order'
import Header from "components/Headers/Header.jsx";
import { Query, compose, withApollo } from "react-apollo";
import gql from "graphql-tag";
import { getOrders, pageCount } from "../apollo/server";
import { transformToNewline } from '../utils/stringManipulations';

const GET_ORDERS = gql`${getOrders}`
const PAGECOUNT = gql`${pageCount}`
class Orders extends React.Component {
    constructor(props) {
        super(props)
        this.state = { page: 0, pageCount: 0, loading: true, detailsModal: false, order: null }
    }
    getItems = (items) => {
        return items.map(item => `${item.quantity}x${item.food.title}(${item.variation.title})`).join('\n')
    }
    ChangePage = (page) => {
        if (typeof page === 'string') {
            if (page === 'next') {
                page = this.state.page + 1
            }
            else {
                page = this.state.page - 1
            }
        }
        if (page > -1 && page < this.state.pageCount && this.state.page !== page)
            this.setState({ page })
    }
    toggleModal = (order) => {
        this.setState({ detailsModal: !this.state.detailsModal, order })
    }
    componentDidMount = async () => {
        try {
            const { data } = await this.props.client.query({ query: PAGECOUNT })
            this.setState({ pageCount: data.pageCount, loading: false })
        }
        catch (err) {
            console.log(err)
        }
    }
    render() {
        const { t } = this.props;
        return (
            <>
                <Header />
                {/* Page content */}
                <Container className="mt--7" fluid>
                    {/* Table */}
                    <Row >
                        <div className="col">
                            <Card className="shadow">
                                <CardHeader className="border-0">
                                    <h3 className="mb-0">{t("Orders")}</h3>
                                </CardHeader>
                                <CardBody>
                                    <Table className="align-items-center table-flush" responsive>
                                        <thead className="thead-light">
                                            <tr>
                                                <th scope="col">{t("OrderID")}</th>
                                                <th scope="col">{t("User")}</th>
                                                <th scope="col">{t("Items")}</th>
                                                <th scope="col">{t("Payment")}</th>
                                                <th scope="col">{t("Status")}</th>
                                                <th scope="col">{t("Datetime")}</th>
                                                <th scope="col">{t("Address")}</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            <Query query={GET_ORDERS} variables={{ page: this.state.page }} pollInterval={60000}>
                                                {({ loading, error, data }) => {
                                                    if (loading) return <tr><td>{t("Loading")}</td></tr>;
                                                    if (error) return <tr><td>`${t("Error")}! ${error.message}`</td></tr>;
                                                    return data.allOrders.map(order =>
                                                        <tr key={order._id} onClick={() => { this.toggleModal(order) }}>
                                                            <th scope="row">
                                                                <Media>
                                                                    <span className="mb-0 text-sm">
                                                                        {order.order_id}
                                                                    </span>
                                                                </Media>
                                                            </th>
                                                            <td style={{ whiteSpace: 'pre' }}>{`${order.user.name}\n${order.user.email}\n${order.user.phone}`}</td>
                                                            <td style={{ whiteSpace: 'pre' }}>{this.getItems(order.items)}</td>
                                                            <td>{order.payment_status}</td>
                                                            <td>{order.order_status}</td>
                                                            <td style={{ whiteSpace: 'pre' }}>{new Date(order.createdAt).toLocaleString().replace(/ /g, "\n")}</td>
                                                            <td style={{ whiteSpace: 'pre' }}>{transformToNewline(order.delivery_address, 3)}</td>

                                                        </tr>
                                                    )
                                                }}
                                            </Query>
                                        </tbody>
                                    </Table>
                                </CardBody>
                                <CardFooter>
                                    <Pagination style={{ flexWrap: 'wrap' }} size="sm" aria-label="Page navigation">
                                        <PaginationItem onClick={() => this.ChangePage('prev')}>
                                            <PaginationLink previous />
                                        </PaginationItem>
                                        {!this.state.loading && new Array(this.state.pageCount).fill(0).map((val, index) => (
                                            <PaginationItem className={this.state.page === index ? "page-link" : ""} key={index} onClick={() => this.ChangePage(index)}>
                                                <PaginationLink>{index + 1}</PaginationLink>
                                            </PaginationItem>
                                        ))}
                                        <PaginationItem onClick={() => this.ChangePage('next')}>
                                            <PaginationLink next />
                                        </PaginationItem>
                                    </Pagination>
                                </CardFooter>
                            </Card></div>
                    </Row>
                    <Modal
                        className="modal-dialog-centered"
                        size="lg"
                        isOpen={this.state.detailsModal}
                        toggle={() => { this.toggleModal(null) }}>
                        <OrderComponent order={this.state.order} />
                    </Modal>

                </Container>
            </>
        )
    }
}

export default compose(withApollo, withTranslation())(Orders);