import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';

const NAV = [
  { path: '/',          label: 'Dashboard',   icon: '📊' },
  { path: '/lernplan',  label: 'Lernplan',    icon: '📅' },
  { path: '/faecher',   label: 'Fächer',      icon: '📚' },
  { path: '/fortschritt', label: 'Fortschritt', icon: '📈' },
];

export default function AppLayout() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div style={{ minHeight: '100vh', background: '#0d0f14', color: '#e8eaf0', fontFamily: "'Syne', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;600;700;800&display=swap');
        .nav-link { display:flex;align-items:center;gap:10px;padding:10px 16px;border-radius:10px;text-decoration:none;color:#7b7f94;font-size:0.88rem;font-weight:600;transition:all 0.2s; }
        .nav-link:hover { background:rgba(108,99,255,0.1);color:#e8eaf0; }
        .nav-link.active { background:rgba(108,99,255,0.18);color:#6c63ff;border-left:3px solid #6c63ff; }
        .mobile-nav-link { display:flex;align-items:center;gap:8px;padding:12px 20px;text-decoration:none;color:#7b7f94;font-size:0.9rem;font-weight:600;transition:all 0.2s;border-bottom:1px solid #252836; }
        .mobile-nav-link.active { color:#6c63ff;background:rgba(108,99,255,0.1); }
        .sidebar { width:220px;min-height:100vh;background:#13161e;border-right:1px solid #252836;padding:20px 12px;display:flex;flex-direction:column;gap:4px;position:fixed;top:0;left:0;z-index:100; }
        .main-content { margin-left:220px;min-height:100vh; }
        @media(max-width:768px){
          .sidebar{display:none;}
          .main-content{margin-left:0;}
        }
        .mobile-header { display:none;align-items:center;justify-content:space-between;padding:12px 16px;background:#13161e;border-bottom:1px solid #252836;position:sticky;top:0;z-index:99; }
        @media(max-width:768px){.mobile-header{display:flex;}}
        .hamburger { background:none;border:1px solid #252836;border-radius:8px;padding:6px 10px;color:#e8eaf0;cursor:pointer;font-size:1.2rem; }
        .mobile-menu { position:fixed;top:0;left:0;right:0;bottom:0;background:#13161e;z-index:200;display:flex;flex-direction:column; }
        .mobile-menu-header { display:flex;align-items:center;justify-content:space-between;padding:16px 20px;border-bottom:1px solid #252836; }
      `}</style>

      {/* Sidebar Desktop */}
      <div className="sidebar">
        <div style={{ marginBottom: '24px', padding: '0 4px' }}>
          <div style={{ fontSize: '1.2rem', fontWeight: 800, background: 'linear-gradient(90deg,#6c63ff,#00e5ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Lernplattform
          </div>
          <div style={{ fontSize: '0.65rem', color: '#7b7f94', marginTop: '3px' }}>BW · Abitur</div>
        </div>
        {NAV.map(n => (
          <Link key={n.path} to={n.path} className={`nav-link${location.pathname === n.path ? ' active' : ''}`}>
            <span>{n.icon}</span> {n.label}
          </Link>
        ))}
      </div>

      {/* Mobile Header */}
      <div className="mobile-header">
        <div style={{ fontWeight: 800, fontSize: '1rem', background: 'linear-gradient(90deg,#6c63ff,#00e5ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Lernplattform BW
        </div>
        <button className="hamburger" onClick={() => setMenuOpen(true)}>☰</button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-header">
            <div style={{ fontWeight: 800, fontSize: '1rem', background: 'linear-gradient(90deg,#6c63ff,#00e5ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Lernplattform BW
            </div>
            <button className="hamburger" onClick={() => setMenuOpen(false)}>✕</button>
          </div>
          {NAV.map(n => (
            <Link key={n.path} to={n.path} className={`mobile-nav-link${location.pathname === n.path ? ' active' : ''}`} onClick={() => setMenuOpen(false)}>
              <span>{n.icon}</span> {n.label}
            </Link>
          ))}
        </div>
      )}

      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
}