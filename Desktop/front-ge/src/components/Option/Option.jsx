import React, { Component } from 'react';
import {
    Alert,
    Card,
    CardHeader,
    CardBody,
    Form,
    Row,
    Col,
    FormGroup,
    Input,
    Button
} from 'reactstrap';
import { withTranslation } from 'react-i18next';
import { Mutation, compose, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { createOptions, getOptions, editOption } from '../../apollo/server';
import { validateFunc } from '../../constraints/constraints';

const CREATE_OPTIONS = gql`${createOptions}`
const GET_OPTIONS = gql`${getOptions}`
const EDIT_OPTION = gql`${editOption}`

class Option extends Component {
    constructor(props) {
        super(props)
        const option = props.option ?
            [{ ...props.option, titleError: false, descriptionError: false, priceError: false }] : null
        this.state = {
            options: option || [{ title: '', description: '', price: 0, titleError: false, descriptionError: false, priceError: false }],
            success: '', error: ''
        }
    }
    onBlur = (index, state) => {
        const options = this.state.options
        if (state === "title")
            options[index]['titleError'] = !!validateFunc({ optionTitle: options[index][state] }, 'optionTitle')
        if (state === "description")
            options[index]['descriptionError'] = !!validateFunc({ optionDescription: options[index][state] }, 'optionDescription')
        if (state === "price")
            options[index]['priceError'] = !!validateFunc({ optionPrice: options[index][state] }, 'optionPrice')
        this.setState({ options })
    }
    onAdd = (index) => {
        const options = this.state.options
        if (index === options.length - 1)
            options.push({ title: '', description: '', price: 0 })
        else
            options.splice(index + 1, 0, { title: '', description: '', price: 0 });
        this.setState({ options })
    }
    onRemove = (index) => {
        if (this.state.options.length === 1 && index === 0) {
            return
        }
        const options = this.state.options
        options.splice(index, 1);
        console.log(options)
        this.setState({ options })
    }
    onChange = (event, index, state) => {
        const options = this.state.options
        options[index][state] = event.target.value
        this.setState({ options })
    }
    validate = () => {
        const options = this.state.options
        options.map((option, index) => {
            this.onBlur(index, 'title')
            this.onBlur(index, 'description')
            this.onBlur(index, 'price')
            return option
        })
        const error = options.filter(option => option.titleError || option.descriptionError || option.priceError)
        if (!error.length)
            return true
        return false
    }
    onCompleted = ({ createOptions, editOption }) => {
        if (createOptions)
            this.setState({
                options: [{
                    title: '',
                    description: '',
                    price: 0,
                    titleError: false,
                    descriptionError: false,
                    priceError: false
                }],
                success: 'Saved', error: ''
            })
        if (editOption)
            this.setState({ success: 'Saved', error: '' })
    }
    onError = (error) => {
        this.setState({ error: 'An error occured while saving,Try again', success: '' })
    }
    update = (proxy, { data: { createOptions } }) => {
        try {
            if (createOptions) {
                const data = proxy.readQuery({ query: GET_OPTIONS });
                data.options = data.options.concat(createOptions);
                proxy.writeQuery({ query: GET_OPTIONS, data });
                if (this.props.updateOptions)
                    this.props.updateOptions(createOptions.map(({ _id }) => _id))
            }
        } catch (error) {
            console.error(error);
        }
    }
    onDismiss = () => {
        this.setState({ success: '', error: '' })
    }
    render() {
        const { t } = this.props
        return (
            <Card>
                <CardHeader>Opción</CardHeader>
                <CardBody>
                    <Form>
                        <div >
                            <Row>
                                <Col lg="3">
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-title"
                                    >
                                        {t("Title")}
                                    </label>
                                    <br />
                                    <small>{t("Character limit of max length 30")}</small>
                                </Col>
                                <Col lg="3">
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-description"
                                    >
                                        {t("Description")}
                                    </label>
                                    <br />
                                    <small>{t("Character limit of max length 60")}</small>
                                </Col>
                                <Col lg="3">
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-price"
                                    >
                                        {t("Price")}
                                    </label>
                                    <br />
                                    <small>{t("Must be a number")}</small>
                                </Col>
                                {!this.props.option && <Col lg="3">
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-price"
                                    >
                                        {t("Add/Remove")}
                                    </label>
                                </Col>}
                            </Row>
                            {this.state.options.map((option, index) => (
                                <Row key={index}>
                                    <Col lg="3">
                                        <FormGroup className={option.titleError === true ? "has-danger" : ""}>
                                            <Input
                                                className="form-control-alternative"
                                                id="input-title"
                                                placeholder="ej. Pepsi"
                                                type="text"
                                                maxLength="30"
                                                value={option.title}
                                                onChange={(event) => {
                                                    this.onChange(event, index, 'title')
                                                }}
                                                onBlur={event => { this.onBlur(index, 'title') }}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col lg="3">
                                        <FormGroup className={option.descriptionError === true ? "has-danger" : ""}>
                                            <Input
                                                className="form-control-alternative"
                                                id="input-description"
                                                placeholder="ej. Opcional"
                                                type="text"
                                                maxLength="60"
                                                value={option.description}
                                                onChange={(event) => {
                                                    this.onChange(event, index, 'description')
                                                }}
                                                onBlur={(event) => { this.onBlur(index, 'description') }}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col lg="3">
                                        <FormGroup className={option.priceError === true ? "has-danger" : ""}>
                                            <Input
                                                className="form-control-alternative"
                                                id="input-price"
                                                placeholder="ej. 90.25"
                                                type="number"
                                                min={'0'}
                                                value={option.price}
                                                onChange={(event) => {
                                                    this.onChange(event, index, 'price')
                                                }}
                                                onBlur={(event) => { this.onBlur(index, 'price') }}
                                            />
                                        </FormGroup>
                                    </Col>
                                    {!this.props.option && <Col lg="3">
                                        <Button color="danger" onClick={() => { this.onRemove(index) }}>-</Button> <Button onClick={() => { this.onAdd(index) }} color="primary">+</Button>
                                    </Col>}
                                </Row>))
                            }
                            <Row >
                                <Col lg="4">
                                    <Mutation mutation={this.props.option ? EDIT_OPTION : CREATE_OPTIONS}
                                        onCompleted={this.onCompleted}
                                        onError={this.onError}
                                        update={this.update}>
                                        {(mutate, { loading }) => {
                                            if (loading) return (<Button disabled color="primary">Guardando</Button>)
                                            return (< Button
                                                color="primary"
                                                onClick={() => {
                                                    if (this.validate())
                                                        this.props.option ?
                                                            mutate({ variables: { optionInput: { _id: this.props.option._id, title: this.state.options[0].title, description: this.state.options[0].description, price: +this.state.options[0].price } } })
                                                            : mutate({ variables: { optionInput: this.state.options.map(({ title, description, price }) => ({ title, description, price: +price })) } })
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

                </CardBody>
            </Card >
        )
    }
}

export default compose(withApollo, withTranslation())(Option)
