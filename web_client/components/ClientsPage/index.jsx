import React from 'react'
import { PageHeader, Table } from 'react-bootstrap'
import { Form, FormGroup, Col, FormControl, Button, ControlLabel } from 'react-bootstrap'
import { Modal } from 'react-bootstrap'

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
  render(){
    var cols = [];
    var schema = this.props.schema;
    var client = this.props.client;

    schema.forEach(function(el) {
      cols.push(<td key={el.id}>{client[el.id]}</td>)
    });

    return(
      <tr>{cols}</tr>
    );
  }
});

var MyTable = React.createClass({
  render(){
    var rows = [];
    var schema = this.props.schema;
    var data = this.props.data;

    data.forEach(function(el) {
      rows.push(<MyTableRow key={el.id} schema={schema} client={el}/>)
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
    var schema = this.props.schema;
    var formData = {};
    schema.forEach(function(el) {
      if (!el.readonly) {
        formData[el.id] = null;
      }
    });
    return {
      closeAction: this.props.close_form,
      formData: formData
    };
  },

  handleChange(e) {
    var formData = this.state.formData;
    formData[e.target.id] = e.target.value;
    this.setState([formData: formData]);
  },

  handleSubmit(e) {
    fetch(this.props.urls.api_root, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.formData)})
    .then((response) => response.json())
    .then((responseJson) => {
        this.state.closeAction();
      })
    .catch((error) => {
      console.error(error);
    });
  },

  render(){
    var controls = [];
    var schema = this.props.schema;
    var handleChange = this.handleChange;

    schema.forEach(function(el) {
      if (!el.readonly) {
        controls.push(
          <FormGroup key={el.id} controlId={el.id}>
            <Col componentClass={ControlLabel} sm={2}>{el.name}</Col>
            <Col sm={10}><FormControl placeholder={el.name}/></Col>
          </FormGroup>
        );
      }
    });

    return(
      <Form horizontal onChange={handleChange}>
        {controls}
        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button bsStyle="primary" onClick={this.handleSubmit}>
              {this.props.strings.add_button_label_short}
            </Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
});

const MyAddModal = React.createClass({
  getInitialState() {
    return { showModal: false };
  },

  close() {
    this.setState({ showModal: false });
  },

  open() {
    this.setState({ showModal: true });
  },

  render() {
    var schema = this.props.schema;
    var strings = this.props.strings;
    var urls = this.props.urls;
    return (
      <div>
        <Button bsStyle="primary" bsSize="large" onClick={this.open}>
          {this.props.strings.add_button_label}
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>{strings.add_button_label}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <MyAddForm schema={schema} strings={strings} urls={urls} close_form={this.close} />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
});

const MyCRUDPage = React.createClass({
  getInitialState() {
    return {
      strings: this.props.strings,
      schema: this.props.schema,
      urls: this.props.urls,
      data: this.props.data
    };
  },

  updateData(limit, offset, filter) {
    fetch(this.state.urls.api_root)
    .then((response) => response.json())
    .then((responseJson) => {
        this.setState({data: responseJson})
      })
    .catch((error) => {
      console.error(error);
    });
  },

  componentDidMount: function() {
    this.updateData();
  },

  render(){
    var schema = this.state.schema;
    var strings = this.state.strings;
    var urls = this.state.urls;
    var data = this.state.data;
    return(
      <div>
        <PageHeader>{strings.page_header}</PageHeader>
        <MyTable schema={schema} data={data}/>
        <MyAddModal schema={schema} strings={strings} urls={urls}/>
      </div>
    );
  }
});

var SCHEMA = {
  fields: [
    {id: "id", name: "#", readonly: true},
    {id: "name", name: "Имя"},
    {id: "phone", name: "Телефон"},
    {id: "subscription", name: "Абонемент", readonly: true},
    {id: "debt", name: "Долг", readonly: true},
    {id: "note", name: "Примечание"}
  ],
  strings: {
    page_header: "Клиенты",
    add_button_label: "Добавить клиента",
    add_button_label_short: "Добавить",
  },
  urls: {
    api_root: "http://localhost:5000/api/v0/clients/?format=json"
  }
}

var DATA = [
  {id: 1, name:"Титок Инна"},
  {id: 2, name:"Кириенко Вера"},
  {id: 3, name:"Сучкова Лиза"},
  {id: 4, name:"Глухих Катя"},
  {id: 5, name:"Тельминова Марина"},
  {id: 6, name:"Горшкова Мария"},
  {id: 7, name:"Трубникова Юля"},
  {id: 8, name:"Фарафонова Настя"},
  {id: 9, name:"Брежнева Саша", phone:"+79991111111"}
]

var Page = React.createClass({
  render(){
    return(
      <MyCRUDPage strings={SCHEMA.strings} schema={SCHEMA.fields} urls={SCHEMA.urls} data={DATA}/>
    );
  }
});

export default Page
