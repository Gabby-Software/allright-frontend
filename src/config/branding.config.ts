import {BrandingType} from "../types/branding.type";
import liverightLogo from "../assets/media/logo-compact.png";
import demoLogo from "../assets/media/demo-logo.png";

const brands: {[key: string]:BrandingType} = {
    default: {
        primaryColor: "#F74057",
        primaryLightColor: "#F97081",
        logo: liverightLogo
    },
    liveright: {
        primaryColor: "#F74057",
        primaryLightColor: "#F97081",
        logo: liverightLogo
    },
    localhost: {
        primaryColor: "#00b000",
        primaryLightColor: "#5eb856",
        logo: demoLogo
    }
};
const branding = new Proxy(brands, {
    get: (target,prop:string) => target[prop] || target['default']
});

const brand = branding[document.location.hostname];
console.log('BRAND', document.location.hostname, branding[document.location.hostname], brand);
export default brand;
