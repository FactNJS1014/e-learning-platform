"use client";

import React, { useState } from "react";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = "typescript",
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-4 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-xl">
      <div className="flex items-center justify-between bg-slate-950/80 px-4 py-2.5 border-b border-slate-800 text-xs font-mono text-slate-400">
        <span className="uppercase">{language}</span>
        <button
          onClick={handleCopy}
          className="rounded-lg bg-slate-800 px-2.5 py-1 text-slate-200 hover:bg-slate-700 transition"
        >
          {copied ? "✓ Copied" : "Copy"}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm font-mono text-slate-100 leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
};
