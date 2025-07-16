# ds-markdown 渲染 mermaid 示例

这是一个使用 ds-markdown 和 ds-markdown-mermaid-plugin 插件的完整示例。

## 流程图示例

```mermaid
graph TD
    A[开始] --> B{判断条件}
    B -->|是| C[处理A]
    B -->|否| D[处理B]
    C --> E[结束]
    D --> E
```

## 序列图示例

```mermaid
sequenceDiagram
    participant 用户
    participant 系统
    participant 数据库

    用户->>系统: 登录请求
    系统->>数据库: 验证用户
    数据库-->>系统: 返回结果
    系统-->>用户: 登录响应
```

## 甘特图示例

```mermaid
gantt
    title 项目计划
    dateFormat  YYYY-MM-DD
    section 设计
    需求分析    :done, des1, 2024-01-01, 2024-01-10
    系统设计    :active, des2, 2024-01-11, 2024-01-25
    section 开发
    编码实现    :des3, 2024-01-26, 2024-02-15
    测试调试    :des4, 2024-02-16, 2024-02-28
```

## 类图示例

```mermaid
classDiagram
    class Animal {
        +String name
        +int age
        +makeSound()
    }
    class Dog {
        +bark()
    }
    class Cat {
        +meow()
    }
    Animal <|-- Dog
    Animal <|-- Cat
```

## 饼图示例

```mermaid
pie title 浏览器市场份额
    "Chrome" : 65.5
    "Firefox" : 15.2
    "Safari" : 12.3
    "Edge" : 7.0
```

## 状态图示例

```mermaid
stateDiagram-v2
    [*] --> 待机
    待机 --> 运行 : 启动
    运行 --> 暂停 : 暂停
    暂停 --> 运行 : 恢复
    运行 --> 待机 : 停止
    暂停 --> 待机 : 停止
```

## 代码示例

这里是一个普通的代码块：

```javascript
function hello() {
  console.log('Hello, World!');
}
```

## 列表示例

- 项目 1
- 项目 2
  - 子项目 2.1
  - 子项目 2.2
- 项目 3

## 表格示例

| 功能   | 状态 | 描述 |
| ------ | ---- | ---- |
| 流程图 | ✅   | 支持 |
| 序列图 | ✅   | 支持 |
| 甘特图 | ✅   | 支持 |
| 类图   | ✅   | 支持 |
| 饼图   | ✅   | 支持 |
| 状态图 | ✅   | 支持 |

## 总结

这个示例展示了如何在 react-markdown 中使用 rehypeMermaid 插件来渲染 Mermaid 图表。插件会自动识别 markdown 中的 ```mermaid 代码块并将其转换为 MermaidBlock 组件。
