import React, { useState, useEffect } from "react";
import {
    Box, styled, Typography, Button, Dialog, DialogActions,
    DialogContent, DialogTitle, TextField, Fab, CircularProgress,
    Skeleton, IconButton, Divider, MenuItem, Select, InputLabel, FormControl
} from "@mui/material";
import {
    Add as AddIcon,
    Delete as DeleteIcon,
    Edit as EditIcon,
    Collections as CollectionsIcon
} from '@mui/icons-material';
import { API } from '../../service/api';
import moment from 'moment';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Create a light theme and a dark theme
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
    backgroundImage: theme.palette.mode === 'light'
        ? 'url("https://img.freepik.com/free-photo/anime-moon-landscape_23-2151645852.jpg")'
        : 'url("https://img.freepik.com/free-photo/lanterns-light-up-night-outdoor-festival-generated-by-ai_188544-19649.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    zIndex: -1,
    filter: theme.palette.mode === 'light' ? 'brightness(0.6)' : 'brightness(0.3)',
}));

const CardContainer = styled(Box)(({ theme }) => ({
    width: 280,
    margin: 16,
    padding: 16,
    borderRadius: 16,
    backgroundColor: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(33, 33, 33, 0.95)',
    boxShadow: theme.palette.mode === 'light' ? '0 8px 24px rgba(0, 0, 0, 0.2)' : '0 8px 24px rgba(255, 255, 255, 0.2)',
    textAlign: 'center',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
        transform: 'scale(1.03)',
        boxShadow: theme.palette.mode === 'light' ? '0 12px 32px rgba(0, 0, 0, 0.25)' : '0 12px 32px rgba(255, 255, 255, 0.25)',
    }
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
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    '&:hover': {
        backgroundColor: theme.palette.primary.dark,
    },
    boxShadow: '0 8px 16px rgba(0,0,0,0.3)'
}));

const CollectionView = () => {
    const [themeMode, setThemeMode] = useState('light');
    const [open, setOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [collectionName, setCollectionName] = useState("");
    const [error, setError] = useState("");
    const [previewUrl, setPreviewUrl] = useState("https://img.freepik.com/free-photo/lanterns-light-up-night-outdoor-festival-generated-by-ai_188544-19649.jpg");
    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);

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

    const handleCreateOrUpdate = async () => {
        if (!collectionName) {
            setError("Collection name is required");
            return;
        }

        const formData = new FormData();
        formData.append("name", collectionName);
        if (selectedFile) formData.append("image", selectedFile);

        try {
            if (editingId) {
                await API.updateCollection(editingId, formData);
            } else {
                await API.createCollection(formData);
            }
            resetDialog();
            fetchCollections();
        } catch (err) {
            setError("Operation failed!");
        }
    };

    const resetDialog = () => {
        setOpen(false);
        setCollectionName("");
        setSelectedFile(null);
        setPreviewUrl("https://img.freepik.com/free-photo/lanterns-light-up-night-outdoor-festival-generated-by-ai_188544-19649.jpg");
        setEditingId(null);
        setError("");
    };

    return (
        <ThemeProvider theme={themeMode === 'light' ? lightTheme : darkTheme}>
            <Background />
            <Dialog open={open} onClose={resetDialog} fullWidth maxWidth="sm">
                <DialogTitle sx={{ textAlign: 'center' }}>
                    {editingId ? "Edit Collection" : "Create Collection"}
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
                    <Button onClick={handleCreateOrUpdate} variant="contained" color="primary">
                        {editingId ? "Update" : "Save"}
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
                            <CardContainer key={collection._id}>
                                <img src={collection.imgUrl || "https://img.freepik.com/free-photo/lanterns-light-up-night-outdoor-festival-generated-by-ai_188544-19649.jpg"} alt="collection" style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '12px' }} />
                                <Typography variant="h6" sx={{ mt: 2 }}>
                                    {collection.collectionName}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'gray', mt: 1 }}>
                                    {moment(collection.createdAt).format('MMMM Do YYYY, h:mm a')}
                                </Typography>
                                <Box sx={{ mt: 2 }}>
                                    <IconButton onClick={() => handleEdit(collection)} color="primary">
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(collection._id)} color="error">
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            </CardContainer>
                        ))
                        : (
                            <Typography variant="h6" sx={{ color: 'white', mt: 4 }}>
                                No collections found
                            </Typography>
                        )}
            </Box>

            {/* Floating Buttons */}
            <FloatingButtonContainer>
                <FormControl variant="outlined" size="small">
                    <InputLabel>Theme</InputLabel>
                    <Select
                        value={themeMode}
                        onChange={handleThemeChange}
                        label="Theme"
                        sx={{ minWidth: 120 }}
                    >
                        <MenuItem value="light">Light</MenuItem>
                        <MenuItem value="dark">Dark</MenuItem>
                    </Select>
                </FormControl>

                <FloatingButton onClick={() => setOpen(true)} title="Create Collection">
                    <AddIcon />
                </FloatingButton>
            </FloatingButtonContainer>
        </ThemeProvider>
    );
};

export default CollectionView;
