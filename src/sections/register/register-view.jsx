import { useState } from 'react';
// import firebase from 'firebase/app';
// import 'firebase/auth';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
// import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

import { auth } from '../../services/firebaseConfig';

export default function RegisterView() {
  const theme = useTheme();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(auth);

  const handleEmailChange = (event) => {
    const { value } = event.target;
    const isValidEmail = /\S+@\S+\.\S+/.test(value);
    setEmail(value);
    setEmailError(!isValidEmail);
  };

  const isStrongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(password);

  const handlePasswordChange = (event) => {
    const { value } = event.target;
    setPassword(value);
    setPasswordError(!isStrongPassword || (confirmPassword !== value));
  };

  const handleConfirmPasswordChange = (event) => {
    const { value } = event.target;
    setConfirmPassword(value);
    setPasswordError(!isStrongPassword || (password !== value));
  };

  const handleRegister = async (e) => {
    try {
      e.preventDefault();

      if (!isStrongPassword || password !== confirmPassword) {
        setPasswordError(true);
        return;
      }

      if(await createUserWithEmailAndPassword(email, password)) {
        console.log(user);
        console.log('Registro bem-sucedido');
        router.push('/'); 
      }

    } catch (errorRegister) {
      console.error('Erro no registro:', error.message);
    }
  };

  const renderForm = (
    <>
      <Stack spacing={3} marginBottom={5}>

        <TextField
          name="email"
          label="Email address"
          error={emailError}
          helperText={emailError ? 'Invalid email format' : ''}
          value={email}
          onChange={handleEmailChange}
        />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          error={passwordError}
          helperText={passwordError ? 'Password is weak or does not match' : ''}
          value={password}
          onChange={handlePasswordChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          name="confirmPassword"
          label="Confirm Password"
          type={showPassword ? 'text' : 'password'}
          error={passwordError}
          helperText={passwordError ? 'Password is weak or does not match' : ''}
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleRegister}
        loading={loading}
      >
        Register
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Create an account on GEcommerce</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Already have an account?
            <Link variant="subtitle2" sx={{ ml: 0.5 }} style={{ cursor: 'pointer' }} onClick={() => router.push('/')}>
              Login
            </Link>
          </Typography>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
