import React from 'react';
import s from './CreateCommentBlock.module.scss';

export type CreateCommentBlockProps = {
    onCreate(comment: {
        grade: number;
        text: string;
    }): void;
};

export function CreateCommentBlock(props: CreateCommentBlockProps) {
    return <div>CreateCommentBlock</div>
}
