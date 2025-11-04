import { type Handler } from 'innet';
import { type Parent } from '../../types';
export declare function getParent<T extends Parent>(handler: Handler): T;
