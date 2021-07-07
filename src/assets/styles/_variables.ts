import brand from "../../config/branding.config";

const vars = {
    colors: {
        primary: brand.primaryColor,
        primaryLight: brand.primaryLightColor,
        primaryDark: '#40424D',
        secondary: '#BDBDBD',
        secondary2: '#d5d5d5',
        secondary3: '#818799',
        dark: '#5A5A5A',
        dark2: '#39393d',
        light: '#EBEBEB',
        light2: '#a8a8a8',
        card: '#fbfbfb',
        labelLight: '#72727a',
        inputBorder: '#dfdfdf',
        background: '#fafafa',
        error: '#F74057',
        success: '#56EC53',
        successDark: '#43b840',
        info: '#2F86EC',
        warning: '#FC7D08',
        warningDark: '#c46106',
    },
    sizes: {
        borderRadius: '6px',
        boxShadow: '0px 4px 25px rgba(0, 0, 0, 0.15)',
    },
    zIndex: {
        header: 40,
        footer: 40,
        modal: 50,
        toast: 49
    },
    media: {
        desktop: 1100,
        tablet: 720,
        mobile: 540
    },
    defaults: {
        transition: 'all .3s ease',
        font: '\'Work Sans\', sans-serif'
    }
};
export default vars;
