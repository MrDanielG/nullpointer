import React, { ReactNode } from 'react'
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Tex from '@matejmazur/react-katex';
import math from 'remark-math'
import 'katex/dist/katex.min.css' // `react-katex` does not import the CSS for you

interface Props {
    content: string;

}
interface CodeProps {
    language?: string;
    value?: ReactNode;
}
interface MathProps {
    value?: string | number;
}


const renderers = {
    code: ({ language, value }: CodeProps) => {
        return <SyntaxHighlighter style={materialLight} language={language} children={value} showLineNumbers />
    },
    inlineMath: ({ value }: MathProps) => <Tex math={value} />,
    math: ({ value }: MathProps) => <Tex math={value} block/>,

}
export const MarkdownRender: React.FC<Props> = (props) => {
    return (
        <ReactMarkdown
            renderers={renderers}
            plugins={[gfm, math]}
            children={props.content}
        />
    );
}

