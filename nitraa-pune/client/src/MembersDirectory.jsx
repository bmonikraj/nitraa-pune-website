import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { SocialIcon } from 'react-social-icons';
import SweetAlert from 'react-bootstrap-sweetalert';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import Header from './Components/Header';
import Footer from './Components/Footer';
import $ from 'jquery';
import ReactDataGrid from 'react-data-grid';
import { Toolbar, Data, Filters } from "react-data-grid-addons";

class MembersDirectory extends React.Component {
    constructor(props){
      super(props);
      this.sortRows = this.sortRows.bind(this);
      this.handleFilterChange = this.handleFilterChange.bind(this);
      this.getValidFilterValues = this.getValidFilterValues.bind(this);
      this.state = {
        responseFetched: 0,
        responseArr: [],
        setRows: [],
        filters: {},
        filteredRows: []
      }
    }
    rowClicked(){
      window.open("https://youtube.com", "_self");
    }
    componentDidMount(){
      if(localStorage.getItem('authtoken')){
        var _self = this;
        axios({
          method: "GET",
          url: "/members-directory"
        }).then(response => {
          if(response.data.status === "success"){
            let rows = [];
            response.data.data.map((item, index) => {
                  let tempObj = {id:"", name:"", YOP:"", Email:"", Phone:"", Branch: "", Organization: "", profilePic: ""};
                  tempObj['id'] = index+1;
                  tempObj['name'] = item.name;
                  tempObj['YOP'] = (item.yop)?item.yop.split("-")[0]:item.yop;
                  tempObj['Email'] = item.email;
                  tempObj['Phone'] = item.phone;
                  tempObj['Branch'] = item.branch;
                  tempObj['Organization'] = item.organization;
                  tempObj['profilePic'] = <img className="w-100" src={(item.cover_pic_ext === null)?process.env.PUBLIC_URL + "images/dummy.png":process.env.PUBLIC_URL + "images/profile_pictures/"+item._id+"."+item.cover_pic_ext} />;
                  rows.push(tempObj);
            });
            _self.setState({
              responseFetched: 1,
              responseArr: response.data.data,
              setRows: rows,
              filteredRows: rows
            });

          }
          else{
            _self.setState({
              responseFetched: 300
            });
          }
        }).catch(error => {
          console.log(error);
          _self.setState({
            responseFetched: 300
          });
        });
      }
      else{
        this.setState({
          responseFetched: 404
        });
      }
    }

    populateSetRow(){
      let rows = [];
      console.log(this.state.responseArr);
      this.state.responseArr.map((item, index) => {
            let tempObj = {id:"", name:"", YOP:"", Email:"", Phone:"", Branch: "", Organization: "", profilePic: ""};
            tempObj['id'] = index+1;
            tempObj['name'] = item.name;
            tempObj['YOP'] = (item.yop)?item.yop.split("-")[0]:item.yop;
            tempObj['Email'] = item.email;
            tempObj['Phone'] = item.phone;
            tempObj['Branch'] = item.branch;
            tempObj['Organization'] = item.organization;
            tempObj['profilePic'] = <img className="w-100" src={(item.cover_pic_ext === null)?process.env.PUBLIC_URL + "images/dummy.png":process.env.PUBLIC_URL + "images/profile_pictures/"+item._id+"."+item.cover_pic_ext} />;
            rows.push(tempObj);
      });
      this.setState({setRows: rows});
    }

    // const sortRows = (initialRows, sortColumn, sortDirection) => rows => {
    //   console.log(initialRows, sortColumn, sortDirection);
    //   const comparer = (a, b) => {
    //     if (sortDirection === "ASC") {
    //       return a[sortColumn] > b[sortColumn] ? 1 : -1;
    //     } else if (sortDirection === "DESC") {
    //       return a[sortColumn] < b[sortColumn] ? 1 : -1;
    //     }
    //   };
    //   return sortDirection === "NONE" ? initialRows : [...rows].sort(comparer);
    // };

    sortRows(initialRows, sortColumn, sortDirection){
      console.log(initialRows, sortColumn, sortDirection);
      const comparer = (a, b) => {
        if (sortDirection === "ASC") {
          return a[sortColumn] > b[sortColumn] ? 1 : -1;
        } else if (sortDirection === "DESC") {
          return a[sortColumn] < b[sortColumn] ? 1 : -1;
        }
      };
      return sortDirection === "NONE" ? initialRows : initialRows.sort(comparer);
    }

    handleFilterChange(filter){
      const newFilters = filter;
      if (filter.filterTerm) {
        newFilters[filter.column.key] = filter;
      } else {
        delete newFilters[filter.column.key];
      }
      return newFilters;
    };

    getValidFilterValues(rows, columnId) {
      console.log(rows, columnId);
      return rows.map(r => r[columnId]).filter((item, i, a) => {
          return i === a.indexOf(item);
      });
    }

    render() {
      var styleTableDiv = {
          marginTop : '15vh',
          marginBottom : '15vh',
          background : "#eeeeee",
          padding: "10px"
      }
      const defaultColumnProperties = {
        sortable: true,
        filterable: true
      };

      const selectors = Data.Selectors;
      const {
        NumericFilter,
        AutoCompleteFilter,
        MultiSelectFilter,
        SingleSelectFilter
      } = Filters;

      const columns = [
        { key: 'id', name: '#',width: 100},
        { key: 'profilePic', name: 'Profile Pic', width: 100},
        { key: 'name', name: 'Name', width: 200, filterRenderer: AutoCompleteFilter},
        { key: 'Email', name: 'Email' , width: 220, filterRenderer: AutoCompleteFilter},
        { key: 'Phone', name: 'Phone' , width: 170, filterRenderer: AutoCompleteFilter},
        { key: 'YOP', name: 'YOP', width: 80, filterRenderer: AutoCompleteFilter},
        { key: 'Branch', name: 'Branch', width: 100, filterRenderer: AutoCompleteFilter},
        { key: 'Organization', name: 'Organization', width: 150, filterRenderer: AutoCompleteFilter}].map(c => ({ ...c, ...defaultColumnProperties}));


        function getRows(rows, filters) {
          return selectors.getRows({ rows, filters });
        }


      if(this.state.responseFetched === 0){
        return (
            <Container>
                <Header />
                  <div style = {styleTableDiv}>
                      <Row>
                        <Col style={{color: "#444"}}>
                          <center><h3><b>MEMBERS DIRECTORY</b></h3></center>
                        </Col>
                      </Row>
                      <hr/>
                      <Row style ={{padding: "1rem", margin: "0"}}>
                        <Col xs={12} style={{marginTop: "1rem", fontSize:"0.9rem", color: "#444"}}>
                          <center><h5>Loading ...</h5></center>
                        </Col>
                      </Row>
                  </div>
                <Footer />
            </Container>
        );
      }
      else if(this.state.responseFetched === 300){
        return (
            <Container>
                <Header />
                  <div style = {styleTableDiv}>
                      <Row>
                        <Col style={{color: "#444"}}>
                          <center><h3><b>MEMBERS DIRECTORY</b></h3></center>
                        </Col>
                      </Row>
                      <hr/>
                      <Row style ={{padding: "1rem", margin: "0"}}>
                        <Col xs={12} style={{marginTop: "1rem", fontSize:"0.9rem", color: "#444"}}>
                          <center><h5>Something went wrong! Please try again later..</h5></center>
                        </Col>
                      </Row>
                  </div>
                <Footer />
            </Container>
        );
      }
      else if(this.state.responseFetched === 404){
        return (
            <Container>
                <Header />
                  <div style = {styleTableDiv}>
                      <Row>
                        <Col style={{color: "#444"}}>
                          <center><h3><b>MEMBERS DIRECTORY</b></h3></center>
                        </Col>
                      </Row>
                      <hr/>
                      <Row style ={{padding: "1rem", margin: "0"}}>
                        <Col xs={12} style={{marginTop: "1rem", fontSize:"0.9rem", color: "#444"}}>
                          <center><h5>Sorry! Not Authorized for viewing this page..</h5></center>
                        </Col>
                      </Row>
                  </div>
                <Footer />
            </Container>
        );
      }
      else if(this.state.responseFetched === 1){
        if(this.state.responseArr.length === 0){
          return (
              <Container>
                  <Header />
                    <div style = {styleTableDiv}>
                        <Row>
                          <Col style={{color: "#444"}}>
                            <center><h3><b>MEMBERS DIRECTORY</b></h3></center>
                          </Col>
                        </Row>
                        <hr/>
                        <Row style ={{padding: "1rem", margin: "0"}}>
                          <Col xs={12} style={{marginTop: "1rem", fontSize:"0.9rem", color: "#444"}}>
                            <center><h5>No Records.</h5></center>
                          </Col>
                        </Row>
                    </div>
                  <Footer />
              </Container>
          );
        }
        else{
          styleTableDiv = {
              marginTop : '15vh',
              marginBottom : '15vh',
              background : "#eeeeee"
          }
          var _self_ = this;
          return (
              <Container>
                  <Header />
                    <div style = {styleTableDiv}>
                        <Row>
                          <Col style={{color: "#444"}}>
                            <center><h3><b>MEMBERS DIRECTORY</b></h3></center>
                          </Col>
                        </Row>
                        <hr/>
                          <ReactDataGrid
                          columns={columns}
                          rowHeight={100}
                          rowGetter={i => getRows(this.state.setRows, this.state.filters)[i]}
                          rowsCount={this.state.setRows.length}
                          onRowClick={this.rowClicked.bind(this)}
                          onGridSort = {(sortColumn, sortDirection) =>{
                              console.log(_self_.state);
                              var rows = _self_.sortRows( _self_.state.responseArr, sortColumn, sortDirection);
                              _self_.setState({setRows: rows}, _self_.populateSetRow.bind(_self_))
                            }}
                          toolbar={<Toolbar enableFilter={true} />}
                          onAddFilter={filter => {
                            console.log("a");
                            var filTer = _self_.handleFilterChange(filter);
                            console.log("b");
                            _self_.setState({filters: filTer})
                          }}
                          onClearFilters={() => {
                            _self_.setState({filters: {}});
                          }}
                          getValidFilterValues={columnKey => {
                            console.log(columnKey);
                            _self_.getValidFilterValues(_self_.state.filteredRows, columnKey);
                          }}
                          />
                    </div>
                  <Footer />
              </Container>
          );
        }
      }
    }
}

export default MembersDirectory;
