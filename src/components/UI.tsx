import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

export function Button({ children, variant = 'primary', size = 'md', to, onClick, className = '' }: any) {
  const base = "inline-flex items-center justify-center font-medium rounded-md transition-all";
  const sizes = { sm: "px-3 py-1.5 text-xs", md: "px-4 py-2.5 text-sm", lg: "px-6 py-3 text-base" };
  const variants = {
    primary: { backgroundColor: 'var(--accent)', color: '#fff' },
    secondary: { borderColor: 'var(--border-color)', color: 'var(--text-primary)', backgroundColor: 'transparent', border: '1px solid' },
    ghost: { color: 'var(--text-secondary)', backgroundColor: 'transparent' },
  };
  const style = variants[variant as keyof typeof variants];
  const classes = `${base} ${sizes[size as keyof typeof sizes]} ${className}`;
  if (to) return <Link to={to} className={classes} style={style}>{children}</Link>;
  return <button onClick={onClick} className={classes} style={style}>{children}</button>;
}

export function SectionHeader({ eyebrow, title, description, align = 'left' }: any) {
  return (
    <div className={align === 'center' ? 'text-center' : ''}>
      {eyebrow && <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>{eyebrow}</span>}
      <h2 className={`mt-2 text-2xl sm:text-3xl font-semibold tracking-tight ${align === 'center' ? 'mx-auto' : ''}`} style={{ color: 'var(--text-primary)', maxWidth: align === 'center' ? '36rem' : 'none' }}>{title}</h2>
      {description && <p className={`mt-3 text-base ${align === 'center' ? 'mx-auto' : ''}`} style={{ color: 'var(--text-tertiary)', maxWidth: align === 'center' ? '32rem' : 'none' }}>{description}</p>}
    </div>
  );
}

export function Card({ children, className = '', hoverable = false }: any) {
  return (
    <div className={`rounded-lg border p-6 ${hoverable ? 'transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md' : ''} ${className}`} style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
      {children}
    </div>
  );
}

export function Tag({ children, variant = 'default' }: any) {
  const style = variant === 'accent' ? { backgroundColor: 'var(--accent)', color: '#fff' } : { backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)' };
  return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" style={style}>{children}</span>;
}

export function Breadcrumb({ items }: any) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-2 text-sm">
        {items.map((item: any, i: number) => (
          <li key={i} className="flex items-center gap-2">
            {i > 0 && <span style={{ color: 'var(--text-tertiary)' }}>/</span>}
            {item.path ? <Link to={item.path} style={{ color: 'var(--text-tertiary)' }} className="hover:underline">{item.label}</Link> : <span style={{ color: 'var(--text-secondary)' }}>{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
