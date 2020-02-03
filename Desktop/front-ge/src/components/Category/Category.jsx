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

import { cloudinary_upload_url, cloudinary_category } from "../../config/config";
import { editCategory, createCategory } from "../../apollo/server";

const CREATE_CATEGORY = gql`${createCategory}`
const EDIT_CATEGORY = gql`${editCategory}`


class Category extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: props.category ? props.category.title : '',
            description: props.category ? props.category.description : '',
            imgMenu: props.category ? props.category.img_menu : '',
            errorMessage: '',
            successMessage: '',
            titleError: null,
            descriptionError: null,
            mutation: props.category ? EDIT_CATEGORY : CREATE_CATEGORY
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
        this.setState({ [field + 'Error']: !validateFunc({ ['category_' + field]: this.state[field] }, 'category_' + field) })
    }
    onSubmitValidaiton = () => {
        let form = this.state
        let titleError = !validateFunc({ category_title: form.title }, 'category_title')
        let descriptionError = !validateFunc({ category_description: form.description }, 'category_description')
        this.setState({ titleError, descriptionError })
        return (titleError && descriptionError)
    }
    clearFields = () => {
        this.setState({
            title: '',
            description: '',
            imgMenu: '',
            // imgHeader: '',
            titleError: null,
            descriptionError: null,
        })
    }
    onCompleted = (data) => {
        const message = this.props.category ? 'Categoría actualizada' : 'Categoría agregada'
        this.setState({ successMessage: message, errorMessage: '' })
        if (!this.props.category) this.clearFields()
        setTimeout(this.hideMessage, 3000)
    }
    onError = (error) => {
        const message = 'Falló la acción. Por favor intenta de nuevo'
        this.setState({ successMessage: '', errorMessage: message })
        setTimeout(this.hideMessage, 3000)
    }
    hideMessage = () => {
        this.setState({ errorMessage: '', successMessage: '' })
    }
    imageToBase64 = (imgUrl) => {
        let fileReader = new FileReader()
        fileReader.onloadend = () => {
            this.setState({ imgMenu: fileReader.result })
        }
        fileReader.readAsDataURL(imgUrl)
    }
    uploadImageToCloudinary = async () => {
        if (this.state.imgMenu === '')
            return this.state.imgMenu
        if (this.props.category && this.props.category.img_menu === this.state.imgMenu)
            return this.state.imgMenu

        let apiUrl = cloudinary_upload_url;
        let data = {
            "file": this.state.imgMenu,
            "upload_preset": cloudinary_category
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
                                <h3 className="mb-0">{this.props.category ? t("Edit Category") : t("Add Category")}</h3>
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
                                            htmlFor="input-title"
                                        >
                                            {t("Title")}
                                        </label>
                                        <br />
                                        <small>{t("Character limit of max length 50")}</small>
                                        <FormGroup className={this.state.titleError === null ? "" : this.state.titleError ? "has-success" : "has-danger"}>
                                            <Input
                                                className="form-control-alternative"
                                                id="input-title"
                                                placeholder="ej. Desayunos"
                                                type="text"
                                                value={this.state.title}
                                                maxLength="50"
                                                onChange={(event) => {
                                                    this.setState({ title: event.target.value })
                                                }}
                                                onBlur={event => { this.onBlur(event, 'title') }}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="12">
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-description"
                                        >
                                            {t("Description")}
                                        </label>
                                        <br />
                                        <small>{t("Character limit of max length 140")}</small>
                                        <FormGroup className={this.state.descriptionError === null ? "" : this.state.descriptionError ? "has-success" : "has-danger"}>
                                            <Input
                                                className="form-control-alternative"
                                                id="input-description"
                                                placeholder="ej. Toda la felicidad depende de un gran desayuno."
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
                                </Row>
                                <Row >
                                    <Col lg="6" >
                                        <FormGroup >
                                            <div className="card-title-image">
                                                <a href="#pablo" onClick={e => e.preventDefault()}>
                                                    {this.state.imgMenu && typeof this.state.imgMenu === 'string' &&
                                                        <img alt='menu img'
                                                            style={{ width: '200px', height: '200px' }}
                                                            src={this.state.imgMenu}
                                                        />}
                                                </a>
                                                <input
                                                    className="mt-4"
                                                    type="file"
                                                    onChange={(event) => { this.selectImage(event, "imgMenu") }}
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
                                        refetchQueries={['Categories']}>
                                        {(mutate, { loading, error }) => {
                                            if (loading) return t("Loading")
                                            return (
                                                <Col className="text-right" xs="12">
                                                    <Button
                                                        color="primary"
                                                        href="#pablo"
                                                        onClick={async e => {
                                                            e.preventDefault()
                                                            this.setState({ successMessage: '', errorMessage: '' })
                                                            if (this.onSubmitValidaiton()) {
                                                                mutate({
                                                                    variables: {
                                                                        _id: this.props.category ? this.props.category._id : '',
                                                                        title: this.state.title,
                                                                        description: this.state.description,
                                                                        img_menu: await this.uploadImageToCloudinary()
                                                                    }
                                                                })
                                                            }

                                                        }}
                                                        size="md"
                                                    >
                                                        {t("Save")}
                                                    </Button>
                                                </Col>)
                                        }}</Mutation>
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

export default withTranslation()(Category)