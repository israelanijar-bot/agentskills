"use client";

import { useState } from "react";

interface DownloadFile {
  name: string;
  url: string;
}

interface DownloadResponse {
  productSlug: string;
  expiresInMinutes: number;
  files: DownloadFile[];
}

interface DownloadButtonProps {
  slug: string;
  label?: string;
  className?: string;
}

type DownloadState = "idle" | "loading" | "success" | "error";

export default function DownloadButton({
  slug,
  label = "Baixar arquivos",
  className = "",
}: DownloadButtonProps) {
  const [state, setState] = useState<DownloadState>("idle");
  const [files, setFiles] = useState<DownloadFile[]>([]);
  const [error, setError] = useState<string>("");

  async function handleDownload() {
    setState("loading");
    setError("");

    try {
      const res = await fetch(`/api/download/${slug}`, {
        method: "GET",
        cache: "no-store",
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const message =
          data?.error || `Erro ao baixar os arquivos (${res.status})`;
        setError(message);
        setState("error");
        return;
      }

      const data: DownloadResponse = await res.json();

      if (!data.files || data.files.length === 0) {
        setError("Nenhum arquivo disponivel para download");
        setState("error");
        return;
      }

      setFiles(data.files);
      setState("success");
    } catch (err) {
      console.error("Erro no download:", err);
      setError("Erro de rede. Tente novamente.");
      setState("error");
    }
  }

  // Estado: SUCCESS — mostra lista de links
  if (state === "success" && files.length > 0) {
    return (
      <div
        className={`bg-white rounded-2xl shadow-sm p-6 border-2 border-success/20 ${className}`}
      >
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">✅</span>
          <h3 className="font-bold text-ink-900">
            Seus arquivos estao prontos
          </h3>
        </div>
        <p className="text-sm text-ink-500 mb-4">
          Clique em cada arquivo abaixo para baixar. Os links expiram em 60
          minutos.
        </p>
        <ul className="space-y-2">
          {files.map((file) => (
            <li key={file.name}>
              <a
                href={file.url}
                download={file.name}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-sand-50 hover:bg-accent-500/10 hover:text-accent-600 transition-colors text-sm font-medium text-ink-700"
              >
                <svg
                  className="w-5 h-5 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                <span className="flex-1 truncate">{file.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // Estado: ERROR
  if (state === "error") {
    return (
      <div className={className}>
        <button
          onClick={handleDownload}
          className="inline-flex items-center justify-center gap-3 w-full px-8 py-4 bg-red-50 text-red-700 font-bold text-base rounded-2xl hover:bg-red-100 transition-colors border-2 border-red-200"
        >
          ⚠️ {error || "Erro ao baixar"} — Clique para tentar novamente
        </button>
      </div>
    );
  }

  // Estado: IDLE ou LOADING
  return (
    <button
      onClick={handleDownload}
      disabled={state === "loading"}
      className={`inline-flex items-center justify-center gap-3 w-full px-8 py-4 bg-blue-600 text-white font-bold text-lg rounded-2xl hover:bg-blue-700 transition-colors shadow-lg disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
    >
      {state === "loading" ? (
        <>
          <svg
            className="animate-spin w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
          Gerando links seguros...
        </>
      ) : (
        <>⬇️ {label}</>
      )}
    </button>
  );
}
