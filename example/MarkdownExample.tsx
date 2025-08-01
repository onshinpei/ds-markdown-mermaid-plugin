import React from 'react';
import { ConfigProvider, Markdown } from 'ds-markdown';
import en from 'ds-markdown/i18n/en';
// import plugin from '../src/plugin';
import plugin from 'ds-markdown-mermaid-plugin';
import 'ds-markdown/style.css';

const MarkdownExample: React.FC = () => {
  const markdownContent =
    '以下是使用 Mermaid 语法绘制的 **勾股定理（Pythagorean Theorem）** 流程图，通过几何证明的经典步骤呈现：\n\n```mermaid\nflowchart TD\n    A[勾股定理] --> B["a² + b² = c²"]\n    B --> C{证明方法}\n    C -->|几何法| D[构造正方形]\n    C -->|代数法| E[面积计算]\n    \n    D --> D1["画直角三角形△ABC（∠C=90°）"]\n    D1 --> D2["以a、b、c为边向外作正方形"]\n    D2 --> D3["切割重组证明面积相等"]\n    \n    E --> E1["计算四个△ + 小正方形面积"]\n    E1 --> E2["等于大正方形面积"]\n    E2 --> E3["展开公式得 a² + b² = c²"]\n    \n    D3 & E3 --> F[结论验证]\n    F --> G["直角边平方和等于斜边平方"]\n    \n    style A fill:#ffde57,stroke:#333\n    style B fill:#f0f8ff,stroke:#333\n    style G fill:#90ee90,stroke:#333\n```\n\n### 关键点说明：\n1. **定理内容**：  \n   直角三角形中，直角边（a、b）的平方和等于斜边（c）的平方。\n\n2. **几何证明法**（图示法）：\n   - 通过图形切割重组（如赵爽弦图），证明面积等价性。\n\n3. **代数证明法**：\n   - 利用面积公式：  \n     `(a+b)² = 4×(½ab) + c²` → 展开后化简得 `a² + b² = c²`。\n\n4. **经典应用场景**：\n   - 计算直角三角形的任意边长\n   - 验证直角存在性\n   - 建筑/工程中的测量\n\n### 可视化辅助：\n```\n      ┌─┐\n      │ │ c \n    b │ │\n      └─┘\n      a\n```\n（直角位于左下角）  \n\n> 提示：该定理有超过400种证明方法，流程图仅展示最直观的两种。';

  // 配置mermaid
  const mermaidConfig = {
    theme: 'light',
  };

  return (
    <ConfigProvider mermaidConfig={mermaidConfig} locale={en}>
      <div className="markdown-example">
        <div className="markdown-container">
          <Markdown interval={16} plugins={[plugin]} timerType="setTimeout" disableTyping={false} theme="light">
            {markdownContent}
          </Markdown>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default MarkdownExample;
