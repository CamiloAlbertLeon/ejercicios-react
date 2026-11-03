import React, { useState, useMemo, useEffect, useRef } from 'react';
import { norm } from './utils';
import { Btn } from './components/ui';
import { APPS, CATS, USES, byId, Hl, store, fromHash } from './catalogo';

/* ---------- aplicación ---------- */
function App() {
  const [q, setQ] = useState('');
  const [use, setUse] = useState('Todas');
  const [cur, setCur] = useState(() => fromHash() || '01');
  const [menu, setMenu] = useState(false);
  const [seen, setSeen] = useState(() => store.get('ejcs-vistos', []));
  const search = useRef(null);
  const main = useRef(null);

  useEffect(() => {
    const f = () => { const h = fromHash(); if (h) setCur(h); };
    window.addEventListener('hashchange', f);
    const k = (e) => {
      const tag = (e.target.tagName || '').toLowerCase();
      if (e.key === '/' && tag !== 'input' && tag !== 'textarea') { e.preventDefault(); search.current && search.current.focus(); setMenu(true); }
    };
    window.addEventListener('keydown', k);
    return () => { window.removeEventListener('hashchange', f); window.removeEventListener('keydown', k); };
  }, []);
  useEffect(() => {
    setSeen((s) => { if (s.includes(cur)) return s; const n = [...s, cur]; store.set('ejcs-vistos', n); return n; });
  }, [cur]);

  const list = useMemo(() => {
    const words = norm(q.trim()).split(/\s+/).filter(Boolean);
    return APPS.filter((a) => (use === 'Todas' || a.uses.includes(use)) && words.every((w) => a.hay.includes(w)));
  }, [q, use]);

  const go = (id) => {
    setCur(id); setMenu(false);
    try { history.replaceState(null, '', '#ej-' + id); } catch (e) { location.hash = 'ej-' + id; }
    if (main.current) main.current.scrollIntoView({ block: 'start', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };
  const app = byId(cur);
  const order = list.some((a) => a.id === cur) ? list : APPS;
  const pos = order.findIndex((a) => a.id === cur);
  const prev = pos > 0 ? order[pos - 1] : null, next = pos >= 0 && pos < order.length - 1 ? order[pos + 1] : null;
  const random = () => { const pool = APPS.filter((a) => a.id !== cur); go(pool[Math.floor(Math.random() * pool.length)].id); };
  const C = app.C;

  return (
    <div className="shell">
      <header className="top">
        <div className="brand">
          <span className="lang"><b>C#</b><i aria-hidden="true">→</i><b>React</b></span>
          <h1>Ejercicios de consola, ahora interactivos</h1>
          <p>Los 30 programas de C# de Braulio Ricardo Alvarez Gonzaga, rehechos en React: calculan mientras escribes y muestran la consola original al lado.</p>
        </div>
        <div className="progress" title="Apps que ya abriste en este navegador">
          <b>{seen.length}</b><span>de 30 apps abiertas</span>
          <div className="progress-track"><i style={{ width: (seen.length / 30) * 100 + '%' }} /></div>
        </div>
      </header>

      <div className="layout">
        <nav className={'side ' + (menu ? 'open' : '')} aria-label="Ejercicios">
          <div className="search">
            <label htmlFor="buscar" className="sr">Buscar ejercicio</label>
            <svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.5" /><path d="M13 13l4 4" /></svg>
            <input id="buscar" ref={search} type="search" placeholder="Buscar: iva, factorial, 24…" value={q}
              onChange={(e) => { setQ(e.target.value); setMenu(true); }}
              onKeyDown={(e) => { if (e.key === 'Enter' && list[0]) go(list[0].id); if (e.key === 'Escape') setQ(''); }} />
            <kbd aria-hidden="true">/</kbd>
          </div>
          <div className="filters" role="group" aria-label="Filtrar por estructura de control">
            {USES.map((u) => <button key={u} type="button" className={'filter ' + (use === u ? 'on' : '')} aria-pressed={use === u} onClick={() => setUse(u)}>{u}</button>)}
          </div>
          <button type="button" className="menu-toggle" aria-expanded={menu} onClick={() => setMenu(!menu)}>
            {menu ? 'Ocultar la lista' : `Ver los ${list.length} ejercicios`}
          </button>
          <div className="list">
            <p className="result-count">{list.length === APPS.length ? '30 ejercicios' : `${list.length} de 30`}</p>
            {CATS.map((cat) => {
              const items = list.filter((a) => a.cat === cat);
              if (!items.length) return null;
              return (
                <section key={cat}>
                  <h3>{cat}</h3>
                  {items.map((a) => (
                    <button key={a.id} type="button" className={'item ' + (a.id === cur ? 'cur' : '')} aria-current={a.id === cur ? 'page' : undefined} onClick={() => go(a.id)}>
                      <span className="num">{a.id}</span>
                      <span className="t"><Hl text={a.title} q={q} /></span>
                      {seen.includes(a.id) && a.id !== cur && <i className="seen" title="Ya la abriste" />}
                    </button>
                  ))}
                </section>
              );
            })}
            {!list.length && (
              <div className="empty">
                <p>Nada coincide con «{q}»{use !== 'Todas' ? ` usando ${use}` : ''}.</p>
                <Btn kind="ghost" onClick={() => { setQ(''); setUse('Todas'); }}>Quitar filtros</Btn>
              </div>
            )}
          </div>
        </nav>

        <main ref={main} className="main">
          <article className="sheet" key={app.id}>
            <header className="sheet-head">
              <p className="eyebrow">Ejercicio {app.id} · {app.cat}</p>
              <h2>{app.title}</h2>
              <div className="uses">{app.uses.map((u) => <button key={u} type="button" className="use" onClick={() => { setUse(u); setMenu(true); }} title={`Ver ejercicios con ${u}`}>{u}</button>)}</div>
              <p className="desc">{app.desc}</p>
            </header>
            <C />
          </article>
          <div className="pager">
            <button type="button" className="pg" disabled={!prev} onClick={() => prev && go(prev.id)}>
              <small>Anterior</small><span>{prev ? `${prev.id} · ${prev.title}` : '—'}</span>
            </button>
            <button type="button" className="pg dice" onClick={random}><small>Sorpresa</small><span>App al azar</span></button>
            <button type="button" className="pg end" disabled={!next} onClick={() => next && go(next.id)}>
              <small>Siguiente</small><span>{next ? `${next.id} · ${next.title}` : '—'}</span>
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
