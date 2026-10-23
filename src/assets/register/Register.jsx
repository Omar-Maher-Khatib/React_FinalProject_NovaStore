import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from 'react-router';
import { registerSchema } from '../../validations/authSchemas.js';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import Alert from '@mui/material/Alert';

export default function Register() {

  const navigate = useNavigate();
  const [serverError, setServerError] = useState(null);
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit ,formState: { errors,isSubmitting } } = useForm({
    resolver: yupResolver(registerSchema),mode: "onBlur"
  })

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.post('https://knowledgeshop.runasp.net/api/auth/Account/Register', data);
      setSuccess(true);
      navigate('/login');
    }catch(e){
      console.log(e.response);
      setServerError(e.response.data.message);
    }
  }

return (
    <Container maxWidth="sm">
      <Box sx={{bgcolor: "white",boxShadow: 3,p:4, borderRadius : 2}}>
        <Typography component={'h1'} variant='h4' sx={{textAlign:'center',mb:3}}>
          Create Account
        </Typography>

        {serverError?<Alert severity="error">{serverError}</Alert>:null}
         
        <Box component={'form'} onSubmit={handleSubmit((onSubmit))}>
          <TextField label="Full Name" fullWidth margin='normal' {...register('fullName')}
            error={errors.fullName}
            helperText={errors.fullName?.message}>
          </TextField>
          <TextField label="User Name" fullWidth margin='normal' {...register('userName')}
            error={errors.userName}
            helperText={errors.userName?.message}></TextField>
          <TextField label="Email" fullWidth margin='normal' {...register('email')}
            error={errors.email}
            helperText={errors.email?.message}></TextField>
          <TextField label="Phone Number" fullWidth margin='normal' {...register('phoneNumber')}
            error={errors.phoneNumber}
            helperText={errors.phoneNumber?.message}></TextField>
          <TextField label="Password" fullWidth margin='normal' {...register('password')}
            error={errors.password}
            helperText={errors.password?.message}>
          </TextField>
          <Button type="submit" variant="contained" fullWidth sx={{mt:3}}
          disabled={isSubmitting}
          >
            {isSubmitting?"...Loading":"Register"}
          </Button>
          <Typography variant='body2' sx={{textAlign: 'center',mt:2}}>Already have an account?
          <Link to='/login'>Login</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  )
}
