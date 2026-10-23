import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from 'react-router';
import { registerSchema } from '../../validations/authSchemas.js';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

export default function Register() {
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(registerSchema),mode: "onBlur"
})
return (
    <Container maxWidth="sm">
      <Box sx={{bgcolor: "white",boxShadow: 3,p:4, borderRadius : 2}}>
        <Typography component={'h1'} variant='h4' sx={{textAlign:'center',mb:3}}>
          Create Account
        </Typography>

        <Box component={'form' }>
          <TextField label="Full Name" fullWidth margin='normal' {...register('fullName')}></TextField>
          <TextField label="User Name" fullWidth margin='normal' {...register('userName')}></TextField>
          <TextField label="Email" fullWidth margin='normal' {...register('email')}></TextField>
          <TextField label="Phone Number" fullWidth margin='normal' {...register('phoneNumber')}></TextField>
          <TextField label="Password" fullWidth margin='normal' {...register('password')}> </TextField>
          <Button type="submit" variant="contained" fullWidth sx={{mt:3}}>Register</Button>
          <Typography variant='body2' sx={{textAlign: 'center',mt:2}}>Already have an account?
          <Link to='/login'>Login</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  )
}
