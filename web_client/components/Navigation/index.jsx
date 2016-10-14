import React, { Component } from 'react'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'

class Navigation extends Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">Polesys</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav bsStyle="tabs" activeKey={this.props.activeKey}>
          <NavItem eventKey="/schedule" href="/schedule">Расписание</NavItem>
          <NavItem eventKey="/client" href="/client">Клиенты</NavItem>
          <NavDropdown title="Тренировки" id="nav-dropdown">
            <MenuItem eventKey="/trainer" href="/trainer">Тренеры</MenuItem>
            <MenuItem eventKey="/group" href="/group">Группы</MenuItem>
            <MenuItem eventKey="/train-type" href="/train-type">Направления</MenuItem>
            <MenuItem eventKey="/subscription" href="/subscription">Абонементы</MenuItem>
            <MenuItem eventKey="/location" href="/location">Залы</MenuItem>
          </NavDropdown>
          <NavDropdown title="Финансы" id="nav-dropdown">
            <MenuItem eventKey="/salary-plan" href="/salary-plan">Зарплатные планы</MenuItem>
            <MenuItem eventKey="/discount" href="/discount">Скидки</MenuItem>
            <MenuItem eventKey="/debtors" href="/debtors">Должники</MenuItem>
            <MenuItem eventKey="/cashout" href="/cashout">Выплаты</MenuItem>
          </NavDropdown>
        </Nav>
      </Navbar>
    );
  }
}


export default Navigation;
