import React, { Component } from 'react'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { browserHistory } from 'react-router';

export default props => {
  var {activeKey} = props;
  if (!window.auth.is_authenticated) {
    window.location.assign('/api/v0/api-auth/login/?next=' + activeKey);
  }
  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="/">Murashi</a>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav bsStyle="tabs" activeKey={activeKey}>
        <NavItem eventKey="/schedule" href="/schedule">Расписание</NavItem>
        <NavItem eventKey="/client" href="/client">Клиенты</NavItem>
        <NavDropdown title="Тренировки" id="nav-dropdown">
          <MenuItem eventKey="/trainer" href="/trainer">Тренеры</MenuItem>
          <MenuItem eventKey="/group" href="/group">Группы</MenuItem>
          <MenuItem eventKey="/traintype" href="/traintype">Направления</MenuItem>
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
      <Nav pullRight>
        <NavDropdown title={window.auth.user} id="nav-dropdown">
          <MenuItem href={"/api/v0/api-auth/logout/?next=" + activeKey}>Выйти</MenuItem>
        </NavDropdown>
      </Nav>
    </Navbar>
  );
};
