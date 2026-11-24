// Renders translation markup: *word* → serif voice, ==phrase== → Highlighter.
export function Rich({ text }: { text: string }) {
  return (
    <>
      {/* split() with a capture group puts the matches at odd indices; even ones are plain text */}
      {text.split(/(\*[^*]+\*|==[^=]+==)/).map((part, i) =>
        i % 2 === 0 ? (
          part
        ) : part.startsWith("*") ? (
          <em key={i} className="voice">{part.slice(1, -1)}</em>
        ) : (
          <mark key={i} className="highlight">{part.slice(2, -2)}</mark>
        )
      )}
    </>
  );
}
