import React, { useState, useRef, useEffect } from 'react';
import {
    Box, Paper, Typography, IconButton, InputBase, Avatar, CircularProgress,
    Card, CardContent, Chip, Button, Divider
} from '@mui/material';
import {
    ArrowBack, MoreVert, AttachFile, Mic,
    SmartToy as BotIcon, MedicalServices, Restaurant, Warning
} from '@mui/icons-material';
import { analyzeReportFile } from '../services/aiService';
import { useNavigate } from 'react-router-dom';

interface Message {
    id: string;
    text?: string;
    sender: 'user' | 'bot';
    timestamp: Date;
    type: 'text' | 'image' | 'analysis';
    imageUrl?: string;
    analysisData?: any;
}

const WhatsAppChat: React.FC = () => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: "Hello! 👋 I'm your MediQ Assistant. Please upload your medical report (PDF or Image) and I'll analyze it for you.",
            sender: 'bot',
            timestamp: new Date(),
            type: 'text'
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const text = inputValue;
        setInputValue("");

        // User message
        const userMsg: Message = {
            id: Date.now().toString(),
            text: text,
            sender: 'user',
            timestamp: new Date(),
            type: 'text'
        };
        setMessages(prev => [...prev, userMsg]);

        // Simulate Bot Response for text messages
        setIsTyping(true);
        setTimeout(() => {
            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: "Thank you for your question. I'm focusing on analyzing your report right now, but I recommend discussing this specific question with the specialist mentioned above for the best advice.",
                sender: 'bot',
                timestamp: new Date(),
                type: 'text'
            };
            setMessages(prev => [...prev, botMsg]);
            setIsTyping(false);
        }, 1500);
    };
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // User sends image/file
        const userMsg: Message = {
            id: Date.now().toString(),
            text: `Uploaded: ${file.name}`,
            sender: 'user',
            timestamp: new Date(),
            type: file.type.startsWith('image/') ? 'image' : 'text',
            imageUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
        };
        setMessages(prev => [...prev, userMsg]);

        processInternal(file);
    };

    const processInternal = async (file: File) => {
        setIsTyping(true);
        try {
            const result = await analyzeReportFile(file);

            // Artificial delay for "typing" feel
            setTimeout(() => {
                const botMsg: Message = {
                    id: (Date.now() + 1).toString(),
                    sender: 'bot',
                    timestamp: new Date(),
                    type: 'analysis',
                    analysisData: result
                };
                setMessages(prev => [...prev, botMsg]);
                setIsTyping(false);

                // Add follow-up prompts if available
                if (result.followUpQuestions && result.followUpQuestions.length > 0) {
                    setTimeout(() => {
                        const followUpMsg: Message = {
                            id: (Date.now() + 2).toString(),
                            text: "Here are some questions you might want to ask:",
                            sender: 'bot',
                            timestamp: new Date(),
                            type: 'text'
                        };
                        setMessages(prev => [...prev, followUpMsg]);
                    }, 1000);
                }

            }, 2000);

        } catch (error) {
            console.error(error);
            setIsTyping(false);
            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                text: "Sorry, I had trouble analyzing that file. Please try again.",
                sender: 'bot',
                timestamp: new Date(),
                type: 'text'
            }]);
        }
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const renderAnalysisBubble = (data: any) => {
        const urgencyColor =
            data.urgency?.toLowerCase() === 'high' ? 'error' :
                data.urgency?.toLowerCase() === 'medium' ? 'warning' : 'success';

        return (
            <Card sx={{ maxWidth: '100%', bgcolor: '#e3f2fd', borderRadius: 2, boxShadow: 'none' }}>
                <CardContent sx={{ p: '16px !important' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Chip
                            icon={<Warning />}
                            label={`Urgency: ${data.urgency || 'Unknown'}`}
                            color={urgencyColor}
                            size="small"
                        />
                        <Chip
                            icon={<MedicalServices />}
                            label={data.specialist || 'General'}
                            color="primary"
                            size="small"
                            variant="outlined"
                        />
                    </Box>
                    <Typography variant="body2" paragraph sx={{ whiteSpace: 'pre-line' }}>
                        {data.explanation}
                    </Typography>

                    {data.dietPlan && (
                        <>
                            <Divider sx={{ my: 1 }} />
                            <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'success.main' }}>
                                <Restaurant fontSize="small" /> Action Plan & Diet:
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 0.5, fontStyle: 'italic' }}>
                                {data.dietPlan}
                            </Typography>
                        </>
                    )}

                    <Button
                        size="small"
                        variant="contained"
                        fullWidth
                        sx={{ mt: 2, bgcolor: '#075e54', '&:hover': { bgcolor: '#128c7e' } }}
                        onClick={() => window.open(`https://www.google.com/maps/search/${data.specialist}+near+me`, '_blank')}
                    >
                        Find {data.specialist} Nearby
                    </Button>
                </CardContent>
            </Card>
        );
    };

    return (
        <Box sx={{
            height: '100vh',
            bgcolor: '#e5ddd5', // WhatsApp bg color
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            maxWidth: '100vw',
            overflow: 'hidden'
        }}>
            {/* Header */}
            <Paper elevation={1} sx={{
                p: 1, px: 2, bgcolor: '#075e54', color: 'white',
                display: 'flex', alignItems: 'center', gap: 2, borderRadius: 0
            }}>
                <IconButton color="inherit" onClick={() => navigate('/')}>
                    <ArrowBack />
                </IconButton>
                <Avatar sx={{ bgcolor: 'white' }}>
                    <BotIcon sx={{ color: '#075e54' }} />
                </Avatar>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle1" fontWeight="bold">MediQ Assistant</Typography>
                    <Typography variant="caption" display="block">online</Typography>
                </Box>
                <IconButton color="inherit"><MoreVert /></IconButton>
            </Paper>

            {/* Chat Area */}
            <Box sx={{
                flexGrow: 1,
                overflowY: 'auto',
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")',
                backgroundRepeat: 'repeat'
            }}>
                {messages.map((msg) => (
                    <Box key={msg.id} sx={{
                        alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                        maxWidth: '85%'
                    }}>
                        <Paper sx={{
                            p: msg.type === 'analysis' ? 0 : 1,
                            px: msg.type === 'analysis' ? 0 : 2,
                            bgcolor: msg.sender === 'user' ? '#dcf8c6' : 'white',
                            borderRadius: 2,
                            position: 'relative'
                        }}>
                            {msg.type === 'image' && msg.imageUrl && (
                                <Box
                                    component="img"
                                    src={msg.imageUrl}
                                    sx={{ width: '100%', maxWidth: 200, borderRadius: 1, mb: 0.5 }}
                                />
                            )}

                            {msg.type === 'analysis' ? renderAnalysisBubble(msg.analysisData) : (
                                <Typography variant="body1">{msg.text}</Typography>
                            )}

                            <Typography variant="caption" sx={{
                                display: 'block',
                                textAlign: 'right',
                                opacity: 0.7,
                                fontSize: '0.65rem',
                                mt: 0.5,
                                mr: msg.type === 'analysis' ? 2 : 0,
                                mb: msg.type === 'analysis' ? 1 : 0
                            }}>
                                {formatTime(msg.timestamp)}
                            </Typography>
                        </Paper>
                    </Box>
                ))}
                {isTyping && (
                    <Box sx={{ alignSelf: 'flex-start', bgcolor: 'white', p: 1, borderRadius: 2 }}>
                        <CircularProgress size={16} />
                    </Box>
                )}
                <div ref={messagesEndRef} />
            </Box>

            {/* Input Area */}
            <Paper elevation={0} sx={{
                p: 1, px: 2, bgcolor: '#f0f0f0',
                display: 'flex', alignItems: 'center', gap: 1
            }}>
                <IconButton onClick={() => fileInputRef.current?.click()} color="default">
                    <AttachFile />
                </IconButton>
                <input
                    type="file"
                    hidden
                    ref={fileInputRef}
                    accept="image/*,application/pdf"
                    onChange={handleFileUpload}
                />

                <Paper
                    component="form"
                    sx={{
                        p: '2px 4px', display: 'flex', alignItems: 'center',
                        flexGrow: 1, borderRadius: 4
                    }}
                    onSubmit={handleSendMessage}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Type a message"
                        disabled={isTyping}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                </Paper>

                <IconButton sx={{ bgcolor: '#075e54', color: 'white', '&:hover': { bgcolor: '#128c7e' } }} onClick={(e) => handleSendMessage(e as any)}>
                    <Mic />
                </IconButton>
            </Paper>
        </Box>
    );
};

export default WhatsAppChat;
