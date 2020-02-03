import React, { Component } from 'react';
import {
    Container,
    Row,
    Card,
    CardHeader,
    Table,
    Media,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Modal
} from 'reactstrap';
import Header from "components/Headers/Header.jsx";
import AddonComponent from '../components/Addon/Addon';
import { getAddons, deleteAddon } from '../apollo/server';
import { withTranslation } from 'react-i18next';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

const GET_ADDONS = gql`${getAddons}`
const DELETE_ADDON = gql`${deleteAddon}`

class Addon extends Component {
    constructor(props) {
        super(props)
        this.state = {
            addon: null,
            editModal: false
        };
    }
    toggleModal = (addon) => {
        this.setState({
            editModal: !this.state.editModal,
            addon
        });
    }
    onCompleted = ({ deleteAddon }) => {
        console.log(deleteAddon)
    }
    onError = (error) => {
        console.log(error)
    }
    update = (proxy, { data: { deleteAddon } }) => {
        try {
            if (deleteAddon) {
                const data = proxy.readQuery({ query: GET_ADDONS });
                data.addons = data.addons.filter(addon => addon._id !== deleteAddon);
                proxy.writeQuery({ query: GET_ADDONS, data });
            }
        } catch (error) {
            console.error(error);
        }
    }
    render() {
        const { t } = this.props
        return (
            <>
                <Header />
                {/* Page content */}
                <Container className="mt--7" fluid>
                    <AddonComponent />
                    <Row className="mt-5">
                        <div className="col">
                            <Card className="shadow">
                                <CardHeader className="border-0">
                                    <h3 className="mb-0">{t("Addons")}</h3>
                                </CardHeader>
                                <Table className="align-items-center table-flush" responsive>
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">{t("Title")}</th>
                                            <th scope="col">{t("Description")}</th>
                                            <th scope="col">{t("Minimum")}</th>
                                            <th scope="col">{t("Maximum")}</th>
                                            <th scope="col">{t("Actions")}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <Query query={GET_ADDONS}>
                                            {({ loading, error, data }) => {
                                                if (loading) return <tr><td>{t("Loading")}</td></tr>;
                                                if (error) return <tr><td>`${t("Error")}! ${error.message}`</td></tr>;
                                                return data.addons.map(addon =>
                                                    <tr key={addon._id}>
                                                        <th scope="row">
                                                            <Media>
                                                                <span className="mb-0 text-sm">
                                                                    {addon.title}
                                                                </span>
                                                            </Media>
                                                        </th>
                                                        <td style={{ whiteSpace: 'pre' }}>{addon.description}</td>
                                                        <td> {addon.quantity_minimum}</td>
                                                        <td>
                                                            {addon.quantity_maximum}
                                                        </td>
                                                        <td className="text-right">
                                                            <UncontrolledDropdown>
                                                                <DropdownToggle
                                                                    className="btn-icon-only text-light"
                                                                    href="#pablo"
                                                                    role="button"
                                                                    size="sm"
                                                                    color=""
                                                                    onClick={e => e.preventDefault()}
                                                                >
                                                                    <i className="fas fa-ellipsis-v" />
                                                                </DropdownToggle>
                                                                <DropdownMenu className="dropdown-menu-arrow" right>
                                                                    <DropdownItem
                                                                        href="#pablo"
                                                                        onClick={e => {
                                                                            e.preventDefault()
                                                                            this.toggleModal(addon)
                                                                        }
                                                                        }
                                                                    >
                                                                        {t("Edit")}
                                                                    </DropdownItem>
                                                                    <Mutation mutation={DELETE_ADDON}
                                                                        onCompleted={this.onCompleted}
                                                                        onError={this.onError}
                                                                        update={this.update} >
                                                                        {(deleteAddon) => {
                                                                            return <DropdownItem
                                                                                href="#pablo"
                                                                                onClick={e => {
                                                                                    e.preventDefault()
                                                                                    deleteAddon({ variables: { id: addon._id } })
                                                                                }}
                                                                            >
                                                                                {t("Delete")}
                                                                            </DropdownItem>
                                                                        }}
                                                                    </Mutation>
                                                                </DropdownMenu>
                                                            </UncontrolledDropdown>
                                                        </td>
                                                    </tr>
                                                )
                                            }}
                                        </Query>
                                    </tbody>
                                </Table>

                            </Card>
                        </div>
                    </Row>
                    <Modal
                        className="modal-dialog-centered"
                        size="lg"
                        isOpen={this.state.editModal}
                        toggle={() => { this.toggleModal() }}
                    >
                        <AddonComponent addon={this.state.addon} />
                    </Modal>

                </Container>
            </>
        )
    }
}

export default withTranslation()(Addon)
