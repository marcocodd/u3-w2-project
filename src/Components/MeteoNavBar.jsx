import  Navbar  from "react-bootstrap/Navbar";
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import  Form  from "react-bootstrap/Form";
import  {Link}  from "react-router-dom";
import Image from 'react-bootstrap/Image'
import logo from '../assets/logoMeteo.jpg'
import { useState } from "react";




const MeteoNavBar = ({word}) =>{


const [searchInput, setSearchInput] = useState('')

const handleSearchInput = (e) =>{
setSearchInput(e.target.value)
}

const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim() !== "") {
        word(searchInput);
    }
};

    return (
        <Navbar expand="lg" bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="#home"><Image width={50} src={logo}/></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
              <Nav className="me-5">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/link1">Previsioni</Nav.Link>
                        <Nav.Link as={Link} to="/link2">Regioni italiane</Nav.Link>
                        <Nav.Link as={Link} to="/link3">Capitali Europee</Nav.Link>
             
              </Nav>
              <Form onSubmit={handleSearchSubmit} className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={handleSearchInput}
              value={searchInput}
            />
            <Link to={`/search/${searchInput}`} className="btn btn-outline-success">Search</Link>
          </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
}

export default MeteoNavBar