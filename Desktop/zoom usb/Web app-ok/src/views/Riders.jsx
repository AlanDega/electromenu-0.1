import React from 'react';
import { withTranslation } from 'react-i18next';
// reactstrap components
import {
    Card,
    CardHeader,
    Container,
    Row,
    Table,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Modal,
} from "reactstrap";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import Header from "../components/Headers/Header";
import RiderComponent from '../components/Rider/Rider';
import { getRiders, deleteRider, toggleAvailablity, getAvailableRiders } from "../apollo/server";

const GET_RIDERS = gql`${getRiders}`
const DELETE_RIDER = gql`${deleteRider}`
const TOGGLE_RIDER = gql`${toggleAvailablity}`
const GET_AVAILABLE_RIDERS = gql`${getAvailableRiders}`
class Riders extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            editModal: false,
            rider: null
        };
    }
    toggleModal = (rider) => {
        this.setState({
            editModal: !this.state.editModal,
            rider: rider
        });
    }

    onCompleted = (data) => {

    }
    onError = (error) => {

    }

    render() {
        const { t } = this.props;
        return (
            <>
                <Header />
                {/* Page content */}
                <Container className="mt--7" fluid>
                    <RiderComponent />
                    {/* Table */}
                    <Row className="mt-5">
                        <div className="col">
                            <Card className="shadow">
                                <CardHeader className="border-0">
                                    <h3 className="mb-0">{t("Riders")}</h3>
                                </CardHeader>


                                <Table className="align-items-center table-flush" responsive>
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">{t("Name")}</th>
                                            <th scope="col">{t("Username")}</th>
                                            <th scope="col">{t("Password")}</th>
                                            <th scope="col">{t("Phone")}</th>
                                            <th scope="col">{t("Available")}</th>
                                            <th scope="col">{t("Actions")}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <Query query={GET_RIDERS} onError={error => { console.log(error) }}>
                                            {({ loading, error, data }) => {
                                                if (loading) return <tr><td>{t("Loading")}</td></tr>;
                                                if (error) return <tr><td>`${t("Error")}! ${error.message}`</td></tr>;
                                                if (!data.riders.length) return <tr><td>No se encontraron repartidores.</td></tr>;
                                                return data.riders.map(rider =>
                                                    <tr key={rider._id}>
                                                        <td>{rider.name}</td>
                                                        <td>{rider.username}</td>
                                                        <td>{rider.password}</td>
                                                        <td>{rider.phone}</td>
                                                        <td>{rider.available}
                                                            <label className="custom-toggle">
                                                                <Mutation
                                                                    mutation={TOGGLE_RIDER}
                                                                    onCompleted={this.onCompleted}
                                                                    onError={this.onError}
                                                                    refetchQueries={[{ query: GET_RIDERS }, { query: GET_AVAILABLE_RIDERS }]} >
                                                                    {(toggleRider) => {
                                                                        return <input
                                                                            defaultChecked={rider.available}
                                                                            type="checkbox"
                                                                            onChange={(event) => {
                                                                                toggleRider({ variables: { id: rider._id } })
                                                                            }}
                                                                        />
                                                                    }}
                                                                </Mutation>
                                                                <span className="custom-toggle-slider rounded-circle" />
                                                            </label>
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
                                                                            this.toggleModal(rider)
                                                                        }
                                                                        }
                                                                    >
                                                                        {t("Edit")}
                                                                    </DropdownItem>
                                                                    <Mutation mutation={DELETE_RIDER}
                                                                        onCompleted={this.onCompleted}
                                                                        onError={this.onError}
                                                                        refetchQueries={[{ query: GET_RIDERS }]} >
                                                                        {(deleteRider, { loading }) => {
                                                                            return <DropdownItem
                                                                                href="#pablo"
                                                                                onClick={e => {
                                                                                    e.preventDefault()
                                                                                    deleteRider({ variables: { id: rider._id } })
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
                        <RiderComponent rider={this.state.rider} />
                    </Modal>
                </Container>
            </>
        )
    }
}

export default withTranslation()(Riders);