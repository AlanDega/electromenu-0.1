import React from "react";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import { withTranslation } from 'react-i18next';
import CategoryComponent from '../components/Category/Category'
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
import { getCategories, deleteCategory, getFoods } from "../apollo/server";

const GET_CATEGORIES = gql`${getCategories}`
const DELETE_CATEGORY = gql`${deleteCategory}`
const GET_FOODS = gql`${getFoods}`

class Category extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editModal: false,
      category: null
    };
  }
  toggleModal = category => {
    this.setState({
      editModal: !this.state.editModal,
      category
    })
  }
  render() {
    const { t } = this.props;
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <CategoryComponent />
          {/* Table */}
          <Row className="mt-5">
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">{t("Categories")}</h3>
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
                    <Query query={GET_CATEGORIES}>
                      {({ loading, error, data }) => {
                        if (loading) return <tr><td>{t("Loading")}...</td></tr>;
                        if (error) return <tr><td>`${t("Error")}! ${error.message}`</td></tr>;
                        return data.categories.map(category =>
                          <tr key={category._id}>
                            <th scope="row">
                              <Media>
                                <span className="mb-0 text-sm">
                                  {category.title}
                                </span>
                              </Media>
                            </th>
                            <td>{category.description}</td>
                            <td>
                              {!!category.img_menu && <img className="img-responsive" src={category.img_menu} alt="img menu" />}
                              {!category.img_menu && "No Image"}
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
                                      this.toggleModal(category)
                                    }}>
                                    {t("Edit")}
                                  </DropdownItem>
                                  <Mutation mutation={DELETE_CATEGORY}
                                    refetchQueries={[{ query: GET_CATEGORIES }, { query: GET_FOODS }]}
                                    onCompleted={this.onCompleted}
                                    onError={this.onError}>
                                    {(deleteCategory, { loading }) => {
                                      if (loading) return t("Loading")
                                      return <DropdownItem
                                        href="#pablo"
                                        onClick={e => {
                                          e.preventDefault()
                                          deleteCategory({ variables: { id: category._id } })
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
            <CategoryComponent category={this.state.category} />
          </Modal>
        </Container>
      </>
    );
  }
}

export default withTranslation()(Category);
