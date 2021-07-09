import {BrandingType} from "../types/branding.type";
import {ReactComponent as LiverightIcon} from "../assets/media/logo-compact.svg";
import {ReactComponent as EatrightIcon} from "../assets/media/eatright-logo-compact.svg";

const brands: {[key: string]:BrandingType} = {
    default: {
        primaryColor: "#F74057",
        primaryLightColor: "#F97081",
        logo: LiverightIcon
    },
    'identity.liveright.xyz': {
        primaryColor: "#F74057",
        primaryLightColor: "#F97081",
        logo: LiverightIcon
    },
    'identity.eatright.xyz': {
        primaryColor: "#96BE35",
        primaryLightColor: "#84a72f",
        logo: EatrightIcon
    },
    localhost: {
        primaryColor: "#96BE35",
        primaryLightColor: "#84a72f",
        logo: EatrightIcon
    }
};
const branding = new Proxy(brands, {
    get: (target,prop:string) => target[prop] || target['default']
});

const brand: BrandingType = branding[document.location.hostname];
console.log('BRAND', document.location.hostname, branding[document.location.hostname], brand);
export default brand;
