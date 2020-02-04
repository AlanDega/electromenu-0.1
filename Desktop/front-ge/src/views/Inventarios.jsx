import React from "react";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import { withTranslation } from 'react-i18next';
import InventarioComponent from '../components/Inventarios/Inventario'
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
  Modal
} from "reactstrap";

// core components
import Header from "components/Headers/Header.jsx";
import { getInventarios, deleteRestaurant, getFoods, deleteInventario } from "../apollo/server";

const GET_INVENTARIOS = gql`${getInventarios}`
const DELETE_INVENTARIOS = gql`${deleteInventario}`

class Inventarios extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editModal: false,
      inventario: null
    };
  }
  toggleModal = inventario => {
    this.setState({
      editModal: !this.state.editModal,
      inventario
    })
  }
  render() {
    const { t } = this.props;
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {<InventarioComponent />}
          {/* Table */}
          <Row className="mt-5">
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">{t("Inventario")}</h3>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">{t("Title")}</th>
                      <th scope="col">{t("Description")}</th>
                      <th scope="col">{t("Image")}</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>

                    <Query query={GET_INVENTARIOS}>
                      {({ loading, error, data }) => {
                          console.log('data',data)
                        if (loading) return <tr><td>{t("Loading")}...</td></tr>;
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
                            {/* <td>{inventario.description}</td> */}
                           
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
                                    }}>
                                    {t("Edit")}
                                  </DropdownItem>
                                  
                                  <Mutation mutation={DELETE_INVENTARIOS}
                                  //double mutation like this double query 
                                    refetchQueries={[{ query: GET_INVENTARIOS }, { query: GET_FOODS }]}
                                    onCompleted={this.onCompleted}
                                    onError={this.onError}>

                                    {(deleteInventario, { loading }) => {
                                      if (loading) return t("Loading")
                                      return <DropdownItem
                                        href="#pablo"
                                        onClick={e => {
                                          e.preventDefault()
                                          // si no fnciona utilizar el del te mutation de restaurante 
                                          deleteInventario({ variables: { id: inventario._id } })
                                        }}>
                                        {t("Delete")}
                                      </DropdownItem>
                                    }}
                                  </Mutation>
                                
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </td>
                          </tr>)
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
            toggle={() => { this.toggleModal(null) }}>

            <InventarioComponent inventario={this.state.inventario} />

          </Modal>

        </Container>
      </>
    );
  }
}

export default withTranslation()(Inventarios);
