import React from 'react'
import { PageHeader, Table } from 'react-bootstrap'
import { Form, FormGroup, Col, FormControl, Button, ButtonToolbar, ControlLabel } from 'react-bootstrap'
import { Modal } from 'react-bootstrap'
var Format = require('string-format')

var MyTableHeader = React.createClass({
  render(){
    var cols = [];
    var schema = this.props.schema;

    schema.forEach(function(el) {
      cols.push(<th key={el.id}>{el.name}</th>)
    });

    return(
      <thead><tr>{cols}</tr></thead>
    );
  }
});

var MyTableRow = React.createClass({
  handleEdit(e) {
    this.props.handleEdit(this.props.rowData);
  },

  render(){
    var cols = [];
    var schema = this.props.schema;
    var rowData = this.props.rowData;

    schema.forEach(function(el) {
      cols.push(<td key={el.id}>{rowData[el.id]}</td>)
    });

    return(
      <tr onClick={this.handleEdit}>{cols}</tr>
    );
  }
});

var MyTable = React.createClass({
  render(){
    var rows = [];
    var schema = this.props.schema;
    var data = this.props.data;

    var handleEdit = this.props.handleEdit;
    data.forEach(function(el) {
      rows.push(<MyTableRow key={el.id} schema={schema} rowData={el} handleEdit={handleEdit}/>)
    });

    return(
      <Table striped bordered hover>
        <MyTableHeader schema={schema}/>
        <tbody>{rows}</tbody>
      </Table>
    );
  }
});

var MyAddForm = React.createClass({
  getInitialState() {
    return {formData: {}};
  },

  handleChange(e) {
    if (this.props.editData) {
      var editData = this.props.editData;
      editData[e.target.id] = e.target.value;
      this.props.handleEdit(editData);
    } else {
      var formData = this.state.formData;
      formData[e.target.id] = e.target.value;
      this.setState([formData: formData]);
    }
  },

  handleCreate(e) {
    fetch(this.props.urls.api_root, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.formData)})
    .then((response) => response.json())
    .then((responseJson) => {
        this.props.handleClose();
      })
    .catch((error) => {
      console.error(error);
    });
  },

  handleUpdate(id) {
    fetch(Format(this.props.urls.api_element, this.props.editData.id), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.props.editData)
    })
    .then((response) => response.json())
    .then((response) => {this.props.handleClose()})
    .catch((error) => {
      console.error(error);
    });
  },

  handleDelete(id) {
    fetch(Format(this.props.urls.api_element, this.props.editData.id), {method: 'DELETE'})
    .then((response) => {this.props.handleClose()})
    .catch((error) => {
      console.error(error);
    });
  },

  render(){
    console.log('0');
    var controls = [];
    var schema = this.props.schema;
    var handleChange = this.handleChange;

    var editData = this.props.editData ? this.props.editData : {};
    schema.forEach(function(el) {
      if (!el.readonly) {
        var editValue = editData[el.id];
        controls.push(
          <FormGroup key={el.id} controlId={el.id}>
            <Col componentClass={ControlLabel} sm={2}>{el.name}</Col>
            <Col sm={10}><FormControl placeholder={el.name} value={editValue}/></Col>
          </FormGroup>
        );
      }
    });

    var buttons = [];
    if (this.props.editData == null) {
      buttons.push(
        <Button key="create" bsStyle="primary" onClick={this.handleCreate}>
          {this.props.strings.add_label_short}
        </Button>
      );
    } else {
      buttons.push(
        <Button key="update" bsStyle="primary" onClick={this.handleUpdate}>
          {this.props.strings.update_label_short}
        </Button>
      );
      buttons.push(
        <Button key="delete" bsStyle="danger" onClick={this.handleDelete}>
          {this.props.strings.delete_label_short}
        </Button>
      );
    }

    return(
      <Form horizontal onChange={handleChange}>
        {controls}
        <FormGroup>
          <Col smOffset={2} sm={10}>
            <ButtonToolbar>
              {buttons}
            </ButtonToolbar>
          </Col>
        </FormGroup>
      </Form>
    );
  }
});

const MyAddModal = React.createClass({
  getInitialState() {
    return {showModal: false};
  },

  handleClose() {
    this.props.handleUpdate();
    this.setState({ showModal: false });
  },

  open() {
    this.setState({ showModal: true });
  },

  render() {
    var schema = this.props.schema;
    var strings = this.props.strings;
    var urls = this.props.urls;
    var show = this.props.editData ? true : this.state.showModal;
    var title = this.props.editData ? strings.edit_label : strings.add_label;
    return (
      <div>
        <Button bsStyle="primary" bsSize="large" onClick={this.open}>
          {strings.add_label}
        </Button>

        <Modal show={show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <MyAddForm schema={schema}
                       strings={strings}
                       urls={urls}
                       handleClose={this.handleClose}
                       handleEdit={this.props.handleEdit}
                       editData={this.props.editData}
            />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
});

const MyCRUDPage = React.createClass({
  getInitialState() {
    return {
      data: this.props.data,
      editData: null
    };
  },

  handleUpdate() {
    this.setState({editData: null});

    fetch(this.props.urls.api_root)
    .then((response) => response.json())
    .then((responseJson) => {
        this.setState({data: responseJson})
      })
    .catch((error) => {
      console.error(error);
    });
  },

  handleEdit(d) {
    console.log(d);
    this.setState({editData: d});
  },

  componentDidMount: function() {
    this.handleUpdate();
  },

  render(){
    return(
      <div>
        <PageHeader>{this.props.strings.page_header}</PageHeader>
        <MyTable schema={this.props.schema}
                 data={this.state.data}
                 handleEdit={this.handleEdit}/>
        <MyAddModal schema={this.props.schema}
                    strings={this.props.strings}
                    urls={this.props.urls}
                    editData={this.state.editData}
                    handleUpdate={this.handleUpdate}
                    handleEdit={this.handleEdit}/>
      </div>
    );
  }
});

export default MyCRUDPage
