import type { ReactNode } from "react";

export type Lang = "bash" | "python" | "yaml" | "json" | "text";

type Rule = [RegExp, string];

/*
 * A deliberately small, dependency-free highlighter. It only needs to
 * colour the handful of snippets on this site (taken verbatim from the
 * project READMEs), and it renders on the server so no JS ships for it.
 */

const bashRules: Rule[] = [
  [/#.*$/y, "tok-comment"],
  [/"(?:[^"\\]|\\.)*"|'[^']*'/y, "tok-string"],
  [/--?[A-Za-z][\w-]*/y, "tok-flag"],
  [/\$\(/y, "tok-punct"],
  [/[&|\\]/y, "tok-punct"],
];

const pythonRules: Rule[] = [
  [/#.*$/y, "tok-comment"],
  [/"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/y, "tok-string"],
  [
    /\b(?:from|import|def|return|async|await|if|not|as|lambda|None|True|False|for|in)\b/y,
    "tok-keyword",
  ],
  [/@[\w.]+/y, "tok-keyword"],
  [/\b\d+\b/y, "tok-number"],
  [/\b[A-Z][A-Za-z_]+\b/y, "tok-key"],
  [/\b[a-z_]\w*(?=\()/y, "tok-fn"],
];

const jsonRules: Rule[] = [
  [/"(?:[^"\\]|\\.)*"(?=\s*:)/y, "tok-key"],
  [/"(?:[^"\\]|\\.)*"/y, "tok-string"],
  [/-?\b\d+(?:\.\d+)?\b/y, "tok-number"],
  [/[{}[\],:]/y, "tok-punct"],
];

function scan(line: string, rules: Rule[], key: string, firstWordClass?: string): ReactNode[] {
  const out: ReactNode[] = [];
  let plain = "";
  let i = 0;
  let sawWord = false;
  const flush = () => {
    if (plain) {
      out.push(plain);
      plain = "";
    }
  };
  while (i < line.length) {
    let matched = false;
    for (const [re, cls] of rules) {
      re.lastIndex = i;
      const m = re.exec(line);
      if (m && m[0].length > 0) {
        flush();
        out.push(
          <span key={`${key}-${i}`} className={cls}>
            {m[0]}
          </span>,
        );
        i += m[0].length;
        matched = true;
        sawWord = true;
        break;
      }
    }
    if (matched) continue;

    // Colour the first bare word of a shell line as the command.
    if (firstWordClass && !sawWord && /\S/.test(line[i])) {
      const m = /\S+/y;
      m.lastIndex = i;
      const word = m.exec(line)![0];
      flush();
      out.push(
        <span key={`${key}-${i}`} className={firstWordClass}>
          {word}
        </span>,
      );
      i += word.length;
      sawWord = true;
      continue;
    }
    plain += line[i];
    i += 1;
  }
  flush();
  return out;
}

function yamlLine(line: string, key: string): ReactNode[] {
  if (/^\s*#/.test(line)) return [<span key={key} className="tok-comment">{line}</span>];
  const kv = /^(\s*)(- )?([\w."-]+)(:)(.*)$/.exec(line);
  if (kv) {
    const [, indent, dash = "", k, colon, rest] = kv;
    return [
      indent,
      dash ? <span key={`${key}-d`} className="tok-punct">{dash}</span> : null,
      <span key={`${key}-k`} className="tok-key">{k}</span>,
      <span key={`${key}-c`} className="tok-punct">{colon}</span>,
      yamlValue(rest, `${key}-v`),
    ];
  }
  const item = /^(\s*)(- )(.*)$/.exec(line);
  if (item) {
    return [
      item[1],
      <span key={`${key}-d`} className="tok-punct">{item[2]}</span>,
      yamlValue(item[3], `${key}-v`),
    ];
  }
  return [line];
}

function yamlValue(v: string, key: string): ReactNode {
  const t = v.trim();
  if (!t) return v;
  const lead = v.slice(0, v.length - v.trimStart().length);
  let cls = "tok-fn";
  if (/^".*"$|^'.*'$/.test(t)) cls = "tok-string";
  else if (/^-?\d+(\.\d+)?$/.test(t)) cls = "tok-number";
  else if (/^https?:\/\//.test(t)) cls = "tok-string";
  return (
    <span key={key}>
      {lead}
      <span className={cls}>{t}</span>
    </span>
  );
}

export function highlight(code: string, lang: Lang): ReactNode[] {
  const lines = code.replace(/\n$/, "").split("\n");
  let continuation = false;
  return lines.map((line, idx) => {
    const key = `l${idx}`;
    let nodes: ReactNode[];
    switch (lang) {
      case "bash": {
        nodes = scan(line, bashRules, key, continuation ? undefined : "tok-cmd");
        continuation = /\\\s*$/.test(line);
        break;
      }
      case "python":
        nodes = scan(line, pythonRules, key);
        break;
      case "json":
        nodes = scan(line, jsonRules, key);
        break;
      case "yaml":
        nodes = yamlLine(line, key);
        break;
      default:
        nodes = [line];
    }
    return (
      <span key={key} className="block min-h-[1.5em]">
        {nodes}
      </span>
    );
  });
}
