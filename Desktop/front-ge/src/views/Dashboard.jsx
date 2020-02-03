import React from "react";
// node.js library that concatenates classes (strings)
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Container,
    Row,
    FormGroup,
    Input,
    Col
} from "reactstrap";

import Header from "components/Headers/Header.jsx";
import { Query } from "react-apollo";
import { getDashboardTotal, getDashboardSales, getDashboardOrders } from "../apollo/server";
import gql from "graphql-tag";

const GET_DASHBOARD_TOTAL = gql`${getDashboardTotal}`
const GET_DASHBOARD_SALES = gql`${getDashboardSales}`
const GET_DASHBOARD_ORDERS = gql`${getDashboardOrders}`




const dataLine = {
    datasets:
    {
        label: 'Sales Amount',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
    }
};
const dataBar = {
    datasets:
    {
        label: 'Order count',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
    }
};

class Dashboard extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            startingDate: this.intializeStartDate(), //new Date().toISOString().substr(0,10),
            endingDate: new Date().toISOString().substr(0, 10)
        }
    }
    intializeStartDate = () => {
        var d = new Date()
        d.setDate(d.getDate() - 7)
        return d.toISOString().substr(0, 10)
    }
    componentWillMount() {
    }
    render() {
        return (
            <>
                <Header />
                {/* Page content */}
                <Container className="mt--7" fluid>
                    <Query query={GET_DASHBOARD_TOTAL} variables={{ startingDate: this.state.startingDate.toString(), endingDate: this.state.endingDate.toString() }}>
                        {({ loading, error, data }) => {
                            if (error) return null
                            return <Row>
                                <Col className="mb-lg-5 mb-sm-3" xl="4">
                                    <Card className="card-stats mb-4 mb-lg-0">
                                        <CardBody>
                                            <Row>
                                                <div className="col">
                                                    <CardTitle className="text-uppercase text-muted mb-0">
                                                        Total Órdenes
                                                </CardTitle>
                                                    <span className="h2 font-weight-bold mb-0">{loading ? '...' : data.getDashboardTotal.total_orders}</span>
                                                </div>
                                                <Col className="col-auto">
                                                    <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                                                        <i className="ni ni-cart" />
                                                    </div>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col className="mb-lg-5 mb-sm-3" xl="4">
                                    <Card className="card-stats mb-4 mb-lg-0">
                                        <CardBody>
                                            <Row>
                                                <div className="col">
                                                    <CardTitle className="text-uppercase text-muted mb-0">
                                                        Total Usuarios
                                                    </CardTitle>
                                                    <span className="h2 font-weight-bold mb-0">{loading ? '...' : data.getDashboardTotal.total_users}</span>
                                                </div>
                                                <Col className="col-auto">
                                                    <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                                                        <i className="ni ni-single-02" />
                                                    </div>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col className="mb-lg-5 mb-sm-3" xl="4">
                                    <Card className="card-stats mb-4 mb-lg-0">
                                        <CardBody>
                                            <Row>
                                                <div className="col">
                                                    <CardTitle className="text-uppercase text-muted mb-0">
                                                        Total Ventas
                                                    </CardTitle>
                                                    <span className="h2 font-weight-bold mb-0">{loading ? '...' : data.getDashboardTotal.total_sales}</span>
                                                </div>
                                                <Col className="col-auto">
                                                    <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                                                        <i className="fas fa-chart-bar" />
                                                    </div>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        }}
                    </Query>

                    <Row className="mb-lg-5 mb-sm-3">
                        <Col className="mb-5 mb-xl-0" xl="12">
                            <Card className="shadow">
                                <CardHeader className="bg-transparent">
                                    <Row className="align-items-center">
                                        <h6 className="text-uppercase text-light ls-1 mb-1">
                                           Filtrar Gráfica
                                        </h6>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Row>
                                        <Col xl="4">
                                            <FormGroup>
                                                <label
                                                    className="form-control-label"
                                                >
                                                    Fecha de Inicio
                                                        </label>
                                                <Input
                                                    className="form-control-alternative"
                                                    type="date"
                                                    max={new Date().toISOString().substr(0, 10)}
                                                    onChange={(event) => {
                                                        console.log(event.target.value)
                                                        this.setState({ startingDate: event.target.value })
                                                    }}
                                                    value={this.state.startingDate}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col xl="4">
                                            <FormGroup>
                                                <label
                                                    className="form-control-label"
                                                >
                                                    Fecha Final
                                                        </label>
                                                <Input
                                                    className="form-control-alternative"
                                                    type="date"
                                                    max={new Date().toISOString().substr(0, 10)}
                                                    onChange={(event) => {
                                                        this.setState({ endingDate: event.target.value })
                                                    }}
                                                    value={this.state.endingDate}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col xl="4">
                                            <FormGroup>
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="input-description"
                                                >
                                                    Gráfica Filtro
                                                        </label>
                                                <Button
                                                    className="btn-block"
                                                    color="primary"
                                                >
                                                    Enviar
                                                </Button>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Query query={GET_DASHBOARD_SALES} variables={{ startingDate: this.state.startingDate.toString(), endingDate: this.state.endingDate.toString() }}>
                            {({ loading, error, data }) => {
                                if (error) return null
                                return <Col className="mb-5 mb-xl-0" xl="8">
                                    <Card className="bg-gradient-default shadow">
                                        <CardHeader className="bg-transparent">
                                            <Row className="align-items-center">
                                                <div className="col">
                                                    <h6 className="text-uppercase text-light ls-1 mb-1">
                                                        Resumen
                                            </h6>
                                                    <h2 className="text-white mb-0">Valor de Ventas</h2>
                                                </div>
                                            </Row>
                                        </CardHeader>
                                        <CardBody>
                                            {/* Chart */}
                                            <div className="chart">
                                                <Line data={{ labels: loading ? [] : data.getDashboardSales.orders.map(d => d.day), datasets: [{ ...dataLine.datasets, data: loading ? [] : data.getDashboardSales.orders.map(d => d.amount) }] }} />
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col>
                            }}
                        </Query>
                        <Query query={GET_DASHBOARD_ORDERS} variables={{ startingDate: this.state.startingDate.toString(), endingDate: this.state.endingDate.toString() }}>
                            {({ loading, error, data }) => {
                                if (error) return null
                                return <Col xl="4">
                                    <Card className="shadow">
                                        <CardHeader className="bg-transparent">
                                            <Row className="align-items-center">
                                                <div className="col">
                                                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                                                        Rendimiento
                                            </h6>
                                                    <h2 className="mb-0">Total Órdenes</h2>
                                                </div>
                                            </Row>
                                        </CardHeader>
                                        <CardBody>
                                            {/* Chart */}
                                            <div className="chart">
                                                <Bar
                                                    data={{ labels: loading ? [] : data.getDashboardOrders.orders.map(d => d.day), datasets: [{ ...dataBar.datasets, data: loading ? [] : data.getDashboardOrders.orders.map(d => d.count) }] }}
                                                    width={100}
                                                    height={50}
                                                    options={{
                                                        maintainAspectRatio: false
                                                    }}
                                                />
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col>
                            }}
                        </Query>
                    </Row>
                </Container>
            </>
        );
    }
}

export default Dashboard;
