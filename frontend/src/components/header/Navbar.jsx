import { useState } from "react";
import {
    AppBar, Toolbar, Typography, Button, Stack, styled, useMediaQuery,
    IconButton, useTheme, ThemeProvider, createTheme, Drawer, List,
    ListItem, ListItemText
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

const CustomAppBar = styled(AppBar)(({ theme }) => ({
    background: 'transparent',
    backdropFilter: 'none',
    boxShadow: 'none',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    width: '100vw',
    zIndex: 1100,
}));

const LogoContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    marginLeft: '20px',
    gap: '10px',
});

const Logo = styled('img')({
    width: '40px',
});

const NavItems = styled(Stack)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    gap: '20px',
    marginLeft: 'auto',
    [theme.breakpoints.down('md')]: {
        display: 'none',
    },
}));

const NavButton = styled(Button)(({ theme }) => ({
    color: '#ffffff',
    fontWeight: 500,
    fontSize: '15px',
    fontFamily: "'Montserrat', sans-serif",
    position: 'relative',
    borderRadius: 0,
    border: 'none',
    boxShadow: 'none',
    padding: '8px 16px',
    textTransform: 'none',
    transition: 'color 0.3s ease',
    '&::after': {
        content: "''",
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '3px',
        backgroundColor: 'rgb(192, 209, 192)',
        transform: 'scaleX(0)',
        transformOrigin: 'bottom right',
        transition: 'transform 0.3s ease-out',
        borderRadius: '2px',
    },
    '&:hover': {
        color: 'rgb(192, 209, 192)',
        backgroundColor: 'transparent',
    },
    '&:hover::after': {
        transform: 'scaleX(1)',
        transformOrigin: 'bottom left',
    },
    '&:focus-visible': {
        outline: 'none',
        boxShadow: '0 0 8px rgb(192, 209, 192))',
        borderRadius: 0,
        border: 'none',
    },
    '&:active': {
        outline: 'none',
        boxShadow: 'none',
        border: 'none',
        color: 'rgb(192, 209, 192)',
    },
    '&:focus': {
        outline: 'none',
        boxShadow: '0 0 8px rgb(192, 209, 192)',
        border: 'none',
    },
}));

const Sidebar = styled(Drawer)(({ theme }) => ({
    width: '250px',
    flexShrink: 0,
    '& .MuiDrawer-paper': {
        width: '250px',
        background: 'rgba(189, 177, 177, 0.1)',
        backdropFilter: 'blur(3px)',
        boxShadow: 'none',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: '20px',
    },
}));

const SidebarHeader = styled('div')({
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '10px',
    marginTop: '-20px',
    marginBottom:'-20px'
});

const SidebarItem = styled(ListItem)(({ theme }) => ({
    color: 'white',
    fontWeight: 500,
    fontFamily: "'Roboto', sans-serif",
    fontSize: '16px',
    paddingLeft: '20px',
    paddingRight: '20px',
    borderBottom: '2px solid transparent',
    transition: 'border-bottom 0.3s ease',
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        cursor: 'pointer',
        borderBottom: '2px solid white',
    },
    '&:focus-visible': {
        borderBottom: '2px solid white',
        outline: 'none',
        boxShadow: 'none',
        borderRadius: 0,
        border: 'none',
    },
    '&:active': {
        outline: 'none',
        boxShadow: 'none',
        border: 'none',
    },
}));

const Navbar = ({ setIsAuthenticated }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    const customTheme = createTheme({
        palette: {
            mode: isDarkMode ? 'dark' : 'light',
        },
        transitions: {
            easing: {
                easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
            },
            duration: {
                standard: 300,
            },
        },
    });

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setSidebarOpen(false);
        navigate('/login');
    };

    return (
        <ThemeProvider theme={customTheme}>
            <CustomAppBar>
                <Toolbar sx={{ padding: 0 }}>
                    <LogoContainer>
                        <Logo src="https://cdn-icons-png.flaticon.com/512/187/187902.png" alt="logo" />
                        <Typography
                            variant="h6"
                            color="white"
                            fontWeight={500}
                            fontFamily="'Roboto', sans-serif"
                            fontSize="18px"
                        >
                            YourApp
                        </Typography>
                        <IconButton color="inherit" onClick={toggleDarkMode}>
                            {isDarkMode ? (
                                <DarkModeIcon sx={{ color: 'white' }} />
                            ) : (
                                <LightModeIcon sx={{ color: 'white' }} />
                            )}
                        </IconButton>
                    </LogoContainer>

                    <NavItems direction="row">
                        <NavButton>
                            Home
                        </NavButton>
                        <NavButton>
                            Collections
                        </NavButton>
                        <NavButton>
                            About
                        </NavButton>
                        <NavButton onClick={handleLogout}>
                            Logout
                        </NavButton>
                    </NavItems>

                    {isMobile && (
                        <>
                            <IconButton color="inherit" onClick={toggleSidebar} sx={{ ml: 'auto' }}>
                                <MenuIcon sx={{ color: 'white' }} />
                            </IconButton>

                            <Sidebar anchor="right" open={sidebarOpen} onClose={toggleSidebar}>
                                <SidebarHeader>
                                    <IconButton color="inherit" onClick={toggleSidebar}>
                                        <CloseIcon sx={{ color: 'white' }} />
                                    </IconButton>
                                </SidebarHeader>
                                <List>
                                    <SidebarItem button onClick={toggleSidebar}>
                                        <ListItemText primary="Home" />
                                    </SidebarItem>
                                    <SidebarItem button onClick={toggleSidebar}>
                                        <ListItemText primary="Collections" />
                                    </SidebarItem>
                                    <SidebarItem button onClick={toggleSidebar}>
                                        <ListItemText primary="About" />
                                    </SidebarItem>
                                    <SidebarItem button onClick={handleLogout}>
                                        <ListItemText primary="Logout" />
                                    </SidebarItem>
                                </List>
                            </Sidebar>
                        </>
                    )}
                </Toolbar>
            </CustomAppBar>
        </ThemeProvider>
    );
};

export default Navbar;
