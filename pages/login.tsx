import React, { useEffect } from 'react'
import { Card, Button, Form } from 'react-bootstrap'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/dist/client/router';

const Login = () => {
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        if(session) {
            router.push('/board')
        }
    }, [session])

    return (
        <div>
                    <Form>
                        <Button variant='primary' type='submit' onClick={() => signIn()}>Login</Button>
                    </Form>

        </div>
    )
}
export default Login;