import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from 'react-router';
import { otpSchema } from '../../validations/authSchemas.js';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import Alert from '@mui/material/Alert';

export default function Otp() {

  const navigate = useNavigate();
  const [serverError, setServerError] = useState(null);
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit ,formState: { errors,isSubmitting } } = useForm({
    resolver: yupResolver(otpSchema),mode: "onBlur"
  })

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.post('https://knowledgeshop.runasp.net/api/auth/Account/otp', data);
      setSuccess(true);
      navigate('/resetpassword');
    }catch(e){
      console.log(e.response);
      setServerError(e.response.data.message);
    }
  }

return (
    <Container maxWidth="sm">
      <Box sx={{bgcolor: "white",boxShadow: 3,p:4, borderRadius : 2}}>
        <Typography component={'h1'} variant='h4' sx={{textAlign:'center',mb:3}}>
          Otp
        </Typography>

        {serverError?<Alert severity="error">{serverError}</Alert>:null}
         
        <Box component={'form'} onSubmit={handleSubmit((onSubmit))}>
          <TextField label="Otp" fullWidth margin='normal' {...register('otp')}
            error={errors.otp}
            helperText={errors.otp?.message}>
          </TextField>
          <Button type="submit" variant="contained" fullWidth sx={{mt:3}}
          disabled={isSubmitting}
          >
            {isSubmitting?"...Loading":"Verify & Proceed"}
          </Button>
          <Typography variant='body2' sx={{textAlign: 'center',mt:2}}>
          <Link to='/Login'>Back to Login</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  )
}
