import React from 'react'
import {useState , useEffect } from 'react'
import axios from 'axios'
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

export default function Categories() {

    const [categories, setCategories] = React.useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getCategories = async () => {
        try {
            const response = await axios.get('https://knowledgeshop.runasp.net/api/Categories'
            ,{headers: {
                "Accept-Language": "en",
            }});  
            console.log(response.data.response.data);
            setCategories(response.data.response.data);
        } catch (error) {
            setError("Failed to fetch categories");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    return (
        <Box sx={{my:4}}>
            <Typography variant="h3">Categories</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                {categories.map((category) => (
                <Chip label= {category.name} clickable />
                ))}
            </Box>
        </Box>
    )
}
