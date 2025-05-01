import { Box, styled, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, TextField } from "@mui/material";
import { AddCircle as Add } from '@mui/icons-material';
import { useState } from "react";

const Background = styled(Box)(({
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100vh',
    width: '100%',
    backgroundImage: 'url("https://img.freepik.com/free-photo/anime-moon-landscape_23-2151645852.jpg?t=st=1746077550~exp=1746081150~hmac=dceef915a9f389e2322a29e0d0a1f5510983534eec174ffa634952b8944d8df5&w=1380")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    zIndex: -1,
    filter: 'brightness(0.7)',
}));

const Container = styled(Box)(({ theme }) => ({
    maxWidth: '400px',
    margin: '6rem auto',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '16px',
    padding: theme.spacing(4),
    boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
    textAlign: 'center',
    transition: 'transform 0.3s ease',
    '&:hover': {
        transform: 'scale(1.03)',
    },
}));

const Image = styled('img')({
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '8px',
});

const InputGroup = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(2),
}));

const AddButton = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '20%',
    left: '20%',
    zIndex: 1,
    cursor: 'pointer',
    fontSize: 40,
    color: '#00796b',
    background: 'white',
    borderRadius: '20%',
    height: '100px',
    width: '100px',
    padding: theme.spacing(1),
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
}));

const Label = styled(Typography)(({ theme }) => ({
    fontSize: '10px',
    color: 'white',
    marginTop: '4px',
    fontWeight: 'bold',
    textAlign: 'center',
}));

const CollectionView = () => {
    const [open, setOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [collectionName, setCollectionName] = useState("");
    const [error, setError] = useState("");
    const [collections, setCollections] = useState([]);

    const url = selectedFile
        ? URL.createObjectURL(selectedFile)
        : `https://img.freepik.com/free-photo/lanterns-light-up-night-outdoor-festival-generated-by-ai_188544-19649.jpg?t=st=1746079813~exp=1746083413~hmac=86825abc2951931b52f9860d5badf9296af93b75a5c9a522f55525e3518cce04&w=1380`;

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSave = () => {
        if (!collectionName) {
            setError("Please provide a collection name");
        } else {
            setError("");
            setCollections([...collections, { name: collectionName, file: selectedFile }]);
            console.log("Saving collection:", collectionName);
            console.log("File:", selectedFile);
        }
    };

    const handleCancel = () => {
        setCollectionName("");
        setSelectedFile(null);
        setError("");
        setOpen(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Background />
            <Typography variant="h4" fontWeight="bold" color="white" sx={{ textAlign: 'center', paddingTop: '2rem' }}>
                Collection View
            </Typography>

            <Container>
                {collections.length === 0 ? (
                    <Typography variant="body1" color="text.secondary" sx={{ marginTop: 3 }}>
                        No collections available. Please create a new one.
                    </Typography>
                ) : (
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        Your Collections
                    </Typography>
                )}

                {collections.length > 0 && (
                    <Typography variant="body1" color="text.secondary">
                        {collections.map((collection, index) => (
                            <Box key={index} sx={{ marginBottom: 2 }}>
                                <Typography variant="body2">{collection.name}</Typography>
                                <Image src={URL.createObjectURL(collection.file)} alt="Collection Preview" />
                            </Box>
                        ))}
                    </Typography>
                )}
            </Container>

            {/* Add Collection Button */}
            <AddButton onClick={handleClickOpen} sx={{ fontSize: '40px', padding: '10px', backgroundColor: '#00796b', color: 'white' }}>
                <Add sx={{ fontSize: 'inherit' }} />
                <Label>Create Collection</Label>
            </AddButton>

            {/* Dialog for Create Collection */}
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>Add New Collection</DialogTitle>
                <DialogContent>
                    <Box sx={{ marginBottom: 3 }}>
                        <Image src={url} alt="Collection Preview" />
                    </Box>

                    <InputGroup>
                        <FormControl sx={{ display: 'flex', alignItems: 'center' }} >
                            <label htmlFor="fileInput" style={{ cursor: 'pointer' }}>
                                <Add style={{ fontSize: 40, color: '#00796b', marginBottom: '10px' }} />
                            </label>
                            <input
                                id="fileInput"
                                type="file"
                                style={{ display: "none" }}
                                onChange={handleFileChange}
                            />
                        </FormControl>

                        <TextField
                            label="Collection Name"
                            value={collectionName}
                            onChange={(e) => setCollectionName(e.target.value)}
                            variant="outlined"
                            fullWidth
                            color="primary"
                            sx={{ marginLeft: 2 }}
                        />
                    </InputGroup>

                    {error && <Typography color="error" variant="body2" sx={{ marginTop: 2 }}>{error}</Typography>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} variant="contained" color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default CollectionView;
