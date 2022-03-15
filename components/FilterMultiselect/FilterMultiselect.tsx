import React from 'react';
import s from './FilterMultiselect.module.scss';

export type FilterMultiselectProps = {
    isOpened: boolean;
    selected: string[];
    options: {
        label:string;
        value: string;
    }[]
    onClose(): void;
    onOpen(): void;
    onChange(selected: string[]): void;
};

export function FilterMultiselect(props: FilterMultiselectProps) {
    return <div>FilterMultiselect</div>
}
