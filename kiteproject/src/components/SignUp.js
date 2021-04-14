import React, { useRef, useState } from 'react'
import { useHistory,Link } from 'react-router-dom'
import { Form, Button, Card, Alert, Container } from 'react-bootstrap'
import PostObject from './PostObject'




export default function SignUp() {

    const passwordConfirmRef = useRef()
    const [authDates, setAuthDates] = useState({ name: '', email: '', password: '' })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [succes, setSucces] = useState('')
    const history = useHistory()



    async function handleSubmit(e) {
        e.preventDefault()
        setError('')
        if (authDates.password !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')

        }
        else {
            setError(''); setSucces('')
            const response = await PostObject('user', authDates)
            setLoading(true)
            console.log(response)
            if (response.name === authDates.name || response === 'Max number of elements reached for this resource!') {   //aici am rams fara acces la mockapi
                setSucces('Your account was created');                        //ar fi trebuit sa fac niste verificari aici in response
                history.push('/login'); 
                setLoading(false);
            }
            else {
                setLoading(false);
                return setError('Something didn`t work')
            }
        }
    }


    const handleChange = (e) => {
        setAuthDates({
            ...authDates,
            [e.target.name]: e.target.value
        })
    }

    return (
        <>
            <Container className='d-flex align-item-center justify-content-center'
                style={{ minHeight: '100vh', position: 'relative', top: '100px' }}>
                <div className='w-100' style={{ maxWidth: '400px' }} >
                    <Card>
                        <Card.Body>
                            <h2 className='text-right mb-4'>Kite</h2>
                            <h2 className='text-center mb-4'>Sign Up</h2>
                            {succes && <Alert variant='success'>{succes}</Alert>}
                            {error && <Alert variant='danger'>{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group id='Name'>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type='text' name='name' onChange={handleChange} required />
                                </Form.Group>
                                <Form.Group id='email'>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type='email' name='email' onChange={handleChange} required />
                                </Form.Group>
                                <Form.Group id='email'>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type='password' name='password' onChange={handleChange} required />
                                </Form.Group>
                                <Form.Group id='email'>
                                    <Form.Label>Password Confirmation</Form.Label>
                                    <Form.Control type='password' ref={passwordConfirmRef} required />
                                </Form.Group>
                                <Button disabled={loading} className='w-100' type='submit'>Sign Up </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    <div className='w-100 text-center mt-2'>
                        <Link to={'login'}>Already have an account? LogIn</Link> </div>
                </div>
            </Container>
        </>
    )
}
