declare const downloadPng: (data: {
    id: string;
    width: number;
    height: number;
}) => Promise<boolean>;
declare function svgToPngAndCopy(data: {
    id: string;
    width: number;
    height: number;
}): Promise<boolean>;
export { downloadPng, svgToPngAndCopy };
//# sourceMappingURL=svgUtil.d.ts.map