import { autoPlay } from 'react-swipeable-views-utils'
import MobileStepper from '@mui/material/MobileStepper'
import {Box, useTheme} from '@mui/material'
import {useState} from 'react'
import SwipeableViews from 'react-swipeable-views'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export const ProductBanner = ({images, imageStyle}) => {
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = images.length;

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    
    const defaultImageStyle = {
        height: '100%',
        maxWidth: '100%',
        objectFit: 'contain',
        display: 'block',
        margin: '0 auto'
    };

    const finalImageStyle = imageStyle || defaultImageStyle;

return (
    <>
        <AutoPlaySwipeableViews 
            style={{
                overflow: "hidden",
                height: '100%',
                display: 'flex',
                alignItems: 'center'
            }} 
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} 
            index={activeStep} 
            onChangeIndex={handleStepChange} 
            enableMouseEvents
        >
            {images.map((image, index) => (
                <div key={index} style={{
                    width: "100%",
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {Math.abs(activeStep - index) <= 2 ? (
                        <Box 
                            component="img" 
                            sx={finalImageStyle}
                            src={image} 
                            alt={'Banner Image'} 
                        />
                    ) : null}
                </div>
            ))}
        </AutoPlaySwipeableViews>
        <div style={{alignSelf:'center'}}>
            <MobileStepper steps={maxSteps} position="static" activeStep={activeStep}/>
        </div>
    </>
);
};