import { createTheme, alpha } from '@mui/material/styles';

// Premium Color Palette
const colors = {
  primary: {
    main: '#4F46E5', // Indigo 600
    light: '#818CF8', // Indigo 400
    dark: '#3730A3', // Indigo 800
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#10B981', // Emerald 500
    light: '#34D399', // Emerald 400
    dark: '#059669', // Emerald 600
    contrastText: '#FFFFFF',
  },
  background: {
    default: '#F3F4F6', // Gray 100
    paper: '#FFFFFF',
  },
  text: {
    primary: '#111827', // Gray 900
    secondary: '#6B7280', // Gray 500
  },
  error: {
    main: '#EF4444', // Red 500
  },
  warning: {
    main: '#F59E0B', // Amber 500
  },
  info: {
    main: '#3B82F6', // Blue 500
  },
  success: {
    main: '#10B981', // Emerald 500
  }
};

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: colors.primary,
    secondary: colors.secondary,
    background: colors.background,
    text: colors.text,
    error: colors.error,
    warning: colors.warning,
    info: colors.info,
    success: colors.success,
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 600,
    },
    h2: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 600,
    },
    h3: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 600,
    },
    h4: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 500,
    },
    h5: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 500,
    },
    h6: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '8px 16px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          },
        },
        containedPrimary: {
          '&:hover': {
            backgroundColor: colors.primary.dark,
          },
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          border: '1px solid rgba(0,0,0,0.05)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        elevation1: {
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid rgba(0,0,0,0.05)',
          padding: '16px',
        },
        head: {
          fontWeight: 600,
          backgroundColor: '#F9FAFB',
          color: colors.text.secondary,
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:last-child td': {
            borderBottom: 0,
          },
          '&:hover': {
            backgroundColor: alpha(colors.primary.main, 0.04), // Subtle hover effect
          },
          transition: 'background-color 0.2s',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          backgroundColor: '#ffffff',
          color: colors.text.primary,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: '1px solid rgba(0,0,0,0.05)',
          backgroundColor: '#ffffff',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          margin: '4px 8px',
          '&.Mui-selected': {
            backgroundColor: alpha(colors.primary.main, 0.1),
            color: colors.primary.main,
            '&:hover': {
              backgroundColor: alpha(colors.primary.main, 0.2),
            },
            '& .MuiListItemIcon-root': {
              color: colors.primary.main,
            },
          },
          '&:hover': {
            backgroundColor: alpha(colors.text.primary, 0.05),
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 40,
          color: colors.text.secondary,
        },
      },
    },
  },
});

export default theme;
