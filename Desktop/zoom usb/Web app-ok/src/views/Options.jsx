import React, { Component } from 'react';
import {
    Container,
    Row,
    Card,
    CardHeader,
    Table,
    DropdownItem,
    DropdownToggle,
    DropdownMenu,
    UncontrolledDropdown,
    Media,
    Modal
} from 'reactstrap';
import Header from "components/Headers/Header.jsx";
import OptionComponent from '../components/Option/Option';
import { withTranslation } from 'react-i18next';
import { Query, Mutation } from 'react-apollo';
import { getOptions, deleteOption } from '../apollo/server';
import gql from 'graphql-tag';

const GET_OPTIONS = gql`${getOptions}`
const DELETE_OPTION = gql`${deleteOption}`

class Option extends Component {
    constructor(props) {
        super(props)
        this.state = { editModal: false, option: null }
    }
    toggleModal = (option) => {
        this.setState({
            editModal: !this.state.editModal,
            option
        });
    }
    onCompleted = ({ deleteOption }) => {
        console.log(deleteOption)
    }
    onError = (error) => {
        console.log(error)
    }
    update = (proxy, { data: { deleteOption } }) => {
        try {
            if (deleteOption) {
                const data = proxy.readQuery({ query: GET_OPTIONS });
                data.options = data.options.filter(option => option._id !== deleteOption);
                proxy.writeQuery({ query: GET_OPTIONS, data });
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
                    <OptionComponent />
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
                                            <th scope="col">{t("Price")}</th>
                                            <th scope="col">{t("Actions")}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <Query query={GET_OPTIONS}>
                                            {({ loading, error, data }) => {
                                                if (loading) return <tr><td>{t("Loading")}</td></tr>;
                                                if (error) return <tr><td>`${t("Error")}! ${error.message}`</td></tr>;
                                                return data.options.map(option =>
                                                    <tr key={option._id}>
                                                        <th scope="row">
                                                            <Media>
                                                                <span className="mb-0 text-sm">
                                                                    {option.title}
                                                                </span>
                                                            </Media>
                                                        </th>
                                                        <td style={{ whiteSpace: 'pre' }}>{option.description}</td>
                                                        <td> {option.price}</td>

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
                                                                            this.toggleModal(option)
                                                                        }
                                                                        }
                                                                    >
                                                                        {t("Edit")}
                                                                    </DropdownItem>
                                                                    <Mutation mutation={DELETE_OPTION}
                                                                        onCompleted={this.onCompleted}
                                                                        onError={this.onError}
                                                                        update={this.update} >
                                                                        {(deleteOption, { loading }) => {
                                                                            return <DropdownItem
                                                                                href="#pablo"
                                                                                onClick={e => {
                                                                                    e.preventDefault()
                                                                                    deleteOption({ variables: { id: option._id } })
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
                        <OptionComponent option={this.state.option} />
                    </Modal>
                </Container>
            </>
        )
    }
}

export default withTranslation()(Option)
