import { Box, IconButton, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import { Stack } from '@mui/material'
import React from 'react'
import { QRCodePng, appStorePng, googlePlayPng ,facebookPng,instagramPng, xPng,linkedinPng} from '../../assets'
import SendIcon from '@mui/icons-material/Send';
import { MotionConfig, motion } from 'framer-motion';
import { Link } from 'react-router-dom';



export const Footer = () => {

    const theme=useTheme()
    const is700=useMediaQuery(theme.breakpoints.down(700))

    const labelStyles={
        fontWeight:300,
        cursor:'pointer'
    }

  return (
    <Stack sx={{backgroundColor:theme.palette.primary.main,paddingTop:"3rem",paddingLeft:is700?"1rem":"3rem",paddingRight:is700?"1rem":"3rem",paddingBottom:"1.5rem",rowGap:"5rem",color:theme.palette.primary.light,justifyContent:"space-around"}}>

            {/* partea superioara */}
            <Stack flexDirection={'row'} rowGap={'1rem'} justifyContent={is700?"":'space-around'} flexWrap={'wrap'}>

                <Stack rowGap={'1rem'} padding={'1rem'}>
                    <Typography variant='h6' fontSize={'1.5rem'}>Exclusive</Typography>
                    <Typography variant='h6'>Subscribe</Typography>
                    <Typography sx={labelStyles}>Ai 10% reducere la prima achizitie online!</Typography>
                    <TextField placeholder='Enter your email' sx={{border:'1px solid white',borderRadius:"6px"}} InputProps={{endAdornment:<IconButton><SendIcon sx={{color:theme.palette.primary.light}}/></IconButton>,style:{color:"whitesmoke"}}}/>
                </Stack>

                <Stack rowGap={'1rem'} padding={'1rem'}>
                    <Typography variant='h6'>Sediu social</Typography>
                    <Typography sx={labelStyles}>Str. Jean Louis Calderon 55,  Sector 1,  020034 , Bucuresti.</Typography>
                    <Typography sx={labelStyles}>kulturafashion@gmail.com</Typography>
                    <Typography sx={labelStyles}>0722334455</Typography>
                </Stack>

                <Stack rowGap={'1rem'} padding={'1rem'}>
                    <Typography  variant='h6'>Cont</Typography>
                    <Typography sx={labelStyles}>Contul meu</Typography>
                    <Typography sx={labelStyles}>Conectare / Inregistrare</Typography>
                    <Typography sx={labelStyles}>Cosul de cumparaturi</Typography>
                    <Typography sx={labelStyles}>Wishlist</Typography>
                    <Typography sx={labelStyles}>Magazin</Typography>
                </Stack>

                <Stack rowGap={'1rem'} padding={'1rem'}>
                    <Typography  variant='h6'>Link-uri utile</Typography>
                    <Typography sx={labelStyles}>Politica de confidentialitate</Typography>
                    <Typography sx={labelStyles}>Termenii si conditiile</Typography>
                    <Typography sx={labelStyles}>FAQ</Typography>
                    <Typography sx={labelStyles}>Contact</Typography>
                </Stack>

                <Stack rowGap={'1rem'} padding={'1rem'}>
                    <Typography  variant='h6'>Salveaza timp!</Typography>
                    <Typography sx={{...labelStyles,color:"graytext",fontWeight:500}}>Instaleaza aplicatia pe telefon!</Typography>
                    <Stack flexDirection={'row'} columnGap={'.5rem'}>

                        <Box width={'100px'} height={"100px"}>
                            <img src={QRCodePng} height={'100%'} width={'100%'} style={{objectFit:'contain'}} alt="QR Code"/>
                        </Box>

                        <Stack justifyContent={'space-around'}>
                            <Stack>
                                <img style={{width:"100%",height:"100%",cursor:"pointer"}} src={googlePlayPng} alt="GooglePlay" />
                            </Stack>
                            <Stack>
                                <img style={{width:"100%",height:'100%',cursor:"pointer"}} src={appStorePng} alt="AppStore" />
                            </Stack>
                        </Stack>
                    </Stack>

                    <Stack mt={.6} flexDirection={'row'} columnGap={'2rem'}>
                        <MotionConfig whileHover={{scale:1.1}} whileTap={{scale:1}}>
                            <motion.img style={{cursor:"pointer"}} src={facebookPng} alt="Facebook" />
                            <motion.img style={{cursor:"pointer"}} src={xPng} alt="X" />
                            <motion.img style={{cursor:"pointer"}} src={instagramPng} alt="Instagram" />
                            <motion.img style={{cursor:"pointer"}} src={linkedinPng} alt="Linkedin" />
                        </MotionConfig>
                    </Stack>
                </Stack>

            </Stack>

            {/* partea inferioara */}
            <Stack alignSelf={"center"}>
                <Typography color={'GrayText'}>&copy; Kultura Fashion {new Date().getFullYear()}. Toate drepturile rezervate</Typography>
            </Stack>

    </Stack>
  )
}
