import React from 'react';
import { withTranslation } from 'react-i18next';
import {
    Container,
    Row,
    Card,
    CardHeader,
    Table,
    Media
   
} from "reactstrap";
import Header from "components/Headers/Header.jsx";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { getUsers } from "../apollo/server";
import { transformToNewline } from '../utils/stringManipulations';

const GET_USERS = gql`${getUsers}`
class Users extends React.Component {
    render() {
        const { t } = this.props;
        return (
            <>
                <Header />
                {/* Page content */}
                <Container className="mt--7" fluid>
                    {/* Table */}
                    <Row >
                        <div className="col">
                            <Card className="shadow">
                                <CardHeader className="border-0">
                                    <h3 className="mb-0">{t("Users")}</h3>
                                </CardHeader>


                                <Table className="align-items-center table-flush" responsive>
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">{t("Name")}</th>
                                            <th scope="col">{t("Email")}</th>
                                            <th scope="col">{t("Phone")}</th>
                                            <th scope="col">{t("Address")}</th>
                                            <th scope="col" />
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <Query query={GET_USERS} onError={error => { console.log(error) }}>
                                            {({ loading, error, data }) => {
                                                if (loading) return <tr><td>{t("Loading")}</td></tr>;
                                                if (error) return <tr><td>`${t("Error")}! ${error.message}`</td></tr>;
                                                return data.users.map(user =>
                                                    <tr key={user._id}>
                                                        <th scope="row">
                                                            <Media>
                                                                <span className="mb-0 text-sm">
                                                                    {user.name}
                                                                </span>
                                                            </Media>
                                                        </th>
                                                        <td>{user.email}</td>
                                                        <td>{user.phone}</td>
                                                        <td style={{ whiteSpace: 'pre' }}>{transformToNewline(user.location.delivery_address,3)}</td>
                                                        <td></td>
                                                    </tr>
                                                )
                                            }}
                                        </Query>
                                    </tbody>
                                </Table>

                            </Card>
                        </div>
                    </Row>
                </Container>
            </>
        )
    }
}

export default withTranslation()(Users);