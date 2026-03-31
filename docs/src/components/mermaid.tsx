"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface MermaidProps {
  chart: string;
}

export function Mermaid({ chart }: MermaidProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgHtml, setSvgHtml] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) {
      return;
    }

    let cancelled = false;

    async function render() {
      const mermaid = (await import("mermaid")).default;
      mermaid.initialize({
        startOnLoad: false,
        theme: "default",
        themeVariables: { fontSize: "16px" },
        flowchart: {
          useMaxWidth: false,
          htmlLabels: true,
          curve: "basis",
          nodeSpacing: 30,
          rankSpacing: 60,
          padding: 15,
        },
        gantt: { useMaxWidth: false, fontSize: 14 },
        state: { useMaxWidth: false },
        securityLevel: "strict",
      });

      const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`;
      const { svg } = await mermaid.render(id, chart);

      if (!cancelled && el) {
        setSvgHtml(svg);
        injectSvg(el, svg, "min-width: 600px; max-width: 100%;");
      }
    }

    render();
    return () => {
      cancelled = true;
    };
  }, [chart]);

  return (
    <>
      <button
        className="group relative my-6 block w-full cursor-pointer appearance-none border-none bg-transparent p-0 text-left"
        onClick={() => {
          if (svgHtml) {
            setIsOpen(true);
          }
        }}
        title="Click to expand"
        type="button"
      >
        <div
          className="mermaid-diagram w-full overflow-x-auto"
          ref={containerRef}
        />
        <div className="pointer-events-none absolute top-2 right-2 z-10 rounded bg-black/50 px-2 py-1 text-white text-xs opacity-0 transition-opacity group-hover:opacity-100">
          Click to expand
        </div>
      </button>
      {isOpen && (
        <MermaidLightbox onClose={() => setIsOpen(false)} svgHtml={svgHtml} />
      )}
    </>
  );
}

/**
 * Safely inject mermaid-generated SVG into a container element.
 *
 * Security: The SVG string is produced by the mermaid library from our own
 * MDX source code (not user input) with securityLevel "strict". The DOM
 * parser approach avoids raw innerHTML assignment.
 */
function injectSvg(container: HTMLElement, svg: string, style: string) {
  container.replaceChildren();
  const doc = new DOMParser().parseFromString(svg, "image/svg+xml");
  const svgEl = doc.documentElement;
  if (svgEl instanceof SVGElement) {
    svgEl.removeAttribute("height");
    svgEl.setAttribute("style", style);
    container.appendChild(document.importNode(svgEl, true));
  }
}

interface LightboxProps {
  onClose: () => void;
  svgHtml: string;
}

function MermaidLightbox({ svgHtml, onClose }: LightboxProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const translateStart = useRef({ x: 0, y: 0 });

  // Close on Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Prevent body scroll while open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Inject SVG into lightbox container
  useEffect(() => {
    const el = contentRef.current;
    if (!(el && svgHtml)) {
      return;
    }
    injectSvg(el, svgHtml, "width: 100%; height: auto;");
  }, [svgHtml]);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setScale((s) => Math.min(Math.max(s * delta, 0.2), 5));
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if ((e.target as HTMLElement).closest("[data-lightbox-controls]")) {
        return;
      }
      isDragging.current = true;
      dragStart.current = { x: e.clientX, y: e.clientY };
      translateStart.current = { ...translate };
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [translate]
  );

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) {
      return;
    }
    setTranslate({
      x: translateStart.current.x + (e.clientX - dragStart.current.x),
      y: translateStart.current.y + (e.clientY - dragStart.current.y),
    });
  }, []);

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const resetView = useCallback(() => {
    setScale(1);
    setTranslate({ x: 0, y: 0 });
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onWheel={handleWheel}
      style={{ cursor: isDragging.current ? "grabbing" : "grab" }}
    >
      {/* Controls */}
      <div
        className="absolute top-4 right-4 z-10 flex gap-2"
        data-lightbox-controls
      >
        <button
          className="rounded-lg bg-white/10 px-3 py-2 text-sm text-white hover:bg-white/20"
          onClick={() => setScale((s) => Math.min(s * 1.3, 5))}
          type="button"
        >
          +
        </button>
        <button
          className="rounded-lg bg-white/10 px-3 py-2 text-sm text-white hover:bg-white/20"
          onClick={() => setScale((s) => Math.max(s * 0.7, 0.2))}
          type="button"
        >
          −
        </button>
        <button
          className="rounded-lg bg-white/10 px-3 py-2 text-sm text-white hover:bg-white/20"
          onClick={resetView}
          type="button"
        >
          Reset
        </button>
        <button
          className="rounded-lg bg-white/10 px-3 py-2 text-sm text-white hover:bg-white/20"
          onClick={onClose}
          type="button"
        >
          ✕
        </button>
      </div>

      {/* Scale indicator */}
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-lg bg-white/10 px-3 py-1 text-white/70 text-xs"
        data-lightbox-controls
      >
        {Math.round(scale * 100)}% · Scroll to zoom · Drag to pan · Esc to close
      </div>

      {/* SVG content */}
      <div
        className="mermaid-lightbox-content"
        ref={contentRef}
        style={{
          transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
          transformOrigin: "center center",
          transition: isDragging.current ? "none" : "transform 0.1s ease-out",
        }}
      />
    </div>
  );
}
