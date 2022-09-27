import { Navbar, Container, Button } from 'react-bootstrap'
import React from 'react'
import Link from 'next/link'

export const Header = () => {
  return (
    <Navbar>
        <Container>
            <Navbar.Brand>Project Management</Navbar.Brand>
            <Navbar.Collapse className='justify-content-end'>
                <Navbar.Text className='p-3'>
                    Signed in as: 
                </Navbar.Text>
                <Link href="" passHref>
                    <Button>Log Out</Button>
                </Link>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}
