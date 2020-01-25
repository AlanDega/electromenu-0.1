import React from "react";
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";
import { withTranslation } from 'react-i18next';
// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroup,
    InputGroupAddon,
    Row,
    Col,
    Alert,
    ListGroup,
    ListGroupItem,
    Badge,
    Collapse,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    UncontrolledDropdown
} from "reactstrap";
import { validateFunc } from '../../constraints/constraints';
import {
    updateStatus,
    getAvailableRiders,
    assignRider,
    getOrderStatuses,
    updateOrderStatus,
    getPaymentStatuses,
    updatePaymentStatus,
    getConfiguration
} from '../../apollo/server';




//constants
const UPDATE_STATUS = gql`${updateStatus}`
const GET_RIDERS = gql`${getAvailableRiders}`
const ASSIGN_RIDER = gql`${assignRider}`
const GET_ORDER_STATUSES = gql`${getOrderStatuses}`
const GET_PAYMENT_STATUSES = gql`${getPaymentStatuses}`
const UPDATE_ORDER_STATUS = gql`${updateOrderStatus}`
const UPDATE_PAYMENT_STATUS = gql`${updatePaymentStatus}`
const GET_CONFIGURATION = gql`${getConfiguration}`

class Order extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ...props.order,
            selectedRider: '',
            selectedStatus: '',
            selectedPaymentStatus: '',
            customerCollapse: true,
            orderCollapse: true,
            reasonError: null,
            error: '',
            success: ''
        }
    }

    componentDidMount = () => {
        console.log(this.state)
    }
    toggle = (state) => {
        this.setState({ [state]: !this.state[state] })
    }
    validateReason = () => {
        let reasonError = !validateFunc({ reason: this.state.reason }, 'reason')
        this.setState({ reasonError })
        console.log(reasonError)
        return reasonError
    }
    onCompleted = ({ updateStatus, assignRider, updateOrderStatus, updatePaymentStatus }) => {
        if (updateStatus)
            this.setState({ status: updateStatus.status, reason: updateStatus.reason, success: 'Status Updated' })
        else if (assignRider)
            this.setState({ rider: { _id: assignRider.rider._id, name: assignRider.rider.name }, success: 'Rider assinged' })
        else if (updateOrderStatus)
            this.setState({ order_status: updateOrderStatus.order_status, success: 'Order status updated' })
        else if (updatePaymentStatus)
            this.setState({ payment_status: updatePaymentStatus.payment_status, paid_amount: updatePaymentStatus.paid_amount, success: 'Payment status updated' })
    }
    onError = (error) => {
        this.setState({ error: error.message })
    }
    onChangeRider = (event) => {
        this.setState({ selectedRider: event.target.value })
    }
    validateRider = () => {
        return !!this.state.selectedRider
    }
    validateStatus = () => {
        return !!this.state.selectedStatus
    }
    validatePaymentStatus = () => {
        return !!this.state.selectedPaymentStatus
    }
    onDismiss = () => {
        console.log('onDismiss')
        this.setState({ error: '', success: '' })
    }
    onChangeStatus = (event) => {
        this.setState({ selectedStatus: event.target.value })
    }
    onChangePaymentStatus = (event) => {
        this.setState({ selectedPaymentStatus: event.target.value })
    }
    render() {
        const { t } = this.props
        return (
            <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                    <Row className="align-items-center">
                        <Col xs="8">
                            <h3 className="mb-0">{t("Order")}#{this.state.order_id}</h3>
                        </Col>
                    </Row>
                </CardHeader>
                <CardBody>
                    <Form>
                        <div className="pl-lg-4">
                            {(this.state.error || this.state.success) && <Row>
                                <Col lg="12">
                                    <Alert color="success" isOpen={!!this.state.success} fade={true} toggle={this.onDismiss}>
                                        <span className="alert-inner--text">
                                            {this.state.success}</span>
                                    </Alert>
                                    <Alert color="danger" isOpen={!!this.state.error} fade={true} toggle={this.onDismiss}>
                                        <span className="alert-inner--text">
                                            {this.state.error}</span>
                                    </Alert>
                                </Col>
                            </Row>}
                            <Row className="mb-2">
                                <Col lg="12">
                                    <div>
                                        <Mutation mutation={UPDATE_STATUS}
                                            onCompleted={this.onCompleted}
                                            onError={this.onError}>
                                            {(mutateStatus, { loading, error }) => {
                                                if (loading) return <Button size="lg" block color="primary" disabled>Updating...</Button>
                                                return (<FormGroup className={this.state.reasonError === null ? "" : this.state.reasonError ? "has-success" : "has-danger"}>
                                                    <InputGroup>
                                                        <InputGroupAddon addonType="prepend">
                                                            <Button
                                                                disabled={this.state.status === true}
                                                                color="success"
                                                                onClick={() => {
                                                                    mutateStatus({ variables: { id: this.state._id, status: true, reason: '' } })
                                                                }}
                                                            >{this.state.status === true ? 'Aceptada' : 'Aceptar'}</Button>
                                                        </InputGroupAddon>
                                                        <Input style={{ marginLeft: '5px' }}
                                                            placeholder="Razon si es rechazado..."
                                                            value={this.state.reason || ''}
                                                            // readOnly={this.state.status === false}
                                                            onChange={(event) => {
                                                                this.setState({ reason: event.target.value })
                                                            }}
                                                            maxLength={20} />
                                                        <InputGroupAddon addonType="append">
                                                            <Button
                                                                disabled={this.state.status === false}
                                                                color="danger"
                                                                onClick={() => {
                                                                    if (this.validateReason())
                                                                        mutateStatus({ variables: { id: this.state._id, status: false, reason: this.state.reason } })
                                                                }}
                                                            >{this.state.status === false ? 'Rechazada' : 'Rechazar'}</Button>
                                                        </InputGroupAddon>
                                                    </InputGroup>
                                                </FormGroup>)
                                            }
                                            }</Mutation>
                                    </div>
                                </Col>
                            </Row>
                            {this.state.status === true && <><Row>
                                <Col xs="8">
                                    <h3 className="mb-1">Repartidor</h3>
                                </Col>
                            </Row>
                                <Row>
                                    <Col lg="6">
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-rider"
                                        >
                                            {t("Repartidores Disponibles")}
                                        </label>
                                        <FormGroup >
                                            <InputGroup>
                                                <Query query={GET_RIDERS}>
                                                    {({ loading, error, data }) => {
                                                        if (loading) return <option>Loading...</option>
                                                        if (error) return <option>Error...</option>
                                                        return (
                                                            <Input type="select" name="select" id="input-rider" onChange={this.onChangeRider} defaultValue={this.state.rider ? this.state.rider._id : ''} >
                                                                <option></option>
                                                                {data.availableRiders.map(rider => <option key={rider._id} value={rider._id}>{rider.name}</option>)}
                                                            </Input>
                                                        )
                                                    }}</Query>
                                                <InputGroupAddon addonType="append">
                                                    <Mutation mutation={ASSIGN_RIDER} onError={this.onError} onCompleted={this.onCompleted}>
                                                        {(assignRider, { loading }) => {
                                                            if (loading) return (<Button color="primary" disabled>Saving</Button>)
                                                            return <Button color="primary" disabled={this.state.rider ? this.state.rider._id === this.state.selectedRider : false} onClick={() => {
                                                                if (this.validateRider())
                                                                    assignRider({ variables: { id: this.state._id, riderId: this.state.selectedRider } })
                                                            }}>
                                                                Asignar</Button>
                                                        }}
                                                    </Mutation>
                                                </InputGroupAddon>
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                    <Col lg="6">
                                        <label
                                            className="form-control-label"
                                            htmlFor="rider-name"
                                        >
                                            {t("Asignado A")}
                                        </label>
                                        <FormGroup >
                                            <Input
                                                className="form-control-alternative"
                                                id="rider-name"
                                                type="text"
                                                readOnly
                                                value={this.state.rider ? this.state.rider.name : ""}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="8">
                                        <h3 className="mb-1">{t("Status de Órden")}</h3>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg="6">
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-rider"
                                        >
                                            {t("Seleccionar Status")}
                                        </label>
                                        <FormGroup >
                                            <InputGroup>
                                                <Query query={GET_ORDER_STATUSES}>
                                                    {({ loading, error, data }) => {
                                                        if (loading) return <option>Loading...</option>
                                                        if (error) return <option>Error...</option>
                                                        return (
                                                            <Input type="select" name="select" id="input-rider" onChange={this.onChangeStatus} defaultValue={this.state.order_status} >
                                                                <option></option>
                                                                {data.getOrderStatuses.map(status => <option key={status} value={status}>{status}</option>)}
                                                            </Input>
                                                        )
                                                    }}</Query>
                                                <InputGroupAddon addonType="append">
                                                    <Mutation mutation={UPDATE_ORDER_STATUS} onError={this.onError} onCompleted={this.onCompleted}>
                                                        {(updateOrderStatus, { loading }) => {
                                                            if (loading) return (<Button color="primary" disabled>Saving</Button>)
                                                            return <Button color="primary" disabled={this.state.order_status === this.state.selectedStatus}
                                                                onClick={() => {
                                                                    if (this.validateStatus())
                                                                        updateOrderStatus({ variables: { id: this.state._id, status: this.state.selectedStatus } })
                                                                }}>
                                                                Asignar</Button>
                                                        }}
                                                    </Mutation>
                                                </InputGroupAddon>
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                    <Col lg="6">
                                        <label
                                            className="form-control-label"
                                            htmlFor="rider-name"
                                        >
                                            {t("Status Actual")}
                                        </label>
                                        <FormGroup >
                                            <Input
                                                className="form-control-alternative"
                                                id="rider-name"
                                                type="text"
                                                readOnly
                                                value={this.state.order_status || ''}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="8">
                                        <h3 className="mb-1">{t("Status de Pago")}</h3>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg="6">
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-rider"
                                        >
                                            {t("Selecciona el Status")}
                                        </label>
                                        <FormGroup >
                                            <InputGroup>
                                                <Query query={GET_PAYMENT_STATUSES}>
                                                    {({ loading, error, data }) => {
                                                        if (loading) return <option>Loading...</option>
                                                        if (error) return <option>Error...</option>
                                                        return (
                                                            <Input type="select" name="select" id="input-rider" onChange={this.onChangePaymentStatus} defaultValue={this.state.payment_status} >
                                                                <option></option>
                                                                {data.getPaymentStatuses.map(status => <option key={status} value={status}>{status}</option>)}
                                                            </Input>
                                                        )
                                                    }}</Query>
                                                <InputGroupAddon addonType="append">
                                                    <Mutation mutation={UPDATE_PAYMENT_STATUS} onError={this.onError} onCompleted={this.onCompleted}>
                                                        {(updatePaymentStatus, { loading }) => {
                                                            if (loading) return (<Button color="primary" disabled>Saving</Button>)
                                                            return <Button color="primary" disabled={this.state.payment_status === this.state.selectedPaymentStatus}
                                                                onClick={() => {
                                                                    if (this.validatePaymentStatus())
                                                                        updatePaymentStatus({ variables: { id: this.state._id, status: this.state.selectedPaymentStatus } })
                                                                }}>
                                                                Asignar</Button>
                                                        }}
                                                    </Mutation>
                                                </InputGroupAddon>
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                    <Col lg="6">
                                        <label
                                            className="form-control-label"
                                            htmlFor="rider-name"
                                        >
                                            {t("Current Status")}
                                        </label>
                                        <FormGroup >
                                            <Input
                                                className="form-control-alternative"
                                                id="rider-name"
                                                type="text"
                                                readOnly
                                                value={this.state.payment_status || ''}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </>}
                            <Row className="align-items-center">
                                <Col xs="8">
                                    <h3 className="mb-1">{t("Cliente")}</h3>
                                </Col>
                                <Col xs="4">
                                    <Button color="primary" onClick={() => { this.toggle('customerCollapse') }} style={{ marginBottom: '1rem' }}>
                                        Mostrar/Ocultar</Button>
                                </Col>
                            </Row>
                            <Collapse isOpen={this.state.customerCollapse}>
                                <Row>
                                    <Col lg="4">
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-name"
                                        >
                                            {t("Name")}
                                        </label>
                                        <FormGroup >
                                            <Input
                                                className="form-control-alternative"
                                                id="input-name"
                                                type="text"
                                                defaultValue={this.state.user.name}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col lg="4">
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-phone"
                                        >
                                            {t("Phone")}
                                        </label>
                                        <FormGroup >
                                            <Input
                                                className="form-control-alternative"
                                                id="input-phone"
                                                type="text"
                                                defaultValue={this.state.user.phone}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col lg="4">
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-email"
                                        >
                                            {t("Email")}
                                        </label>
                                        <FormGroup >
                                            <Input
                                                className="form-control-alternative"
                                                id="input-email"
                                                type="text"
                                                defaultValue={this.state.user.email}
                                            />
                                        </FormGroup>
                                    </Col>

                                </Row>
                                <Row>
                                    <Col lg="12">
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-address"
                                        >
                                            {t("Address")}
                                        </label>
                                        <FormGroup >
                                            <Input
                                                className="form-control-alternative"
                                                id="input-address"
                                                type="text"
                                                defaultValue={this.state.delivery_address}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Collapse>
                            <Row className="align-items-center">
                                <Col xs="8">
                                    <h3 className="mb-1">{t("Detalles de Orden")}</h3>
                                </Col>
                                <Col xs="4">
                                    <Button color="primary" onClick={() => { this.toggle('orderCollapse') }} style={{ marginBottom: '1rem' }}>
                                        Mostrar/Ocultar</Button>
                                </Col>
                            </Row>
                            <Collapse isOpen={this.state.orderCollapse}>
                                <Query query={GET_CONFIGURATION}>
                                    {({ data, loading, error }) => {
                                        if (loading) return null
                                        if (error) return null
                                        return <Row>
                                            <Col lg="6">
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="input-items">
                                                    {t("Productos")}
                                                </label>
                                                <FormGroup>
                                                    <ListGroup id="input-items">
                                                        {this.state.items.map((item) => {
                                                            return (<ListGroupItem key={item._id} className="justify-content-between">
                                                                <Badge style={{ fontSize: '12px', backgroundColor: 'grey' }} pill>{item.quantity}</Badge>
                                                                x {`${item.food.title}(${item.variation.title})`}
                                                                <Badge style={{ fontSize: '12px', backgroundColor: 'black', float: 'right' }} pill>{data.configuration.currency_symbol} {(item.variation.price * item.quantity).toFixed(2)}</Badge>
                                                                {!!item.addons.length &&<UncontrolledDropdown>
                                                                    <DropdownToggle caret>
                                                                        Adicionales
                                                                        </DropdownToggle>
                                                                    <DropdownMenu>
                                                                        {item.addons.map(addon => {
                                                                            return addon.options.map(option => (
                                                                                <DropdownItem key={option._id}>
                                                                                   {addon.title}:- {option.title} <Badge style={{ fontSize: '12px', backgroundColor: 'black', float: 'right' }} pill>{data.configuration.currency_symbol} {option.price}</Badge>
                                                                                </DropdownItem >
                                                                            ))
                                                                        })}</DropdownMenu>
                                                                </UncontrolledDropdown>}
                                                            </ListGroupItem>)
                                                        })}
                                                    </ListGroup>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <Row>
                                                    <Col md="12">
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-price">
                                                            {t("Cargos")}
                                                        </label>
                                                        <FormGroup>
                                                            <ListGroup id="input-price">
                                                                <ListGroupItem className="justify-content-between" >
                                                                    Subtotal
                                                <Badge style={{ fontSize: '12px', color: 'black', float: 'right' }} pill>{data.configuration.currency_symbol} {(this.state.order_amount - this.state.delivery_charges).toFixed(2)}</Badge>
                                                                </ListGroupItem>
                                                                <ListGroupItem className="justify-content-between" >
                                                                    Cargos de entrega
                                                <Badge style={{ fontSize: '12px', float: 'right', color: 'black' }}>{data.configuration.currency_symbol} {this.state.delivery_charges.toFixed(2)}</Badge>
                                                                </ListGroupItem>
                                                                <ListGroupItem className="justify-content-between" >
                                                                    Total
                                                <Badge style={{ fontSize: '12px', color: 'black', float: 'right' }} pill>{data.configuration.currency_symbol} {this.state.order_amount.toFixed(2)}</Badge>
                                                                </ListGroupItem>
                                                            </ListGroup>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md="12">
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-payment">
                                                            {t("Pago")}
                                                        </label>
                                                        <FormGroup>
                                                            <ListGroup id="input-payment">
                                                                <ListGroupItem className="justify-content-between" >
                                                                    Metodo de Pago
                                                <Badge style={{ fontSize: '12px', backgroundColor: 'green', float: 'right' }} pill>{this.state.payment_method}</Badge>
                                                                </ListGroupItem>
                                                                <ListGroupItem className="justify-content-between" >
                                                                    Monto Pagado
                                                <Badge style={{ fontSize: '12px', float: 'right', color: 'black' }}>{data.configuration.currency_symbol} {this.state.paid_amount ? this.state.paid_amount.toFixed(2) : 0}</Badge>
                                                                </ListGroupItem>
                                                            </ListGroup>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>  
                                            </Col>
                                        </Row>

                                    }}
                                </Query>
                            </Collapse>
                        </div>
                    </Form>
                </CardBody>
            </Card >)
    }
}
export default withTranslation()(Order)