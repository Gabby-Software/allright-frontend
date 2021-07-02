import {MouseEvent} from 'react';
export type HTMLType = {
    className?: string;
    style?: {[key:string]:string},
    id?:string;
    onClick?: (e: MouseEvent) => void;
}
