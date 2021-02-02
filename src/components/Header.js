import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {Link} from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap';
import {Navbar, Nav, Image, NavDropdown} from 'react-bootstrap';
import {logout} from '../actions/userActions';
const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const {userInfo} = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <Navbar bg='light' expand='lg'>
      <Navbar.Brand className='ml-lg-5 text-uppercase'>
        <Link to='/'>
          <Image src='/logo.png' alt='logo' width='80' />
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav' className='justify-content-end'>
        <Nav className='mr-lg-5'>
          <LinkContainer to='/'>
            <Nav.Link className='active nav-link'>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to='/news'>
            <Nav.Link>News</Nav.Link>
          </LinkContainer>
          <LinkContainer to='/sport'>
            <Nav.Link>Sports</Nav.Link>
          </LinkContainer>

          <LinkContainer to='/health'>
            <Nav.Link>Health</Nav.Link>
          </LinkContainer>
          <LinkContainer to='/story'>
            <Nav.Link>Story</Nav.Link>
          </LinkContainer>

          {userInfo ? (
            <NavDropdown title={userInfo.name} id='username'>
              <LinkContainer to='/profile'>
                <NavDropdown.Item>Profile</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Item onClick={logoutHandler}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <LinkContainer to='/login'>
              <Nav.Link className='btn btn-outline-primary ml-3'>
                Signup
              </Nav.Link>
            </LinkContainer>
          )}
          {userInfo && userInfo.isAdmin && (
            <NavDropdown title='Admin' id='adminmenu'>
              <LinkContainer to='/admin/userlist'>
                <NavDropdown.Item>Users</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/admin/postlist'>
                <NavDropdown.Item>Posts</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
