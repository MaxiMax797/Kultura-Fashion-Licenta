import React from 'react'
import { Link } from 'react-router-dom'
import Lottie from 'lottie-react'
import {Button, Paper, Stack, Typography} from '@mui/material'
import { notFoundPageAnimation} from '../assets'


export const NotFoundPage = () => {
    return (
    <Stack justifyContent={'center'} alignItems={'center'} height={'100vh'}>

        <Stack rowGap={1} justifyContent={'center'} alignItems={'center'}>
            
            <Stack width={'25rem'}>
                <Lottie animationData={notFoundPageAnimation}/>
            </Stack>
            
            <Stack justifyContent={'center'} alignItems={'center'}>
              <Typography variant='h4' fontWeight={500}>404 Not Found</Typography>
              <Typography variant='h6' fontWeight={'300'}>Ne pare rau! Aceasta pagina a fost mutata sa nu mai exista!</Typography>
            </Stack>

            <Button sx={{mt:3}} size='large' component={Link} to={'/'} variant='contained'>Intoarce-te la pagina principala</Button>
        </Stack>
    </Stack>
    )
}