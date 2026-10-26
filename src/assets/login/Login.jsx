import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from 'react-router';
import { loginSchema } from '../../validations/authSchemas.js';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import Alert from '@mui/material/Alert';

export default function Login() {

  const navigate = useNavigate();
  const [serverError, setServerError] = useState(null);
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit ,formState: { errors,isSubmitting } } = useForm({
    resolver: yupResolver(loginSchema),mode: "onBlur"
  })

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.post('https://knowledgeshop.runasp.net/api/auth/Account/Login', data);
      setSuccess(true);
      navigate('/home');
    }catch(e){
      console.log(e.response);
      setServerError(e.response.data.message);
    }
  }

return (
    <Container maxWidth="sm">
      <Box sx={{bgcolor: "white",boxShadow: 3,p:4, borderRadius : 2}}>
        <Typography component={'h1'} variant='h4' sx={{textAlign:'center',mb:3}}>
          Login
        </Typography>

        {serverError?<Alert severity="error">{serverError}</Alert>:null}
         
        <Box component={'form'} onSubmit={handleSubmit((onSubmit))}>
          <TextField label="Email" fullWidth margin='normal' {...register('email')}
            error={errors.email}
            helperText={errors.email?.message}>
          </TextField>
          <TextField label="Password" fullWidth margin='normal' {...register('password')}
            error={errors.password}
            helperText={errors.password?.message}
            type="password"> 
          </TextField>
          <Button type="submit" variant="contained" fullWidth sx={{mt:3}}
          disabled={isSubmitting}
          >
            {isSubmitting?"...Loading":"Login"}
          </Button>
          <Typography variant='body2' sx={{textAlign: 'center',mt:2}}>Don't have an account?
          <Link to='/register'>Register</Link>
          </Typography>
          <Typography variant='body2' sx={{textAlign: 'center',mt:2}}>
            Forgot your password?
            <Link to='/sendcode'>Reset Password</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  )
}
