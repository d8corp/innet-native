import { type ViewBase } from '@nativescript/core';
import { type Handler } from 'innet';
import { type Parent } from '../../types';
export declare function setParent<T extends ViewBase>(handler: Handler, parent: Parent<T>): void;
