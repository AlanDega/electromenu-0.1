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
import InventarioComponent from '../components/Inventarios/Inventario';
import { getInventarios, deleteInventario } from '../apollo/server';
import { withTranslation } from 'react-i18next';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

const GET_INVENTARIOS = gql`${getInventarios}`
const DELETE_INVENTARIO = gql`${deleteInventario}`

class Inventarios extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inventario: null,
            editModal: false
        };
    }
    toggleModal = (inventario) => {
        this.setState({
            editModal: !this.state.editModal,
            inventario
        });
    }
    onCompleted = ({ deleteInventario }) => {
        console.log(deleteInventario)
    }
    onError = (error) => {
        console.log(error)
    }
    update = (proxy, { data: { deleteInventario } }) => {
        try {
            if (deleteInventario) {
                const data = proxy.readQuery({ query: GET_INVENTARIOS});
                data.inventarios= data.inventarios.filter(inventario => inventario._id !== deleteInventario);
                proxy.writeQuery({ query: GET_INVENTARIOS, data });
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
                    <InventarioComponent />
                    <Row className="mt-5">
                        <div className="col">
                            <Card className="shadow">
                                <CardHeader className="border-0">
                                    <h3 className="mb-0">{t("Inventarios")}</h3>
                                </CardHeader>
                                <Table className="align-items-center table-flush" responsive>
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">{t("Title")}</th>
                                            <th scope="col">{t("Description")}</th>
                                          
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <Query query={GET_INVENTARIOS}>
                                            {({ loading, error, data }) => {
                                                if (loading) return <tr><td>{t("Loading")}</td></tr>;
                                                if (error) return <tr><td>`${t("Error")}! ${error.message}`</td></tr>;
                                                return data.inventarios.map(inventario =>
                                                    <tr key={inventario._id}>
                                                        <th scope="row">
                                                            <Media>
                                                                <span className="mb-0 text-sm">
                                                                    {inventario.title}
                                                                </span>
                                                            </Media>
                                                        </th>
                                                        <td style={{ whiteSpace: 'pre' }}>{inventario.description}</td>
                                                        
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
                                                                            this.toggleModal(inventario)
                                                                        }
                                                                        }
                                                                    >
                                                                        {t("Edit")}
                                                                    </DropdownItem>
                                                                    <Mutation mutation={DELETE_INVENTARIO}
                                                                        onCompleted={this.onCompleted}
                                                                        onError={this.onError}
                                                                        update={this.update} >
                                                                        {(deleteInventario) => {
                                                                            return <DropdownItem
                                                                                href="#pablo"
                                                                                onClick={e => {
                                                                                    e.preventDefault()
                                                                                    deleteInventario({ variables: { id: inventario._id } })
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
                        <InventarioComponent addon={this.state.inventario} />
                    </Modal>

                </Container>
            </>
        )
    }
}

export default withTranslation()(Inventarios)
