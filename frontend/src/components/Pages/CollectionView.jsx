import React, { useState, useEffect } from "react";
import {
    Box, styled, Typography, Button, Dialog, DialogActions,
    DialogContent, DialogTitle, TextField, Fab,
    Skeleton, Divider, MenuItem, Select, InputLabel, FormControl
} from "@mui/material";
import { Add as AddIcon } from '@mui/icons-material';
import { API } from '../../service/api';
import moment from 'moment';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        background: {
            default: '#ffffff',
            paper: '#f5f5f5'
        },
        text: {
            primary: '#000000',
            secondary: '#555555',
        },
    },
});

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#121212',
            paper: '#1d1d1d',
        },
        text: {
            primary: '#ffffff',
            secondary: '#bbbbbb',
        },
    },
});

const Background = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100vh',
    width: '100%',
    background: theme.palette.mode === 'light'
        ? 'linear-gradient(to right,rgb(100, 156, 131),rgb(133, 192, 153),rgb(141, 220, 151))'
        : 'linear-gradient(to right,rgb(92, 111, 95),rgb(78, 114, 89),rgb(32, 83, 39))',
    zIndex: -1,
}));

const CardContainer = styled(Box)(({ theme }) => ({
    width: 240,
    margin: 16,
    padding: 16,
    borderRadius: 16,
    backgroundColor: theme.palette.mode === 'light'
        ? 'rgba(255, 255, 255, 0.9)'
        : 'rgba(115, 139, 133, 0.95)',
    color: theme.palette.mode === 'light' ? '#000' : '#fff',
    boxShadow: theme.palette.mode === 'light'
        ? '0 8px 24px rgba(133, 154, 137, 0.3)'
        : '0 8px 24px rgba(125, 104, 104, 0.6)',
    textAlign: 'center',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
        transform: 'scale(1.03)',
        boxShadow: theme.palette.mode === 'light'
            ? '0 12px 32px rgba(117, 137, 121, 0.4)'
            : '0 12px 32px rgba(108, 93, 93, 0.8)',
    },
    '@media (max-width: 800px)': {
        width: '80%',
        margin: '8px 0',
        padding: '12px',
    },
}));

const FloatingButtonContainer = styled(Box)(({ theme }) => ({
    position: 'fixed',
    bottom: theme.spacing(4),
    right: theme.spacing(4),
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing(2),
    zIndex: 1000,
}));

const FloatingButton = styled(Fab)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'light'
        ? 'rgba(92, 133, 114, 0.85)'
        : 'rgba(55, 71, 58, 0.85)',
    color: '#fff',
    '&:hover': {
        backgroundColor: theme.palette.mode === 'light'
            ? 'rgba(101, 157, 129, 0.95)'
            : 'rgba(70, 98, 84, 0.95)',
    },
    boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
    minWidth: 120,
    backgroundColor: 'transparent',
    borderRadius: theme.shape.borderRadius,
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: theme.palette.mode === 'light' ? '#000' : '#fff',
        },
        '&:hover fieldset': {
            borderColor: theme.palette.mode === 'light' ? '#000' : '#fff',
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.mode === 'light' ? '#000' : '#fff',
            borderWidth: 2,
        },
    },
    '& .MuiInputLabel-root': {
        color: theme.palette.mode === 'light' ? '#000' : '#fff',
    },
    '& .MuiSelect-root': {
        color: theme.palette.mode === 'light' ? '#000' : '#fff',
    },
}));

const Wrapper = styled(Box)(({ theme }) => ({
    height: '80vh',
    overflowY: 'scroll',
    padding: '1rem',
    borderRadius: '12px',
    '&::-webkit-scrollbar': {
        display: 'none',
    },
    scrollbarWidth: 'none',
    scrollBehavior: 'smooth',
    '@media (max-width: 600px)': {
        padding: '0.5rem', // Adjust padding for mobile
    },
}));


const CollectionView = () => {
    const [themeMode, setThemeMode] = useState('light');
    const [open, setOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [collectionName, setCollectionName] = useState("");
    const [error, setError] = useState("");
    const [previewUrl, setPreviewUrl] = useState("https://img.freepik.com/free-photo/lanterns-light-up-night_outdoor-festival-generated-by-ai_188544-19649.jpg");
    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        fetchCollections();
    }, []);

    const fetchCollections = async () => {
        try {
            setLoading(true);
            const response = await API.getCollection();
            if (response?.data) {
                setCollections(response.data);
            }
        } catch (err) {
            setError('Failed to fetch collections');
        } finally {
            setLoading(false);
        }
    };

    const handleThemeChange = (event) => {
        setThemeMode(event.target.value);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleCreateCollection = async () => {
        if (!collectionName) {
            setError("Collection name is required");
            return;
        }

        const formData = new FormData();
        formData.append("name", collectionName);
        if (selectedFile) formData.append("image", selectedFile);

        try {
            await API.createCollection(formData);
            resetDialog();
            fetchCollections();
        } catch (err) {
            setError("Operation failed!");
        }
    };

    const handleCollectionClick = (id) => {
        navigate(`/collection/${id}`);
    };

    const resetDialog = () => {
        setOpen(false);
        setCollectionName("");
        setSelectedFile(null);
        setPreviewUrl("https://img.freepik.com/free-photo/lanterns-light-up-night_outdoor-festival-generated-by-ai_188544-19649.jpg");
        setError("");
    };

    return (
        <ThemeProvider theme={themeMode === 'light' ? lightTheme : darkTheme}>
            <Background />
            <Wrapper>

                <Dialog open={open} onClose={resetDialog} fullWidth maxWidth="sm">
                    <DialogTitle sx={{ textAlign: 'center' }}>
                        Create Collection
                    </DialogTitle>
                    <Divider />
                    <DialogContent sx={{ p: 3 }}>
                        <img src={previewUrl} alt="Preview" style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '1rem' }} />
                        <TextField
                            fullWidth
                            label="Collection Name"
                            variant="outlined"
                            value={collectionName}
                            onChange={(e) => setCollectionName(e.target.value)}
                            margin="normal"
                        />
                        <Button
                            variant="contained"
                            component="label"
                            fullWidth
                            sx={{ mt: 2 }}
                        >
                            Upload Image
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={handleFileChange}
                            />
                        </Button>
                        {error && (
                            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                                {error}
                            </Typography>
                        )}
                    </DialogContent>
                    <DialogActions sx={{ px: 3, pb: 2 }}>
                        <Button onClick={resetDialog}>Cancel</Button>
                        <Button onClick={handleCreateCollection} variant="contained" color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', mt: 10 }}>
                    {loading
                        ? Array.from({ length: 4 }).map((_, i) => (
                            <CardContainer key={i}>
                                <Skeleton variant="rectangular" height={180} sx={{ borderRadius: 2 }} />
                                <Skeleton variant="text" height={32} sx={{ mt: 2 }} />
                                <Skeleton variant="text" height={24} width="60%" sx={{ mx: "auto" }} />
                            </CardContainer>
                        ))
                        : collections.length > 0
                            ? collections.map((collection) => (
                                <CardContainer key={collection._id} onClick={() => handleCollectionClick(collection._id)}>
                                    <img src={collection.imgUrl || "https://img.freepik.com/free-photo/lanterns-light-up-night_outdoor-festival-generated-by-ai_188544-19649.jpg"} alt={collection.name} style={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: 8 }} />
                                    <Typography variant="h6" sx={{ mt: 2 }}>
                                        {collection.collectionName}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: (theme) => theme.palette.mode === 'dark' ? '#bbb' : 'gray',
                                            mt: 1
                                        }}
                                    >
                                        {moment(collection.createdAt).format('MMMM Do YYYY, h:mm a')}
                                    </Typography>
                                </CardContainer>
                            ))
                            : <Typography variant="h6" sx={{ p: 2 }}>No collections found</Typography>
                    }
                </Box>

                <FloatingButtonContainer>
                    <StyledFormControl variant="outlined" size="small">
                        <InputLabel>Theme</InputLabel>
                        <Select
                            value={themeMode}
                            onChange={handleThemeChange}
                            label="Theme"
                            sx={{
                                minWidth: 120,
                                '& .MuiInputLabel-root': {
                                    fontWeight: 600,
                                    fontSize: '1rem',
                                    color: (theme) => theme.palette.mode === 'dark' ? '#fff' : '#000',
                                    '&.Mui-focused': {
                                        color: (theme) => theme.palette.mode === 'dark' ? '#fff' : '#000',
                                    },
                                },
                                '& .MuiSelect-root': {
                                    fontSize: '1rem',
                                },
                                '& .MuiMenuItem-root': {
                                    fontSize: '0.875rem',
                                }
                            }}
                        >
                            <MenuItem value="light">Light</MenuItem>
                            <MenuItem value="dark">Dark</MenuItem>
                        </Select>

                    </StyledFormControl>
                    <FloatingButton onClick={() => setOpen(true)}>
                        <AddIcon />
                    </FloatingButton>
                </FloatingButtonContainer>
            </Wrapper>
        </ThemeProvider>
    );
};

export default CollectionView;
