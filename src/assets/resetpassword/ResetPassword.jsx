import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from 'react-router';
import { resetPasswordSchema } from '../../validations/authSchemas.js';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import Alert from '@mui/material/Alert';

export default function ResetPassword() {

  const navigate = useNavigate();
  const [serverError, setServerError] = useState(null);

  const { register, handleSubmit ,formState: { errors,isSubmitting } } = useForm({
    resolver: yupResolver(resetPasswordSchema),mode: "onBlur"
  })

  const onSubmit = async (data) => {
    setServerError(null);
    try {
      const { email, code, newPassword } = data;
      await axios.patch('https://knowledgeshop.runasp.net/api/auth/Account/ResetPassword', {
        Email: email,
        Code: code,
        NewPassword: newPassword
      });
      navigate('/login');
    }catch(e){
      console.log(e.response);
      setServerError(e.response?.data?.message || 'Unable to reset password. Please try again.');
    }
  }

return (
    <Container maxWidth="sm">
      <Box sx={{bgcolor: "white",boxShadow: 3,p:4, borderRadius : 2}}>
        <Typography component={'h1'} variant='h4' sx={{textAlign:'center',mb:3}}>
          Reset Password
        </Typography>

        {serverError?<Alert severity="error">{serverError}</Alert>:null}
         
        <Box component={'form'} onSubmit={handleSubmit((onSubmit))}>
          <TextField label="Email" fullWidth margin='normal' {...register('email')}
            error={errors.email}
            helperText={errors.email?.message}
          >
          </TextField>
          <TextField label="Code" fullWidth margin='normal' {...register('code')}
            error={!!errors.code}
            helperText={errors.code?.message}
          >
          </TextField>
          <TextField label="Password" fullWidth margin='normal' {...register('newPassword')}
            error={!!errors.newPassword}
            helperText={errors.newPassword?.message}
            type="password"> 
          </TextField>
          <TextField label="Confirm Password" fullWidth margin='normal' {...register('confirmPassword')}
            error={errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            type="password"> 
          </TextField>
          <Button type="submit" variant="contained" fullWidth sx={{mt:3}}
          disabled={isSubmitting}
          >
            {isSubmitting?"...Loading":"Reset Password"}
          </Button>
          <Typography variant='body2' sx={{textAlign: 'center',mt:2}}>
          <Link to='/login'>Back to Login</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  )
}
