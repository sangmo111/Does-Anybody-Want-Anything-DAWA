import colors from "./colors";

const fonts = {
    heading: {
        fontWeight: '900',
        color: colors.dark,
        fontSize: 32
    },
    subheading: {
        fontWeight: '900',
        color: colors.dark,
        fontSize: 22
    },
    body: {
        color: colors.dark,
        fontSize: 16
    },
    smallButton: {
        dark: {
            borderRadius: 9999999,
            backgroundColor: colors.dark,
            paddingVertical: 5,
            paddingHorizontal: 10,
        },
        light: {
            borderRadius: 9999999,
            backgroundColor: colors.white,
            paddingVertical: 5,
            paddingHorizontal: 10,
        }
        
    },
    buttonText: {
        dark: {
            color: colors.white
        },
        light: {
            color: colors.dark
        }
    },
    button: {
        dark: {
            borderRadius: 9999999,
            backgroundColor: colors.dark,
            paddingVertical: 10,
            paddingHorizontal: 20,
        }
      
    }
};

export default fonts;
  