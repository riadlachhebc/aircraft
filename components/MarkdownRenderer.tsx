import React from "react";
import Link from "next/link";
import { marked, Token, Tokens } from "marked";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

/**
 * Recursively renders inline marked tokens to safe React elements.
 */
function renderInlineTokens(tokens?: Token[]): React.ReactNode {
  if (!tokens || tokens.length === 0) return null;

  return tokens.map((t, idx) => {
    switch (t.type) {
      case "text": {
        const textToken = t as Tokens.Text;
        if (textToken.tokens && textToken.tokens.length > 0) {
          return (
            <React.Fragment key={idx}>
              {renderInlineTokens(textToken.tokens)}
            </React.Fragment>
          );
        }
        return <React.Fragment key={idx}>{textToken.text}</React.Fragment>;
      }

      case "strong": {
        const strongToken = t as Tokens.Strong;
        return (
          <strong key={idx} className="font-bold text-black">
            {renderInlineTokens(strongToken.tokens)}
          </strong>
        );
      }

      case "em": {
        const emToken = t as Tokens.Em;
        return (
          <em key={idx} className="italic">
            {renderInlineTokens(emToken.tokens)}
          </em>
        );
      }

      case "codespan": {
        const codeToken = t as Tokens.Codespan;
        return (
          <code
            key={idx}
            className="font-mono text-xs bg-stone-100 text-stone-900 px-1 py-0.5 rounded border border-stone-200"
          >
            {codeToken.text}
          </code>
        );
      }

      case "link": {
        const linkToken = t as Tokens.Link;
        const isAffiliate =
          linkToken.href.startsWith("/go/") ||
          linkToken.href.includes("/go/") ||
          linkToken.href.includes("sjv.io") ||
          linkToken.href.includes("amazon.com") ||
          linkToken.href.includes("lasko.com");

        if (isAffiliate) {
          return (
            <a
              key={idx}
              href={linkToken.href}
              target="_blank"
              rel="sponsored nofollow noopener noreferrer"
              className="text-forest-700 underline font-semibold hover:text-forest-800 transition-colors"
            >
              {renderInlineTokens(linkToken.tokens)}
            </a>
          );
        }

        const isInternal =
          linkToken.href.startsWith("/") || linkToken.href.startsWith("#");

        if (isInternal) {
          return (
            <Link
              key={idx}
              href={linkToken.href}
              className="text-forest-700 underline font-semibold hover:text-forest-800 transition-colors"
            >
              {renderInlineTokens(linkToken.tokens)}
            </Link>
          );
        }

        return (
          <a
            key={idx}
            href={linkToken.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-forest-700 underline font-semibold hover:text-forest-800 transition-colors"
          >
            {renderInlineTokens(linkToken.tokens)}
          </a>
        );
      }

      case "image": {
        const imgToken = t as Tokens.Image;
        return (
          <figure
            key={idx}
            className="my-6 border border-stone-200 bg-white overflow-hidden max-w-xl mx-auto shadow-sm"
          >
            <div className="relative aspect-square w-full bg-white flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imgToken.href}
                alt={imgToken.text}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-contain"
              />
            </div>
            {imgToken.text && (
              <figcaption className="p-3 text-xs text-stone-600 bg-stone-50 border-t border-stone-200 font-sans leading-relaxed text-center">
                {imgToken.text}
              </figcaption>
            )}
          </figure>
        );
      }

      case "del": {
        const delToken = t as Tokens.Del;
        return (
          <del key={idx} className="line-through">
            {renderInlineTokens(delToken.tokens)}
          </del>
        );
      }

      case "br":
        return <br key={idx} />;

      case "escape": {
        const escapeToken = t as Tokens.Escape;
        return <React.Fragment key={idx}>{escapeToken.text}</React.Fragment>;
      }

      default:
        return "text" in t ? (
          <React.Fragment key={idx}>{(t as { text: string }).text}</React.Fragment>
        ) : null;
    }
  });
}

/**
 * Renders individual list items with proper bullet or numeric badges.
 */
function renderListItem(
  item: Tokens.ListItem,
  index: number,
  ordered: boolean
): React.ReactNode {
  const content = item.tokens ? (
    item.tokens.map((tok, i) => {
      if (tok.type === "text") {
        const textTok = tok as Tokens.Text;
        return (
          <span key={i}>
            {textTok.tokens && textTok.tokens.length > 0
              ? renderInlineTokens(textTok.tokens)
              : textTok.text}
          </span>
        );
      }
      if (tok.type === "paragraph") {
        const pTok = tok as Tokens.Paragraph;
        return (
          <span key={i}>
            {pTok.tokens && pTok.tokens.length > 0
              ? renderInlineTokens(pTok.tokens)
              : pTok.text}
          </span>
        );
      }
      if (tok.type === "list") {
        const nestedList = tok as Tokens.List;
        return (
          <div key={i} className="mt-2 pl-4">
            {nestedList.ordered ? (
              <ol className="space-y-1.5 list-none">
                {nestedList.items.map((subItem, subIdx) =>
                  renderListItem(subItem, subIdx, true)
                )}
              </ol>
            ) : (
              <ul className="space-y-1.5 list-none">
                {nestedList.items.map((subItem, subIdx) =>
                  renderListItem(subItem, subIdx, false)
                )}
              </ul>
            )}
          </div>
        );
      }
      return null;
    })
  ) : (
    <span>{item.text}</span>
  );

  return (
    <li
      key={index}
      className="flex items-start gap-2.5 text-stone-700 leading-relaxed text-sm sm:text-base"
    >
      {ordered ? (
        <span className="font-bold text-black text-xs sm:text-sm min-w-[1.25rem] pt-0.5 select-none">
          {index + 1}.
        </span>
      ) : (
        <span
          className="text-forest-700 font-bold select-none text-base leading-none mt-1"
          aria-hidden="true"
        >
          &bull;
        </span>
      )}
      <div className="flex-1">{content}</div>
    </li>
  );
}

/**
 * Renders top-level block tokens parsed from markdown.
 */
function renderBlockToken(token: Token, key: number | string): React.ReactNode {
  switch (token.type) {
    case "heading": {
      const hToken = token as Tokens.Heading;
      const headingContent = hToken.tokens
        ? renderInlineTokens(hToken.tokens)
        : hToken.text;

      if (hToken.depth === 2) {
        return (
          <h2
            key={key}
            className="font-sans font-black text-xl sm:text-2xl uppercase tracking-tight text-black mt-8 mb-3 pb-2 border-b border-stone-200"
          >
            {headingContent}
          </h2>
        );
      }

      if (hToken.depth === 3) {
        return (
          <h3
            key={key}
            className="font-sans font-bold text-base sm:text-lg text-black mt-6 mb-2 tracking-tight"
          >
            {headingContent}
          </h3>
        );
      }

      if (hToken.depth === 4) {
        return (
          <h4
            key={key}
            className="font-sans font-bold text-sm sm:text-base text-stone-900 mt-4 mb-1 tracking-tight"
          >
            {headingContent}
          </h4>
        );
      }

      return (
        <h5
          key={key}
          className="font-sans font-semibold text-xs sm:text-sm text-stone-800 mt-3 mb-1"
        >
          {headingContent}
        </h5>
      );
    }

    case "paragraph": {
      const pToken = token as Tokens.Paragraph;
      return (
        <p
          key={key}
          className="text-sm sm:text-base text-stone-700 leading-relaxed mb-4"
        >
          {pToken.tokens ? renderInlineTokens(pToken.tokens) : pToken.text}
        </p>
      );
    }

    case "list": {
      const listToken = token as Tokens.List;
      if (listToken.ordered) {
        return (
          <ol key={key} className="my-4 space-y-2.5 pl-1 list-none">
            {listToken.items.map((item, idx) =>
              renderListItem(item, idx, true)
            )}
          </ol>
        );
      }
      return (
        <ul key={key} className="my-4 space-y-2.5 pl-1 list-none">
          {listToken.items.map((item, idx) =>
            renderListItem(item, idx, false)
          )}
        </ul>
      );
    }

    case "blockquote": {
      const bqToken = token as Tokens.Blockquote;
      return (
        <blockquote
          key={key}
          className="border-l-4 border-forest-600 bg-stone-50 pl-4 py-3 my-4 text-stone-800 italic leading-relaxed text-sm sm:text-base"
        >
          {bqToken.tokens
            ? bqToken.tokens.map((tok, i) => renderBlockToken(tok, i))
            : bqToken.text}
        </blockquote>
      );
    }

    case "code": {
      const codeToken = token as Tokens.Code;
      return (
        <pre
          key={key}
          className="bg-stone-900 text-stone-100 p-4 rounded overflow-x-auto my-4 text-xs font-mono"
        >
          <code>{codeToken.text}</code>
        </pre>
      );
    }

    case "hr":
      return <hr key={key} className="border-stone-200 my-6" />;

    case "space":
      return null;

    default:
      if ("tokens" in token && Array.isArray((token as any).tokens)) {
        return (
          <div key={key}>
            {renderInlineTokens((token as any).tokens)}
          </div>
        );
      }
      if ("text" in token) {
        return (
          <p
            key={key}
            className="text-sm sm:text-base text-stone-700 leading-relaxed mb-4"
          >
            {(token as any).text}
          </p>
        );
      }
      return null;
  }
}

/**
 * Editorial Markdown Content Renderer for Air Crafted Home.
 *
 * Converts markdown text (headings, bold, lists, links, blockquotes) into
 * beautifully styled, accessible React components matching our design system,
 * eliminating raw markdown symbols like '###' or '**'.
 */
export function MarkdownRenderer({
  content,
  className = "",
}: MarkdownRendererProps) {
  if (!content || typeof content !== "string") {
    return null;
  }

  const tokens = marked.lexer(content);

  return (
    <div className={`editorial-content ${className}`}>
      {tokens.map((token, idx) => renderBlockToken(token, idx))}
    </div>
  );
}
