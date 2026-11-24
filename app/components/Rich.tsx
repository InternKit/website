// Renders translation markup: *word* → serif voice, ==phrase== → Highlighter.
export function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*[^*]+\*|==[^=]+==)/).map((part, i) =>
        part.startsWith("*") ? (
          <em key={i} className="voice">{part.slice(1, -1)}</em>
        ) : part.startsWith("==") ? (
          <mark key={i} className="highlight">{part.slice(2, -2)}</mark>
        ) : (
          part
        )
      )}
    </>
  );
}
