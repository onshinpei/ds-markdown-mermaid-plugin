let _mermaidId = 0;

const getMermaidId = () => {
  return `mermaid-${_mermaidId++}`;
};

export { getMermaidId };
