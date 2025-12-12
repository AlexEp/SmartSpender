import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Divider } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BusinessIcon from '@mui/icons-material/Business';
import CategoryIcon from '@mui/icons-material/Category';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import InfoIcon from '@mui/icons-material/Info';
import { NavLink, useLocation } from 'react-router-dom';

interface SidebarProps {
    mobileOpen: boolean;
    handleDrawerToggle: () => void;
    drawerWidth: number;
}

const Sidebar = ({ mobileOpen, handleDrawerToggle, drawerWidth }: SidebarProps) => {
    const location = useLocation();

    const menuItems = [
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
        { text: 'Admin', icon: <AdminPanelSettingsIcon />, path: '/admin' },
        { text: 'Business', icon: <BusinessIcon />, path: '/admin/business' },
        { text: 'Category', icon: <CategoryIcon />, path: '/admin/category' },
        { text: 'Comparison', icon: <CompareArrowsIcon />, path: '/admin/business-category-comparison' },
        { text: 'About', icon: <InfoIcon />, path: '/about' },
    ];

    const drawer = (
        <div>
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                    SmartSpender
                </Typography>
            </Box>
            <Divider />
            <List sx={{ p: 2 }}>
                {menuItems.map((item) => (
                    <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                        <ListItemButton
                            component={NavLink}
                            to={item.path}
                            selected={location.pathname === item.path}
                            onClick={() => {
                                // Close drawer on mobile when item is clicked
                                if (mobileOpen) handleDrawerToggle();
                            }}
                            sx={{
                                '&.active': {
                                    backgroundColor: (theme) => theme.palette.primary.light + '20', // Opacity hack if needed or rely on MUI-selected
                                    color: 'primary.main',
                                    '& .MuiListItemIcon-root': {
                                        color: 'primary.main',
                                    }
                                }
                            }}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} primaryTypographyProps={{ fontSize: 14, fontWeight: 500 }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
        >
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >
                {drawer}
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: '1px solid rgba(0,0,0,0.05)' },
                }}
                open
            >
                {drawer}
            </Drawer>
        </Box>
    );
};

export default Sidebar;
