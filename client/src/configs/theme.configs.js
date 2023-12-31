import { createTheme } from "@mui/material/styles";
import { colors } from "@mui/material";

export const themeModes = {
    dark: "dark",
    light: "light"
}

const themeConfigs = {
    custom: ({ mode }) => {
        const customPallette = mode === themeModes.dark ? {
            primary: {
                main: '#ff0000',
                contrastText: '#ffffff'
            },
            secondary: {
                main: '#f44336',
                contrastText: '#ffffff'
            },
            background: {
                default: '#000000',
                paper: '#131313'
            }
        } : {
            primary: {
                main: '#ff0000',
                // contrastText: '#ffffff'
            },
            secondary: {
                main: '#f44336',
                // contrastText: '#ffffff'
            },
            background: {
                default: colors.grey["100"],
                // paper: '#131313'
            }
        }
        return createTheme({
            palette: {
                mode,
                ...customPallette
            },
            components: {
                MuiButton: {
                    defaultProps: { disableElevation: true }
                }
            }
        });
    }
};

export default themeConfigs;