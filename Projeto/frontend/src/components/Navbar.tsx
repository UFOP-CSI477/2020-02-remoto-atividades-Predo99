import axios from 'axios';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

export default function CustomNavbar(){

    const baseUrl: string = "http://localhost:3000";

    const token = localStorage.getItem('x-access-token');
    const history = useHistory();

    async function logout() {
        // cookies.set('x-access-token', "");
        // cookies.set('userId', "");
        // cookies.set('userType', "");
        localStorage.removeItem('x-access-token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userType');
        await axios.post(baseUrl + "/logout", {});
        history.push('/');
    }

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid>  
                <Navbar.Brand href="/">Home</Navbar.Brand>
                <Nav className="justify-content-end">
                    {
                        token ?
                            <Nav.Link onClick={logout}>Logout</Nav.Link>
                        :
                            <Nav.Link href="/login">Login</Nav.Link>
                    }
                </Nav>              
            </Container>
        </Navbar>
    )
}