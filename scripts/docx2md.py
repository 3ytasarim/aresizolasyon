"""Convert every .docx under SRC into a markdown-ish .md file under OUT, preserving headings,
list items and tables. Pure stdlib (zipfile + ElementTree)."""
import sys, os, zipfile, re
import xml.etree.ElementTree as ET

W = '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}'

def para_text(p):
    out = []
    for node in p.iter():
        if node.tag == W + 't':
            out.append(node.text or '')
        elif node.tag == W + 'tab':
            out.append('\t')
        elif node.tag == W + 'br':
            out.append('\n')
    return ''.join(out).strip()

def style_of(p):
    ppr = p.find(W + 'pPr')
    if ppr is None:
        return '', False
    st = ppr.find(W + 'pStyle')
    num = ppr.find(W + 'numPr') is not None
    return (st.get(W + 'val') if st is not None else ''), num

def convert(path):
    with zipfile.ZipFile(path) as z:
        xml = z.read('word/document.xml')
    root = ET.fromstring(xml)
    body = root.find(W + 'body')
    lines = []
    for el in body:
        if el.tag == W + 'p':
            t = para_text(el)
            if not t:
                continue
            st, num = style_of(el)
            m = re.match(r'(?i)heading(\d)|başlık(\d)|Balk(\d)', st or '')
            if st.lower() == 'title':
                lines.append('# ' + t)
            elif m:
                lvl = int(next(g for g in m.groups() if g))
                lines.append('#' * (lvl + 1) + ' ' + t)
            elif num or 'list' in (st or '').lower():
                lines.append('- ' + t)
            else:
                lines.append(t)
        elif el.tag == W + 'tbl':
            rows = []
            for tr in el.iter(W + 'tr'):
                cells = []
                for tc in tr.iter(W + 'tc'):
                    cells.append(' '.join(para_text(p) for p in tc.iter(W + 'p')).strip().replace('|', '/'))
                rows.append(cells)
            if rows:
                n = max(len(r) for r in rows)
                rows = [r + [''] * (n - len(r)) for r in rows]
                lines.append('| ' + ' | '.join(rows[0]) + ' |')
                lines.append('|' + '---|' * n)
                for r in rows[1:]:
                    lines.append('| ' + ' | '.join(r) + ' |')
        lines.append('')
    return re.sub(r'\n{3,}', '\n\n', '\n'.join(lines)).strip() + '\n'

if __name__ == '__main__':
    src, out = sys.argv[1], sys.argv[2]
    n = 0
    for dp, _, files in os.walk(src):
        for f in files:
            if f.lower().endswith('.docx'):
                rel = os.path.relpath(os.path.join(dp, f), src)
                dst = os.path.join(out, rel[:-5] + '.md')
                os.makedirs(os.path.dirname(dst), exist_ok=True)
                try:
                    with open(dst, 'w', encoding='utf-8') as fh:
                        fh.write(convert(os.path.join(dp, f)))
                    n += 1
                except Exception as e:
                    print('FAIL', rel, e)
    print('converted', n)
