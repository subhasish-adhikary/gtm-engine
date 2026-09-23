import { useRef, useState, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Users, FileEdit, Mail, Megaphone, Layout, Gift, Workflow, Database, LineChart, Filter, Trash2, Link2, RotateCcw } from 'lucide-react';

/*
 * Section 2 — Build Your GTM System.
 * A small node canvas: drag (or tap) components from the palette into the
 * workspace, then connect them by selecting two nodes in order. When a known
 * marketing motion's chain is fully wired, the resulting system lights up
 * with an explanation.
 *
 * This is a conceptual demonstration of GTM architecture — no recommendation
 * engine, no data leaves the page.
 */

type NodeKind =
  | 'icp' | 'content' | 'cold-email' | 'paid-ads' | 'landing-page'
  | 'lead-magnet' | 'automation' | 'crm' | 'analytics' | 'pipeline';

interface PaletteEntry { kind: NodeKind; label: string; icon: typeof Users; }

const PALETTE: PaletteEntry[] = [
  { kind: 'icp', label: 'ICP', icon: Users },
  { kind: 'content', label: 'Content', icon: FileEdit },
  { kind: 'cold-email', label: 'Cold Email', icon: Mail },
  { kind: 'paid-ads', label: 'Paid Ads', icon: Megaphone },
  { kind: 'landing-page', label: 'Landing Page', icon: Layout },
  { kind: 'lead-magnet', label: 'Lead Magnet', icon: Gift },
  { kind: 'automation', label: 'Marketing Automation', icon: Workflow },
  { kind: 'crm', label: 'CRM', icon: Database },
  { kind: 'analytics', label: 'Analytics', icon: LineChart },
  { kind: 'pipeline', label: 'Pipeline', icon: Filter },
];

interface CanvasNode { id: number; kind: NodeKind; x: number; y: number; }

interface Motion {
  name: string;
  chain: NodeKind[]; // consecutive edges must exist
  explanation: string;
}

const MOTIONS: Motion[] = [
  {
    name: 'Outbound demand motion',
    chain: ['cold-email', 'landing-page', 'lead-magnet', 'automation', 'crm', 'pipeline'],
    explanation: 'Cold Email → Landing Page → Lead Magnet → Automation → CRM → Pipeline. Prospects are pulled into a dedicated page, converted with a magnet, nurtured automatically, and surfaced in the CRM as pipeline. Classic outbound-to-pipeline engine.'
  },
  {
    name: 'Paid demand engine',
    chain: ['paid-ads', 'landing-page', 'lead-magnet', 'automation', 'crm'],
    explanation: 'Paid Ads → Landing Page → Lead Magnet → Automation → CRM. Paid traffic lands on a purpose-built page, converts on an offer, and enters a nurture track. The CRM becomes the single source of truth for follow-up.'
  },
  {
    name: 'Content engine',
    chain: ['content', 'lead-magnet', 'automation', 'pipeline'],
    explanation: 'Content → Lead Magnet → Automation → Pipeline. Organic content earns attention, the magnet converts it into known contacts, and automation qualifies them into pipeline. Compounds over time instead of renting attention.'
  },
  {
    name: 'Full-funnel GTM system',
    chain: ['icp', 'cold-email', 'landing-page', 'lead-magnet', 'automation', 'analytics', 'pipeline'],
    explanation: 'ICP → Cold Email → Landing Page → Lead Magnet → Automation → Analytics → Pipeline. Everything above, anchored on an explicit ICP and instrumented end-to-end: the analytics layer reads each stage so the motion can be iterated, not just launched.'
  },
  {
    name: 'Measured demand system',
    chain: ['icp', 'paid-ads', 'landing-page', 'analytics', 'crm'],
    explanation: 'ICP → Paid Ads → Landing Page → Analytics → CRM. A tight paid loop with measurement wired directly into the path — every dollar is attributable before scale is increased.'
  },
];

const NODE_W = 128;
const NODE_H = 52;

export default function GTMCanvas() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [nodes, setNodes] = useState<CanvasNode[]>([]);
  const [edges, setEdges] = useState<[number, number][]>([]);
  const [nextId, setNextId] = useState(1);
  const [connectFrom, setConnectFrom] = useState<number | null>(null);
  const idCounter = useRef(1);

  const label = (kind: NodeKind) => PALETTE.find(p => p.kind === kind)!.label;
  const Icon = (kind: NodeKind) => PALETTE.find(p => p.kind === kind)!.icon;

  const addNode = useCallback((kind: NodeKind, x?: number, y?: number) => {
    const id = idCounter.current++;
    setNextId(id);
    const cx = canvasRef.current?.clientWidth ?? 600;
    const px = x ?? Math.min(Math.max(24, (cx - NODE_W) * ((nextId % 5) / 4)), Math.max(24, cx - NODE_W - 24));
    const py = y ?? 30 + ((id % 4) * 78);
    setNodes(prev => [...prev, { id, kind, x: px, y: py }]);
  }, [nextId]);

  const onNodeClick = (id: number) => {
    if (connectFrom === null) { setConnectFrom(id); return; }
    if (connectFrom === id) { setConnectFrom(null); return; }
    setEdges(prev => prev.some(([a, b]) => (a === connectFrom && b === id) || (a === id && b === connectFrom))
      ? prev
      : [...prev, [connectFrom, id]]);
    setConnectFrom(null);
  };

  const removeNode = (id: number) => {
    setNodes(prev => prev.filter(n => n.id !== id));
    setEdges(prev => prev.filter(([a, b]) => a !== id && b !== id));
    setConnectFrom(null);
  };

  const reset = () => { setNodes([]); setEdges([]); setConnectFrom(null); };

  // A motion is "wired" when every consecutive pair in its chain is directly
  // connected (in either direction) among placed nodes.
  const wired = MOTIONS.filter(m => {
    const kinds = new Set(nodes.map(n => n.kind));
    if (!m.chain.every(k => kinds.has(k))) return false;
    return m.chain.slice(0, -1).every((k, idx) => {
      const a = nodes.find(n => n.kind === k)!.id;
      const b = nodes.find(n => n.kind === m.chain[idx + 1])!.id;
      return edges.some(([x, y]) => (x === a && y === b) || (x === b && y === a));
    });
  });
  const activeMotion = wired[wired.length - 1];
  const activeNodeIds = activeMotion
    ? activeMotion.chain.map(k => nodes.find(n => n.kind === k)!.id)
    : [];

  return (
    <div>
      {/* Palette */}
      <div className="flex flex-wrap gap-2 mb-4" role="toolbar" aria-label="GTM components palette">
        {PALETTE.map(entry => {
          const PIcon = entry.icon;
          return (
            <button
              key={entry.kind}
              draggable
              onDragStart={e => e.dataTransfer.setData('text/plain', entry.kind)}
              onClick={() => addNode(entry.kind)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border transition-colors hover:border-current"
              style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)', backgroundColor: 'var(--card-bg)' }}
              aria-label={`Add ${entry.label} node`}
            >
              <PIcon size={14} aria-hidden /> {entry.label}
            </button>
          );
        })}
        <button
          onClick={reset}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border ml-auto"
          style={{ borderColor: 'var(--border-color)', color: 'var(--text-tertiary)' }}
        >
          <RotateCcw size={14} aria-hidden /> Reset
        </button>
      </div>

      <p className="text-xs mb-3" style={{ color: 'var(--text-tertiary)' }}>
        Tap a component to place it. Drag to arrange. Click one node, then another, to connect them.
        {connectFrom !== null && <span className="ml-2 font-semibold" style={{ color: 'var(--accent)' }}>Connecting from “{label(nodes.find(n => n.id === connectFrom)!.kind)}” — pick a target…</span>}
      </p>

      {/* Canvas */}
      <div
        ref={canvasRef}
        className="relative rounded-xl border overflow-hidden"
        style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-secondary)', minHeight: '22rem' }}
        onDragOver={e => e.preventDefault()}
        onDrop={e => {
          e.preventDefault();
          const kind = e.dataTransfer.getData('text/plain') as NodeKind;
          if (!kind) return;
          const rect = canvasRef.current!.getBoundingClientRect();
          addNode(kind, Math.max(0, e.clientX - rect.left - NODE_W / 2), Math.max(0, e.clientY - rect.top - NODE_H / 2));
        }}
      >
        {/* dotted grid */}
        <div aria-hidden className="absolute inset-0 opacity-60" style={{
          backgroundImage: 'radial-gradient(circle, var(--border-color) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }} />

        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 2 }}>
          <defs>
            <marker id="lab-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)" />
            </marker>
          </defs>
          {edges.map(([a, b], i) => {
            const na = nodes.find(n => n.id === a)!;
            const nb = nodes.find(n => n.id === b)!;
            const x1 = na.x + NODE_W / 2, y1 = na.y + NODE_H / 2;
            const x2 = nb.x + NODE_W / 2, y2 = nb.y + NODE_H / 2;
            const inMotion = activeNodeIds.includes(a) && activeNodeIds.includes(b);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={inMotion ? 'var(--accent)' : 'var(--text-tertiary)'}
              strokeWidth={inMotion ? 2.5 : 1.5}
              strokeDasharray={inMotion ? undefined : '4 4'}
              markerEnd="url(#lab-arrow)" opacity={inMotion ? 1 : 0.7} />;
          })}
        </svg>

        {nodes.length === 0 && (
          <p className="absolute inset-0 flex items-center justify-center text-sm px-6 text-center" style={{ color: 'var(--text-tertiary)' }}>
            Empty workspace. Add an ICP, a channel and a conversion path — then wire them together.
          </p>
        )}

        {nodes.map(node => {
          const NIcon = Icon(node.kind);
          const isActive = activeNodeIds.includes(node.id);
          const isConnecting = connectFrom === node.id;
          return (
            <motion.div
              key={node.id}
              drag={!reducedMotion}
              dragMomentum={false}
              initial={reducedMotion ? false : { scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileDrag={{ scale: 1.05, cursor: 'grabbing', zIndex: 40 }}
              className="absolute rounded-lg border shadow-sm cursor-grab"
              style={{
                x: node.x, y: node.y, left: 0, top: 0, width: NODE_W, zIndex: 10,
                backgroundColor: 'var(--card-bg)',
                borderColor: isConnecting ? 'var(--accent)' : isActive ? 'var(--accent)' : 'var(--border-color)',
                borderWidth: isActive || isConnecting ? 2 : 1,
                touchAction: 'none'
              }}
            >
              <button
                type="button"
                onClick={() => onNodeClick(node.id)}
                className="w-full flex items-center gap-2 px-3 h-[52px] text-left focus-visible:outline-2 focus-visible:outline-offset-2"
                aria-label={`${label(node.kind)} node. ${isConnecting ? 'Currently selected as connection source.' : 'Activate to connect to another node.'}`}
              >
                <NIcon size={15} aria-hidden style={{ color: isActive ? 'var(--accent)' : 'var(--text-tertiary)', flexShrink: 0 }} />
                <span className="text-xs font-medium leading-tight" style={{ color: 'var(--text-primary)' }}>{label(node.kind)}</span>
              </button>
              <button
                onClick={e => { e.stopPropagation(); removeNode(node.id); }}
                className="absolute -top-2 -right-2 w-5 h-5 rounded-full border flex items-center justify-center"
                style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)', color: 'var(--text-tertiary)' }}
                aria-label={`Remove ${label(node.kind)} node`}
              >
                <Trash2 size={10} aria-hidden />
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Detected motion */}
      <div className="mt-4 min-h-[5.5rem]" aria-live="polite">
        {activeMotion ? (
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border p-4"
            style={{ borderColor: 'var(--accent)', backgroundColor: 'var(--card-bg)' }}
          >
            <p className="flex items-center gap-2 text-sm font-semibold" style={{ color: 'var(--accent)' }}>
              <Link2 size={15} aria-hidden /> {activeMotion.name} — wired
            </p>
            <p className="mt-1.5 text-sm" style={{ color: 'var(--text-secondary)' }}>{activeMotion.explanation}</p>
          </motion.div>
        ) : (
          <p className="text-sm p-4 rounded-xl border border-dashed" style={{ color: 'var(--text-tertiary)', borderColor: 'var(--border-color)' }}>
            Connect a full chain to reveal the marketing motion it creates — e.g. Cold Email → Landing Page → Lead Magnet → Automation → CRM → Pipeline.
          </p>
        )}
      </div>
    </div>
  );
}
