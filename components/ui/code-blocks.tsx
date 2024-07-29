"use client";

import { CodeBlock } from "react-code-block";

type Props = {
  code: string;
  language: string;
};

function CustomCodeBlock({ code, language }: Props) {
  return (
    <CodeBlock code={code} language={language}>
      <CodeBlock.Code className="bg-gray-900 p-6 rounded-xl shadow-lg">
        <div className="table-row">
          <CodeBlock.LineNumber className="table-cell pr-4 text-sm text-gray-500 text-right select-none" />
          <CodeBlock.LineContent className="table-cell">
            <CodeBlock.Token />
          </CodeBlock.LineContent>
        </div>
      </CodeBlock.Code>
    </CodeBlock>
  );
}

export default CustomCodeBlock;
