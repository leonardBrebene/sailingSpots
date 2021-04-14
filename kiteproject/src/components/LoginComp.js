
import React, {  useState } from 'react'
import { useHistory,Link } from 'react-router-dom'
import { Form, Button, Card, Container } from 'react-bootstrap'
import useFetch from './useFetch'

export default function LoginComp() {
    const [authDates, setAuthDates] = useState({ name: '', email: '', password: '' })
    const history = useHistory()
    const { data, isPending } = useFetch("https://606cae1c603ded0017502834.mockapi.io/user/11");


    const handleChange = (e) => {
        setAuthDates({
            ...authDates,
            [e.target.name]: e.target.value
        })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        if(data&&isPending===false){
            console.log('data din login',data)
            history.push('/'); 
        } 
    }
    return (
        <>
            <Container className='d-flex align-item-center justify-content-center'
                style={{ minHeight: '100vh', position: 'relative', top: '100px' }}>
                <div className='w-100' style={{ maxWidth: '400px' }} >
                    <Card>
                        <Card.Body>
                            <h2 className='text-right mb-4' style={{fontFamily:'Jazz LET'}}>KiteSurf</h2>
                            <h2 className='text-center mb-4'>Sign Up</h2>
                            
                            <Form onSubmit={handleSubmit} >
                            
                                <Form.Group id='email'>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type='email' name='email' onChange={handleChange} required />
                                </Form.Group>
                                <Form.Group id='email'>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type='password' name='password' onChange={handleChange} required />
                                </Form.Group>
                                <Button disabled={isPending} className='w-100' type='submit'>Sign Up </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    <div className='w-100 text-center mt-2'>
                        <Link to={'sign-up'}>Don`t have an account? Sign in!</Link> </div>
                </div>
            </Container>
        </>
    )
}
