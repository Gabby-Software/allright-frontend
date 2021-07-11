import {BrandingType} from "../types/branding.type";
import {ReactComponent as LiverightIcon} from "../assets/media/logo-compact.svg";
import {ReactComponent as EatrightIcon} from "../assets/media/eatright-logo-compact.svg";
import livefavicon from "../assets/media/favicon-eat.ico";
import eatfavicon from "../assets/media/favicon-eat.ico";

const brands: {[key: string]:BrandingType} = {
    default: {
        primaryColor: "#F74057",
        primaryLightColor: "#F97081",
        logo: LiverightIcon,
        icon:livefavicon
    },
    'identity.liverightdev.xyz': {
        primaryColor: "#F74057",
        primaryLightColor: "#F97081",
        logo: LiverightIcon,
        icon:livefavicon
    },
    'identity.eatrightdev.xyz': {
        primaryColor: "#96BE35",
        primaryLightColor: "#84a72f",
        logo: EatrightIcon,
        icon:livefavicon
    },
    'identity.liverightstaging.xyz': {
        primaryColor: "#F74057",
        primaryLightColor: "#F97081",
        logo: LiverightIcon,
        icon:livefavicon
    },
    'identity.eatrightstaging.xyz': {
        primaryColor: "#96BE35",
        primaryLightColor: "#84a72f",
        logo: EatrightIcon,
        icon:livefavicon
    },
    localhost: {
        primaryColor: "#96BE35",
        primaryLightColor: "#84a72f",
        logo: EatrightIcon,
        icon:livefavicon
    }
};
const branding = new Proxy(brands, {
    get: (target,prop:string) => target[prop] || target['default']
});

const brand: BrandingType = branding[document.location.hostname];
console.log('BRAND', document.location.hostname, branding[document.location.hostname], brand);
(document.head.querySelector('[rel="icon"]') as HTMLLinkElement).href = brand.icon;
export default brand;
