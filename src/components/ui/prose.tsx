import type { Block } from "@/lib/content";

export function Prose({ blocks }: { blocks: Block[] }) {
  return (
    <div className="prose-ares">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "heading":
            return b.level <= 2 ? <h2 key={i} id={b.id}>{b.text}</h2> : <h3 key={i} id={b.id}>{b.text}</h3>;
          case "p":
            return <p key={i}>{b.text}</p>;
          case "list":
            return <ul key={i}>{b.items.map((it) => <li key={it}>{it}</li>)}</ul>;
          case "table":
            return (
              <div key={i} className="overflow-x-auto rounded-xl border border-line">
                <table>
                  <thead><tr>{b.rows[0]?.map((c) => <th key={c} scope="col">{c}</th>)}</tr></thead>
                  <tbody>{b.rows.slice(1).map((r, ri) => <tr key={ri}>{r.map((c, ci) => <td key={ci}>{c}</td>)}</tr>)}</tbody>
                </table>
              </div>
            );
        }
      })}
    </div>
  );
}

export const tocOf = (blocks: Block[]) =>
  blocks.filter((b): b is Extract<Block, { type: "heading" }> => b.type === "heading" && b.level === 2).map((b) => ({ id: b.id, text: b.text }));
