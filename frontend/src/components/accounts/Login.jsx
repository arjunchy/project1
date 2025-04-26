import React, { useState } from 'react';
import { Box, TextField, Button, Typography, styled, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import { API } from '../../service/api';

const Wrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    maxWidth: '900px',
    height: '550px',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '15px',
    overflow: 'hidden',
    position: 'relative',
    padding: '20px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        width: '90%',
        height: 'auto',
    },
}));

const LeftSection = styled(Box)({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    color: 'white',
    textAlign: 'center',
});

const RightSection = styled(Box)({
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: '50%',
    overflow: 'hidden',
});

const FormContainer = styled(motion.div)({
    display: 'flex',
    width: '200%',
    height: '100%',
});

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    padding: 30px;
    width: 100%;
    min-width: 80%;
    background: rgba(132, 103, 103, 0.2);
    backdrop-filter: blur(10px);
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.3);
    margin: 0 5px;
`;

const InputField = styled(TextField)({
    marginBottom: '15px',
    width: '100%',
    '& label, & input': {
        color: 'white !important',
    },
    '& fieldset': {
        borderColor: 'white !important',
    },
});

const ButtonStyled = styled(Button)({
    width: '100%',
    backgroundColor: 'white !important',
    color: 'black !important',
    marginTop: '10px',
    textTransform: 'none',
});

const ToggleButton = styled(Button)({
    width: '100%',
    color: 'white !important',
    marginTop: '10px',
    textTransform: 'none',
});

const setSignupInitial = {
    name: '',
    username: '',
    password: ''
};

const setLoginInitial = {
    username: '',
    password: ''
};

function Login() {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const [account, setAccount] = useState('login');
    const [signup, setSignup] = useState(setSignupInitial);
    const [login, setLogin] = useState(setLoginInitial);
    const [error, setError] = useState('');

    const img = `https://cdn-icons-png.flaticon.com/512/187/187902.png`;

    const toggleAccount = () => {
        setAccount(account === 'login' ? 'signup' : 'login');
        setError('');
    };

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    };

    const onLoginValue = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    };

    const handleLogin = async () => {
        console.log('Login Data:', login);
        const response = await API.userLogin(login);
        if (response.isSuccess) {
            setLogin(setLoginInitial);
            setError('');
            // Redirect or set session
        } else {
            setError('Invalid username or password');
        }
    };

    const handleSignup = async () => {
        console.log('Signup Data:', signup);
        const response = await API.userSignup(signup);
        if (response.isSuccess) {
            setSignup(setSignupInitial);
            setError('');
            toggleAccount();
        } else {
            setError('Something went wrong, please try again later.');
        }
    };

    return (
        <>
            <video
                autoPlay
                loop
                muted
                playsInline
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    objectFit: 'cover',
                    zIndex: '-1',
                }}
            >
                <source src="https://cdn.pixabay.com/video/2021/10/10/91562-629172467_large.mp4" type="video/mp4" />
            </video>

            {isMobile ? (
                <Container style={{ width: '90%', padding: '20px', margin: 'auto', borderRadius: '15px' }}>
                    <img src={img} alt="logo" style={{ width: '80px', borderRadius: '50%', marginBottom: '10px' }} />
                    {account === 'login' ? (
                        <>
                            <InputField label="Username" name="username" variant="outlined" onChange={onLoginValue} />
                            <InputField label="Password" name="password" type="password" variant="outlined" onChange={onLoginValue} />
                            {error && <Typography style={{ color: 'red', marginBottom: '10px' }}>{error}</Typography>}
                            <ButtonStyled onClick={handleLogin}>Login</ButtonStyled>
                            <Typography variant="body2" style={{ color: 'white', marginTop: '25px' }}>OR</Typography>
                            <ToggleButton onClick={toggleAccount}>Create an account</ToggleButton>
                        </>
                    ) : (
                        <>
                            <InputField label="Name" name="name" variant="outlined" onChange={onInputChange} />
                            <InputField label="Username" name="username" variant="outlined" onChange={onInputChange} />
                            <InputField label="Password" name="password" type="password" variant="outlined" onChange={onInputChange} />
                            {error && <Typography style={{ color: 'red', marginBottom: '10px' }}>{error}</Typography>}
                            <ButtonStyled onClick={handleSignup}>Sign up</ButtonStyled>
                            <Typography variant="body2" style={{ color: 'white', marginTop: '25px' }}>OR</Typography>
                            <ToggleButton onClick={toggleAccount}>Already have an account?</ToggleButton>
                        </>
                    )}
                </Container>
            ) : (
                <Wrapper>
                    <LeftSection>
                        <img src="https://cdn-icons-png.flaticon.com/512/847/847969.png" alt="Illustration" style={{ width: '200px' }} />
                        <Typography variant="h6">Boost Your Skills with Us</Typography>
                        <Typography variant="body2">Join us and explore new possibilities.</Typography>
                    </LeftSection>

                    <RightSection>
                        <FormContainer animate={{ x: account === 'login' ? '-1%' : '-102%' }}>
                            {/* Login Form */}
                            <Container>
                                <img src={img} alt="logo" style={{ width: '80px', borderRadius: '50%', marginBottom: '10px' }} />
                                <InputField label="Username" name="username" variant="outlined" onChange={(e) => onLoginValue(e)} />
                                <InputField label="Password" name="password" type="password" variant="outlined" onChange={(e) => onLoginValue(e)} />
                                {account === 'login' && error && <Typography style={{ color: 'red', marginBottom: '10px' }}>{error}</Typography>}
                                <ButtonStyled onClick={handleLogin}>Login</ButtonStyled>
                                <Typography variant="body2" style={{ color: 'white', marginTop: '25px' }}>OR</Typography>
                                <ToggleButton onClick={toggleAccount}>Create an account</ToggleButton>
                            </Container>

                            {/* Signup Form */}
                            <Container>
                                <img src={img} alt="logo" style={{ width: '80px', borderRadius: '50%', marginBottom: '10px' }} />
                                <InputField label="Name" name="name" variant="outlined" onChange={(e) => onInputChange(e)} />
                                <InputField label="Username" name="username" variant="outlined" onChange={(e) => onInputChange(e)} />
                                <InputField label="Password" name="password" type="password" variant="outlined" onChange={(e) => onInputChange(e)} />
                                {account === 'signup' && error && <Typography style={{ color: 'red', marginBottom: '10px' }}>{error}</Typography>}
                                <ButtonStyled onClick={handleSignup}>Sign up</ButtonStyled>
                                <Typography variant="body2" style={{ color: 'white', marginTop: '25px' }}>OR</Typography>
                                <ToggleButton onClick={toggleAccount}>Already have an account?</ToggleButton>
                            </Container>
                        </FormContainer>
                    </RightSection>
                </Wrapper>
            )}
        </>
    );
}

export default Login;
