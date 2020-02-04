import React, { Component } from 'react';
import {
    Card,
    CardBody,
    CardHeader,
    Row,
    Col,
    Form,
    FormGroup,
    Input,
    Button,
    Label,
    Modal,
    Alert
} from 'reactstrap';
import { withTranslation } from 'react-i18next';
import { Query, Mutation, compose, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { getOptions, createAddons, getAddons, editAddon, getInventarioItems } from '../../apollo/server';
import OptionsComponent from '../Option/Option';
import { validateFunc } from '../../constraints/constraints'

const GET_INVENTARIOITEMS = gql`${getInventarioItems}`
const CREATE_INVENTARIO = gql`${createAddons}`
const GET_INVENTARIOS = gql`${getAddons}`
const EDIT_ADDON = gql`${editAddon}`

class Inventario extends Component {
    constructor(props) {
        super(props)
        const inventario = props.inventario ? [{
            ...props.inventario,
            inventarioItems: props.inventario.inventarioItems.map(({ _id }) => _id),
            titleError: false,
            descriptionError: false,
            inventarioItemsError: false,
            // quantity_minimumError: false,
            // quantity_maximumError: false
        }] : null
        this.state = {
            inventarios: inventario || [{
                title: '',
                description: '',
                // quantity_minimum: 0,
                // quantity_maximum: 1,
                inventarioItems: [],
                titleError: false,
                descriptionError: false,
                inventarioItemsError: false,
                // quantity_minimumError: false,
                // quantity_maximumError: false
            }],
            optionsModal: false,
            success: '',
            error: '',
            inventarioIndex: 0
        }

    }
    onChangeOption = (event) => {
        //added this because on clear after saving was not clearing selected options in the list.
        // console.log(event)
    }
    onChange = (event, index, state) => {
        const inventarios = this.state.inventarios
        inventarios[index][state] = event.target.value
        this.setState({ inventarios })
    }
    onBlur = (index, state) => {
        const inventarios = this.state.inventarios
        if (state === "title")
            inventarios[index]['titleError'] = !!validateFunc({ addonTitle: inventarios[index][state] }, 'addonTitle')
        if (state === "description")
            inventarios[index]['descriptionError'] = !!validateFunc({ addonDescription: inventarios[index][state] }, 'addonDescription')
       
        if (state === "inventarioItems") {
            addons[index]['inventarioItemsError'] = addons[index]['inventarioItems'].length === 0
        }
        this.setState({ inventarios })
    }
    onSelectOption = (index, id) => {
        const inventarios = this.state.inventarios
        const inventarioItem = inventarios[index].inventarioItems.indexOf(id)
        if (inventarioItem < 0)
            inventarios[index].inventarioItems.push(id)
        else
            inventario[index].inventarioItems.splice(inventarioItem, 1)
        this.setState({ inventarios })
    }
    updateOptions = (ids) => {
        console.log(this.state.inventarioIndex,ids)
        const inventarios = this.state.inventarios
        inventarios[this.state.inventarioIndex].inventarioItems = inventarios[this.state.inventarioIndex].inventarioItems.concat(ids)
        this.setState({ inventarios })
    }
    onAdd = (index) => {
        const inventarios = this.state.inventarios
        if (index === inventarios.length - 1)
            inventarios.push({ title: '', description: '', quantity_minimum: 0, quantity_maximum: 1, options: [] })
        else
            inventarios.splice(index + 1, 0, { title: '', description: '', quantity_minimum: 0, quantity_maximum: 1, options: [] });
        this.setState({ inventarios })
    }
    onRemove = (index) => {
        if (this.state.inventarios.length === 1 && index === 0) {
            return
        }
        const inventarios = this.state.inventarios
        inventarios.splice(index, 1);
        this.setState({ inventarios })
    }
    toggleModal = (index) => {
        console.log(index)
        this.setState({ inventarioItemsModal: !this.state.inventarioItemsModal, inventarioIndex: index })
    }
    validate = () => {
        const inventarios = this.state.inventarios
        inventarios.map((inventario, index) => {
            this.onBlur(index, 'title')
            this.onBlur(index, 'description')
            this.onBlur(index, 'quantity_minimum')
            this.onBlur(index, 'quantity_maximum')
            this.onBlur(index, 'options')
            return inventario
        })
        const error = inventarios.filter(inventario => inventario.titleError || inventario.descriptionError || inventario.quantity_minimumError || inventario.quantity_maximumError || inventario.optionsError)
        if (!error.length)
            return true
        return false
    }
    onCompleted = ({ createInventarios, editInventario }) => {
        if (createInventarios) {
            this.setState({
                inventarios: [{
                    title: '',
                    description: '',
                    quantity_minimum: 0,
                    quantity_maximum: 1,
                    inventarioItems: [],
                    titleError: false,
                    descriptionError: false,
                    optionsError: false,
                    quantity_minimumError: false,
                    quantity_maximumError: false
                }],
                success: 'Saved', error: ''
            })
        }
        if (editInventario)
            this.setState({ success: 'Saved', error: '' })
    }
    onError = (error) => {
        this.setState({ error: 'Un error ha oocurrido al guardar, Prueba nuevamente', success: '' })
    }
    update = (proxy, { data: { createInventarios } }) => {
        try {
            if (createInventarios) {
                const data = proxy.readQuery({ query: GET_INVENTARIOS });
                data.inventario = data.inventario.concat(createInventario);
                proxy.writeQuery({ query: GET_ADDONS, data });
                if (this.props.updateAddonsList)
                    this.props.updateAddonsList(createAddons.map(({ _id }) => _id))
            }
        } catch (error) {
            console.error(error);
        }
    }
    onDismiss = () => {
        this.setState({ error: '', success: '' })
    }
    render() {
        const { t } = this.props
        return (
            <Card>
                <CardHeader>Adicionales</CardHeader>
                <CardBody>
                    <Form>
                        <div >
                            {this.state.addons.map((addon, index) => (
                                <div key={index}>
                                    <Row>
                                        <Col lg="6">
                                            <Row>
                                                <Col lg="12">
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-title"
                                                    >
                                                        {t("Title")}
                                                    </label>
                                                    <br />
                                                    <small>{t("Character limit of max length 60")}</small>
                                                    <FormGroup className={addon.titleError === true ? "has-danger" : ""}>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="input-title"
                                                            placeholder="ej. Pepsi"
                                                            type="text"
                                                            maxLength="60"
                                                            value={addon.title}
                                                            onChange={(event) => {
                                                                this.onChange(event, index, 'title')
                                                            }}
                                                            onBlur={event => { this.onBlur(index, 'title') }}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col lg="12">
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-description"
                                                    >
                                                        {t("Description")}
                                                    </label>
                                                    <br />
                                                    <small>{t("Character limit of max length 60")}</small>
                                                    <FormGroup className={addon.descriptionError === true ? "has-danger" : ""}>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="input-description"
                                                            placeholder="ej. Opcional"
                                                            type="text"
                                                            maxLength="60"
                                                            value={addon.description || ''}
                                                            onChange={(event) => {
                                                                this.onChange(event, index, 'description')
                                                            }}
                                                            onBlur={(event) => { this.onBlur(index, 'description') }}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col lg="12">
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-minimum"
                                                    >
                                                        {t("Quantity Minimum")}
                                                    </label>
                                                    <br />
                                                    <small>{t("Must be a less than or equal to Maximum")}</small>
                                                    <FormGroup className={addon.quantity_minimumError === true ? "has-danger" : ""}>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="input-minimum"
                                                            placeholder="e.g 90.25"
                                                            type="number"
                                                            min={'0'}
                                                            value={addon.quantity_minimum}
                                                            onChange={(event) => {
                                                                this.onChange(event, index, 'quantity_minimum')
                                                            }}
                                                            onBlur={(event) => { this.onBlur(index, 'quantity_minimum') }}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col lg="12">
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-maximum"
                                                    >
                                                        {t("Quantity Maximum")}
                                                    </label>
                                                    <br />
                                                    <small>{t("Must be a greater than or equal to Minimum")}</small>
                                                    <FormGroup className={addon.quantity_maximumError === true ? "has-danger" : ""}>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="input-maximum"
                                                            placeholder="e.g 90.25"
                                                            type="number"
                                                            min={'1'}
                                                            value={addon.quantity_maximum}
                                                            onChange={(event) => {
                                                                this.onChange(event, index, 'quantity_maximum')
                                                            }}
                                                            onBlur={(event) => { this.onBlur(index, 'quantity_maximum') }}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col lg="6">
                                            <Row className="mb-2">
                                                <Col>
                                                    <label
                                                        className="form-control-label">
                                                        {t("Options")}
                                                    </label>
                                                    <br />
                                                    {!this.state.addons[index].options.length && <small className="text-red">{t("Select atleast one Option")}</small>}
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col
                                                ><FormGroup>
                                                        <Button color="warning" onClick={this.toggleModal.bind(this, index)}>New</Button>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row style={{ maxHeight: "67vh", overflowY: "scroll" }}>
                                                <Col>
                                                    <Query query={GET_OPTIONS}>
                                                        {({ loading, error, data }) => {
                                                            if (loading) return "Cargando ..."
                                                            if (error) return "Error ..."
                                                            return data.options.map((option) => (
                                                                <FormGroup key={option._id} check style={{ width: '100%', marginTop: '10px' }}>
                                                                    <Label check>
                                                                        <Input checked={this.state.addons[index].options.includes(option._id)} onChange={this.onChangeOption} value={option._id} type="checkbox" onClick={this.onSelectOption.bind(this, index, option._id)} />
                                                                        {`${option.title} (Descripcion: ${option.description})(Prcio: ${option.price})`}
                                                                    </Label>
                                                                </FormGroup>
                                                            ))
                                                        }}
                                                    </Query>
                                                </Col>
                                            </Row>
                                            {!this.props.addon && <Row className="mt-2">
                                                <Col>
                                                    <label
                                                        className="form-control-label"
                                                    >
                                                        {t("Add/Remove Addons")}
                                                    </label>
                                                    <FormGroup>
                                                        <Button color="danger" onClick={() => { this.onRemove(index) }}>-</Button>
                                                        <Button onClick={() => { this.onAdd(index) }} color="primary">+</Button>
                                                    </FormGroup>
                                                </Col>
                                            </Row>}
                                        </Col>
                                    </Row>
                                    <hr />
                                </div>
                            ))}
                            < Row >
                                <Col lg={{ offset: 4, size: 4 }}>
                                    <Mutation mutation={this.props.addon ? EDIT_ADDON : CREATE_ADDONS}
                                        onCompleted={this.onCompleted}
                                        onError={this.onError}
                                        update={this.update}>
                                        {(mutate, { loading }) => {
                                            if (loading) return (<Button disabled color="success" size="lg" block>Guardando</Button>)
                                            return (< Button
                                                color="primary" size="lg" block
                                                onClick={() => {
                                                    if (this.validate())
                                                        this.props.addon ? mutate({
                                                            variables: {
                                                                addonInput: {
                                                                    _id: this.props.addon._id,
                                                                    title: this.state.addons[0].title,
                                                                    description: this.state.addons[0].description,
                                                                    options: this.state.addons[0].options,
                                                                    quantity_minimum: +this.state.addons[0].quantity_minimum,
                                                                    quantity_maximum: +this.state.addons[0].quantity_maximum
                                                                }
                                                            }
                                                        }) :
                                                            mutate({
                                                                variables: {
                                                                    addonInput:
                                                                        this.state.addons.map(({ title, description, options, quantity_minimum, quantity_maximum }) =>
                                                                            ({ title, description, options, quantity_minimum: +quantity_minimum, quantity_maximum: +quantity_maximum }))
                                                                }
                                                            })
                                                }}
                                            > Guardar</Button>)
                                        }}
                                    </Mutation>
                                </Col>
                                <Alert color="success" isOpen={!!this.state.success} toggle={this.onDismiss}>
                                    {this.state.success}
                                </Alert>
                                <Alert color="danger" isOpen={!!this.state.error} toggle={this.onDismiss}>
                                    {this.state.error}
                                </Alert>
                            </Row>
                        </div>
                    </Form>
                    {/* <OptionsList /> */}
                </CardBody>
                <Modal
                    className="modal-dialog-centered"
                    size="lg"
                    isOpen={this.state.optionsModal}
                    toggle={() => { this.toggleModal() }}>
                    <OptionsComponent updateOptions={this.updateOptions} />
                </Modal>
            </Card >
        )
    }
}

export default compose(withApollo, withTranslation())(Addon)