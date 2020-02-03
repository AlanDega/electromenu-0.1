import React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { validateFunc } from '../../constraints/constraints';
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

import { cloudinary_upload_url, cloudinary_category, cloudinary_promociones } from "../../config/config";
import { editPromocion, createPromocion } from "../../apollo/server";

const CREATE_PROMOCION = gql`${createPromocion}`
const EDIT_PROMOCION = gql`${editPromocion}`

class Promocion extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: props.promocion ? props.promocion.title : '',
            description: props.promocion ? props.promocion.description : '',
            img: props.promocion ? props.promocion.img : '',
            is_active: props.promocion ? props.promocion.is_active : true,
            errorMessage: '',
            successMessage: '',
            titleError: null,
            descriptionError: null,
            mutation: props.promocion ? EDIT_PROMOCION : CREATE_PROMOCION
        };
    }
    filterImage = (event) => {
        let images = [];
        for (var i = 0; i < event.target.files.length; i++) {
            images[i] = event.target.files.item(i);
        }
        images = images.filter(image => image.name.match(/\.(jpg|jpeg|png|gif)$/))
        // let message = `${images.length} valid image(s) selected`
        // console.log(message)
        return images.length ? images[0] : undefined
    }
    selectImage = (event, state) => {
        let result = this.filterImage(event)
        if (result) {
            this.imageToBase64(result)
        }
    }

    onBlur = (event, field) => {
        this.setState({ [field + 'Error'] : !validateFunc({ ['promocion_' + field]: this.state[field] }, 'promocion_' + field) })
    }
    onSubmitValidaiton = () => {
        let form = this.state
        let titleError = !validateFunc({ promocion_title: form.title }, 'promocion_title')
        let descriptionError = !validateFunc({ promocion_description: form.description }, 'promocion_description')
        this.setState({ titleError, descriptionError })
        return (titleError && descriptionError)
    }
    clearFields = () => {
        this.setState({
            title: '',
            description: '',
            img: '',
            is_active: true,
            titleError: null,
            descriptionError: null,
        })
    }
    onCompleted = (data) => {
        const message = this.props.promocion ? 'Promoción actualizado' : 'Promoción agregado'
        this.setState({ successMessage: message, errorMessage: '' })
        if (!this.props.promocion) this.clearFields()
        setTimeout(this.hideMessage, 3000)
    }
    onError = (error) => {
        const message = 'Falló la acción. Por favor inténtalo de nuevo '
        console.log('error:' + error)
        this.setState({ successMessage: '', errorMessage: message })
        setTimeout(this.hideMessage, 3000)
    }
    hideMessage = () => {
        this.setState({ errorMessage: '', successMessage: '' })
    }
    imageToBase64 = (imgUrl) => {
        let fileReader = new FileReader()
        fileReader.onloadend = () => {
            this.setState({ img: fileReader.result })
        }
        fileReader.readAsDataURL(imgUrl)
    }
    uploadImageToCloudinary = async () => {
        if (this.state.img === '')
            return this.state.img
        if (this.props.promocion && this.props.promocion.img === this.state.img)
            return this.state.img

        let apiUrl = cloudinary_upload_url;
        let data = {
            "file": this.state.img,
            "upload_preset": cloudinary_promociones
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
        return (<Row>
            <Col className="order-xl-1" >
                <Card className="bg-secondary shadow">
                    <CardHeader className="bg-white border-0">
                        <Row className="align-items-center">
                            <Col xs="8">
                                <h3 className="mb-0">{this.props.promocion ? t("Editar Promoción") : t("Agregar Promoción")}</h3>
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        <Form>
                            <div className="pl-lg-4">
                                
                                <Row>
                                    <Col lg="6">

                                        <label
                                            className="form-control-label"
                                            htmlFor="input-title">
                                            {t("Title")}
                                        </label>
                                        <br />
                                        <small>{t("Character limit of max length 60")}</small>

                                        <FormGroup className={this.state.titleError === null ? "" : this.state.titleError ? "has-success" : "has-danger"}>
                                            <Input
                                                className="form-control-alternative"
                                                id="input-title"
                                                placeholder="ej. Sucursal Sur"
                                                type="text"
                                                value={this.state.title}
                                                maxLength="60"
                                                onChange={(event) => {
                                                    this.setState({ title: event.target.value })
                                                }}
                                                onBlur={event => { this.onBlur(event, 'title') }}
                                            />
                                        </FormGroup>

                                    </Col>
                                    
                                    <Col lg="6">
                                    
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="6">
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-description">
                                            {t("Description")}
                                        </label>
                                        <br />
                                        <small>{t("Character limit of max length 140")}</small>
                                        <FormGroup className={this.state.descriptionError === null ? "" : this.state.descriptionError ? "has-success" : "has-danger"}>
                                            <Input
                                                className="form-control-alternative"
                                                id="input-description"
                                                placeholder="ej. Al sur de la ciudad"
                                                type="text"
                                                maxLength="140"
                                                value={this.state.description}
                                                onChange={(event) => {
                                                    this.setState({ description: event.target.value })
                                                }}
                                                onBlur={(event) => { this.onBlur(event, 'description') }}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md="6">
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-is_active">
                                            {t("Available")}
                                        </label>
                                                        <FormGroup >
                                                            <label className="custom-toggle">
                                                                <input
                                                                    defaultChecked={this.state.is_active}
                                                                    type="checkbox"
                                                                    onChange={event => {
                                                                        this.setState({ is_active: event.target.checked })
                                                                    }} />
                                                                <span className="custom-toggle-slider rounded-circle" />
                                                            </label>
                                                        </FormGroup>
                                    </Col>
                                    
                                </Row>
                                <Row >
                                    <Col lg="6" >
                                        <FormGroup >
                                            <div className="card-title-image">
                                                <a href="#pablo" onClick={e => e.preventDefault()}>
                                                    {this.state.img && typeof this.state.img === 'string' &&
                                                        <img alt='menu img'
                                                            style={{ width: '200px', height: '200px' }}
                                                            src={this.state.img}
                                                        />}
                                                </a>
                                                <input
                                                    className="mt-4"
                                                    type="file"
                                                    onChange={(event) => { this.selectImage(event, "img") }}
                                                />
                                            </div>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row >

                                    <Mutation
                                        mutation={this.state.mutation}
                                        onCompleted={this.onCompleted}
                                        onError={this.onError}
                                        refetchQueries={['Promociones']}>
                                        
                                        {(mutate, { loading, error }) => {
                                            if (loading) return t("Loading")

                                            return (<Col className="text-right" xs="12">

                                                    <Button
                                                        color="primary"
                                                        href="#pablo"
                                                        onClick={async e => {
                                                            
                                                            e.preventDefault()

                                                            this.setState({ successMessage: '', errorMessage: '' })
                                                            
                                                            if (this.onSubmitValidaiton()) {
                                                            console.log('Desc: ' + this.state.description)

                                                                mutate({
                                                                    variables: {
                                                                        _id: this.props.promocion ? this.props.promocion._id : '',
                                                                        title: this.state.title,
                                                                        description: this.state.description,
                                                                        is_active: this.state.is_active,
                                                                        img: await this.uploadImageToCloudinary()
                                                                    }
                                                                })

                                                            }

                                                        }}
                                                        size="md"
                                                    >
                                                        {t("Save")}
                                                    </Button>

                                                </Col>)
                                        }}

                                    </Mutation>
                                </Row>
                                <Row >
                                    <Col lg="6">
                                        {this.state.successMessage &&
                                            <UncontrolledAlert color="success" fade={true}>
                                                <span className="alert-inner--icon">
                                                    <i className="ni ni-like-2" />
                                                </span>{" "}
                                                <span className="alert-inner--text">
                                                    <strong>{t("Success")}!</strong> {this.state.successMessage}</span>
                                            </UncontrolledAlert>}
                                        {this.state.errorMessage &&
                                            <UncontrolledAlert color="danger" fade={true}>
                                                <span className="alert-inner--icon">
                                                    <i className="ni ni-like-2" />
                                                </span>{" "}
                                                <span className="alert-inner--text">
                                                    <strong>{t("Danger")}!</strong> {this.state.errorMessage}</span>
                                            </UncontrolledAlert>}
                                    </Col>
                                </Row>
                            </div>
                        </Form>
                    </CardBody>
                </Card>
            </Col>
        </Row>
        );
    }
}

export default withTranslation()(Promocion)