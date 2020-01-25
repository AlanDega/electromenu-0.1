import React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { validateFunc } from '../../constraints/constraints'
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
    Row,
    Col,
    UncontrolledAlert
} from "reactstrap";
// core components
import { server_url } from "../../config/config";
import { createRider, editRider, getRiders } from '../../apollo/server'
import { cloudinary_upload_url, cloudinary_profile } from "../../config/config";
const CREATE_RIDER = gql`${createRider}`
const EDIT_RIDER = gql`${editRider}`
const GET_RIDERS = gql`${getRiders}`

class Rider extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            mutation: props.rider ? EDIT_RIDER : CREATE_RIDER,
            name: props.rider ? props.rider.name : '',
            username: props.rider ? props.rider.username : '',
            password: props.rider ? props.rider.password : '',
            phone: props.rider ? props.rider.phone : '',
            available: props.rider ? props.rider.available : true,
            image: props.rider ? props.rider.image : '',
            error: '',
            success: '',
            nameError: null,
            usernameError: null,
            passwordError: null,
            phoneError: null,
            imageError: null
        };
    }
    onBlur = (field) => {
        this.setState({ [field + 'Error']: !validateFunc({ [field]: this.state[field] }, field) })
    }
    filterImage = (event) => {
        let images = [];
        for (var i = 0; i < event.target.files.length; i++) {
            images[i] = event.target.files.item(i);
        }
        images = images.filter(image => image.name.match(/\.(jpg|jpeg|png|gif)$/))
        let message = `${images.length} valid image(s) selected`
        console.log(message)
        return images.length ? images[0] : undefined
    }
    selectImage = (event, state) => {
        let result = this.filterImage(event)
        if (result) {
            this.imageToBase64(result)
        }
        else {
            this.setState({ [state + 'Error']: false })
        }
    }
    onSubmitValidaiton = () => {
        let nameError = !validateFunc({ name: this.state.name }, 'name')
        let usernameError = !validateFunc({ username: this.state.username }, 'username')
        let passwordError = !validateFunc({ password: this.state.password }, 'password')
        let phoneError = !validateFunc({ phone: this.state.phone }, 'phone')
        let imageError = !!this.state.image

        this.setState({ nameError, usernameError, phoneError, imageError, passwordError })
        return (nameError && usernameError && phoneError && imageError && passwordError)
    }
    clearFields = () => {
        this.setState({
            name: '',
            username: '',
            password: '',
            phone: '',
            image: '',
            nameError: null,
            usernameError: null,
            passwordError: null,
            phoneError: null,
            imageError: null
        })
    }
    onCompleted = (data) => {
        if (!this.props.rider) this.clearFields()
        const message = this.props.rider ? 'Repartidor actualizado' : 'Repartidor agregado'
        this.setState({ error: '', success: message })
        setTimeout(this.hideAlert, 5000)
    }
    update = (proxy, { data: { createRider } }) => {
        try {
            if (createRider) {
                const data = proxy.readQuery({ query: GET_RIDERS });
                data.riders.push(createRider);
                proxy.writeQuery({ query: GET_RIDERS, data });
            }
        } catch (error) {
            console.error(error);
        }
    }
    onError = ({ graphQLErrors, networkError }) => {
        this.setState({ error: networkError.result.errors[0].message, success: '' })
        setTimeout(this.hideAlert, 5000)
    }
    hideAlert = () => {
        this.setState({ error: '', success: '' })
    }
    imageToBase64 = (imgUrl) => {
        let fileReader = new FileReader()
        fileReader.onloadend = () => {
            this.setState({ image: fileReader.result, imageError: true })
        }
        fileReader.readAsDataURL(imgUrl)
    }
    uploadImageToCloudinary = async () => {
        if (this.state.image === '')
            return this.state.image
        if (this.props.rider && this.props.rider.image === this.state.image)
            return this.state.image

        let apiUrl = cloudinary_upload_url;
        let data = {
            "file": this.state.image,
            "upload_preset": cloudinary_profile
        }
        try {
            const result = await fetch(apiUrl, {
                body: JSON.stringify(data),
                headers: {
                    'content-type': 'application/json'
                },
                method: 'POST',
            })
            const imageData = await result.json()
            return imageData.secure_url
        }
        catch (e) {
            console.log(e)
        }

    }
    render() {
        const { t } = this.props;
        return (
            <Row>
                <Col className="order-xl-1" >
                    <Card className="bg-secondary shadow">
                        <CardHeader className="bg-white border-0">
                            <Row className="align-items-center">
                                <Col xs="8">
                                    <h3 className="mb-0">{this.props.rider ? t("Edit Rider") : t("Add Rider")}</h3>
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            <Mutation
                                mutation={this.state.mutation}
                                onCompleted={this.onCompleted}
                                onError={this.onError}
                                update={this.update}
                            >
                                {(mutate, { loading, error }) => {
                                    if (loading) return t("Loading")
                                    return (
                                        < Form >
                                            <div className="pl-lg-4">
                                                <Row>
                                                    <Col lg="6">
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-name"
                                                        >{t("Name")}
                                                        </label>
                                                        <br />
                                                        <small>{t("Character limit of max length 20")}</small>
                                                        <FormGroup className={this.state.nameError === null ? "" : this.state.nameError ? "has-success" : "has-danger"}>

                                                            <Input
                                                                className="form-control-alternative"
                                                                id="input-name"
                                                                placeholder="ej. Juan Alberto"
                                                                type="text"
                                                                maxLength="20"
                                                                value={this.state.name}
                                                                onChange={(event) => {
                                                                    this.setState({ name: event.target.value })
                                                                }}
                                                                onBlur={event => { this.onBlur('name') }}
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col lg="6">
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-username"
                                                        >
                                                            {t("Username")}
                                                        </label>
                                                        <br />
                                                        <small>{t("Character limit of max length 20")}</small>
                                                        <FormGroup className={this.state.usernameError === null ? "" : this.state.usernameError ? "has-success" : "has-danger"}>
                                                            <Input
                                                                className="form-control-alternative"
                                                                id="input-username"
                                                                placeholder="ej. repartidorjuan001"
                                                                maxLength="20"
                                                                type="text"
                                                                value={this.state.username}
                                                                onChange={(event) => {
                                                                    this.setState({ username: event.target.value.toLowerCase() })
                                                                }}

                                                                onBlur={event => { this.onBlur('username') }}
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md="6">
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-phone"
                                                        >
                                                            {t("Phone")}
                                                        </label>
                                                        <br />
                                                        <small>{t("Character limit of max length 20")}</small>
                                                        <FormGroup className={this.state.phoneError === null ? "" : this.state.phoneError ? "has-success" : "has-danger"}>
                                                            <Input
                                                                className="form-control-alternative"
                                                                id="input-phone"
                                                                placeholder="ej. 5512345678"
                                                                maxLength="20"
                                                                type="number"
                                                                value={this.state.phone}
                                                                onChange={(event) => {
                                                                    this.setState({ phone: event.target.value })
                                                                }}

                                                                onBlur={event => { this.onBlur('phone') }}
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col lg="6">
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-password"
                                                        >
                                                            {t("Password")}
                                                        </label>
                                                        <br />
                                                        <small>{t("Character limit of max length 20")}</small>
                                                        <FormGroup className={this.state.passwordError === null ? "" : this.state.passwordError ? "has-success" : "has-danger"}>
                                                            <Input
                                                                className="form-control-alternative"
                                                                id="input-password"
                                                                placeholder="ej. 132-123-123"
                                                                maxLength="20"
                                                                type="text"
                                                                value={this.state.password}
                                                                onChange={(event) => {
                                                                    this.setState({ password: event.target.value })
                                                                }}

                                                                onBlur={event => { this.onBlur('password') }}
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col lg="6">
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-available">
                                                            {t("Available")}
                                                        </label>
                                                        <FormGroup >
                                                            <label className="custom-toggle">
                                                                <input
                                                                    defaultChecked={this.state.available}
                                                                    type="checkbox"
                                                                    onChange={event => {
                                                                        this.setState({ available: event.target.checked })
                                                                    }} />
                                                                <span className="custom-toggle-slider rounded-circle" />
                                                            </label>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col lg="6">
                                                        {this.state.success &&
                                                            <UncontrolledAlert color="success" fade={true}>
                                                                <span className="alert-inner--text">
                                                                    {this.state.success}</span>
                                                            </UncontrolledAlert>}
                                                        {this.state.error &&
                                                            <UncontrolledAlert color="danger" fade={true}>
                                                                <span className="alert-inner--text">
                                                                    {this.state.error}</span>
                                                            </UncontrolledAlert>}
                                                    </Col>
                                                </Row>
                                                <Row >
                                                    <Col lg="6" >
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-image">
                                                            {t("Rider Image")}
                                                        </label>
                                                        <FormGroup className={this.state.imageError === null ? "" : this.state.imageError ? "has-success" : "has-danger"}>
                                                            <div className="card-title-image">
                                                                {!!this.state.image && typeof this.state.image === 'string' && <a href="#pablo" onClick={e => e.preventDefault()}>
                                                                    <img
                                                                        alt="..."
                                                                        className="rounded-rectangle"
                                                                        src={this.state.image}
                                                                    />
                                                                </a>}
                                                            </div>
                                                            <input
                                                                className="mt-2"
                                                                type="file"
                                                                onChange={(event) => { this.selectImage(event, "image") }} />
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row >

                                                    <Col className="text-right" lg="6">
                                                        <Button
                                                            color="primary"
                                                            href="#pablo"
                                                            onClick={async e => {
                                                                e.preventDefault()
                                                                if (this.onSubmitValidaiton()) {
                                                                    mutate({
                                                                        variables: {
                                                                            riderInput: {
                                                                                _id: this.props.rider ? this.props.rider._id : '',
                                                                                name: this.state.name,
                                                                                username: this.state.username,
                                                                                password: this.state.password,
                                                                                phone: this.state.phone,
                                                                                image: await this.uploadImageToCloudinary(),
                                                                                available: this.state.available
                                                                            }
                                                                        }
                                                                    })
                                                                }
                                                                this.setState({ error: '', success: '' })
                                                            }}
                                                            size="md"
                                                        >
                                                            {t("Save")}
                                                        </Button>
                                                    </Col>
                                                </Row>

                                            </div>
                                        </Form>
                                    )
                                }}</Mutation>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        )
    }
}
export default withTranslation()(Rider)