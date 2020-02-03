import React from "react";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
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
    Alert,
    Modal,
    Label
} from "reactstrap";
// core components
import { cloudinary_upload_url, cloudinary_food } from "../../config/config";
import { createFood, editFood, getCategories, getAddons, getFoods } from '../../apollo/server'
import AddonComponent from "../Addon/Addon";

const CREATE_FOOD = gql`${createFood}`
const EDIT_FOOD = gql`${editFood}`
const GET_CATEGORIES = gql`${getCategories}`
const GET_ADDONS = gql`${getAddons}`
const GET_FOODS = gql`${getFoods}`

class Food extends React.Component {
    constructor(props) {
        super(props)
        const variations = props.food ? props.food.variations.map(({ title, price, addons }) => {
            return { title, price, addons: addons.map(addon => addon._id), titleError: null, priceError: null }
        }) : [{ title: '', price: '', addons: [], titleError: null, priceError: null }]
        this.state = {
            mutation: props.food ? EDIT_FOOD : CREATE_FOOD,
            title: props.food ? props.food.title : '',
            description: props.food ? props.food.description : '',
            imgMenu: props.food ? props.food.img_url : '',
            variations,
            category: props.food ? props.food.category._id : '',
            error: '',
            success: '',
            titleError: null,
            descriptionError: null,
            categoryError: null,
            addonsModal: false,
            varitionIndex: 0
        };
    }
    onBlur = (field) => {
        this.setState({ [field + 'Error']: !validateFunc({ [field]: this.state[field] }, field) })
    }
    handleChange = (event) => {
        this.setState({ category: event.target.value })
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
        if (result)
            this.imageToBase64(result)
    }

    onAdd = (index) => {
        const variations = this.state.variations
        if (index === variations.length - 1)
            variations.push({ title: '', price: '', addons: [], titleError: null, priceError: null })
        else
            variations.splice(index + 1, 0, { title: '', price: '', addons: [], titleError: null, priceError: null });
        this.setState({ variations })
    }
    onRemove = (index) => {
        if (this.state.variations.length === 1 && index === 0) {
            return
        }
        const variations = this.state.variations
        variations.splice(index, 1);
        this.setState({ variations })
    }
    handleVariationChange = (event, index, type) => {

        let variations = this.state.variations
        if (type === "price") {
            variations[index][type] = event.target.value
            this.setState({ variations })
        }
        else if (type === "title") {
            variations[index][type] = event.target.value.length === 1 ? event.target.value.toUpperCase() : event.target.value
            this.setState({ variations })
        }
    }
    onSubmitValidaiton = () => {
        let titleError = !validateFunc({ title: this.state.title }, 'title')
        let descriptionError = !validateFunc({ description: this.state.description }, 'description')
        let categoryError = !validateFunc({ category: this.state.category }, 'category')
        let variations = this.state.variations
        variations.map((variation) => {
            variation.priceError = !validateFunc({ price: variation.price }, "price")
            let error = false
            let occ = variations.filter(v => v.title === variation.title)
            if (occ.length > 1)
                error = true
            variation.titleError = error ? !error : !validateFunc({ title: variation.title }, "title")
            return variation
        })
        let variationsError = !variations.filter(variation => !variation.priceError || !variation.titleError).length
        this.setState({ titleError, descriptionError, categoryError, variations })
        return (titleError && descriptionError && categoryError && variationsError)
    }
    clearFields = () => {
        this.setState({
            title: '',
            description: '',
            imgMenu: '',
            variations: [{ title: '', price: '', addons: [], titleError: null, priceError: null }],
            titleError: null,
            descriptionError: null,
            categoryError: null
        })
    }
    onBlurVariation = (index, type) => {
        let error = false;
        let variations = this.state.variations
        if (type === "title") {
            let occ = variations.filter(v => v.title === variations[index][type])
            if (occ.length > 1)
                error = true
        }
        variations[index][type + 'Error'] = error ? !error : !validateFunc({ [type]: variations[index][type] }, type)
        this.setState({ variations })
    }
    onCompleted = (data) => {
        if (!this.props.food) this.clearFields()
        const message = this.props.food ? 'Platillo Actualizado' : 'Platillo Agregado'
        this.setState({ error: '', success: message })
    }
    updateAddonsList = (ids) => {
        const variations = this.state.variations
        variations[this.state.varitionIndex].addons = variations[this.state.varitionIndex].addons.concat(ids)
        this.setState({ variations })
    }
    onError = (error) => {
        this.setState({ error: 'Fallo.Por favor intenta de nuevo', success: '' })
    }
    //show Create Addon modal
    toggleModal = (index) => {
        console.log(index)
        this.setState({
            addonsModal: !this.state.addonsModal,
            varitionIndex: index
        });
    }
    onSelectAddon = (index, id) => {
        console.log(index, id)
        const variations = this.state.variations
        const addon = variations[index].addons.indexOf(id)
        if (addon < 0)
            variations[index].addons.push(id)
        else
            variations[index].addons.splice(addon, 1)
        this.setState({ variations })
    }
    onChange = (event) => {
        //added this keep default checked on editing
        // console.log(event)
    }

    update = (proxy, { data: { createFood } }) => {
        try {
            if (createFood) {
                const data = proxy.readQuery({ query: GET_FOODS });
                data.foods.push(createFood);
                proxy.writeQuery({ query: GET_FOODS, data });
            }
        } catch (error) {
            console.error(error);
        }
    }
    onDismiss = () => {
        this.setState({ success: '', error: '' })
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
        if (this.props.food && this.props.food.img_url === this.state.imgMenu)
            return this.state.imgMenu

        let apiUrl = cloudinary_upload_url;
        let data = {
            "file": this.state.imgMenu,
            "upload_preset": cloudinary_food,
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
            <>
                <Row>
                    <Col className="order-xl-1" >
                        <Card className="bg-secondary shadow">
                            <CardHeader className="bg-white border-0">
                                <Row className="align-items-center">
                                    <Col xs="8">
                                        <h3 className="mb-0">{this.props.food ? t("Edit Food") : t("Add Food")}</h3>
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
                                                            <Row>
                                                                <Col>
                                                                    <label
                                                                        className="form-control-label"
                                                                        htmlFor="input-title"
                                                                    >{t("Title")}
                                                                    </label>
                                                                    <br />
                                                                    <small>{t("Character limit of max length 50")}</small>
                                                                    <FormGroup className={this.state.titleError === null ? "" : this.state.titleError ? "has-success" : "has-danger"}>

                                                                        <Input
                                                                            className="form-control-alternative"
                                                                            id="input-title"
                                                                            placeholder="ej. botana"
                                                                            type="text"
                                                                            maxLength="50"
                                                                            value={this.state.title}
                                                                            onChange={(event) => {
                                                                                this.setState({ title: event.target.value })
                                                                            }}
                                                                            onBlur={event => { this.onBlur('title') }}
                                                                        />
                                                                    </FormGroup>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col>
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
                                                                            placeholder="ej. Hamburguesa gigante a la barbecue."
                                                                            minLength="20"
                                                                            maxLength="140"
                                                                            type="textarea"
                                                                            value={this.state.description}
                                                                            onChange={(event) => {
                                                                                this.setState({ description: event.target.value })
                                                                            }}

                                                                            onBlur={event => { this.onBlur('description') }}
                                                                        />
                                                                    </FormGroup>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col>
                                                                    <label
                                                                        className="form-control-label"
                                                                        htmlFor="input-category"
                                                                    >{t("Category")}</label>
                                                                    <Query query={GET_CATEGORIES}>
                                                                        {({ data, loading, error }) => {
                                                                            console.log('categories',data)
                                                                            if (loading) return t("Loading")
                                                                            if (error) return t("Error")
                                                                            return (
                                                                                <FormGroup className={this.state.categoryError === null ? "" : this.state.categoryError ? "has-success" : "has-danger"}>
                                                                                    <Input
                                                                                        type="select"
                                                                                        name="select"
                                                                                        id="exampleSelect"
                                                                                        value={this.state.category}
                                                                                        onChange={this.handleChange}
                                                                                        onBlur={event => { this.onBlur('category') }}>
                                                                                        {!this.state.category && <option value={""}>{t("Select")}</option>}
                                                                                        {
                                                                                            data.categories.map(category => <option value={category._id} key={category._id} >{category.title}</option>)
                                                                                        }
                                                                                    </Input>
                                                                                </FormGroup>
                                                                            )
                                                                        }}</Query>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col>
                                                                    <h3 className="mb-0"> {t("Food Image")}</h3>
                                                                    <FormGroup>
                                                                        <div className="card-title-image">
                                                                            {this.state.imgMenu && typeof this.state.imgMenu === 'string' && <a href="#pablo" onClick={e => e.preventDefault()}>
                                                                                <img
                                                                                    alt="..."
                                                                                    className="rounded-rectangle"
                                                                                    src={this.state.imgMenu}
                                                                                />
                                                                            </a>}
                                                                            <input
                                                                                className="mt-4"
                                                                                type="file"
                                                                                onChange={(event) => { this.selectImage(event, "imgMenu") }} />
                                                                        </div>
                                                                    </FormGroup>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                        <Col lg="6">
                                                            <h3 className="mb-0">{t("Variations")}</h3>
                                                            <Row>
                                                                <Col lg="6">
                                                                    <FormGroup>
                                                                        <label
                                                                            className="form-control-label"
                                                                            htmlFor="input-type"
                                                                        >{t("Title")}
                                                                        </label>
                                                                        <br />
                                                                        <small style={{ color: 'blue' }}>El título debe ser único</small>
                                                                    </FormGroup>
                                                                </Col>
                                                                <Col lg="6">
                                                                    <FormGroup>
                                                                        <label
                                                                            className="form-control-label"
                                                                            htmlFor="input-price"
                                                                        >
                                                                            {t("Price")}
                                                                        </label>
                                                                    </FormGroup>
                                                                </Col>
                                                            </Row>

                                                            {this.state.variations.map((variation, index) =>
                                                                <div key={index}>
                                                                    <Row className="mb-2">
                                                                        <Col lg="6">
                                                                            <Button onClick={this.toggleModal.bind(this, index)} color="warning">Nuevo Adicional</Button>
                                                                        </Col>
                                                                    </Row>
                                                                    <Row>
                                                                        <Col lg="6">
                                                                            <FormGroup className={variation.titleError === false ? "has-danger" : variation.titleError === true ? "has-success" : ''}>

                                                                                <Input
                                                                                    className="form-control-alternative"
                                                                                    value={variation.title}
                                                                                    id="input-type"
                                                                                    placeholder="ej. Chico,Mediano,Grande"
                                                                                    type="text"
                                                                                    autoComplete='off'
                                                                                    onChange={(event) => {
                                                                                        this.handleVariationChange(event, index, "title", "variations")
                                                                                    }}
                                                                                    onBlur={event => { this.onBlurVariation(index, "title") }}
                                                                                />
                                                                            </FormGroup>
                                                                        </Col>
                                                                        <Col lg="6">
                                                                            <FormGroup className={variation.priceError === false ? "has-danger" : variation.priceError === true ? "has-success" : ''}>
                                                                                <Input
                                                                                    className="form-control-alternative"
                                                                                    value={variation.price}
                                                                                    id="input-price"
                                                                                    placeholder="e.g 9.99"
                                                                                    type="number"
                                                                                    onChange={(event) => {
                                                                                        this.handleVariationChange(event, index, "price", "variations")
                                                                                    }}
                                                                                    onBlur={event => { this.onBlurVariation(index, "price") }}
                                                                                />
                                                                            </FormGroup>
                                                                        </Col>
                                                                    </Row>
                                                                    <Row style={{ maxHeight: "67vh", overflowY: "scroll" }}>
                                                                        <Col lg="12">
                                                                            <Query query={GET_ADDONS}>
                                                                                {({ loading, error, data }) => {
                                                                                    if (loading) return "Cargando ..."
                                                                                    if (error) return "Error ..."
                                                                                    return data.addons.map((addon, indexAddon) => (
                                                                                        <FormGroup key={indexAddon} check className="mb-2">
                                                                                            <Label check>
                                                                                                <Input value={addon._id} type="checkbox" checked={this.state.variations[index].addons.includes(addon._id)} onChange={this.onChange} onClick={this.onSelectAddon.bind(this, index, addon._id)} />
                                                                                                {`${addon.title} (Description: ${addon.description})(Min: ${addon.quantity_minimum})(Max: ${addon.quantity_maximum})`}
                                                                                            </Label>
                                                                                        </FormGroup>
                                                                                    ))
                                                                                }}
                                                                            </Query>
                                                                        </Col>
                                                                    </Row>
                                                                    <Row className="mt-2">
                                                                        <Col lg="6">
                                                                            <FormGroup>
                                                                                <Button color="danger" onClick={() => { this.onRemove(index) }}>-</Button>
                                                                                <Button onClick={() => { this.onAdd(index) }} color="primary">+</Button>
                                                                            </FormGroup>
                                                                        </Col>
                                                                    </Row>
                                                                </div>
                                                            )
                                                            }
                                                        </Col>
                                                    </Row>
                                                    <hr />
                                                    <Row className="mt-2 justify-content-center">
                                                        <Col xs="4">
                                                            <Button
                                                                color="primary"
                                                                href="#pablo"
                                                                className="btn-block"
                                                                onClick={async e => {
                                                                    e.preventDefault()
                                                                    if (this.onSubmitValidaiton()) {
                                                                        mutate({
                                                                            variables: {
                                                                                foodInput: {
                                                                                    _id: this.props.food ? this.props.food._id : '',
                                                                                    title: this.state.title,
                                                                                    description: this.state.description,
                                                                                    img_url: await this.uploadImageToCloudinary(),
                                                                                    category: this.state.category,
                                                                                    variations: this.state.variations.map(({ title, price, addons }) => { return { title, price: +price, addons } })
                                                                                }
                                                                            }
                                                                        })
                                                                    }
                                                                    this.setState({ error: '', success: '' })
                                                                }}
                                                                size="lg"
                                                            >
                                                                {t("Save")}
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                    <Row >
                                                        <Col lg="6">
                                                            <Alert color="success" isOpen={!!this.state.success} toggle={this.onDismiss}>
                                                                <span className="alert-inner--icon">
                                                                    <i className="ni ni-like-2" />
                                                                </span>{" "}
                                                                <span className="alert-inner--text">
                                                                    <strong>{t("Success")}!</strong> {this.state.success}</span>
                                                            </Alert>
                                                            <Alert color="danger" isOpen={!!this.state.error} toggle={this.onDismiss}>
                                                                <span className="alert-inner--icon">
                                                                    <i className="ni ni-like-2" />
                                                                </span>{" "}
                                                                <span className="alert-inner--text">
                                                                    <strong>{t("Danger")}!</strong> {this.state.error}</span>
                                                            </Alert>
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
                <Modal
                    className="modal-dialog-centered"
                    size="lg"
                    isOpen={this.state.addonsModal}
                    toggle={() => { this.toggleModal() }}
                >
                    <AddonComponent updateAddonsList={this.updateAddonsList} />
                </Modal>
            </>
        )
    }
}
export default withTranslation()(Food)