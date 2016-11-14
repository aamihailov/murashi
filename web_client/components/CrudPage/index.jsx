import React from 'react'
import { PageHeader, Table } from 'react-bootstrap'
import { Form, FormGroup, Col, FormControl, Button, ButtonToolbar, ControlLabel } from 'react-bootstrap'
import { Modal, Popover } from 'react-bootstrap'
import cookie from 'react-cookie';
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

var MyAddFormRow = React.createClass({
  getInitialState() {
    return {formOptions: []};
  },

  render(){
    var control;
    var formOptions;

    var validationState;
    var errorList;
    if (this.props.wrong) {
      console.log(this.props.wrong);
      validationState = "error";
      errorList = <div>{this.props.wrong}</div>;
    }

    switch(this.props.type) {
      case 'textarea':
        control = <FormControl componentClass='textarea' placeholder={this.props.name} value={this.props.value}/>;
        break;
      case 'select':
        var formOptions = [];
        formOptions.push(<option key={0} value={0}>{'...'}</option>);
        this.state.formOptions.forEach(function(el) {
          formOptions.push(
            <option key={el.id} value={el.id}>{el.name}</option>
          );
        });
        control = (
          <FormControl componentClass='select' placeholder={this.props.name}>
            {formOptions}
          </FormControl>
        );
        break;
      default:
        control = <FormControl type='text' placeholder={this.props.name} value={this.props.value}/>;
        break;
    }

    return(
      <FormGroup validationState={validationState} controlId={this.props.id}>
        <Col componentClass={ControlLabel} sm={2}>{this.props.name}</Col>
        <Col sm={10}>
          {control}
          <FormControl.Feedback />
        </Col>
        <Col smOffset={2} sm={10}>
          {errorList}
        </Col>
      </FormGroup>
    );
  }
});

var MyAddForm = React.createClass({
  getInitialState() {
    return {formData: {}, wrongFields: {}};
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
    this.setState({wrongFields: {}});
    fetch(this.props.urls.api_root, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': cookie.load('csrftoken')
      },
      body: JSON.stringify(this.state.formData)})
    .then((response) => {
      if (response.ok) {
        this.props.handleClose()
      } else {
        response.json().then((data) => {
          this.setState({wrongFields: data});
        })
      }
    })
    .catch((error) => {
      console.error(error);
    });
  },

  handleUpdate(id) {
    this.setState({wrongFields: {}});
    fetch(Format(this.props.urls.api_element, this.props.editData.id), {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': cookie.load('csrftoken')
      },
      body: JSON.stringify(this.props.editData)
    })
    .then((response) => {
      if (response.ok) {
        this.props.handleClose()
      } else {
        response.json().then((data) => {
          this.setState({wrongFields: data});
        })
      }
    })
    .catch((error) => {
      console.error(error);
    });
  },

  handleDelete(id) {
    fetch(Format(this.props.urls.api_element, this.props.editData.id), {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'X-CSRFToken': cookie.load('csrftoken')
      }
    })
    .then((response) => {this.props.handleClose()})
    .catch((error) => {
      console.error(error);
    });
  },

  render(){
    var controls = [];
    var schema = this.props.schema;
    var handleChange = this.handleChange;

    var editData = this.props.editData ? this.props.editData : {};
    var wrong = this.state.wrongFields;
    schema.forEach(function(el) {
      if (!el.readonly) {
        var editValue = editData[el.id];
        controls.push(
          <MyAddFormRow key={el.id}
            id={el.id}
            wrong={wrong[el.id]}
            name={el.name}
            type={el.type}
            value={editValue}
          />
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

    fetch(this.props.schema[this.props.model].urls.api_root, {
      credentials: 'include',
      headers: {
        'X-CSRFToken': cookie.load('csrftoken')
      }
    })
    .then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          this.setState({data: data});
        })
      }
    })
    .catch((error) => {
      console.error(error);
    });
  },

  handleEdit(d) {
    this.setState({editData: d});
  },

  componentDidMount: function() {
    this.handleUpdate();
  },

  render(){
    var schema = this.props.schema[this.props.model];
    return(
      <div>
        <PageHeader>{schema.strings.page_header}</PageHeader>
        <MyTable schema={schema.fields}
                 data={this.state.data}
                 handleEdit={this.handleEdit}/>
        <MyAddModal schema={schema.fields}
                    strings={schema.strings}
                    urls={schema.urls}
                    editData={this.state.editData}
                    handleUpdate={this.handleUpdate}
                    handleEdit={this.handleEdit}/>
      </div>
    );
  }
});

export default MyCRUDPage
