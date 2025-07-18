import React from 'react';

interface RenderCodeProps {
    id?: number;
}

const modulePrefix = 'RenderCode';
const RenderCode: React.FC<RenderCodeProps> = (props: RenderCodeProps) => {
    return (<div className={modulePrefix}>1</div>);
};

export default RenderCode;
