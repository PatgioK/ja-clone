import { Navbar, Container, Button } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

export const Header = () => {
    const [name, setName] = useState<string>('')
    const { data: session } = useSession();

    useEffect(() => {
        if(session) {
            console.log(session)
            setName(session.user!.name!)
        }
    }, [session])
    return (
        <Navbar>
            <Container>
                <Navbar.Brand>Project Management</Navbar.Brand>
                <Navbar.Collapse className='justify-content-end'>
                    <Navbar.Text className='p-3'>
                        Signed in as: {name}
                    </Navbar.Text>
                    <Link href="" passHref>
                        <Button onClick={() => signOut}>Log Out</Button>
                    </Link>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
