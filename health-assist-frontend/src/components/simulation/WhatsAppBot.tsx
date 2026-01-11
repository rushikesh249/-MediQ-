import React, { useState, useRef, useEffect } from 'react';
import {
    Box, Paper, Typography, TextField, IconButton, Avatar, Fade
} from '@mui/material';
import { Send as SendIcon, AttachFile as AttachIcon, Close as CloseIcon, SmartToy as BotIcon } from '@mui/icons-material';

const WhatsAppBot: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
    const [messages, setMessages] = useState([
        { id: 1, text: "👋 Hello! I'm HealthAssist AI. Send me your medical report (photo/PDF) and I'll explain it in simple words!", sender: 'bot', time: '10:00 AM' }
    ]);
    const [input, setInput] = useState('');
    const [typing, setTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        // User message
        const userMsg = { id: Date.now(), text: input, sender: 'user', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setTyping(true);

        // Bot response simulation
        setTimeout(() => {
            setTyping(false);
            const botMsg = {
                id: Date.now() + 1,
                text: "I've received your query. Analyzing now... 🤖",
                sender: 'bot',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, botMsg]);
        }, 1500);
    };

    if (!open) return null;

    return (
        <Fade in={open}>
            <Paper
                elevation={6}
                sx={{
                    position: 'fixed',
                    bottom: 20,
                    right: 20,
                    width: 350,
                    height: 600,
                    borderRadius: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    zIndex: 1300,
                    overflow: 'hidden'
                }}
            >
                {/* Header */}
                <Box sx={{ p: 2, bgcolor: '#075E54', color: 'white', display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar sx={{ bgcolor: 'white', color: '#075E54' }}><BotIcon /></Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="subtitle1" fontWeight="bold">HealthAssist AI</Typography>
                        <Typography variant="caption">Online</Typography>
                    </Box>
                    <IconButton onClick={onClose} sx={{ color: 'white' }}><CloseIcon /></IconButton>
                </Box>

                {/* Chat Area */}
                <Box
                    ref={scrollRef}
                    sx={{
                        flexGrow: 1,
                        bgcolor: '#E5DDD5',
                        p: 2,
                        overflowY: 'auto',
                        backgroundImage: 'url(https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png)',
                    }}
                >
                    {messages.map(msg => (
                        <Box
                            key={msg.id}
                            sx={{
                                display: 'flex',
                                justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                                mb: 1
                            }}
                        >
                            <Paper
                                sx={{
                                    p: 1.5,
                                    maxWidth: '80%',
                                    bgcolor: msg.sender === 'user' ? '#DCF8C6' : 'white',
                                    borderRadius: 2,
                                    borderTopRightRadius: msg.sender === 'user' ? 0 : 2,
                                    borderTopLeftRadius: msg.sender === 'bot' ? 0 : 2
                                }}
                            >
                                <Typography variant="body2">{msg.text}</Typography>
                                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'right', mt: 0.5, fontSize: '0.65rem' }}>
                                    {msg.time}
                                </Typography>
                            </Paper>
                        </Box>
                    ))}
                    {typing && (
                        <Typography variant="caption" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>HealthAssist is typing...</Typography>
                    )}
                </Box>

                {/* Input Area */}
                <Box sx={{ p: 1, bgcolor: '#F0F0F0', display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton><AttachIcon /></IconButton>
                    <TextField
                        fullWidth
                        placeholder="Type a message"
                        variant="standard"
                        InputProps={{ disableUnderline: true }}
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyPress={e => e.key === 'Enter' && handleSend()}
                        sx={{ bgcolor: 'white', borderRadius: 4, px: 2, py: 1 }}
                    />
                    <IconButton
                        onClick={handleSend}
                        sx={{ bgcolor: '#128C7E', color: 'white', '&:hover': { bgcolor: '#075E54' } }}
                    >
                        <SendIcon />
                    </IconButton>
                </Box>
            </Paper>
        </Fade>
    );
};

export default WhatsAppBot;
