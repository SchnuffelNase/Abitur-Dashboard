import React, { useEffect, useRef } from 'react';

export default function Dashboard() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Inject the original dashboard script after mount
    const script = document.createElement('script');
    script.textContent = DASHBOARD_SCRIPT;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <style>{DASHBOARD_STYLES}</style>
      <div dangerouslySetInnerHTML={{ __html: DASHBOARD_HTML }} ref={containerRef} />
    </div>
  );
}

const DASHBOARD_STYLES = `
  :root{
    --bg:#0d0f14;--surface:#13161e;--surface2:#1a1e2a;--border:#252836;
    --accent:#6c63ff;--accent2:#00e5ff;
    --red:#ff4d6d;--red-bg:rgba(255,77,109,0.12);
    --orange:#ff9a3c;--orange-bg:rgba(255,154,60,0.12);
    --green:#00e676;--green-bg:rgba(0,230,118,0.12);
    --text:#e8eaf0;--muted:#7b7f94;
    --fh:'Syne',sans-serif;--fm:'Space Mono',monospace;
  }
  .db-wrap *{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent;}
  .db-wrap{font-family:var(--fh);background:var(--bg);color:var(--text);position:relative;}
  .db-wrap::before{
    content:'';position:fixed;inset:0;
    background-image:linear-gradient(rgba(108,99,255,0.03) 1px,transparent 1px),
      linear-gradient(90deg,rgba(108,99,255,0.03) 1px,transparent 1px);
    background-size:40px 40px;z-index:0;pointer-events:none;
  }
  .db-wrap .wrapper{position:relative;z-index:1;max-width:1100px;margin:0 auto;padding:20px 14px 60px;}
  .db-wrap .info-btn{display:inline-flex;align-items:center;justify-content:center;width:16px;height:16px;border-radius:50%;background:rgba(108,99,255,0.2);border:1px solid rgba(108,99,255,0.4);color:var(--accent);font-size:0.6rem;font-family:var(--fm);font-weight:700;cursor:pointer;flex-shrink:0;line-height:1;transition:background 0.2s,border-color 0.2s;position:relative;}
  .db-wrap .info-btn:hover{background:rgba(108,99,255,0.35);border-color:var(--accent);}
  .db-wrap .tooltip-box{display:none;position:fixed;z-index:9999;max-width:280px;background:#1e2236;border:1px solid rgba(108,99,255,0.35);border-radius:10px;padding:12px 14px;font-size:0.72rem;font-family:var(--fh);color:var(--text);line-height:1.6;box-shadow:0 8px 30px rgba(0,0,0,0.5);pointer-events:none;}
  .db-wrap .tooltip-box.visible{display:block;}
  .db-wrap .tb-title{font-size:0.68rem;font-weight:700;color:var(--accent2);margin-bottom:6px;text-transform:uppercase;letter-spacing:1px;}
  .db-wrap .tb-body{color:#b0b4c8;line-height:1.6;white-space:pre-line;}
  .db-wrap header{display:flex;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:10px;margin-bottom:24px;padding-bottom:16px;border-bottom:1px solid var(--border);}
  .db-wrap .logo{font-size:clamp(1.4rem,5vw,2rem);font-weight:800;letter-spacing:-1px;background:linear-gradient(90deg,var(--accent),var(--accent2));-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
  .db-wrap .logo-sub{display:flex;align-items:center;gap:6px;margin-top:3px;}
  .db-wrap .logo-sub span{font-size:clamp(0.68rem,2.3vw,0.85rem);font-weight:400;color:var(--muted);}
  .db-wrap .header-right{display:flex;align-items:center;gap:8px;flex-wrap:wrap;}
  .db-wrap .semester-badge{display:flex;align-items:center;gap:6px;font-family:var(--fm);font-size:clamp(0.58rem,1.8vw,0.68rem);color:var(--accent2);border:1px solid var(--accent2);padding:5px 12px;border-radius:20px;opacity:0.85;white-space:nowrap;}
  .db-wrap .btn-reset{display:flex;align-items:center;gap:5px;background:rgba(255,154,60,0.1);border:1px solid rgba(255,154,60,0.35);color:var(--orange);font-family:var(--fm);font-size:clamp(0.58rem,1.8vw,0.68rem);padding:6px 12px;border-radius:20px;cursor:pointer;white-space:nowrap;transition:background 0.2s,border-color 0.2s,transform 0.15s;}
  .db-wrap .btn-reset:hover{background:rgba(255,154,60,0.22);border-color:var(--orange);transform:scale(1.03);}
  .db-wrap .btn-reset:active{transform:scale(0.97);}
  .db-wrap .btn-reset svg{width:11px;height:11px;fill:none;stroke:var(--orange);stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round;flex-shrink:0;}
  .db-wrap .choice-banner{background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:18px 20px;margin-bottom:18px;animation:dbFadeIn 0.4s ease both;}
  .db-wrap .choice-title{display:flex;align-items:center;gap:8px;font-size:0.68rem;text-transform:uppercase;letter-spacing:2px;color:var(--muted);margin-bottom:14px;}
  .db-wrap .choice-title::after{content:'';flex:1;height:1px;background:var(--border);}
  .db-wrap .choice-tag{display:inline-flex;align-items:center;gap:4px;font-size:0.6rem;font-family:var(--fm);padding:2px 8px;border-radius:10px;background:rgba(255,154,60,0.15);color:var(--orange);border:1px solid rgba(255,154,60,0.3);animation:dbPulseTag 2s infinite;}
  @keyframes dbPulseTag{0%,100%{opacity:1;}50%{opacity:0.6;}}
  .db-wrap .choice-options{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
  @media(max-width:480px){.db-wrap .choice-options{grid-template-columns:1fr;}}
  .db-wrap .choice-card{border:2px solid var(--border);border-radius:12px;padding:16px;cursor:pointer;transition:border-color 0.2s,background 0.2s,transform 0.15s,box-shadow 0.2s;position:relative;overflow:hidden;}
  .db-wrap .choice-card:hover{border-color:var(--accent);transform:translateY(-2px);}
  .db-wrap .choice-card:active{transform:scale(0.98);}
  .db-wrap .choice-card.selected{border-color:var(--accent2);background:rgba(0,229,255,0.05);box-shadow:0 0 0 1px rgba(0,229,255,0.2),0 4px 20px rgba(0,229,255,0.08);}
  .db-wrap .choice-card.rejected{border-color:var(--border);opacity:0.45;}
  .db-wrap .choice-card-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;}
  .db-wrap .choice-fach-name{font-size:1rem;font-weight:800;}
  .db-wrap .choice-check{width:22px;height:22px;border-radius:50%;border:2px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:0.75rem;transition:all 0.2s;flex-shrink:0;}
  .db-wrap .choice-card.selected .choice-check{background:var(--accent2);border-color:var(--accent2);color:#000;font-weight:700;}
  .db-wrap .choice-pros{list-style:none;display:flex;flex-direction:column;gap:5px;}
  .db-wrap .choice-pros li{display:flex;align-items:flex-start;gap:6px;font-size:0.72rem;color:var(--muted);line-height:1.4;}
  .db-wrap .choice-pros li::before{content:'✓';color:var(--green);font-size:0.7rem;flex-shrink:0;margin-top:1px;}
  .db-wrap .choice-cons{list-style:none;display:flex;flex-direction:column;gap:5px;margin-top:8px;}
  .db-wrap .choice-cons li{display:flex;align-items:flex-start;gap:6px;font-size:0.72rem;color:var(--muted);line-height:1.4;}
  .db-wrap .choice-cons li::before{content:'✗';color:var(--red);font-size:0.7rem;flex-shrink:0;margin-top:1px;}
  .db-wrap .choice-pts-badge{display:inline-flex;align-items:center;gap:4px;font-family:var(--fm);font-size:0.65rem;padding:2px 8px;border-radius:8px;margin-bottom:8px;}
  .db-wrap .choice-pts-badge.orange{background:var(--orange-bg);color:var(--orange);border:1px solid rgba(255,154,60,0.2);}
  .db-wrap .choice-hint{margin-top:12px;padding:10px 14px;border-radius:8px;background:rgba(108,99,255,0.08);border:1px solid rgba(108,99,255,0.2);font-size:0.7rem;color:var(--muted);line-height:1.5;display:flex;gap:8px;}
  .db-wrap .choice-hint strong{color:var(--accent2);}
  .db-wrap .summary-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:16px;}
  @media(min-width:600px){.db-wrap .summary-grid{grid-template-columns:repeat(4,1fr);}}
  .db-wrap .summary-card{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:14px 14px 12px;position:relative;overflow:hidden;cursor:pointer;user-select:none;transition:transform 0.2s,border-color 0.2s,box-shadow 0.2s;}
  .db-wrap .summary-card:active{transform:scale(0.97);}
  @media(min-width:600px){.db-wrap .summary-card:hover{transform:translateY(-2px);border-color:var(--accent);}}
  .db-wrap .summary-card.active-filter{border-color:var(--accent2)!important;box-shadow:0 0 0 2px rgba(0,229,255,0.22),0 4px 20px rgba(0,229,255,0.1);transform:translateY(-2px);}
  .db-wrap .summary-card::before{content:'';position:absolute;top:0;left:0;height:3px;width:100%;}
  .db-wrap .summary-card.purple::before{background:var(--accent);}
  .db-wrap .summary-card.cyan::before{background:var(--accent2);}
  .db-wrap .summary-card.sred::before{background:var(--red);}
  .db-wrap .summary-card.sgreen::before{background:var(--green);}
  .db-wrap .sc-header{display:flex;align-items:center;gap:5px;margin-bottom:6px;}
  .db-wrap .sc-label{font-size:0.6rem;color:var(--muted);text-transform:uppercase;letter-spacing:1px;line-height:1.3;}
  .db-wrap .sc-val-row{display:flex;align-items:baseline;gap:6px;flex-wrap:wrap;}
  .db-wrap .sc-main{font-size:1.8rem;font-weight:800;font-family:var(--fm);line-height:1;}
  .db-wrap .sc-count{font-size:0.72rem;font-family:var(--fm);color:var(--muted);background:var(--surface2);border:1px solid var(--border);padding:1px 6px;border-radius:10px;line-height:1.6;}
  .db-wrap .sc-count.red{color:var(--red);background:var(--red-bg);border-color:rgba(255,77,109,0.2);}
  .db-wrap .sc-count.green{color:var(--green);background:var(--green-bg);border-color:rgba(0,230,118,0.2);}
  .db-wrap .summary-card .sub{font-size:0.61rem;color:var(--muted);margin-top:5px;}
  .db-wrap .summary-card .hint{font-size:0.57rem;color:var(--accent2);margin-top:5px;opacity:0;transition:opacity 0.2s;}
  .db-wrap .summary-card:hover .hint,.db-wrap .summary-card.active-filter .hint{opacity:1;}
  .db-wrap .summary-card.active-filter .hint{color:var(--orange);}
  .db-wrap .filter-banner{display:none;align-items:center;gap:10px;background:rgba(0,229,255,0.06);border:1px solid rgba(0,229,255,0.22);border-radius:10px;padding:10px 14px;margin-bottom:12px;font-size:0.76rem;color:var(--accent2);flex-wrap:wrap;}
  .db-wrap .filter-banner.visible{display:flex;}
  .db-wrap .filter-banner strong{font-family:var(--fm);}
  .db-wrap .clear-btn{cursor:pointer;font-family:var(--fm);font-size:0.65rem;color:var(--muted);border:1px solid var(--border);padding:3px 10px;border-radius:6px;background:var(--surface2);transition:color 0.2s,border-color 0.2s;white-space:nowrap;}
  .db-wrap .clear-btn:hover{color:var(--text);border-color:var(--muted);}
  .db-wrap .alert-bar{display:flex;align-items:flex-start;gap:8px;background:rgba(255,77,109,0.08);border:1px solid rgba(255,77,109,0.25);border-radius:10px;padding:10px 14px;margin-bottom:8px;font-size:0.76rem;animation:dbPulseBorder 2.5s infinite;}
  @keyframes dbPulseBorder{0%,100%{border-color:rgba(255,77,109,0.25);}50%{border-color:rgba(255,77,109,0.55);}}
  .db-wrap .alert-pts{font-family:var(--fm);font-weight:700;color:var(--red);}
  .db-wrap .main-grid{display:grid;grid-template-columns:1fr;gap:16px;}
  @media(min-width:700px){.db-wrap .main-grid{grid-template-columns:1fr 1fr;gap:20px;}}
  .db-wrap .card{background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:18px;transition:border-color 0.2s;animation:dbFadeIn 0.4s ease both;}
  @media(min-width:600px){.db-wrap .card{padding:22px;}}
  .db-wrap .card:hover{border-color:#33364a;}
  .db-wrap .card.full{grid-column:1/-1;}
  .db-wrap .card:nth-child(1){animation-delay:0.05s}.db-wrap .card:nth-child(2){animation-delay:0.1s}.db-wrap .card:nth-child(3){animation-delay:0.15s}.db-wrap .card:nth-child(4){animation-delay:0.2s}.db-wrap .card:nth-child(5){animation-delay:0.25s}
  @keyframes dbFadeIn{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
  .db-wrap .card-title{font-size:0.65rem;text-transform:uppercase;letter-spacing:1.8px;color:var(--muted);margin-bottom:14px;display:flex;align-items:center;gap:8px;}
  .db-wrap .card-title::after{content:'';flex:1;height:1px;background:var(--border);}
  .db-wrap .section-sub{display:flex;align-items:center;gap:6px;font-size:0.65rem;color:var(--muted);margin-bottom:10px;flex-wrap:wrap;}
  .db-wrap .subject-list{display:flex;flex-direction:column;gap:8px;}
  .db-wrap .subject-row{border-radius:10px;background:var(--surface2);padding:10px 12px;border:1px solid transparent;transition:background 0.2s,box-shadow 0.25s,border-color 0.25s,opacity 0.25s;}
  .db-wrap .subject-row:hover{background:#1e2233;}
  .db-wrap .subject-row.highlighted{border-color:var(--accent2);box-shadow:0 0 0 1px rgba(0,229,255,0.18),0 2px 14px rgba(0,229,255,0.09);background:rgba(0,229,255,0.04);}
  .db-wrap .subject-row.dimmed{opacity:0.25;}
  .db-wrap .row-inner{display:flex;align-items:center;gap:8px;}
  .db-wrap .badge{font-size:0.58rem;font-family:var(--fm);padding:2px 5px;border-radius:4px;font-weight:700;flex-shrink:0;}
  .db-wrap .badge.L{background:rgba(108,99,255,0.2);color:var(--accent);border:1px solid rgba(108,99,255,0.3);}
  .db-wrap .badge.P{background:rgba(0,229,255,0.1);color:var(--accent2);border:1px solid rgba(0,229,255,0.2);}
  .db-wrap .badge.E{background:rgba(255,154,60,0.15);color:var(--orange);border:1px solid rgba(255,154,60,0.3);}
  .db-wrap .subject-name{flex:1;font-size:clamp(0.78rem,2.5vw,0.88rem);font-weight:600;min-width:0;}
  .db-wrap .stepper{display:flex;align-items:center;border:1px solid var(--border);border-radius:8px;overflow:hidden;flex-shrink:0;background:var(--bg);}
  .db-wrap .stepper-btn{width:28px;height:34px;display:flex;align-items:center;justify-content:center;background:none;border:none;color:var(--muted);cursor:pointer;font-size:0.9rem;transition:background 0.15s,color 0.15s;flex-shrink:0;-webkit-user-select:none;user-select:none;}
  .db-wrap .stepper-btn:hover{background:var(--surface2);color:var(--text);}
  .db-wrap .stepper-btn:active{background:var(--border);}
  .db-wrap .pts-input{width:34px;background:var(--bg);border:none;border-left:1px solid var(--border);border-right:1px solid var(--border);color:var(--text);font-family:var(--fm);font-size:0.9rem;font-weight:700;text-align:center;padding:4px 2px;outline:none;-moz-appearance:textfield;}
  .db-wrap .pts-input::-webkit-inner-spin-button,.db-wrap .pts-input::-webkit-outer-spin-button{-webkit-appearance:none;}
  .db-wrap .pts-input:focus{background:rgba(108,99,255,0.08);}
  .db-wrap .note-pill{font-size:0.68rem;font-family:var(--fm);padding:3px 8px;border-radius:20px;min-width:56px;text-align:center;flex-shrink:0;}
  .db-wrap .note-pill.col-red{background:var(--red-bg);color:var(--red);border:1px solid rgba(255,77,109,0.2);}
  .db-wrap .note-pill.col-orange{background:var(--orange-bg);color:var(--orange);border:1px solid rgba(255,154,60,0.2);}
  .db-wrap .note-pill.col-green{background:var(--green-bg);color:var(--green);border:1px solid rgba(0,230,118,0.2);}
  .db-wrap .priority-dot{width:7px;height:7px;border-radius:50%;flex-shrink:0;}
  .db-wrap .priority-dot.col-red{background:var(--red);box-shadow:0 0 5px var(--red);}
  .db-wrap .priority-dot.col-orange{background:var(--orange);box-shadow:0 0 5px var(--orange);}
  .db-wrap .priority-dot.col-green{background:var(--green);box-shadow:0 0 5px var(--green);}
  .db-wrap .bar-wrap{padding:0 16px;margin-top:5px;}
  .db-wrap .bar-container{height:3px;background:var(--border);border-radius:3px;overflow:hidden;}
  .db-wrap .bar-fill{height:100%;border-radius:3px;transition:width 0.5s ease;}
  @keyframes dbFlashReset{0%{background:rgba(255,154,60,0.22);}100%{background:var(--surface2);}}
  .db-wrap .subject-row.flash-reset{animation:dbFlashReset 0.65s ease;}
  .db-wrap .abi-row{display:flex;align-items:flex-end;gap:20px;flex-wrap:wrap;margin-bottom:12px;}
  .db-wrap .abi-score{font-size:clamp(2.8rem,8vw,4.2rem);font-weight:800;font-family:var(--fm);line-height:1;background:linear-gradient(135deg,var(--accent),var(--accent2));-webkit-background-clip:text;-webkit-text-fill-color:transparent;transition:all 0.4s;}
  .db-wrap .abi-score-label{font-size:0.72rem;color:var(--muted);padding-bottom:8px;}
  .db-wrap .progress-bar-outer{background:var(--border);border-radius:8px;height:7px;overflow:hidden;margin-bottom:10px;}
  .db-wrap .progress-bar-inner{height:100%;border-radius:8px;background:linear-gradient(90deg,var(--accent),var(--accent2));transition:width 0.6s ease;}
  .db-wrap .scenario-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-top:12px;}
  @media(max-width:420px){.db-wrap .scenario-grid{grid-template-columns:1fr;}}
  .db-wrap .scenario-card{background:var(--surface2);border-radius:10px;padding:12px;border:1px solid var(--border);text-align:center;transition:border-color 0.2s,transform 0.2s;}
  .db-wrap .scenario-card:hover{border-color:var(--accent);transform:translateY(-2px);}
  .db-wrap .sc-lbl{font-size:0.6rem;color:var(--muted);text-transform:uppercase;letter-spacing:1px;}
  .db-wrap .sc-v{font-size:1.5rem;font-weight:800;font-family:var(--fm);margin:4px 0;}
  .db-wrap .sc-d{font-size:0.6rem;color:var(--muted);}
  .db-wrap .priority-list{display:flex;flex-direction:column;gap:10px;}
  .db-wrap .prio-item{display:flex;align-items:flex-start;gap:10px;padding:12px;border-radius:10px;border-left:3px solid;}
  .db-wrap .prio-item.red{background:var(--red-bg);border-color:var(--red);}
  .db-wrap .prio-item.orange{background:var(--orange-bg);border-color:var(--orange);}
  .db-wrap .prio-item.green{background:var(--green-bg);border-color:var(--green);}
  .db-wrap .prio-icon{font-size:1.1rem;flex-shrink:0;margin-top:1px;}
  .db-wrap .prio-title{display:flex;align-items:center;gap:6px;font-size:0.78rem;font-weight:700;margin-bottom:3px;}
  .db-wrap .prio-desc{font-size:0.69rem;color:var(--muted);line-height:1.5;}
  .db-wrap .exam-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
  .db-wrap .exam-box{background:var(--surface2);border-radius:10px;padding:12px;border:1px solid var(--border);}
  .db-wrap .exam-box-title{display:flex;align-items:center;gap:6px;font-size:0.6rem;text-transform:uppercase;letter-spacing:1.5px;color:var(--muted);margin-bottom:8px;}
  .db-wrap .exam-item{display:flex;align-items:center;gap:7px;font-size:0.8rem;padding:5px 0;border-bottom:1px solid var(--border);}
  .db-wrap .exam-item:last-child{border-bottom:none;}
  .db-wrap .exam-item .check{color:var(--green);}
  .db-wrap .exam-item .cross{color:var(--red);}
  .db-wrap .exam-choice-row{display:flex;align-items:center;gap:7px;font-size:0.8rem;padding:6px 8px;border-radius:7px;border:1px solid var(--accent2);background:rgba(0,229,255,0.05);margin-top:4px;}
  .db-wrap .imp-table{width:100%;border-collapse:collapse;background:var(--surface2);border-radius:10px;overflow:hidden;}
  .db-wrap .imp-table th{padding:7px 8px;text-align:left;font-size:0.6rem;color:var(--muted);font-weight:600;text-transform:uppercase;letter-spacing:1px;background:var(--border);}
  .db-wrap .imp-table td{padding:7px 8px;font-size:0.75rem;border-bottom:1px solid rgba(255,255,255,0.03);}
  .db-wrap .imp-table tr:last-child td{border-bottom:none;}
  .db-wrap .links-grid{display:grid;grid-template-columns:1fr;gap:8px;}
  @media(min-width:480px){.db-wrap .links-grid{grid-template-columns:repeat(2,1fr);}}
  @media(min-width:800px){.db-wrap .links-grid{grid-template-columns:repeat(3,1fr);}}
  .db-wrap .link-chip{display:flex;align-items:center;gap:8px;background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:10px 12px;text-decoration:none;color:var(--text);font-size:0.76rem;transition:border-color 0.2s,color 0.2s;}
  .db-wrap .link-chip:hover{border-color:var(--accent2);color:var(--accent2);}
  .db-wrap .link-chip .arrow{margin-left:auto;opacity:0.35;font-size:0.68rem;flex-shrink:0;}
  .db-wrap footer{margin-top:36px;padding-top:14px;border-top:1px solid var(--border);text-align:center;font-size:0.68rem;color:var(--muted);font-family:'Space Mono',monospace;}
`;

const DASHBOARD_HTML = `
<div class="db-wrap">
<div class="tooltip-box" id="tooltipBox"><div class="tb-title" id="ttTitle"></div><div class="tb-body" id="ttBody"></div></div>
<div class="wrapper">
  <header>
    <div>
      <div class="logo">Lernplattform</div>
      <div class="logo-sub">
        <span>Baden-Württemberg · Abitur Dashboard</span>
        <span class="info-btn" data-tip="header-bw">i</span>
      </div>
    </div>
    <div class="header-right">
      <button class="btn-reset" id="btnReset">
        <svg viewBox="0 0 24 24"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4"/></svg>
        Aktuellen Stand wiederherstellen
      </button>
      <div class="semester-badge">
        Jahrgangsstufe 1 · 1. Kurshalbjahr
        <span class="info-btn" data-tip="semester">i</span>
      </div>
    </div>
  </header>

  <div class="choice-banner">
    <div class="choice-title">
      3. Schriftliche Prüfung – Deine Wahl
      <span class="choice-tag" id="choiceTag">⚡ Noch nicht entschieden</span>
      <span class="info-btn" data-tip="exam-choice-info">i</span>
    </div>
    <div class="choice-options">
      <div class="choice-card" id="choiceDE" onclick="dbSelectExam('deutsch')">
        <div class="choice-card-header">
          <div>
            <div class="choice-fach-name">Deutsch</div>
            <div class="choice-pts-badge orange">Aktuell: <span id="choiceDE_pts">6</span> Punkte · Note 4</div>
          </div>
          <div class="choice-check" id="checkDE">✓</div>
        </div>
        <ul class="choice-pros">
          <li>Aufsatz & Analyse – gut trainierbar</li>
          <li>Keine reinen Auswendiglern-Inhalte</li>
          <li>Mit Übung schnell verbesserbar</li>
          <li>Klare Bewertungskriterien</li>
        </ul>
        <ul class="choice-cons">
          <li>Schreibdruck unter Zeitdruck</li>
          <li>Note hängt von Tagesform ab</li>
        </ul>
      </div>
      <div class="choice-card" id="choiceGE" onclick="dbSelectExam('geschichte')">
        <div class="choice-card-header">
          <div>
            <div class="choice-fach-name">Geschichte (L)</div>
            <div class="choice-pts-badge orange">Aktuell: <span id="choiceGE_pts">6</span> Punkte · Note 4</div>
          </div>
          <div class="choice-check" id="checkGE">✓</div>
        </div>
        <ul class="choice-pros">
          <li>Leistungsfach – bereits vertraut</li>
          <li>Breites Allgemeinwissen als Basis</li>
          <li>Themen aus dem Unterricht bekannt</li>
        </ul>
        <ul class="choice-cons">
          <li>Sehr viel Faktenwissen auswendig</li>
          <li>Schwerer, Punkte nachträglich zu holen</li>
          <li>Zeitaufwand hoch</li>
        </ul>
      </div>
    </div>
    <div class="choice-hint" id="choiceHint">
      <span>💡</span>
      <span id="choiceHintText">Klicke auf <strong>Deutsch</strong> oder <strong>Geschichte</strong>, um dein 3. schriftliches Prüfungsfach festzulegen.</span>
    </div>
  </div>

  <div class="summary-grid">
    <div class="summary-card purple" data-filter="all">
      <div class="sc-header"><div class="sc-label">Ø Punkte</div><span class="info-btn" data-tip="avg-pts">i</span></div>
      <div class="sc-val-row"><span class="sc-main" id="avgPoints">–</span></div>
      <div class="sub">Durchschnitt aller Fächer</div>
      <div class="hint">▶ alle Fächer markieren</div>
    </div>
    <div class="summary-card cyan" data-filter="exam">
      <div class="sc-header"><div class="sc-label">Tendenz Abi-Note</div><span class="info-btn" data-tip="abi-tendency">i</span></div>
      <div class="sc-val-row"><span class="sc-main" id="abiTendency">–</span></div>
      <div class="sub">Geschätzte Endnote</div>
      <div class="hint">▶ Prüfungsfächer markieren</div>
    </div>
    <div class="summary-card sred" data-filter="critical">
      <div class="sc-header"><div class="sc-label">Kritische Fächer</div><span class="info-btn" data-tip="critical">i</span></div>
      <div class="sc-val-row">
        <span class="sc-main" id="critLabel">–</span>
        <span class="sc-count red" id="critCount" style="display:none"></span>
      </div>
      <div class="sub">Unter 5 Punkte (Note 5)</div>
      <div class="hint">▶ kritische markieren</div>
    </div>
    <div class="summary-card sgreen" data-filter="stable">
      <div class="sc-header"><div class="sc-label">Stabile Fächer</div><span class="info-btn" data-tip="stable">i</span></div>
      <div class="sc-val-row">
        <span class="sc-main" id="stableLabel">–</span>
        <span class="sc-count green" id="stableCount" style="display:none"></span>
      </div>
      <div class="sub">8 oder mehr Punkte</div>
      <div class="hint">▶ stabile markieren</div>
    </div>
  </div>

  <div class="filter-banner" id="filterBanner">
    <span>🔍 Filter aktiv: <strong id="filterLabel">–</strong></span>
    <span class="clear-btn" id="clearFilter">✕ Filter aufheben</span>
  </div>
  <div id="alertsArea"></div>

  <div class="main-grid">
    <div class="card">
      <div class="card-title">Notenübersicht · Punkte eingeben <span class="info-btn" data-tip="points-entry">i</span></div>
      <div class="section-sub">
        0–15 Punkte ·
        <span class="badge L">L</span> = Leistungsfach ·
        <span class="badge P">P</span> = Prüfungsfach ·
        <span class="badge E">E?</span> = mögliches Prüfungsfach
      </div>
      <div class="subject-list" id="subjectList"></div>
    </div>

    <div class="card">
      <div class="card-title">Strategische Prioritäten <span class="info-btn" data-tip="strategy">i</span></div>
      <div class="priority-list">
        <div class="prio-item red">
          <div class="prio-icon">🔴</div>
          <div>
            <div class="prio-title">Kategorie 1 – Retten</div>
            <div class="prio-desc">Psychologie, Geographie</div>
            <div class="prio-desc" style="margin-top:3px">Wöchentlich lernen · Ziel: 5–6 Punkte</div>
          </div>
        </div>
        <div class="prio-item orange">
          <div class="prio-icon">🟠</div>
          <div>
            <div class="prio-title">Kategorie 2 – Stabilisieren</div>
            <div class="prio-desc">Mathe (L), Englisch (L), Geschichte (L)</div>
            <div class="prio-desc" style="margin-top:3px">Regelmäßig üben · Ziel: 7–8 Punkte</div>
          </div>
        </div>
        <div class="prio-item green">
          <div class="prio-icon">🟢</div>
          <div>
            <div class="prio-title">Kategorie 3 – Halten</div>
            <div class="prio-desc">Informatik, Sport, Religion</div>
            <div class="prio-desc" style="margin-top:3px">Nur vor Tests kurz wiederholen</div>
          </div>
        </div>
      </div>
      <div style="margin-top:18px">
        <div class="card-title">Prüfungsfächer</div>
        <div class="exam-grid">
          <div class="exam-box">
            <div class="exam-box-title">✏️ Schriftlich</div>
            <div class="exam-item"><span class="check">✓</span> Mathematik (L)</div>
            <div class="exam-item"><span class="check">✓</span> Englisch (L)</div>
            <div id="examThirdSlot"></div>
          </div>
          <div class="exam-box">
            <div class="exam-box-title">🎤 Mündlich</div>
            <div class="exam-item"><span class="check">✓</span> Informatik</div>
            <div style="margin-top:7px;font-size:0.64rem;color:var(--muted)" id="examNote"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="card full">
      <div class="card-title">Szenario-Analyse · Abi-Note Hochrechnung</div>
      <div class="abi-row">
        <div>
          <div style="font-size:0.62rem;color:var(--muted);margin-bottom:4px">Aktuelle Tendenz</div>
          <div style="display:flex;align-items:flex-end;gap:8px">
            <div class="abi-score" id="bigAbiScore">–</div>
            <div class="abi-score-label">/ 4.0</div>
          </div>
          <div style="font-size:0.7rem;color:var(--muted);margin-top:3px" id="abiStatusText">Punkte eingeben →</div>
        </div>
        <div style="flex:1;min-width:180px">
          <div style="font-size:0.62rem;color:var(--muted);margin-bottom:6px">Gesamtpunkte</div>
          <div class="progress-bar-outer"><div class="progress-bar-inner" id="progressBar" style="width:0%"></div></div>
          <div style="font-size:0.66rem;color:var(--muted)" id="progressLabel">–</div>
        </div>
      </div>
      <div style="font-size:0.62rem;text-transform:uppercase;letter-spacing:1.5px;color:var(--muted);margin-bottom:8px">Szenarien</div>
      <div class="scenario-grid">
        <div class="scenario-card"><div class="sc-lbl">Aktuell</div><div class="sc-v" id="scCurVal">–</div><div class="sc-d">Aktuelle Eingaben</div></div>
        <div class="scenario-card"><div class="sc-lbl">Optimistisch</div><div class="sc-v" id="scBetterVal">–</div><div class="sc-d">+2 Pkt. in schwachen Fächern</div></div>
        <div class="scenario-card"><div class="sc-lbl">Ziel-Szenario</div><div class="sc-v" id="scBestVal">–</div><div class="sc-d">Strategie vollständig umgesetzt</div></div>
      </div>
      <div style="margin-top:18px" id="improvementTable"></div>
    </div>

    <div class="card full">
      <div class="card-title">Lernmaterialien &amp; Ressourcen</div>
      <div class="links-grid">
        <a href="https://www.osiander.de/suche?sq=stark+abitur+bw" target="_blank" class="link-chip">📖 Stark Abitur BW (Osiander)<span class="arrow">↗</span></a>
        <a href="https://www.schullv.de/baden-wuerttemberg-mathe-abi" target="_blank" class="link-chip">📐 SchullV – Mathe Abi BW<span class="arrow">↗</span></a>
        <a href="https://matheabibw.de/geometrie" target="_blank" class="link-chip">📏 MatheAbiBW – Geometrie<span class="arrow">↗</span></a>
        <a href="https://www.youtube.com/c/MathebyDaniel" target="_blank" class="link-chip">▶️ MathebyDaniel (YouTube)<span class="arrow">↗</span></a>
        <a href="https://www.khanacademy.org/math" target="_blank" class="link-chip">🌐 Khan Academy – Mathe<span class="arrow">↗</span></a>
        <a href="https://www.abiweb.de" target="_blank" class="link-chip">📚 AbiWeb – Interaktive Kurse<span class="arrow">↗</span></a>
      </div>
    </div>
  </div>
  <footer>Lernplattform BW · v3.0 · Viel Erfolg beim Abitur! 🎓</footer>
</div>
</div>
`;

const DASHBOARD_SCRIPT = `
(function(){
const TIPS = {
  'header-bw':{title:'Lernplattform',body:'Dein persönliches Abi-Dashboard für Baden-Württemberg.'},
  'semester':{title:'Jahrgangsstufe 1 · 1. Kurshalbjahr',body:'Die gymnasiale Oberstufe in BW besteht aus JS1 und JS2 (je 2 Kurshalbjahre).'},
  'exam-choice-info':{title:'3. Schriftliche Prüfung wählen',body:'Im Abitur BW schreibst du 2 Pflicht-Klausuren in deinen Leistungsfächern (Mathe + Englisch) und wählst 1 weiteres schriftliches Prüfungsfach frei.'},
  'avg-pts':{title:'Durchschnittspunkte',body:'Mittelwert aller Fächer. 15–13=Note 1, 12–10=Note 2, 9–7=Note 3, 6–4=Note 4, 3–1=Note 5, 0=Note 6'},
  'abi-tendency':{title:'Tendenz Abi-Note',body:'Grobe Schätzung der Endnote aus dem Punktedurchschnitt. Vereinfachte Formel: Note = 6 − (Ø/15)×5.'},
  'critical':{title:'Kritische Fächer',body:'Fächer unter 5 Punkten. Sofortiger Handlungsbedarf!'},
  'stable':{title:'Stabile Fächer',body:'Fächer mit 8+ Punkten. Nur vor Tests kurz wiederholen.'},
  'points-entry':{title:'Punkte eingeben',body:'Trage deine aktuellen Halbjahresnoten als Punkte (0–15) ein.'},
  'strategy':{title:'3-Kategorien-Strategie',body:'1. Retten: schwächste Fächer zuerst\\n2. Stabilisieren: wichtige Leistungsfächer verbessern\\n3. Halten: gute Fächer nur kurz vor Tests wiederholen'},
};
const SUBJECT_TIPS = {
  deutsch:{title:'Deutsch',body:'Kernfach – empfohlen als 3. Prüfungsfach.'},
  englisch:{title:'Englisch (L)',body:'Leistungsfach – Pflicht-Prüfungsfach!'},
  geschichte:{title:'Geschichte (L)',body:'Leistungsfach. Sehr faktenreich als Prüfungsfach.'},
  geo:{title:'Geographie ⚠️',body:'KRITISCH! Höchste Priorität zum Retten! Sofort handeln!'},
  religion:{title:'Religion',body:'Kein Prüfungsfach. Vor Tests kurz wiederholen.'},
  mathe:{title:'Mathematik (L)',body:'Leistungsfach – Pflicht-Prüfungsfach! Täglich Aufgaben lösen!'},
  info:{title:'Informatik 🟢',body:'Stärkstes Fach! Ideal für die mündliche Prüfung.'},
  sport:{title:'Sport',body:'Stabiler Bereich. Kein Prüfungsfach.'},
  psycho:{title:'Psychologie 🔴',body:'KRITISCHSTES FACH! 2 Pkt. Sofort strukturiert lernen – Ziel: 5–6 Punkte!'},
};
const DEFAULTS={deutsch:6,englisch:6,geschichte:6,geo:3,religion:5,mathe:5,info:11,sport:8,psycho:2};
const SUBJECTS=[
  {id:'deutsch',name:'Deutsch',badge:null,priority:'orange'},
  {id:'englisch',name:'Englisch',badge:'L',priority:'orange'},
  {id:'geschichte',name:'Geschichte',badge:'L',priority:'orange'},
  {id:'geo',name:'Geographie',badge:null,priority:'red'},
  {id:'religion',name:'Religion',badge:null,priority:'green'},
  {id:'mathe',name:'Mathematik',badge:'L',priority:'orange'},
  {id:'info',name:'Informatik',badge:'P',priority:'green'},
  {id:'sport',name:'Sport',badge:null,priority:'green'},
  {id:'psycho',name:'Psychologie',badge:null,priority:'red'},
];
const pts={...DEFAULTS};
let activeFilter=null,examChoice=null;

const box=document.getElementById('tooltipBox');
let closeT=null;
function showTip(el){
  const key=el.dataset.tip;if(!key)return;
  const data=TIPS[key]||SUBJECT_TIPS[key.replace('sub_','')];if(!data)return;
  clearTimeout(closeT);
  document.getElementById('ttTitle').textContent=data.title;
  document.getElementById('ttBody').textContent=data.body;
  box.classList.add('visible');positionTip(el);box._lastEl=el;
}
function hideTip(){closeT=setTimeout(()=>{box.classList.remove('visible');box._lastEl=null;},120);}
function positionTip(el){
  const r=el.getBoundingClientRect();
  const bw=Math.min(280,window.innerWidth-20);
  box.style.maxWidth=bw+'px';
  let left=r.left+r.width/2-bw/2;
  left=Math.max(10,Math.min(left,window.innerWidth-bw-10));
  const boxH=box.offsetHeight||130;
  let top=r.top>boxH+14?r.top-boxH-10:r.bottom+10;
  top=Math.max(10,Math.min(top,window.innerHeight-boxH-10));
  box.style.top=top+'px';box.style.left=left+'px';
}
document.querySelector('.db-wrap').addEventListener('click',e=>{
  const btn=e.target.closest('.info-btn');
  if(btn){e.stopPropagation();if(box.classList.contains('visible')&&box._lastEl===btn)hideTip();else showTip(btn);return;}
  if(!box.contains(e.target))hideTip();
});
window.addEventListener('scroll',()=>{if(box._lastEl)positionTip(box._lastEl);},true);
window.addEventListener('resize',()=>{if(box._lastEl)positionTip(box._lastEl);});

window.dbSelectExam=function(choice){
  if(examChoice===choice)examChoice=null; else examChoice=choice;
  const deCard=document.getElementById('choiceDE');
  const geCard=document.getElementById('choiceGE');
  const checkDE=document.getElementById('checkDE');
  const checkGE=document.getElementById('checkGE');
  const tag=document.getElementById('choiceTag');
  const hintEl=document.getElementById('choiceHintText');
  deCard.classList.remove('selected','rejected');
  geCard.classList.remove('selected','rejected');
  checkDE.textContent='✓';checkGE.textContent='✓';
  if(examChoice==='deutsch'){
    deCard.classList.add('selected');geCard.classList.add('rejected');
    checkGE.textContent='';tag.textContent='✅ Deutsch gewählt';tag.style.animation='none';
    hintEl.innerHTML='✅ Du hast <strong>Deutsch</strong> als 3. schriftliches Prüfungsfach gewählt.';
  }else if(examChoice==='geschichte'){
    geCard.classList.add('selected');deCard.classList.add('rejected');
    checkDE.textContent='';tag.textContent='✅ Geschichte gewählt';tag.style.animation='none';
    hintEl.innerHTML='✅ Du hast <strong>Geschichte (L)</strong> als 3. schriftliches Prüfungsfach gewählt.';
  }else{
    tag.textContent='⚡ Noch nicht entschieden';tag.style.animation='';
    hintEl.innerHTML='Klicke auf <strong>Deutsch</strong> oder <strong>Geschichte</strong>.';
  }
  updateSubjectBadges();updateExamPanel();
};

function updateSubjectBadges(){
  SUBJECTS.forEach(s=>{
    const badge=document.getElementById('badge_'+s.id);if(!badge)return;
    if(s.id==='mathe'||s.id==='englisch'||s.id==='info')return;
    if(s.id==='deutsch'){
      if(examChoice==='deutsch'){badge.textContent='P';badge.className='badge P';badge.style.display='';}
      else if(examChoice==='geschichte'){badge.style.display='none';}
      else{badge.textContent='E?';badge.className='badge E';badge.style.display='';}
    }
    if(s.id==='geschichte'){
      if(examChoice==='geschichte'){badge.textContent='P';badge.className='badge P';badge.style.display='';}
      else if(examChoice==='deutsch'){badge.style.display='none';}
      else{badge.textContent='E?';badge.className='badge E';badge.style.display='';}
    }
  });
}
function updateExamPanel(){
  const slot=document.getElementById('examThirdSlot');
  const note=document.getElementById('examNote');
  if(examChoice==='deutsch'){
    slot.innerHTML='<div class="exam-choice-row"><span class="check">✓</span> Deutsch <span style="font-size:0.6rem;color:var(--accent2);margin-left:auto">gewählt</span></div>';
    note.innerHTML='Geschichte ❌ nicht schriftlich';
  }else if(examChoice==='geschichte'){
    slot.innerHTML='<div class="exam-choice-row"><span class="check">✓</span> Geschichte (L) <span style="font-size:0.6rem;color:var(--accent2);margin-left:auto">gewählt</span></div>';
    note.innerHTML='Deutsch ❌ nicht gewählt';
  }else{
    slot.innerHTML='<div class="exam-item" style="color:var(--orange);font-size:0.76rem">⚡ Noch nicht gewählt</div>';
    note.innerHTML='Wähle oben: Deutsch oder Geschichte';
  }
}

function renderSubjects(){
  const list=document.getElementById('subjectList');list.innerHTML='';
  SUBJECTS.forEach(s=>{
    TIPS['sub_'+s.id]=SUBJECT_TIPS[s.id];
    const p=pts[s.id],c=color(p),n=toNote(p),pct=(p/15*100).toFixed(1);
    const row=document.createElement('div');
    row.className='subject-row';row.id='row_'+s.id;
    let badgeHTML='';
    if(s.id==='mathe'||s.id==='englisch')badgeHTML='<span class="badge L" id="badge_'+s.id+'">L</span>';
    else if(s.id==='info')badgeHTML='<span class="badge P" id="badge_'+s.id+'">P</span>';
    else if(s.id==='deutsch'||s.id==='geschichte')badgeHTML='<span class="badge E" id="badge_'+s.id+'">E?</span>';
    else badgeHTML='<span style="width:22px;display:inline-block;flex-shrink:0" id="badge_'+s.id+'"></span>';
    row.innerHTML='<div class="row-inner"><div class="priority-dot col-'+c+'" id="dot_'+s.id+'"></div>'+badgeHTML+'<div class="subject-name">'+s.name+'</div><span class="info-btn" data-tip="sub_'+s.id+'" style="margin-right:2px">i</span><div class="stepper"><button class="stepper-btn" data-dir="-1" data-id="'+s.id+'">&#9660;</button><input class="pts-input" type="number" min="0" max="15" value="'+p+'" id="inp_'+s.id+'" inputmode="numeric"><button class="stepper-btn" data-dir="1" data-id="'+s.id+'">&#9650;</button></div><div class="note-pill col-'+c+'" id="pill_'+s.id+'">Note '+n+'</div></div><div class="bar-wrap"><div class="bar-container"><div class="bar-fill" id="bar_'+s.id+'" style="width:'+pct+'%;background:'+cssVar(c)+'"></div></div></div>';
    list.appendChild(row);
    document.getElementById('inp_'+s.id).addEventListener('input',e=>{
      let v=parseInt(e.target.value,10);if(isNaN(v))v=0;
      v=Math.min(15,Math.max(0,v));e.target.value=v;
      pts[s.id]=v;refreshRow(s.id);updateAll();
      if(activeFilter==='critical'||activeFilter==='stable')applyHighlights();
      if(s.id==='deutsch')document.getElementById('choiceDE_pts').textContent=v;
      if(s.id==='geschichte')document.getElementById('choiceGE_pts').textContent=v;
    });
  });
  list.addEventListener('click',e=>{
    const btn=e.target.closest('.stepper-btn');if(!btn)return;
    const id=btn.dataset.id,dir=parseInt(btn.dataset.dir,10);
    let v=Math.min(15,Math.max(0,pts[id]+dir));
    pts[id]=v;
    const inp=document.getElementById('inp_'+id);if(inp)inp.value=v;
    refreshRow(id);updateAll();
    if(activeFilter==='critical'||activeFilter==='stable')applyHighlights();
    if(id==='deutsch')document.getElementById('choiceDE_pts').textContent=v;
    if(id==='geschichte')document.getElementById('choiceGE_pts').textContent=v;
  });
  let pt=null,pi=null;
  list.addEventListener('pointerdown',e=>{
    const btn=e.target.closest('.stepper-btn');if(!btn)return;
    pt=setTimeout(()=>{pi=setInterval(()=>{
      const id=btn.dataset.id,dir=parseInt(btn.dataset.dir,10);
      let v=Math.min(15,Math.max(0,pts[id]+dir));pts[id]=v;
      const inp=document.getElementById('inp_'+id);if(inp)inp.value=v;
      refreshRow(id);updateAll();
    },80);},400);
  });
  const stop=()=>{clearTimeout(pt);clearInterval(pi);};
  list.addEventListener('pointerup',stop);list.addEventListener('pointerleave',stop);list.addEventListener('pointercancel',stop);
}

function refreshRow(id){
  const p=pts[id],c=color(p),n=toNote(p);
  const dot=document.getElementById('dot_'+id);
  const pill=document.getElementById('pill_'+id);
  const bar=document.getElementById('bar_'+id);
  if(dot)dot.className='priority-dot col-'+c;
  if(pill){pill.className='note-pill col-'+c;pill.textContent='Note '+n;}
  if(bar){bar.style.width=(p/15*100).toFixed(1)+'%';bar.style.background=cssVar(c);}
}

const FILTER_LABELS={all:'Alle Fächer',exam:'Prüfungsfächer',critical:'Kritische Fächer (< 5 Pkt.)',stable:'Stabile Fächer (≥ 8 Pkt.)'};
function matches(s){
  if(!activeFilter||activeFilter==='all')return true;
  if(activeFilter==='exam'){
    if(s.id==='mathe'||s.id==='englisch'||s.id==='info')return true;
    if(s.id==='deutsch'&&examChoice==='deutsch')return true;
    if(s.id==='geschichte'&&examChoice==='geschichte')return true;
    return false;
  }
  if(activeFilter==='critical')return pts[s.id]<5;
  if(activeFilter==='stable')return pts[s.id]>=8;
  return true;
}
function applyHighlights(){
  SUBJECTS.forEach(s=>{
    const row=document.getElementById('row_'+s.id);if(!row)return;
    row.classList.remove('highlighted','dimmed');
    if(activeFilter){if(matches(s))row.classList.add('highlighted');else row.classList.add('dimmed');}
  });
}
function setFilter(key){
  activeFilter=activeFilter===key?null:key;
  document.querySelectorAll('.db-wrap .summary-card').forEach(c=>c.classList.toggle('active-filter',c.dataset.filter===activeFilter));
  const banner=document.getElementById('filterBanner');
  if(activeFilter){banner.classList.add('visible');document.getElementById('filterLabel').textContent=FILTER_LABELS[activeFilter]??activeFilter;}
  else banner.classList.remove('visible');
  applyHighlights();
}
document.querySelectorAll('.db-wrap .summary-card').forEach(c=>c.addEventListener('click',e=>{if(e.target.closest('.info-btn'))return;setFilter(c.dataset.filter);}));
document.getElementById('clearFilter').addEventListener('click',()=>setFilter(null));

document.getElementById('btnReset').addEventListener('click',()=>{
  SUBJECTS.forEach(s=>{
    pts[s.id]=DEFAULTS[s.id];
    const inp=document.getElementById('inp_'+s.id);if(inp)inp.value=DEFAULTS[s.id];
    refreshRow(s.id);
    const row=document.getElementById('row_'+s.id);
    if(row){row.classList.remove('flash-reset');void row.offsetWidth;row.classList.add('flash-reset');setTimeout(()=>row.classList.remove('flash-reset'),700);}
  });
  document.getElementById('choiceDE_pts').textContent=DEFAULTS.deutsch;
  document.getElementById('choiceGE_pts').textContent=DEFAULTS.geschichte;
  updateAll();
  if(activeFilter==='critical'||activeFilter==='stable')applyHighlights();
});

function toNote(p){return({15:'1',14:'1',13:'1',12:'2',11:'2',10:'2',9:'3',8:'3',7:'3',6:'4',5:'4',4:'4',3:'5',2:'5',1:'5',0:'6'})[Math.min(15,Math.max(0,p))]??'6';}
function color(p){return p<=3?'red':p<=6?'orange':'green';}
function cssVar(c){return c==='red'?'var(--red)':c==='orange'?'var(--orange)':'var(--green)';}
function abiNote(avg){return Math.max(1,Math.min(6,6-(avg/15)*5)).toFixed(1);}

function updateAll(){
  const arr=SUBJECTS.map(s=>pts[s.id]);
  const avg=arr.reduce((a,b)=>a+b,0)/arr.length;
  const cur=abiNote(avg);
  const critN=arr.filter(p=>p<5).length;
  const stabN=arr.filter(p=>p>=8).length;
  const total=SUBJECTS.length;
  document.getElementById('avgPoints').textContent=avg.toFixed(1);
  document.getElementById('abiTendency').textContent=cur;
  document.getElementById('critLabel').textContent=critN+' Fächer';
  const cb=document.getElementById('critCount');
  if(critN>0){cb.style.display='';cb.textContent='('+critN+'/'+total+')';}else cb.style.display='none';
  document.getElementById('stableLabel').textContent=stabN+' Fächer';
  const sb=document.getElementById('stableCount');
  if(stabN>0){sb.style.display='';sb.textContent='('+stabN+'/'+total+')';}else sb.style.display='none';
  document.getElementById('bigAbiScore').textContent=cur;
  const sum=arr.reduce((a,b)=>a+b,0),maxP=15*total;
  document.getElementById('progressBar').style.width=Math.min(100,sum/maxP*100)+'%';
  document.getElementById('progressLabel').textContent=sum+' / '+maxP+' Punkte · Tendenz Note '+cur;
  const fn=parseFloat(cur);
  document.getElementById('abiStatusText').textContent=fn<=2?'🟢 Sehr gut! Weiter so.':fn<=3?'🟢 Gut – weiter stabilisieren.':fn<=4?'🟡 Ausreichend – Potenzial vorhanden.':'🔴 Kritisch – sofort handeln!';
  const optArr=arr.map((p,i)=>SUBJECTS[i].priority==='red'?Math.min(15,p+2):p);
  const tgtArr=arr.map((p,i)=>SUBJECTS[i].priority==='red'?Math.min(15,p+3):SUBJECTS[i].priority==='orange'?Math.min(15,p+2):p);
  const noteOpt=abiNote(optArr.reduce((a,b)=>a+b,0)/optArr.length);
  const noteTgt=abiNote(tgtArr.reduce((a,b)=>a+b,0)/tgtArr.length);
  document.getElementById('scCurVal').textContent=cur;
  document.getElementById('scBetterVal').textContent=noteOpt;
  document.getElementById('scBestVal').textContent=noteTgt;
  [['scCurVal',cur],['scBetterVal',noteOpt],['scBestVal',noteTgt]].forEach(([id,n])=>{
    const f=parseFloat(n);
    document.getElementById(id).style.color=f<=2.5?'var(--green)':f<=3.7?'var(--orange)':'var(--red)';
  });
  updateAlerts();buildImprovTable(tgtArr);
}

function updateAlerts(){
  const area=document.getElementById('alertsArea');area.innerHTML='';
  SUBJECTS.filter(s=>pts[s.id]<5).forEach(s=>{
    const d=document.createElement('div');d.className='alert-bar';
    d.innerHTML='<span>⚠️</span><span><strong>'+s.name+'</strong> – <span class="alert-pts">'+pts[s.id]+' Punkte</span> (Note '+toNote(pts[s.id])+').</span>';
    area.appendChild(d);
  });
}

function buildImprovTable(tgtArr){
  const rows=SUBJECTS.map((s,i)=>{
    const cur=pts[s.id],tgt=tgtArr[i],diff=tgt-cur;
    const c=color(cur);
    const dh=diff>0?'<span style="color:var(--green);font-family:var(--fm)">+'+diff+'</span>':'<span style="color:var(--muted)">–</span>';
    const ph=s.priority==='red'?'🔴 Retten':s.priority==='orange'?'🟠 Stabilisieren':'🟢 Halten';
    return '<tr><td>'+s.name+'</td><td style="font-family:var(--fm);color:'+cssVar(c)+'">'+cur+'</td><td style="font-family:var(--fm);color:var(--green)">'+tgt+'</td><td>'+dh+'</td><td style="color:var(--muted);font-size:0.66rem">'+ph+'</td></tr>';
  }).join('');
  document.getElementById('improvementTable').innerHTML='<div style="font-size:0.62rem;text-transform:uppercase;letter-spacing:1.5px;color:var(--muted);margin-bottom:8px">Verbesserungsübersicht (Ziel-Szenario)</div><div style="overflow-x:auto"><table class="imp-table"><thead><tr><th>Fach</th><th>Aktuell</th><th>Ziel</th><th>Δ</th><th>Priorität</th></tr></thead><tbody>'+rows+'</tbody></table></div>';
}

renderSubjects();updateExamPanel();updateAll();
})();
`;