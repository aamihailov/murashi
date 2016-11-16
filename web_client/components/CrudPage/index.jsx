import React from 'react'
import { PageHeader, Table } from 'react-bootstrap'
import { Form, FormGroup, Col, FormControl, Button, ButtonToolbar, ControlLabel } from 'react-bootstrap'
import { Modal, Popover } from 'react-bootstrap'
import cookie from 'react-cookie';
import update from 'immutability-helper';

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
    var dataList = this.props.dataList;

    var handleEdit = this.props.handleEdit;
    dataList.forEach(function(el) {
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
    if (this.props.dataElement) {
      var dataElement = this.props.dataElement;
      dataElement[e.target.id] = e.target.value;
      this.props.handleEdit(dataElement);
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
    fetch(Format(this.props.urls.api_element, this.props.dataElement.id), {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': cookie.load('csrftoken')
      },
      body: JSON.stringify(this.props.dataElement)
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
    fetch(Format(this.props.urls.api_element, this.props.dataElement.id), {
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

    var dataElement = this.props.dataElement ? this.props.dataElement : {};
    var wrong = this.state.wrongFields;
    schema.forEach(function(el) {
      if (!el.readonly) {
        var editValue = dataElement[el.id];
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
    if (this.props.dataElement == null) {
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
    var {schema, strings, urls} = this.props;
    var show = this.props.dataElement ? true : this.state.showModal;
    var title = this.props.dataElement ? strings.edit_label : strings.add_label;
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
                       dataElement={this.props.dataElement}
            />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
});

const MyCRUDPage = React.createClass({
  getInitialState() {
    var {model} = this.props;
    return {
      [model]: {
        dataList: [],
        dataElement: null
      }
    };
  },

  handleUpdate() {
    var {model} = this.props;
    var schema = this.props.schema[model];
    this.setState({[model]: update(this.state[model], {dataElement: {$set: null}})});

    fetch(schema.urls.api_root, {
      credentials: 'include',
      headers: {
        'X-CSRFToken': cookie.load('csrftoken')
      }
    })
    .then((response) => {
      if (response.ok) {
        response.json().then((dataList) => {
          this.setState({[model]: update(this.state[model], {dataList: {$set: dataList}})});
        })
      }
    })
    .catch((error) => {
      console.error(error);
    });
  },

  handleEdit(d) {
    var {model} = this.props;
    this.setState({[model]: update(this.state[model], {dataElement: {$set: d}})});
  },

  componentDidMount: function() {
    this.handleUpdate();
  },

  render(){
    var {model} = this.props;
    var schema = this.props.schema[model];
    return(
      <div>
        <PageHeader>{schema.strings.page_header}</PageHeader>
        <MyTable schema={schema.fields}
                 dataList={this.state[model].dataList}
                 handleEdit={this.handleEdit}/>
        <MyAddModal schema={schema.fields}
                    strings={schema.strings}
                    urls={schema.urls}
                    dataElement={this.state[model].dataElement}
                    handleUpdate={this.handleUpdate}
                    handleEdit={this.handleEdit}/>
      </div>
    );
  }
});

export default MyCRUDPage
