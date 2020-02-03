import React from "react";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import { withTranslation } from 'react-i18next';
import RestaurantComponent from '../components/Restaurants/Restaurant'
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
import { getRestaurants, deleteRestaurant, getFoods } from "../apollo/server";

const GET_RESTAURANTS = gql`${getRestaurants}`
const DELETE_RESTAURANTS = gql`${deleteRestaurant}`
const GET_FOODS = gql`${getFoods}`

class Restaurants extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editModal: false,
      restaurant: null
    };
  }
  toggleModal = restaurant => {
    this.setState({
      editModal: !this.state.editModal,
      restaurant
    })
  }
  render() {
    const { t } = this.props;
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {<RestaurantComponent />}
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

                    <Query query={GET_RESTAURANTS}>
                      {({ loading, error, data }) => {

                        if (loading) return <tr><td>{t("Loading")}...</td></tr>;
                        if (error) return <tr><td>`${t("Error")}! ${error.message}`</td></tr>;
                        
                        return data.restaurants.map(restaurant =>
                          <tr key={restaurant._id}>
                            <th scope="row">
                              <Media>
                                <span className="mb-0 text-sm">
                                  {restaurant.title}
                                </span>
                              </Media>
                            </th>
                            <td>{restaurant.description}</td>
                            <td>
                              {!!restaurant.img && <img className="img-responsive" src={restaurant.img} alt="img menu" />}
                              {!restaurant.img && "No Image"}
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
                                      this.toggleModal(restaurant)
                                    }}>
                                    {t("Edit")}
                                  </DropdownItem>
                                  
                                  <Mutation mutation={DELETE_RESTAURANTS}
                                    refetchQueries={[{ query: GET_RESTAURANTS }, { query: GET_FOODS }]}
                                    onCompleted={this.onCompleted}
                                    onError={this.onError}>

                                    {(deleteRestaurant, { loading }) => {
                                      if (loading) return t("Loading")
                                      return <DropdownItem
                                        href="#pablo"
                                        onClick={e => {
                                          e.preventDefault()
                                          deleteRestaurant({ variables: { id: restaurant._id } })
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

            <RestaurantComponent restaurant={this.state.restaurant} />

          </Modal>

        </Container>
      </>
    );
  }
}

export default withTranslation()(Restaurants);
