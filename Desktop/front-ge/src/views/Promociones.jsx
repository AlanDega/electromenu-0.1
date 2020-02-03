import React from "react";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import { withTranslation } from 'react-i18next';
import PromocionComponent from '../components/Promociones/Promocion'
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
import { getPromociones, deletePromocion} from "../apollo/server";

const GET_PROMOCIONES = gql`${getPromociones}`
const DELETE_PROMOCIONES = gql`${deletePromocion}`
//const GET_FOODS = gql`${getFoods}`

class Promociones extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      editModal: false,
      promocion: null
    };
  }

  toggleModal = promocion => {
    this.setState({
      editModal: !this.state.editModal,
      promocion
    })
  }

  render() {
    const { t } = this.props;
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {<PromocionComponent />}
          {/* Table */}
          <Row className="mt-5">
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">{t("Restaurant")}</h3>
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

                    <Query query={GET_PROMOCIONES}>
                      
                      {({ loading, error, data }) => {

                        if (loading) return <tr><td>{t("Loading")}...</td></tr>;
                        if (error) return <tr><td>`${t("Error")}! ${error.message}`</td></tr>;
                        
                        return data.promociones.map(promocion =>
                          <tr key={promocion._id}>
                            <th scope="row">
                              <Media>
                                <span className="mb-0 text-sm">
                                  {promocion.title}
                                </span>
                              </Media>
                            </th>
                            <td>{promocion.description}</td>
                            <td>
                              {!!promocion.img && <img className="img-responsive" src={promocion.img} alt="img menu" />}
                              {!promocion.img && "No Image"}
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
                                      this.toggleModal(promocion)
                                    }}>
                                    {t("Edit")}
                                  </DropdownItem>
                                  
                                  <Mutation mutation={DELETE_PROMOCIONES}
                                    refetchQueries={[{ query: GET_PROMOCIONES }]}
                                    onCompleted={this.onCompleted}
                                    onError={this.onError}>

                                    {(deletePromocion, { loading }) => {
                                      if (loading) return t("Loading")
                                      return <DropdownItem
                                        href="#pablo"
                                        onClick={e => {
                                          e.preventDefault()
                                          deletePromocion({ variables: { id: promocion._id } })
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

            <PromocionComponent promocion={this.state.promocion} />

          </Modal>

        </Container>
      </>
    );
  }
}

export default withTranslation()(Promociones);
