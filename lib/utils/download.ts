import { ExportFormat } from "@/types/lorem";

export function downloadTextFile(content: string, filename: string, format: ExportFormat = "plain"): void {
  const extensions: Record<ExportFormat, string> = {
    plain: "txt",
    html: "html",
    markdown: "md",
    json: "json"
  };

  const mimeTypes: Record<ExportFormat, string> = {
    plain: "text/plain",
    html: "text/html",
    markdown: "text/markdown",
    json: "application/json"
  };

  const ext = extensions[format] || "txt";
  const mime = mimeTypes[format] || "text/plain";

  const blob = new Blob([content], { type: `${mime};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.${ext}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function downloadCSVFile(csvContent: string, filename: string): void {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename.endsWith(".csv") ? filename : `${filename}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
