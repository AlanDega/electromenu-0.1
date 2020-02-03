import React from "react";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import { withTranslation } from 'react-i18next';
// reactstrap components
import {
    Card,
    CardHeader,
    Container,
    Row,
    Table,
    Media,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Modal,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.jsx";
import { Inventarios, deleteInventario } from '../apollo/server';
import InventoryComponent from '../components/Inventories/Inventory'
import { transformToNewline } from '../utils/stringManipulations'

const INVENTARIOS = gql`${Inventarios}`
const DELETE_INVENTARIO = gql`${deleteInventario}`


class Inventory extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            editModal: false
        };
    }
    toggleModal = (inventario) => {
        this.setState({
            editModal: !this.state.editModal,
            inventario
        });
    }

    render() {
        const { t } = this.props;
        return (
            <>
                <Header />
                {/* Page content */}
                <Container className="mt--7" fluid>
                    <InventoryComponent />
                    {/* Table */}
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
                                            <th scope="col">{t("Restaurant")}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <Query query={INVENTARIOS}>
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
                                                        <td style={{ whiteSpace: 'pre' }}>{transformToNewline(inventario.restaurante, 3)}</td>
                                                        <td> {inventario.category.title}</td>
                                                        
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
                                                                            this.toggleModal(food)
                                                                        }
                                                                        }
                                                                    >
                                                                        {t("Edit")}
                                                                    </DropdownItem>
                                                                    <Mutation mutation={DELETE_FOOD}
                                                                        onCompleted={this.onCompleted}
                                                                        onError={this.onError}
                                                                        refetchQueries={[{ query: GET_FOODS }]} >
                                                                        {(deleteFood, { loading }) => {
                                                                            return <DropdownItem
                                                                                href="#pablo"
                                                                                onClick={e => {
                                                                                    e.preventDefault()
                                                                                    deleteFood({ variables: { id: food._id } })
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
                        <InventoryComponent food={this.state.food} />
                    </Modal>
                </Container>
            </>
        );
    }
}

export default withTranslation()(Inventory);
