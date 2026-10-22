import React from "react";

export interface ResponsiveTableProps {
  id?: string;
  caption: string;
  headers: string[];
  rows: (string | React.ReactNode)[][];
  className?: string;
}

export function ResponsiveTable({
  id = "comparison-table",
  caption,
  headers,
  rows,
  className = "",
}: ResponsiveTableProps) {
  const captionId = `${id}-caption`;

  return (
    <div
      tabIndex={0}
      role="region"
      aria-labelledby={captionId}
      className={`table-wrapper my-6 ${className}`}
    >
      <table className="modern-data-table">
        <caption
          id={captionId}
          className="text-left font-serif font-bold text-base text-stone-900 p-4 border-b border-stone-200 bg-stone-50/60"
        >
          {caption}
        </caption>
        <thead>
          <tr>
            {headers.map((header, idx) => (
              <th key={idx} scope="col">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr key={rowIdx}>
              {row.map((cell, colIdx) => (
                <td key={colIdx} data-label={headers[colIdx] || ""}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
