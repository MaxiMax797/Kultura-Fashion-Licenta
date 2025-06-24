import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import ChatIcon from '@mui/icons-material/Chat';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { motion } from 'framer-motion';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import { 
  Box, 
  Paper, 
  Typography, 
  IconButton, 
  Stack,
  Button,
  Avatar,
  Collapse,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  toggleChatbot,
  addUserMessage,
  addBotMessage,
  selectChatbotIsOpen,
  selectChatbotMessages,
  selectChatbotOptions
} from '../ChatbotSlice';


export const ChatBot = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector(selectChatbotIsOpen);
    const messages = useSelector(selectChatbotMessages);
    const chatOptions = useSelector(selectChatbotOptions);
  
    const theme = useTheme();
    const is480 = useMediaQuery(theme.breakpoints.down(480));

    const HEADER_HEIGHT = 80;

    const defaultWidth = is480 ? '85vw' : '350px';
    const defaultHeight = '400px';

    const [dimensions, setDimensions] = useState({
      width: defaultWidth,
      height: defaultHeight
    });

    const [isResizing, setIsResizing] = useState(false);
    const resizeRef = useRef(null);
    const isResizingRef = useRef(false);
    const startPosRef = useRef({ x: 0, y: 0 });
    const startDimensionsRef = useRef({ width: 0, height: 0 });

    const handleToggleChat = () => {
        dispatch(toggleChatbot());
    };

    const handleOptionClick = (option) => {
        dispatch(addUserMessage(option.text));
        setTimeout(() => {
        dispatch(addBotMessage(option.response));
        }, 500);
    };


    const getHeaderHeight = () => {
        const header = document.querySelector('header') || 
                    document.querySelector('[data-testid="header"]') || 
                    document.querySelector('.header') ||
                    document.querySelector('nav'); // ajustare selector
        
        if (header) {
            return header.getBoundingClientRect().height;
        }
        return HEADER_HEIGHT;
    };

    const startResize = (e) => {
      e.preventDefault();
      setIsResizingState(true);

      startPosRef.current = {
        x: e.clientX,
        y: e.clientY
      };

      const currentWidth = resizeRef.current?.offsetWidth || parseInt(defaultWidth);
      const currentHeight = resizeRef.current?.offsetHeight || parseInt(defaultHeight);
      
      startDimensionsRef.current = {
        width: currentWidth,
        height: currentHeight
      };

      document.addEventListener('mousemove', handleResize);
      document.addEventListener('mouseup', stopResize);
    };

    const setIsResizingState = (value) => {
    setIsResizing(value);
    isResizingRef.current = value;
    };

    const handleTopResize = useCallback((e) => {
        // console.log('handleTopResize apelat, isResizing:', isResizingRef.current);

        const headerHeight = getHeaderHeight();
        

        if (!isResizingRef.current) return;
        
        const deltaY = e.clientY - startPosRef.current.y;

        const viewportHeight = window.innerHeight;
        const chatbotBottom = viewportHeight - parseInt('7rem'.replace('rem', '') * 16); // conversie 7 rem in pixeli (1rem = 16 pixeli)
        const maxPossibleHeight = chatbotBottom - headerHeight - 20;

        const calculatedHeight = startDimensionsRef.current.height - deltaY;


        // Marginea de sus: cand creste inaltimea -> deltaY negativ
        const newHeight = Math.max(
            parseInt(defaultHeight), 
            Math.min(maxPossibleHeight, calculatedHeight)
            //startDimensionsRef.current.height - deltaY
        );

        // console.log('Calcul redimensionare varf:', {
        // deltaY: deltaY,
        // startHeight: startDimensionsRef.current.height,
        // calculatedNewHeight: startDimensionsRef.current.height - deltaY,
        // finalNewHeight: newHeight
        // });
        
        setDimensions({
            width: dimensions.width,
            height: `${newHeight}px`
        });
    }, [dimensions.width, defaultHeight]);

    const handleLeftResize = useCallback((e) => {
        //console.log('handleLeftResize apelat, isResizing:', isResizingRef.current);

        if (!isResizingRef.current) return;
        
        const deltaX = e.clientX - startPosRef.current.x;

        const viewportWidth = window.innerWidth;
        const maxPossibleWidth = (viewportWidth * 3) / 4; // 3/4 din latimea ecranului

        const calculatedWidth = startDimensionsRef.current.width - deltaX;


        // Cresterea latimii pentru partea stanga -> atunci cand deltaX este negativ
        const newWidth = Math.max(
            parseInt(defaultWidth), 
            // startDimensionsRef.current.width - deltaX
            Math.min(maxPossibleWidth, calculatedWidth)
        );

        // console.log('Calcul redimensionare partea stanga: ', {
        // deltaX: deltaX,
        // startWidth: startDimensionsRef.current.width,
        // calculatedNewWidth: startDimensionsRef.current.width - deltaX,
        // finalNewWidth: newWidth
        // });
    
        setDimensions({
            width: `${newWidth}px`,
            height: dimensions.height
        });
    }, [dimensions.height, defaultWidth]);


    const handleResize = useCallback((e) => {
        if (!isResizingRef.current) return;
        
        const deltaX = e.clientX - startPosRef.current.x;
        const deltaY = e.clientY - startPosRef.current.y;

        const viewportWidth = window.innerWidth;
        const maxPossibleWidth = (viewportWidth * 3) / 4; // 3/4 din latimea ecranului
        
        const calculatedWidth = startDimensionsRef.current.width + deltaX;

        const newWidth = Math.max(
            parseInt(defaultWidth), 
            // startDimensionsRef.current.width + deltaX
            Math.min(maxPossibleWidth, calculatedWidth)
        );
        const newHeight = Math.max(
            parseInt(defaultHeight), 
            startDimensionsRef.current.height - deltaY
        );
        
        setDimensions({
            width: `${newWidth}px`,
            height: `${newHeight}px`
        });
    }, [defaultWidth, defaultHeight]); // Dependente

    const stopResize = useCallback(() => {
      setIsResizingState(false);
      document.removeEventListener('mousemove', handleResize);
      document.removeEventListener('mousemove', handleTopResize);
      document.removeEventListener('mousemove', handleLeftResize);
      document.removeEventListener('mouseup', stopResize);
    }, [handleResize, handleTopResize, handleLeftResize]);

    useEffect(() => {
      return () => {
        document.removeEventListener('mousemove', handleResize);
        document.removeEventListener('mousemove', handleTopResize);
        document.removeEventListener('mousemove', handleLeftResize);
        document.removeEventListener('mouseup', stopResize);
      };
    }, []);



return (
    <>
        {/* buton de chat */}
        <Box
        component={motion.div}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        sx={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            zIndex: 1000,
        }}
        >
        <IconButton
            size="large"
            onClick={handleToggleChat}
            sx={{
            backgroundColor: theme.palette.primary.main,
            color: 'white',
            '&:hover': {
                backgroundColor: theme.palette.primary.dark,
            },
            width: 60,
            height: 60,
            boxShadow: 3,
            }}
        >
            {isOpen ? <CloseIcon /> : <ChatIcon />}
        </IconButton>
        </Box>

        {/* fereastra Chat */}
        <Collapse
        in={isOpen}
        timeout={300}
        sx={{
            position: 'fixed',
            bottom: '7rem',
            right: '2rem',
            zIndex: 1000,
            width: dimensions.width, //latime dinamic / ajustabila
            maxWidth: is480 ? '95vw' : 'none',
            transition: isResizing ? 'none' : 'all 300ms ease',
        }}
        >
        <Paper
            ref={resizeRef}
            elevation={4}
            sx={{
            height: dimensions.height, //inaltime ajustabila
            borderRadius: 2,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            }}
        >
            {/* Antet chat */}
            <Box
            sx={{
                bgcolor: theme.palette.primary.main,
                p: 2,
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
            >
            <Stack direction="row" spacing={1} alignItems="center">
                <SmartToyIcon />
                <Typography variant="h6">Max Bot</Typography>
            </Stack>
            <IconButton size="small" onClick={handleToggleChat} sx={{ color: 'white' }}>
                <CloseIcon />
            </IconButton>
            </Box>

            {/* iconita redimensionare pe diagonala jos dreapta */}
            <Box
            onMouseDown={startResize}
            sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: 20,
                height: 20,
                cursor: 'nwse-resize',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.05)',
                }
            }}
            >
            <OpenInFullIcon 
                sx={{ 
                fontSize: '14px', 
                transform: 'rotate(90deg)',
                opacity: 0.5,
                }} 
            />
            </Box>

            {/* redimensionare margine sus */}
            <Box
                onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsResizingState(true);
                startPosRef.current = { x: e.clientX, y: e.clientY };

                const currentHeight = resizeRef.current?.offsetHeight || parseInt(defaultHeight);
                const currentWidth = resizeRef.current?.offsetWidth || parseInt(defaultWidth);

                startDimensionsRef.current = { 
                width: currentWidth,
                height: currentHeight 
                };
                document.addEventListener('mousemove', handleTopResize);
                document.addEventListener('mouseup', stopResize);
            }}
            sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '15px',
                cursor: 'ns-resize',
                zIndex: 20,
                '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.05)',
                }
            }}
            />

            {/* redimensionare margine stanga */}
            <Box
                onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsResizingState(true);
                startPosRef.current = { x: e.clientX, y: e.clientY };

                const currentHeight = resizeRef.current?.offsetHeight || parseInt(defaultHeight);
                const currentWidth = resizeRef.current?.offsetWidth || parseInt(defaultWidth);

                startDimensionsRef.current = { 
                    width: currentWidth,
                    height: currentHeight 
                };
                document.addEventListener('mousemove', handleLeftResize);
                document.addEventListener('mouseup', stopResize);
            }}
            sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                width: '15px',
                cursor: 'ew-resize',
                zIndex: 20,
                '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.05)',
                }
            }}
            />

            {/* mesaje chat */}
            <Box
            sx={{
                flexGrow: 1,
                p: 2,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                backgroundColor: '#f5f5f5',
            }}
            >
            {messages.map((message) => (
                <Box
                key={message.id}
                sx={{
                    alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '80%',
                }}
                >
                <Stack direction="row" spacing={1} alignItems="flex-start">
                    {message.sender === 'bot' && (
                    <Avatar
                        sx={{
                        bgcolor: theme.palette.primary.main,
                        width: 32,
                        height: 32,
                        }}
                    >
                        <SmartToyIcon fontSize="small" />
                    </Avatar>
                    )}
                    <Paper
                    sx={{
                        p: 1.5,
                        bgcolor: message.sender === 'user' ? theme.palette.primary.main : 'white',
                        color: message.sender === 'user' ? 'white' : 'inherit',
                        borderRadius: 2,
                    }}
                    >
                    <Typography variant="body1">{message.text}</Typography>
                    </Paper>
                    {message.sender === 'user' && (
                    <Avatar
                        sx={{
                        bgcolor: theme.palette.secondary.main,
                        width: 32,
                        height: 32,
                        }}
                    >
                        {/* Initiala user */}
                        U
                    </Avatar>
                    )}
                </Stack>
                </Box>
            ))}
            </Box>

            {/* Optiuni chat */}
            <Box sx={{ p: 2, borderTop: '1px solid rgba(0,0,0,0.1)' }}>
            <Stack spacing={1}>
                <Typography variant="body2" color="text.secondary">
                Alegeti o optiune:
                </Typography>
                <Stack spacing={1}>
                {chatOptions.map((option) => (
                    <Button
                    key={option.id}
                    variant="outlined"
                    size="small"
                    onClick={() => handleOptionClick(option)}
                    sx={{ justifyContent: 'flex-start', textTransform: 'none' }}
                    >
                    {option.text}
                    </Button>
                ))}
                </Stack>
            </Stack>
            </Box>
        </Paper>
        </Collapse>
    </>
    );
};