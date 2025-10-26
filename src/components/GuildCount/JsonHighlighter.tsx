interface JsonHighlighterProps {
  data: any;
  className?: string;
}

export default function JsonHighlighter({
  data,
  className,
}: JsonHighlighterProps) {
  const jsonString = JSON.stringify(data, null, 2);

  const highlightJson = (str: string) => {
    return str
      .replace(/(".*?")\s*:/g, '<span class="json-key">$1</span>:')
      .replace(/:\s*(".*?")/g, ': <span class="json-string">$1</span>')
      .replace(/:\s*(true|false)/g, ': <span class="json-boolean">$1</span>')
      .replace(/,\s*(true|false)/g, ',\n<span class="json-boolean">$1</span>')
      .replace(
        /\[\s*(true|false)/g,
        '[\n  <span class="json-boolean">$1</span>'
      )
      .replace(/:\s*(null)/g, ': <span class="json-null">$1</span>')
      .replace(/:\s*(-?\d+\.?\d*)/g, ': <span class="json-number">$1</span>')
      .replace(/,\s*(-?\d+\.?\d*)/g, ', <span class="json-number">$1</span>')
      .replace(/([{}[\]])/g, '<span class="json-bracket">$1</span>');
  };

  return (
    <pre className={className}>
      <code dangerouslySetInnerHTML={{ __html: highlightJson(jsonString) }} />
    </pre>
  );
}
