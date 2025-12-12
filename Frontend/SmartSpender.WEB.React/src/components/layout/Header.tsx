import { AppBar, Toolbar, IconButton, Box, Avatar, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

interface HeaderProps {
    handleDrawerToggle: () => void;
    drawerWidth: number;
}

const Header = ({ handleDrawerToggle, drawerWidth }: HeaderProps) => {
    return (
        <AppBar
            position="fixed"
            elevation={0}
            sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
                backdropFilter: 'blur(8px)',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
            }}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: 'none' }, color: 'primary.main' }}
                >
                    <MenuIcon />
                </IconButton>

                <Box sx={{ flexGrow: 1 }} />

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Tooltip title="Notifications">
                        <IconButton color="default">
                            <NotificationsIcon sx={{ color: 'text.secondary' }} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Account">
                        <IconButton size="small">
                            <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                                <AccountCircleIcon />
                            </Avatar>
                        </IconButton>
                    </Tooltip>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
