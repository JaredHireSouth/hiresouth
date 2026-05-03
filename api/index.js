import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import Anthropic from '@anthropic-ai/sdk';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

// ── SERVE FRONTEND ON ROOT ──────────────────────────────────────
const frontendHTML = `<!DOCTYPE html>
<html lang="en">
<head>
app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Content-Disposition', 'inline');
  res.send(frontendHTML);
});
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>HireSouth — Recruitment Platform</title>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display&display=swap" rel="stylesheet">
<style>
:root {
  --purple: #2E1760;
  --purple-mid: #4A2A9A;
  --purple-light: #EEEDFE;
  --orange: #E87722;
  --orange-light: #FDF0E6;
  --green: #1D9E75;
  --green-light: #E1F5EE;
  --amber: #E18F27;
  --amber-light: #FEF3DC;
  --red: #C94040;
  --red-light: #FCEAEA;
  --gray-50: #F8F7FC;
  --gray-100: #F0EEF8;
  --gray-200: #E2DFF2;
  --gray-400: #9B96B8;
  --gray-600: #5C5780;
  --gray-900: #1A1630;
  --white: #FFFFFF;
  --shadow-sm: 0 1px 3px rgba(46,23,96,0.08);
  --shadow-md: 0 4px 16px rgba(46,23,96,0.12);
  --shadow-lg: 0 8px 32px rgba(46,23,96,0.16);
  --radius: 10px;
  --radius-lg: 16px;
}
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'DM Sans', sans-serif; background: var(--gray-50); color: var(--gray-900); min-height: 100vh; display: flex; }

/* SIDEBAR */
.sidebar {
  width: 220px; min-height: 100vh; background: var(--purple);
  display: flex; flex-direction: column; flex-shrink: 0;
  position: fixed; top: 0; left: 0; bottom: 0; z-index: 100;
}
.sidebar-logo {
  padding: 24px 20px 20px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  display: flex; align-items: center; gap: 10px;
}
.logo-mark {
  width: 36px; height: 36px; border-radius: 10px; background: var(--orange);
  display: flex; align-items: center; justify-content: center;
  font-size: 18px; color: white; font-weight: 600; flex-shrink: 0;
}
.logo-text { font-family: 'DM Serif Display', serif; color: white; font-size: 18px; }
.logo-sub { font-size: 10px; color: rgba(255,255,255,0.5); margin-top: -2px; letter-spacing: 0.05em; text-transform: uppercase; }
.nav { padding: 16px 12px; flex: 1; }
.nav-section { font-size: 10px; color: rgba(255,255,255,0.35); text-transform: uppercase; letter-spacing: 0.08em; padding: 0 8px; margin: 16px 0 6px; }
.nav-item {
  display: flex; align-items: center; gap: 10px; padding: 9px 10px;
  border-radius: 8px; cursor: pointer; color: rgba(255,255,255,0.65);
  font-size: 13px; font-weight: 400; transition: all 0.15s; margin-bottom: 2px;
  text-decoration: none;
}
.nav-item:hover { background: rgba(255,255,255,0.1); color: white; }
.nav-item.active { background: rgba(255,255,255,0.15); color: white; font-weight: 500; }
.nav-item svg { width: 16px; height: 16px; flex-shrink: 0; opacity: 0.8; }
.nav-item.active svg { opacity: 1; }
.nav-badge { margin-left: auto; background: var(--orange); color: white; font-size: 10px; padding: 1px 6px; border-radius: 20px; font-weight: 600; }
.sidebar-footer { padding: 16px 12px; border-top: 1px solid rgba(255,255,255,0.1); }
.sidebar-user { display: flex; align-items: center; gap: 10px; padding: 8px; border-radius: 8px; }
.user-avatar { width: 30px; height: 30px; border-radius: 50%; background: var(--orange); display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600; color: white; flex-shrink: 0; }
.user-name { font-size: 12px; color: rgba(255,255,255,0.8); font-weight: 500; }
.user-role { font-size: 10px; color: rgba(255,255,255,0.4); }

/* MAIN */
.main { margin-left: 220px; flex: 1; display: flex; flex-direction: column; min-height: 100vh; }
.topbar {
  background: white; border-bottom: 1px solid var(--gray-200);
  padding: 0 32px; height: 60px; display: flex; align-items: center;
  justify-content: space-between; position: sticky; top: 0; z-index: 50;
}
.topbar-title { font-size: 17px; font-weight: 600; color: var(--gray-900); }
.topbar-actions { display: flex; gap: 10px; align-items: center; }
.btn {
  padding: 8px 16px; border-radius: var(--radius); font-size: 13px; font-weight: 500;
  cursor: pointer; border: 1.5px solid var(--gray-200); background: white;
  color: var(--gray-600); transition: all 0.15s; font-family: 'DM Sans', sans-serif;
  display: inline-flex; align-items: center; gap: 6px;
}
.btn:hover { border-color: var(--gray-400); color: var(--gray-900); }
.btn-primary { background: var(--purple); color: white; border-color: var(--purple); }
.btn-primary:hover { background: var(--purple-mid); border-color: var(--purple-mid); }
.btn-orange { background: var(--orange); color: white; border-color: var(--orange); }
.btn-orange:hover { opacity: 0.9; }
.btn-sm { padding: 5px 12px; font-size: 12px; }
.page { padding: 28px 32px; flex: 1; display: none; }
.page.active { display: block; }

/* STATS ROW */
.stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 28px; }
.stat-card {
  background: white; border-radius: var(--radius-lg); padding: 20px 24px;
  border: 1px solid var(--gray-200); box-shadow: var(--shadow-sm);
}
.stat-label { font-size: 12px; color: var(--gray-400); font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em; }
.stat-value { font-size: 32px; font-weight: 600; color: var(--gray-900); margin: 4px 0 2px; line-height: 1; }
.stat-sub { font-size: 12px; color: var(--gray-400); }
.stat-card.purple { border-left: 3px solid var(--purple); }
.stat-card.orange { border-left: 3px solid var(--orange); }
.stat-card.green { border-left: 3px solid var(--green); }
.stat-card.amber { border-left: 3px solid var(--amber); }

/* PIPELINE */
.pipeline-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.pipeline-col { background: var(--gray-100); border-radius: var(--radius-lg); padding: 16px; min-height: 400px; }
.col-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
.col-title { font-size: 12px; font-weight: 600; color: var(--gray-600); text-transform: uppercase; letter-spacing: 0.06em; }
.col-count { background: white; color: var(--gray-600); font-size: 11px; font-weight: 600; padding: 2px 8px; border-radius: 20px; border: 1px solid var(--gray-200); }
.candidate-card {
  background: white; border-radius: var(--radius); padding: 14px;
  margin-bottom: 10px; border: 1px solid var(--gray-200);
  box-shadow: var(--shadow-sm); cursor: pointer; transition: all 0.15s;
}
.candidate-card:hover { box-shadow: var(--shadow-md); transform: translateY(-1px); border-color: var(--gray-400); }
.card-name { font-size: 14px; font-weight: 600; color: var(--gray-900); margin-bottom: 2px; }
.card-role { font-size: 12px; color: var(--gray-400); margin-bottom: 10px; }
.card-footer { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
.badge { font-size: 10px; font-weight: 600; padding: 3px 8px; border-radius: 20px; }
.badge-linkedin { background: #E7F0F9; color: #0A66C2; }
.badge-site { background: var(--green-light); color: var(--green); }
.score-badge { margin-left: auto; font-size: 11px; font-weight: 700; padding: 3px 8px; border-radius: 20px; }
.score-high { background: var(--green-light); color: var(--green); }
.score-mid { background: var(--amber-light); color: var(--amber); }
.score-low { background: var(--red-light); color: var(--red); }

/* MODAL */
.modal-overlay {
  position: fixed; inset: 0; background: rgba(26,22,48,0.5);
  display: none; align-items: center; justify-content: center; z-index: 200;
  padding: 20px;
}
.modal-overlay.open { display: flex; }
.modal {
  background: white; border-radius: var(--radius-lg); width: 100%; max-width: 620px;
  max-height: 90vh; overflow-y: auto; box-shadow: var(--shadow-lg);
}
.modal-header {
  padding: 24px 28px 20px; border-bottom: 1px solid var(--gray-200);
  display: flex; align-items: flex-start; justify-content: space-between; position: sticky; top: 0; background: white; z-index: 1;
}
.modal-title { font-size: 18px; font-weight: 700; color: var(--gray-900); }
.modal-sub { font-size: 13px; color: var(--gray-400); margin-top: 2px; }
.modal-close { background: none; border: none; cursor: pointer; color: var(--gray-400); font-size: 20px; padding: 0; line-height: 1; }
.modal-close:hover { color: var(--gray-900); }
.modal-body { padding: 24px 28px; }
.modal-footer { padding: 16px 28px; border-top: 1px solid var(--gray-200); display: flex; justify-content: flex-end; gap: 10px; background: var(--gray-50); border-radius: 0 0 var(--radius-lg) var(--radius-lg); }

/* FORMS */
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px; }
.form-row.full { grid-template-columns: 1fr; }
.form-group { display: flex; flex-direction: column; gap: 5px; }
.form-group label { font-size: 12px; font-weight: 500; color: var(--gray-600); }
.form-group input, .form-group select, .form-group textarea {
  padding: 9px 12px; border-radius: var(--radius); border: 1.5px solid var(--gray-200);
  font-size: 13px; color: var(--gray-900); font-family: 'DM Sans', sans-serif;
  background: white; transition: border-color 0.15s;
}
.form-group input:focus, .form-group select:focus, .form-group textarea:focus {
  outline: none; border-color: var(--purple);
}
.form-group textarea { resize: vertical; min-height: 80px; line-height: 1.5; }
.form-section { font-size: 11px; font-weight: 700; color: var(--gray-400); text-transform: uppercase; letter-spacing: 0.08em; margin: 20px 0 12px; padding-top: 16px; border-top: 1px solid var(--gray-100); }
.form-section:first-child { margin-top: 0; border-top: none; padding-top: 0; }

/* CANDIDATE DETAIL */
.detail-header { display: flex; align-items: flex-start; gap: 16px; margin-bottom: 24px; }
.detail-avatar { width: 56px; height: 56px; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: 700; color: white; flex-shrink: 0; }
.detail-name { font-size: 22px; font-weight: 700; color: var(--gray-900); }
.detail-role { font-size: 14px; color: var(--gray-400); margin-top: 2px; }
.detail-badges { display: flex; gap: 6px; margin-top: 8px; flex-wrap: wrap; }
.detail-tabs { display: flex; gap: 0; border-bottom: 2px solid var(--gray-200); margin-bottom: 20px; }
.detail-tab { padding: 10px 16px; font-size: 13px; font-weight: 500; color: var(--gray-400); cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -2px; }
.detail-tab.active { color: var(--purple); border-bottom-color: var(--purple); }
.detail-panel { display: none; }
.detail-panel.active { display: block; }
.info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px; }
.info-item { background: var(--gray-50); border-radius: var(--radius); padding: 12px 14px; }
.info-label { font-size: 11px; color: var(--gray-400); font-weight: 500; text-transform: uppercase; letter-spacing: 0.04em; }
.info-val { font-size: 14px; font-weight: 600; color: var(--gray-900); margin-top: 3px; }
.score-section { margin-bottom: 20px; }
.score-row { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
.score-label { font-size: 12px; color: var(--gray-600); width: 110px; flex-shrink: 0; }
.score-track { flex: 1; height: 6px; background: var(--gray-200); border-radius: 3px; overflow: hidden; }
.score-fill { height: 100%; border-radius: 3px; }
.score-pct { font-size: 12px; font-weight: 700; width: 34px; text-align: right; }
.profile-preview { background: var(--gray-50); border-radius: var(--radius); padding: 16px; font-size: 13px; color: var(--gray-600); line-height: 1.7; }
.profile-preview h4 { font-size: 11px; font-weight: 700; color: var(--purple); text-transform: uppercase; letter-spacing: 0.06em; margin: 16px 0 6px; }
.profile-preview h4:first-child { margin-top: 0; }
.profile-preview p { margin-bottom: 8px; }
.skill-chip { display: inline-block; font-size: 11px; padding: 3px 9px; border-radius: 20px; background: var(--purple-light); color: var(--purple); margin: 2px; font-weight: 500; }
.exp-item { border-left: 2px solid var(--gray-200); padding: 0 0 14px 14px; margin-bottom: 4px; }
.exp-item:last-child { padding-bottom: 0; }
.exp-title-text { font-size: 13px; font-weight: 700; color: var(--gray-900); }
.exp-company { font-size: 12px; color: var(--purple); font-weight: 500; }
.exp-dates { font-size: 11px; color: var(--gray-400); margin-bottom: 5px; }
.exp-bullet { font-size: 12px; color: var(--gray-600); line-height: 1.6; padding-left: 12px; position: relative; margin-bottom: 2px; }
.exp-bullet::before { content: "·"; position: absolute; left: 0; color: var(--purple); font-weight: 700; }

/* AI GENERATING */
.ai-generating { display: flex; align-items: center; gap: 10px; padding: 14px 16px; background: var(--purple-light); border-radius: var(--radius); margin-bottom: 16px; font-size: 13px; color: var(--purple); }
.ai-spinner { width: 16px; height: 16px; border: 2px solid var(--purple-light); border-top-color: var(--purple); border-radius: 50%; animation: spin 0.8s linear infinite; flex-shrink: 0; }
@keyframes spin { to { transform: rotate(360deg); } }

/* CANDIDATES TABLE */
.table-wrap { background: white; border-radius: var(--radius-lg); border: 1px solid var(--gray-200); overflow: hidden; box-shadow: var(--shadow-sm); }
.table-toolbar { padding: 16px 20px; border-bottom: 1px solid var(--gray-200); display: flex; align-items: center; gap: 12px; }
.search-input { padding: 8px 14px; border-radius: var(--radius); border: 1.5px solid var(--gray-200); font-size: 13px; color: var(--gray-900); font-family: 'DM Sans', sans-serif; width: 260px; }
.search-input:focus { outline: none; border-color: var(--purple); }
table { width: 100%; border-collapse: collapse; }
thead th { padding: 11px 20px; font-size: 11px; font-weight: 700; color: var(--gray-400); text-transform: uppercase; letter-spacing: 0.06em; text-align: left; background: var(--gray-50); border-bottom: 1px solid var(--gray-200); }
tbody td { padding: 14px 20px; font-size: 13px; color: var(--gray-900); border-bottom: 1px solid var(--gray-100); }
tbody tr:last-child td { border-bottom: none; }
tbody tr:hover td { background: var(--gray-50); cursor: pointer; }
.td-name { font-weight: 600; }
.td-muted { color: var(--gray-400); font-size: 12px; }

/* JD PAGE */
.jd-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.jd-card { background: white; border-radius: var(--radius-lg); padding: 20px; border: 1px solid var(--gray-200); box-shadow: var(--shadow-sm); cursor: pointer; transition: all 0.15s; }
.jd-card:hover { box-shadow: var(--shadow-md); border-color: var(--purple); }
.jd-card-title { font-size: 15px; font-weight: 700; color: var(--gray-900); margin-bottom: 4px; }
.jd-card-meta { font-size: 12px; color: var(--gray-400); margin-bottom: 14px; }
.jd-card-footer { display: flex; align-items: center; justify-content: space-between; }
.status-dot { width: 7px; height: 7px; border-radius: 50%; display: inline-block; margin-right: 5px; }
.dot-active { background: var(--green); }
.dot-closed { background: var(--gray-400); }

/* EMPTY STATE */
.empty-state { text-align: center; padding: 60px 20px; color: var(--gray-400); }
.empty-icon { font-size: 40px; margin-bottom: 12px; opacity: 0.4; }
.empty-title { font-size: 16px; font-weight: 600; color: var(--gray-600); margin-bottom: 6px; }
.empty-sub { font-size: 13px; }

/* NOTIFICATIONS */
.toast {
  position: fixed; bottom: 24px; right: 24px; background: var(--gray-900); color: white;
  padding: 12px 18px; border-radius: var(--radius); font-size: 13px; font-weight: 500;
  box-shadow: var(--shadow-lg); z-index: 999; display: none; animation: slideUp 0.2s ease;
}
@keyframes slideUp { from { transform: translateY(10px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

/* SCREENING */
.screening-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.panel-card { background: white; border-radius: var(--radius-lg); border: 1px solid var(--gray-200); overflow: hidden; box-shadow: var(--shadow-sm); }
.panel-card-header { padding: 16px 20px; border-bottom: 1px solid var(--gray-200); font-size: 13px; font-weight: 700; color: var(--gray-600); text-transform: uppercase; letter-spacing: 0.06em; background: var(--gray-50); }
.panel-card-body { padding: 20px; }
/* OPEN ROLES TRACKER */
.roles-toolbar { padding: 14px 20px; border-bottom: 1px solid var(--gray-200); display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.roles-filter-btn { padding: 5px 14px; border-radius: 20px; font-size: 12px; font-weight: 600; cursor: pointer; border: 1.5px solid var(--gray-200); background: white; color: var(--gray-600); transition: all 0.15s; }
.roles-filter-btn.active { background: var(--purple); color: white; border-color: var(--purple); }
.roles-table { width: 100%; border-collapse: collapse; font-size: 13px; }
.roles-table th { padding: 10px 14px; font-size: 11px; font-weight: 700; color: var(--gray-400); text-transform: uppercase; letter-spacing: 0.06em; text-align: left; background: var(--gray-50); border-bottom: 1px solid var(--gray-200); white-space: nowrap; }
.roles-table td { padding: 12px 14px; border-bottom: 1px solid var(--gray-100); vertical-align: middle; }
.roles-table tr:last-child td { border-bottom: none; }
.roles-table tbody tr:hover td { background: var(--gray-50); cursor: pointer; }
.role-status { display: inline-flex; align-items: center; gap: 5px; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 20px; white-space: nowrap; }
.status-active { background: #E1F5EE; color: #1D9E75; }
.status-paused { background: #FEF3DC; color: #E18F27; }
.status-closed { background: #F0EEF8; color: #9B96B8; }
.status-hired { background: #E7F0F9; color: #0A66C2; }
.status-sourcing { background: #EEEDFE; color: #2E1760; }
.priority-badge { font-size: 11px; font-weight: 700; padding: 3px 8px; border-radius: 6px; }
.pri-high { background: #FCEAEA; color: #C94040; }
.pri-medium { background: #FEF3DC; color: #E18F27; }
.pri-none { background: var(--gray-100); color: var(--gray-400); }
.cand-count { display: inline-flex; align-items: center; justify-content: center; width: 24px; height: 24px; border-radius: 50%; background: var(--purple-light); color: var(--purple); font-size: 12px; font-weight: 700; }

/* PROFILE SWITCHER */

/* TEAM PROFILE EDITING */
.color-swatch { width:28px;height:28px;border-radius:50%;cursor:pointer;border:2px solid transparent;transition:transform 0.1s,border-color 0.1s; }
.color-swatch:hover { transform:scale(1.15); }
.color-swatch.selected { border-color:var(--gray-900);transform:scale(1.15); }
.team-card { border:1px solid #E2DFF2;border-radius:10px;padding:16px;text-align:center;transition:box-shadow 0.15s; }
.team-card:hover { box-shadow:0 4px 16px rgba(46,23,96,0.12); }
.team-avatar { width:56px;height:56px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:700;color:white;margin:0 auto 10px;overflow:hidden;background:#2E1760; }
.team-avatar img { width:100%;height:100%;object-fit:cover; }

.profile-option { display:flex;align-items:center;gap:10px;padding:10px 14px;cursor:pointer;transition:background 0.12s; }
.profile-option:hover { background:#F8F7FC; }
.profile-option.active-profile { background:#EEEDFE; }
.profile-opt-avatar { width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:white;flex-shrink:0; }
.profile-opt-name { font-size:13px;font-weight:600;color:#1A1630; }
.profile-opt-role { font-size:11px;color:#9B96B8; }
</style>
</head>
<body>

<aside class="sidebar">
  <div class="sidebar-logo" style="padding:16px 14px;">
    <img src="data:image/png;base64,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" alt="HireSouth" style="width:48px;height:48px;object-fit:contain;flex-shrink:0;">
    <div>
      <div class="logo-text">HireSouth</div>
      <div class="logo-sub">Recruitment</div>
    </div>
  </div>
  <nav class="nav">
    <div class="nav-section">Main</div>
    <a class="nav-item active" onclick="showPage('dashboard')">
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1" y="1" width="6" height="6" rx="1.5"/><rect x="9" y="1" width="6" height="6" rx="1.5"/><rect x="1" y="9" width="6" height="6" rx="1.5"/><rect x="9" y="9" width="6" height="6" rx="1.5"/></svg>
      Dashboard
    </a>
    <a class="nav-item" onclick="showPage('pipeline')">
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1" y="3" width="3" height="10" rx="1"/><rect x="6.5" y="3" width="3" height="7" rx="1"/><rect x="12" y="3" width="3" height="12" rx="1"/></svg>
      Pipeline
      <span class="nav-badge" id="nb-pipeline">0</span>
    </a>
    <a class="nav-item" onclick="showPage('candidates')">
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="5" r="3"/><path d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6"/></svg>
      Candidates
    </a>
    <div class="nav-section">Tools</div>
    <a class="nav-item" onclick="showPage('screening')">
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="8" r="6"/><path d="M5.5 8l2 2 3-3"/></svg>
      AI Screening
    </a>
    <a class="nav-item" onclick="showPage('roles')">
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1" y="2" width="14" height="12" rx="2"/><path d="M4 6h8M4 9h5"/></svg>
      Open Roles
      <span class="nav-badge" id="nb-roles">0</span>
    </a>
    <a class="nav-item" onclick="showPage('jobs')">
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="10" height="10" rx="1.5"/><path d="M5 4V3a1 1 0 011-1h4a1 1 0 011 1v1"/></svg>
      Job Descriptions
    </a>
    <a class="nav-item" onclick="showPage('profiles')">
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="12" height="12" rx="2"/><path d="M5 6h6M5 9h4"/></svg>
      HS Profiles
    </a>
    <a class="nav-item" onclick="showPage('settings')">
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="8" r="2.5"/><path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.22 3.22l1.42 1.42M11.36 11.36l1.42 1.42M3.22 12.78l1.42-1.42M11.36 4.64l1.42-1.42"/></svg>
      Settings
    </a>
  </nav>
  <div class="sidebar-footer">
    <div style="position:relative;">
      <div class="sidebar-user" onclick="toggleProfileMenu()" style="cursor:pointer;justify-content:space-between;">
        <div style="display:flex;align-items:center;gap:10px;">
          <div class="user-avatar" id="active-avatar" style="overflow:hidden;"></div>
          <div>
            <div class="user-name" id="active-name">Jared Andreasson</div>
            <div class="user-role" id="active-role">CEO</div>
          </div>
        </div>
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="2"><path d="M4 6l4-4 4 4M4 10l4 4 4-4"/></svg>
      </div>
      <div id="profile-menu" style="display:none;position:absolute;bottom:calc(100% + 8px);left:8px;right:8px;background:white;border-radius:12px;box-shadow:0 8px 32px rgba(0,0,0,0.2);overflow:hidden;z-index:200;">
        <div style="padding:8px 12px;font-size:10px;font-weight:700;color:#9B96B8;text-transform:uppercase;letter-spacing:0.06em;border-bottom:1px solid #F0EEF8;">Switch profile</div>
        <div id="profile-options-list"></div>
        <div style="border-top:1px solid #F0EEF8;padding:6px 8px;">
          <div class="profile-option" onclick="showPage('settings');toggleProfileMenu();" style="padding:8px 10px;border-radius:8px;">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#9B96B8" stroke-width="1.5"><circle cx="8" cy="8" r="2.5"/><path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.22 3.22l1.42 1.42M11.36 11.36l1.42 1.42M3.22 12.78l1.42-1.42M11.36 4.64l1.42-1.42"/></svg>
            <div class="profile-opt-name" style="font-size:12px;color:#9B96B8;">Manage team profiles</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</aside>

<main class="main">
  <div class="topbar">
    <div class="topbar-title" id="page-title">Dashboard</div>
    <div class="topbar-actions">
      <button class="btn btn-primary" onclick="openAddCandidate()">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3v10M3 8h10"/></svg>
        Add Candidate
      </button>
    </div>
  </div>

  <!-- DASHBOARD -->
  <div class="page active" id="page-dashboard">
    <div class="stats-row">
      <div class="stat-card purple">
        <div class="stat-label">Total Candidates</div>
        <div class="stat-value" id="stat-total">0</div>
        <div class="stat-sub">In pipeline</div>
      </div>
      <div class="stat-card orange">
        <div class="stat-label">Profiles Sent</div>
        <div class="stat-value" id="stat-sent">0</div>
        <div class="stat-sub">Awaiting review</div>
      </div>
      <div class="stat-card green">
        <div class="stat-label">Placed</div>
        <div class="stat-value" id="stat-placed">0</div>
        <div class="stat-sub">This quarter</div>
      </div>
      <div class="stat-card amber">
        <div class="stat-label">Avg Match Score</div>
        <div class="stat-value" id="stat-avg">—</div>
        <div class="stat-sub">Across all candidates</div>
      </div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;">
      <div class="table-wrap">
        <div class="table-toolbar" style="justify-content:space-between;padding:14px 20px;">
          <span style="font-size:13px;font-weight:700;color:var(--gray-600);">Recent candidates</span>
          <button class="btn btn-sm" onclick="showPage('candidates')">View all</button>
        </div>
        <div id="recent-candidates"></div>
      </div>
      <div class="table-wrap">
        <div class="table-toolbar" style="justify-content:space-between;padding:14px 20px;">
          <span style="font-size:13px;font-weight:700;color:var(--gray-600);">Pipeline overview</span>
        </div>
        <div id="pipeline-summary" style="padding:16px 20px;"></div>
      </div>
    </div>
  </div>

  <!-- PIPELINE -->
  <div class="page" id="page-pipeline">
    <div class="pipeline-grid" id="pipeline-board"></div>
  </div>

  <!-- CANDIDATES -->
  <div class="page" id="page-candidates">
    <div class="table-wrap">
      <div class="table-toolbar">
        <input class="search-input" type="text" placeholder="Search candidates..." id="candidate-search" oninput="renderCandidatesTable()">
        <select style="padding:8px 12px;border-radius:var(--radius);border:1.5px solid var(--gray-200);font-size:13px;font-family:'DM Sans',sans-serif;color:var(--gray-900);" id="stage-filter" onchange="renderCandidatesTable()">
          <option value="">All stages</option>
          <option value="sourced">Sourced</option>
          <option value="profiled">Profiled</option>
          <option value="sent">Sent to Candidate</option>
          <option value="placed">Placed</option>
        </select>
        <select style="padding:8px 12px;border-radius:var(--radius);border:1.5px solid var(--gray-200);font-size:13px;font-family:'DM Sans',sans-serif;color:var(--gray-900);" id="source-filter" onchange="renderCandidatesTable()">
          <option value="">All sources</option>
          <option value="LinkedIn">LinkedIn</option>
          <option value="Site Application">Site Application</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th><th>Role</th><th>Location</th><th>Source</th><th>Stage</th><th>Match</th><th>Added</th><th></th>
          </tr>
        </thead>
        <tbody id="candidates-table-body"></tbody>
      </table>
    </div>
  </div>

  <!-- SCREENING -->
  <div class="page" id="page-screening">
    <div class="screening-layout">
      <div class="panel-card">
        <div class="panel-card-header">Select candidate & JD</div>
        <div class="panel-card-body">
          <label style="font-size:12px;font-weight:500;color:var(--gray-600);display:block;margin-bottom:5px;">Candidate</label>
          <select class="full-select" id="screen-candidate"></select>
          <label style="font-size:12px;font-weight:500;color:var(--gray-600);display:block;margin-bottom:5px;">Job Description</label>
          <select class="full-select" id="screen-jd"></select>
          <button class="btn btn-primary" style="width:100%;justify-content:center;margin-top:8px;" onclick="runScreening()">Run AI Screening</button>
        </div>
      </div>
      <div class="panel-card">
        <div class="panel-card-header">AI Match Result</div>
        <div class="panel-card-body" id="screening-result">
          <div class="empty-state" style="padding:30px 0;">
            <div class="empty-icon">◎</div>
            <div class="empty-sub">Select a candidate and JD to run screening</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- OPEN ROLES TRACKER -->
  <div class="page" id="page-roles">
    <div class="table-wrap">
      <div class="roles-toolbar">
        <div style="display:flex;gap:6px;flex-wrap:wrap;flex:1;">
          <button class="roles-filter-btn active" onclick="setRoleFilter('all',this)">All</button>
          <button class="roles-filter-btn" onclick="setRoleFilter('Sourcing',this)">Sourcing</button>
          <button class="roles-filter-btn" onclick="setRoleFilter('Active',this)">Active</button>
          <button class="roles-filter-btn" onclick="setRoleFilter('Paused',this)">Paused</button>
          <button class="roles-filter-btn" onclick="setRoleFilter('Hired - More',this)">Hired – More</button>
          <button class="roles-filter-btn" onclick="setRoleFilter('Closed',this)">Closed</button>
        </div>
        <button class="btn btn-primary" onclick="openAddRole()">+ Add Role</button>
      </div>
      <div style="overflow-x:auto;">
        <table class="roles-table">
          <thead>
            <tr>
              <th>Status</th>
              <th>Role Name</th>
              <th>Company / Client</th>
              <th>Opened</th>
              <th>Priority</th>
              <th>Candidates</th>
              <th>Deadline</th>
              <th>Salary Range</th>
              <th>Job Post</th>
              <th>Notes</th>
              <th></th>
            </tr>
          </thead>
          <tbody id="roles-table-body"></tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- JOBS -->
  <div class="page" id="page-jobs">
    <div style="margin-bottom:20px;display:flex;justify-content:flex-end;">
      <button class="btn btn-primary" onclick="openAddJD()">+ Add Job Description</button>
    </div>
    <div class="jd-grid" id="jd-grid"></div>
  </div>

  <!-- PROFILES -->
  <div class="page" id="page-profiles">
    <div class="table-wrap">
      <div class="table-toolbar" style="justify-content:space-between;">
        <span style="font-size:13px;font-weight:700;color:var(--gray-600);">HS Profiles</span>
      </div>
      <table>
        <thead><tr><th>Candidate</th><th>Role</th><th>Profile Status</th><th>Generated</th><th>Actions</th></tr></thead>
        <tbody id="profiles-table-body"></tbody>
      </table>
    </div>
  </div>

  <!-- SETTINGS -->
  <div class="page" id="page-settings">
    <div style="max-width:700px;">

      <!-- BACKEND INFO -->
      <div style="background:linear-gradient(135deg, #E1F5EE 0%, #F0EEF8 100%);border-radius:16px;border:1px solid #1D9E75;padding:16px 20px;margin-bottom:20px;display:flex;align-items:center;gap:12px;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1D9E75" stroke-width="2"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 6v6l4 2"/></svg>
        <div>
          <div style="font-size:13px;font-weight:700;color:#1D9E75;">✓ Backend connected</div>
          <div style="font-size:12px;color:#1D9E75;opacity:0.9;">All AI features are live and running on Vercel</div>
        </div>
      </div>

      <!-- DANGER ZONE -->
      <div style="background:white;border-radius:16px;border:1px solid #E2DFF2;box-shadow:0 1px 3px rgba(46,23,96,0.08);margin-bottom:20px;overflow:hidden;">
        <div style="padding:18px 24px;border-bottom:1px solid #F0EEF8;display:flex;align-items:center;gap:10px;">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#C94040" stroke-width="1.5"><circle cx="8" cy="8" r="6"/><path d="M8 5v3M8 11v.5"/></svg>
          <span style="font-size:13px;font-weight:700;color:#C94040;text-transform:uppercase;letter-spacing:0.06em;">Data Management</span>
        </div>
        <div style="padding:20px 24px;">

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">

            <div style="border:1px solid #E2DFF2;border-radius:10px;padding:18px;">
              <div style="font-size:14px;font-weight:700;color:#1A1630;margin-bottom:4px;">Clear all candidates</div>
              <div style="font-size:12px;color:#9B96B8;margin-bottom:14px;line-height:1.5;">Remove all candidate records, profiles, and pipeline data. Job descriptions are kept.</div>
              <button class="btn btn-sm" onclick="confirmClear('candidates')" style="color:#C94040;border-color:#F09595;">Clear candidates</button>
            </div>

            <div style="border:1px solid #E2DFF2;border-radius:10px;padding:18px;">
              <div style="font-size:14px;font-weight:700;color:#1A1630;margin-bottom:4px;">Clear all open roles</div>
              <div style="font-size:12px;color:#9B96B8;margin-bottom:14px;line-height:1.5;">Remove all roles from the Open Roles Tracker. Candidates are kept.</div>
              <button class="btn btn-sm" onclick="confirmClear('roles')" style="color:#C94040;border-color:#F09595;">Clear roles</button>
            </div>

            <div style="border:1px solid #E2DFF2;border-radius:10px;padding:18px;">
              <div style="font-size:14px;font-weight:700;color:#1A1630;margin-bottom:4px;">Clear job descriptions</div>
              <div style="font-size:12px;color:#9B96B8;margin-bottom:14px;line-height:1.5;">Remove all saved job descriptions used for AI screening.</div>
              <button class="btn btn-sm" onclick="confirmClear('jobs')" style="color:#C94040;border-color:#F09595;">Clear JDs</button>
            </div>

            <div style="border:1.5px solid #E24B4A;border-radius:10px;padding:18px;background:#FCEBEB;">
              <div style="font-size:14px;font-weight:700;color:#C94040;margin-bottom:4px;">Reset everything</div>
              <div style="font-size:12px;color:#A32D2D;margin-bottom:14px;line-height:1.5;">Wipe all data and start completely fresh. This cannot be undone.</div>
              <button class="btn btn-sm" onclick="confirmClear('all')" style="background:#C94040;color:white;border-color:#C94040;">Reset all data</button>
            </div>

          </div>
        </div>
      </div>

      <!-- COMPANY SETTINGS -->
      <div style="background:white;border-radius:16px;border:1px solid #E2DFF2;box-shadow:0 1px 3px rgba(46,23,96,0.08);margin-bottom:20px;overflow:hidden;">
        <div style="padding:18px 24px;border-bottom:1px solid #F0EEF8;">
          <span style="font-size:13px;font-weight:700;color:#5C5780;text-transform:uppercase;letter-spacing:0.06em;">Company Info</span>
        </div>
        <div style="padding:20px 24px;">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px;">
            <div class="form-group"><label>Company name</label><input type="text" id="s-company" placeholder="HireSouth"></div>
            <div class="form-group"><label>Website</label><input type="text" id="s-website" placeholder="hiresouth.com"></div>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:16px;">
            <div class="form-group"><label>Default email signature</label><input type="text" id="s-email" placeholder="team@hiresouth.com"></div>
            <div class="form-group"><label>Default availability wording</label><input type="text" id="s-avail" placeholder="TBD"></div>
          </div>
          <button class="btn btn-primary btn-sm" onclick="saveSettings()">Save settings</button>
        </div>
      </div>

      <!-- TEAM PROFILES -->
      <div style="background:white;border-radius:16px;border:1px solid #E2DFF2;box-shadow:0 1px 3px rgba(46,23,96,0.08);overflow:hidden;">
        <div style="padding:18px 24px;border-bottom:1px solid #F0EEF8;display:flex;align-items:center;justify-content:space-between;">
          <span style="font-size:13px;font-weight:700;color:#5C5780;text-transform:uppercase;letter-spacing:0.06em;">Team Profiles</span>
          <button class="btn btn-sm btn-primary" onclick="openAddTeamMember()">+ Add member</button>
        </div>
        <div style="padding:20px 24px;">
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;" id="team-profiles-grid"></div>
        </div>
      </div>

    </div>
  </div>
</main>

<!-- EDIT TEAM MEMBER MODAL -->
<div class="modal-overlay" id="modal-edit-member">
  <div class="modal" style="max-width:520px;">
    <div class="modal-header">
      <div>
        <div class="modal-title" id="edit-member-title">Edit Profile</div>
        <div class="modal-sub">Update name, role, photo and colour</div>
      </div>
      <button class="modal-close" onclick="closeModal('modal-edit-member')">×</button>
    </div>
    <div class="modal-body">

      <!-- PHOTO UPLOAD -->
      <div style="display:flex;align-items:center;gap:20px;margin-bottom:24px;padding-bottom:20px;border-bottom:1px solid var(--gray-100);">
        <div style="position:relative;flex-shrink:0;">
          <div id="em-avatar-preview" style="width:72px;height:72px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:700;color:white;background:#2E1760;overflow:hidden;"></div>
          <label for="em-photo-input" style="position:absolute;bottom:0;right:0;width:22px;height:22px;background:var(--orange);border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;border:2px solid white;">
            <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="white" stroke-width="2.5"><path d="M8 3v10M3 8h10"/></svg>
          </label>
          <input type="file" id="em-photo-input" accept="image/*" style="display:none;" onchange="handleMemberPhoto(this)">
        </div>
        <div>
          <div style="font-size:13px;font-weight:500;color:var(--gray-600);margin-bottom:4px;">Profile photo</div>
          <div style="font-size:12px;color:var(--gray-400);">Click the + to upload a photo. JPG or PNG recommended.</div>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group"><label>First name *</label><input id="em-firstname" type="text" placeholder="Jared" oninput="updateMemberPreview()"></div>
        <div class="form-group"><label>Last name *</label><input id="em-lastname" type="text" placeholder="Andreasson" oninput="updateMemberPreview()"></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Job title / Role *</label><input id="em-role" type="text" placeholder="CEO" oninput="updateMemberPreview()"></div>
        <div class="form-group"><label>Email</label><input id="em-email" type="email" placeholder="jared@hiresouth.com"></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Phone</label><input id="em-phone" type="tel" placeholder="(615) 555-0000"></div>
        <div class="form-group"><label>LinkedIn</label><input id="em-linkedin" type="text" placeholder="linkedin.com/in/..."></div>
      </div>

      <!-- COLOUR PICKER -->
      <div style="margin-top:4px;">
        <label style="font-size:12px;font-weight:500;color:var(--gray-600);display:block;margin-bottom:8px;">Avatar colour</label>
        <div style="display:flex;gap:8px;flex-wrap:wrap;" id="em-color-picker">
          <div class="color-swatch" style="background:#2E1760;" onclick="selectColor('#2E1760',this)"></div>
          <div class="color-swatch" style="background:#E87722;" onclick="selectColor('#E87722',this)"></div>
          <div class="color-swatch" style="background:#1D9E75;" onclick="selectColor('#1D9E75',this)"></div>
          <div class="color-swatch" style="background:#C94040;" onclick="selectColor('#C94040',this)"></div>
          <div class="color-swatch" style="background:#4A2A9A;" onclick="selectColor('#4A2A9A',this)"></div>
          <div class="color-swatch" style="background:#0A66C2;" onclick="selectColor('#0A66C2',this)"></div>
          <div class="color-swatch" style="background:#5C5780;" onclick="selectColor('#5C5780',this)"></div>
          <div class="color-swatch" style="background:#BA7517;" onclick="selectColor('#BA7517',this)"></div>
        </div>
      </div>

    </div>
    <div class="modal-footer" style="justify-content:space-between;">
      <button class="btn btn-sm" id="em-delete-btn" onclick="deleteTeamMember()" style="color:#C94040;border-color:#F09595;display:none;">Delete member</button>
      <div style="display:flex;gap:8px;">
        <button class="btn" onclick="closeModal('modal-edit-member')">Cancel</button>
        <button class="btn btn-primary" onclick="saveTeamMember()">Save profile</button>
      </div>
    </div>
  </div>
</div>

<!-- CONFIRM CLEAR MODAL -->
<div class="modal-overlay" id="modal-confirm-clear">
  <div class="modal" style="max-width:420px;">
    <div class="modal-header">
      <div>
        <div class="modal-title" id="confirm-title">Are you sure?</div>
        <div class="modal-sub" id="confirm-sub">This cannot be undone.</div>
      </div>
      <button class="modal-close" onclick="closeModal('modal-confirm-clear')">×</button>
    </div>
    <div class="modal-body">
      <div id="confirm-body" style="font-size:13px;color:#5C5780;line-height:1.6;padding:4px 0;"></div>
    </div>
    <div class="modal-footer">
      <button class="btn" onclick="closeModal('modal-confirm-clear')">Cancel</button>
      <button class="btn" id="confirm-action-btn" onclick="" style="background:#C94040;color:white;border-color:#C94040;">Yes, delete</button>
    </div>
  </div>
</div>

<!-- ADD ROLE MODAL -->
<div class="modal-overlay" id="modal-add-role">
  <div class="modal" style="max-width:680px;">
    <div class="modal-header">
      <div>
        <div class="modal-title">Add Open Role</div>
        <div class="modal-sub">Paste a JD below — AI will extract the details automatically</div>
      </div>
      <button class="modal-close" onclick="closeModal('modal-add-role')">×</button>
    </div>
    <div class="modal-body">

      <!-- JD PASTE ZONE -->
      <div style="margin-bottom:18px;">
        <label style="font-size:12px;font-weight:500;color:var(--gray-600);display:block;margin-bottom:6px;">Paste job description (optional — AI will auto-fill fields below)</label>
        <textarea id="role-jd-paste" style="width:100%;min-height:100px;padding:10px 12px;border-radius:var(--radius);border:1.5px solid var(--gray-200);font-size:13px;font-family:'DM Sans',sans-serif;color:var(--gray-900);resize:vertical;line-height:1.5;" placeholder="Paste the full job description here and click Parse JD…"></textarea>
        <button class="btn btn-primary" style="margin-top:8px;" onclick="parseJDPaste()">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="8" cy="8" r="6"/><path d="M5.5 8l2 2 3-3"/></svg>
          Parse JD with AI
        </button>
        <div id="role-parse-status" style="display:none;margin-top:8px;">
          <div class="ai-generating"><div class="ai-spinner"></div><span id="role-parse-text">Extracting role details…</span></div>
        </div>
      </div>

      <div style="display:flex;align-items:center;gap:12px;margin-bottom:18px;">
        <div style="flex:1;height:1px;background:var(--gray-200);"></div>
        <span style="font-size:11px;color:var(--gray-400);font-weight:500;">ROLE DETAILS</span>
        <div style="flex:1;height:1px;background:var(--gray-200);"></div>
      </div>

      <div class="form-row">
        <div class="form-group"><label>Role name *</label><input id="role-title" type="text" placeholder="Senior Developer"></div>
        <div class="form-group"><label>Company / Client</label><input id="role-client" type="text" placeholder="Alphalete Marketing"></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Status</label>
          <select id="role-status">
            <option value="Sourcing">Sourcing</option>
            <option value="Active">Active</option>
            <option value="Paused">Paused</option>
            <option value="Hired - More">Hired – More</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
        <div class="form-group"><label>Priority</label>
          <select id="role-priority">
            <option value="None">None</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Opened date</label><input id="role-opened" type="date"></div>
        <div class="form-group"><label>Deadline</label><input id="role-deadline" type="date"></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Salary range</label><input id="role-salary" type="text" placeholder="\$2,000 – \$3,000 / mo"></div>
        <div class="form-group"><label>Location / Type</label><input id="role-location" type="text" placeholder="Remote, Full-time"></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Job post URL</label><input id="role-url" type="text" placeholder="https://www.linkedin.com/jobs/..."></div>
        <div class="form-group"><label>Client email</label><input id="role-email" type="email" placeholder="client@company.com"></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Must-have requirements</label><input id="role-musthave" type="text" placeholder="React, 5+ yrs, AWS..."></div>
        <div class="form-group"><label>Notes</label><input id="role-notes" type="text" placeholder="EST time, remote-first..."></div>
      </div>
      <div class="form-row full">
        <div class="form-group"><label>Full job description (saved for AI screening)</label><textarea id="role-description" style="min-height:80px;" placeholder="Full JD text used for AI candidate screening…"></textarea></div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn" onclick="closeModal('modal-add-role')">Cancel</button>
      <button class="btn btn-primary" onclick="saveRole()">Save Role</button>
    </div>
  </div>
</div>

<!-- ADD CANDIDATE MODAL -->
<div class="modal-overlay" id="modal-add-candidate">
  <div class="modal" style="max-width:660px;">
    <div class="modal-header">
      <div>
        <div class="modal-title">Add Candidate</div>
        <div class="modal-sub" id="add-modal-sub">Upload a resume or fill in details manually</div>
      </div>
      <button class="modal-close" onclick="closeModal('modal-add-candidate')">×</button>
    </div>
    <div class="modal-body">

      <!-- RESUME UPLOAD ZONE -->
      <div id="resume-upload-zone"
        style="border:2px dashed var(--gray-200);border-radius:var(--radius-lg);padding:28px 20px;text-align:center;cursor:pointer;transition:all 0.2s;margin-bottom:20px;background:var(--gray-50);"
        onclick="document.getElementById('resume-file-input').click()"
        ondragover="event.preventDefault();this.style.borderColor='#2E1760';this.style.background='#EEEDFE';"
        ondragleave="this.style.borderColor='';this.style.background='var(--gray-50)';"
        ondrop="event.preventDefault();this.style.borderColor='';this.style.background='var(--gray-50)';handleResumeDrop(event);">
        <div id="upload-zone-content">
          <div style="font-size:28px;margin-bottom:8px;opacity:0.4;">↑</div>
          <div style="font-size:14px;font-weight:600;color:var(--gray-600);margin-bottom:4px;">Drop resume here or click to upload</div>
          <div style="font-size:12px;color:var(--gray-400);">PDF or Word (.docx) — AI will extract and fill all fields automatically</div>
        </div>
        <input type="file" id="resume-file-input" accept=".pdf,.docx,.doc,.txt" style="display:none;" onchange="handleResumeFile(this.files[0])">
      </div>

      <!-- PARSING STATUS -->
      <div id="resume-parsing-status" style="display:none;margin-bottom:16px;">
        <div class="ai-generating"><div class="ai-spinner"></div><span id="parsing-status-text">Reading resume…</span></div>
      </div>

      <!-- DIVIDER -->
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px;">
        <div style="flex:1;height:1px;background:var(--gray-200);"></div>
        <span style="font-size:11px;color:var(--gray-400);font-weight:500;">CANDIDATE DETAILS</span>
        <div style="flex:1;height:1px;background:var(--gray-200);"></div>
      </div>

      <div class="form-section" style="margin-top:0;border-top:none;padding-top:0;">Basic Info</div>
      <div class="form-row">
        <div class="form-group"><label>First name *</label><input id="add-firstname" type="text" placeholder="Jordan"></div>
        <div class="form-group"><label>Last name *</label><input id="add-lastname" type="text" placeholder="Mills"></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Email</label><input id="add-email" type="email" placeholder="jordan@email.com"></div>
        <div class="form-group"><label>Phone</label><input id="add-phone" type="tel" placeholder="(615) 555-0000"></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Current title *</label><input id="add-title" type="text" placeholder="Senior Developer"></div>
        <div class="form-group"><label>Location</label><input id="add-location" type="text" placeholder="Nashville, TN"></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Source *</label>
          <select id="add-source"><option value="LinkedIn">LinkedIn</option><option value="Site Application">Site Application</option><option value="Resume Upload">Resume Upload</option></select>
        </div>
        <div class="form-group"><label>LinkedIn URL</label><input id="add-linkedin" type="text" placeholder="linkedin.com/in/..."></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Seniority</label>
          <select id="add-seniority"><option>Junior</option><option selected>Senior</option><option>Director</option><option>VP</option><option>C-Suite</option></select>
        </div>
        <div class="form-group"><label>Availability</label><input id="add-avail" type="text" placeholder="Immediate / 2 weeks / TBD"></div>
      </div>
      <div class="form-section">Work History</div>
      <div class="form-row full">
        <div class="form-group"><label>Most recent role (title, company, dates, achievements)</label><textarea id="add-role1" placeholder="Senior Developer, Acme Corp, 2021–Present. Led team of 6..."></textarea></div>
      </div>
      <div class="form-row full">
        <div class="form-group"><label>Previous role</label><textarea id="add-role2" placeholder="Full Stack Developer, StartupXYZ, 2018–2021..."></textarea></div>
      </div>
      <div class="form-section">Skills & Education</div>
      <div class="form-row">
        <div class="form-group"><label>Key skills (comma separated)</label><input id="add-skills" type="text" placeholder="React, Node.js, AWS..."></div>
        <div class="form-group"><label>Education</label><input id="add-edu" type="text" placeholder="BS Computer Science, UT 2018"></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Languages</label><input id="add-lang" type="text" placeholder="English: Native"></div>
        <div class="form-group"><label>Other recruitment processes?</label><input id="add-other" type="text" placeholder="Not provided"></div>
      </div>
      <div class="form-section">Recruiter Notes</div>
      <div class="form-row full">
        <div class="form-group"><label>Interview highlights & observations</label><textarea id="add-notes" placeholder="What stood out? Key strengths, cultural fit observations..."></textarea></div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn" onclick="closeModal('modal-add-candidate')">Cancel</button>
      <button class="btn btn-orange" onclick="saveCandidate()">Save & Generate Profile</button>
    </div>
  </div>
</div>

<!-- CANDIDATE DETAIL MODAL -->
<div class="modal-overlay" id="modal-candidate-detail">
  <div class="modal" style="max-width:700px;">
    <div class="modal-header">
      <div class="detail-header" style="margin-bottom:0;flex:1;">
        <div class="detail-avatar" id="detail-avatar">JM</div>
        <div>
          <div class="detail-name" id="detail-name">—</div>
          <div class="detail-role" id="detail-role">—</div>
          <div class="detail-badges" id="detail-badges"></div>
        </div>
      </div>
      <button class="modal-close" onclick="closeModal('modal-candidate-detail')" style="margin-left:16px;">×</button>
    </div>
    <div class="modal-body" style="padding-top:16px;">
      <div class="detail-tabs">
        <div class="detail-tab active" onclick="showDetailTab('overview')">Overview</div>
        <div class="detail-tab" onclick="showDetailTab('profile')">HS Profile</div>
        <div class="detail-tab" onclick="showDetailTab('screening')">AI Screening</div>
      </div>
      <div class="detail-panel active" id="dtab-overview">
        <div class="info-grid" id="detail-info-grid"></div>
        <div style="margin-bottom:12px;">
          <div style="font-size:11px;font-weight:700;color:var(--gray-400);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:10px;">Move stage</div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;" id="stage-buttons"></div>
        </div>
        <div style="margin-top:16px;padding-top:16px;border-top:1px solid var(--gray-100);">
          <button class="btn btn-sm" onclick="deleteCandidate(currentCandidateId);closeModal('modal-candidate-detail');" style="color:#C94040;border-color:#F09595;">
            Delete this candidate
          </button>
        </div>
      </div>
      <div class="detail-panel" id="dtab-profile">
        <div id="profile-content"></div>
        <div style="display:flex;gap:10px;margin-top:16px;">
          <button class="btn btn-primary" onclick="generateProfileForCurrent()">Regenerate Profile</button>
          <button class="btn btn-orange" onclick="markProfileSent()">Mark as Sent to Candidate</button>
        </div>
      </div>
      <div class="detail-panel" id="dtab-screening">
        <div style="margin-bottom:14px;">
          <label style="font-size:12px;font-weight:500;color:var(--gray-600);display:block;margin-bottom:5px;">Screen against job description</label>
          <select class="full-select" id="detail-screen-jd" style="margin-bottom:10px;"></select>
          <button class="btn btn-primary" onclick="runDetailScreening()">Run AI Screening</button>
        </div>
        <div id="detail-screening-result"></div>
      </div>
    </div>
  </div>
</div>

<!-- ADD JD MODAL -->
<div class="modal-overlay" id="modal-add-jd">
  <div class="modal">
    <div class="modal-header">
      <div><div class="modal-title">Add Job Description</div></div>
      <button class="modal-close" onclick="closeModal('modal-add-jd')">×</button>
    </div>
    <div class="modal-body">
      <div class="form-row full"><div class="form-group"><label>Job title *</label><input id="jd-title" type="text" placeholder="Senior Developer"></div></div>
      <div class="form-row">
        <div class="form-group"><label>Location</label><input id="jd-location" type="text" placeholder="Nashville, TN"></div>
        <div class="form-group"><label>Type</label><select id="jd-type"><option>Full-time</option><option>Part-time</option><option>Contract</option><option>Remote</option></select></div>
      </div>
      <div class="form-row"><div class="form-group"><label>Client / Company</label><input id="jd-client" type="text" placeholder="Client name"></div><div class="form-group"><label>Salary range</label><input id="jd-salary" type="text" placeholder="\$80k–\$120k"></div></div>
      <div class="form-row full"><div class="form-group"><label>Job description *</label><textarea id="jd-description" style="min-height:160px;" placeholder="Paste the full job description here..."></textarea></div></div>
      <div class="form-row full"><div class="form-group"><label>Key requirements (comma separated)</label><input id="jd-requirements" type="text" placeholder="React, 5+ years experience, AWS..."></div></div>
    </div>
    <div class="modal-footer">
      <button class="btn" onclick="closeModal('modal-add-jd')">Cancel</button>
      <button class="btn btn-primary" onclick="saveJD()">Save Job Description</button>
    </div>
  </div>
</div>

<div class="toast" id="toast"></div>

<script>
const AVATAR_COLORS = ['#2E1760','#E87722','#1D9E75','#C94040','#4A2A9A','#E18F27'];
const STAGES = ['sourced','profiled','sent','placed'];
const STAGE_LABELS = {sourced:'Sourced',profiled:'Profiled',sent:'Sent to Candidate',placed:'Placed'};

let state = JSON.parse(localStorage.getItem('hs_state') || 'null') || {
  candidates: [
    {id:'c1',firstName:'Aaliya',lastName:'Brown',title:'Project Manager',location:'Atlanta, GA',email:'a.brown@email.com',phone:'(678) 555-0176',source:'Site Application',seniority:'Senior',availability:'Immediate',stage:'profiled',score:91,skills:'Agile, Scrum, JIRA, Stakeholder Management',education:'MBA, Georgia Tech, 2017',languages:'English: Native',role1:'Project Manager, Delta Corp, 2020–Present. Led 12-person team, delivered \$2M project on time.',role2:'Business Analyst, ConsultCo, 2017–2020.',notes:'Excellent communicator. Agile-certified.',linkedin:'',other:'Not provided',added:'2026-04-28',profile:null,profileSent:false},
    {id:'c2',firstName:'Jordan',lastName:'Mills',title:'Senior Developer',location:'Nashville, TN',email:'j.mills@email.com',phone:'(615) 555-0182',source:'LinkedIn',seniority:'Senior',availability:'2 weeks',stage:'sourced',score:87,skills:'React, Node.js, AWS, Python, PostgreSQL, Docker',education:'BS Computer Science, University of Tennessee, 2018',languages:'English: Native',role1:'Senior Developer, Acme Corp, 2021–Present. Led migration of monolith to microservices. Reduced API latency by 40%.',role2:'Full Stack Developer, StartupXYZ, 2018–2021. Built customer-facing React app, 50k DAU.',notes:'Strong communicator. Deep AWS experience.',linkedin:'linkedin.com/in/jordanmills',other:'Not provided',added:'2026-05-01',profile:null,profileSent:false}
  ],
  jobs: [
    {id:'j1',title:'Senior Developer',location:'Nashville, TN',type:'Full-time',client:'FinTech Co',salary:'\$110k–\$140k',description:'Senior Developer for fintech platform. 5+ years full-stack experience required.',requirements:'React, Node.js, AWS, 5+ years',active:true,added:'2026-04-20'},
    {id:'j2',title:'Project Manager',location:'Atlanta, GA',type:'Full-time',client:'Delta Logistics',salary:'\$90k–\$115k',description:'Experienced Project Manager for cross-functional delivery teams.',requirements:'Agile, PMP, 5+ years PM experience',active:true,added:'2026-04-22'}
  ],
  roles: [
    {id:'r1',title:'Remote Interviewer',client:'Alphalete Marketing',status:'Hired - More',priority:'High',opened:'2026-04-08',deadline:'2026-04-17',salary:'1k',location:'Remote',url:'https://www.linkedin.com/jobs/',email:'',musthave:'',notes:'',description:'',activeCandidates:10},
    {id:'r2',title:'Google Ads Specialist',client:'',status:'Paused',priority:'None',opened:'2026-03-10',deadline:'2026-04-17',salary:'\$2,000–\$3,000',location:'Remote',url:'',email:'',musthave:'',notes:'',description:'',activeCandidates:3},
    {id:'r3',title:'Customer Success Manager',client:'',status:'Paused',priority:'None',opened:'2026-03-10',deadline:'2026-04-17',salary:'\$2,000–\$2,600',location:'Remote',url:'',email:'',musthave:'',notes:'',description:'',activeCandidates:1}
  ]
};

function save() { localStorage.setItem('hs_state', JSON.stringify(state)); }

// ── API HELPER ──────────────────────────────────────────────────
async function callClaude(body) {
  const backendUrl = 'https://hiresouth-sgfi.vercel.app/api/messages';
  const res = await fetch(backendUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if(!res.ok) {
    const e = await res.json().catch(()=>({}));
    throw new Error(e.error?.message || 'API error ' + res.status);
  }
  return res.json();
}

// ── NAV & PAGES ─────────────────────────────────────────────────
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById('page-'+id).classList.add('active');
  const titles = {dashboard:'Dashboard',pipeline:'Pipeline',candidates:'Candidates',screening:'AI Screening',jobs:'Job Descriptions',profiles:'HS Profiles',roles:'Open Roles Tracker',settings:'Settings'};
  document.getElementById('page-title').textContent = titles[id]||id;
  document.querySelectorAll('.nav-item').forEach(n => { if(n.getAttribute('onclick')&&n.getAttribute('onclick').includes("'"+id+"'")) n.classList.add('active'); });
  if(id==='dashboard') renderDashboard();
  if(id==='pipeline') renderPipeline();
  if(id==='candidates') renderCandidatesTable();
  if(id==='screening') renderScreeningSelects();
  if(id==='jobs') renderJDs();
  if(id==='profiles') renderProfiles();
  if(id==='roles') renderRoles();
  if(id==='settings') loadSettings();
  updateBadges();
}

function updateBadges() {
  document.getElementById('nb-pipeline').textContent = state.candidates.length;
  const nbRoles = document.getElementById('nb-roles');
  if(nbRoles) nbRoles.textContent = (state.roles||[]).filter(r=>r.status==='Active'||r.status==='Sourcing').length;
}

function avatarColor(id) { const idx = state.candidates.findIndex(c=>c.id===id); return AVATAR_COLORS[Math.abs(idx) % AVATAR_COLORS.length]; }
function initials(c) { return (c.firstName[0]||'')+(c.lastName[0]||''); }
function scoreBadgeClass(s) { return s>=80?'score-high':s>=65?'score-mid':'score-low'; }
function scoreColor(s) { return s>=80?'#1D9E75':s>=65?'#E18F27':'#C94040'; }

// ── DASHBOARD ───────────────────────────────────────────────────
function renderDashboard() {
  const total=state.candidates.length, sent=state.candidates.filter(c=>c.profileSent).length, placed=state.candidates.filter(c=>c.stage==='placed').length;
  const scored=state.candidates.filter(c=>c.score), avg=scored.length?Math.round(scored.reduce((a,c)=>a+c.score,0)/scored.length):null;
  document.getElementById('stat-total').textContent=total;
  document.getElementById('stat-sent').textContent=sent;
  document.getElementById('stat-placed').textContent=placed;
  document.getElementById('stat-avg').textContent=avg?avg+'%':'—';
  const recent=[...state.candidates].sort((a,b)=>b.added.localeCompare(a.added)).slice(0,5);
  document.getElementById('recent-candidates').innerHTML=recent.length?\`<table style="width:100%;border-collapse:collapse;">\${recent.map(c=>\`<tr onclick="openCandidateDetail('\${c.id}')" style="cursor:pointer;" onmouseover="this.style.background='#F8F7FC'" onmouseout="this.style.background=''"><td style="padding:10px 20px;border-bottom:1px solid #F0EEF8;"><div style="display:flex;align-items:center;gap:10px;"><div style="width:30px;height:30px;border-radius:8px;background:\${avatarColor(c.id)};display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:white;flex-shrink:0;">\${initials(c)}</div><div><div style="font-size:13px;font-weight:600;color:#1A1630;">\${c.firstName} \${c.lastName}</div><div style="font-size:11px;color:#9B96B8;">\${c.title}</div></div></div></td><td style="padding:10px 20px;border-bottom:1px solid #F0EEF8;"><span class="badge \${c.source==='LinkedIn'?'badge-linkedin':'badge-site'}">\${c.source}</span></td><td style="padding:10px 20px;border-bottom:1px solid #F0EEF8;font-size:12px;color:#9B96B8;">\${STAGE_LABELS[c.stage]}</td></tr>\`).join('')}</table>\`:'<div class="empty-state" style="padding:30px 0;"><div class="empty-sub">No candidates yet</div></div>';
  const stageCounts=STAGES.map(s=>({s,count:state.candidates.filter(c=>c.stage===s).length}));
  document.getElementById('pipeline-summary').innerHTML=stageCounts.map(({s,count})=>\`<div style="display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:1px solid #F0EEF8;"><span style="font-size:13px;color:#5C5780;font-weight:500;">\${STAGE_LABELS[s]}</span><div style="display:flex;align-items:center;gap:10px;"><div style="width:80px;height:6px;background:#F0EEF8;border-radius:3px;overflow:hidden;"><div style="width:\${total?Math.round(count/total*100):0}%;height:100%;background:#2E1760;border-radius:3px;"></div></div><span style="font-size:13px;font-weight:700;color:#1A1630;width:16px;text-align:right;">\${count}</span></div></div>\`).join('');
}

// ── PIPELINE ────────────────────────────────────────────────────
function renderPipeline() {
  document.getElementById('pipeline-board').innerHTML=STAGES.map(stage=>{
    const cards=state.candidates.filter(c=>c.stage===stage);
    return \`<div class="pipeline-col"><div class="col-header"><span class="col-title">\${STAGE_LABELS[stage]}</span><span class="col-count">\${cards.length}</span></div>\${cards.length?cards.map(c=>\`<div class="candidate-card" onclick="openCandidateDetail('\${c.id}')"><div class="card-name">\${c.firstName} \${c.lastName}</div><div class="card-role">\${c.title} · \${c.location}</div><div class="card-footer"><span class="badge \${c.source==='LinkedIn'?'badge-linkedin':'badge-site'}">\${c.source}</span>\${c.score?\`<span class="score-badge \${scoreBadgeClass(c.score)}">\${c.score}%</span>\`:''}</div></div>\`).join(''):'<div style="text-align:center;padding:30px 0;font-size:12px;color:#9B96B8;">No candidates</div>'}</div>\`;
  }).join('');
}

// ── CANDIDATES TABLE ─────────────────────────────────────────────
function renderCandidatesTable() {
  const search=(document.getElementById('candidate-search')||{value:''}).value.toLowerCase();
  const stage=(document.getElementById('stage-filter')||{value:''}).value;
  const source=(document.getElementById('source-filter')||{value:''}).value;
  const filtered=state.candidates.filter(c=>{
    const name=(c.firstName+' '+c.lastName).toLowerCase();
    return(!search||name.includes(search)||c.title.toLowerCase().includes(search))&&(!stage||c.stage===stage)&&(!source||c.source===source);
  });
  document.getElementById('candidates-table-body').innerHTML=filtered.length?filtered.map(c=>\`<tr onclick="openCandidateDetail('\${c.id}')" style="cursor:pointer;"><td><div style="display:flex;align-items:center;gap:10px;"><div style="width:30px;height:30px;border-radius:8px;background:\${avatarColor(c.id)};display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:white;flex-shrink:0;">\${initials(c)}</div><span class="td-name">\${c.firstName} \${c.lastName}</span></div></td><td>\${c.title}</td><td class="td-muted">\${c.location||'—'}</td><td><span class="badge \${c.source==='LinkedIn'?'badge-linkedin':'badge-site'}">\${c.source}</span></td><td class="td-muted">\${STAGE_LABELS[c.stage]}</td><td>\${c.score?\`<span class="score-badge \${scoreBadgeClass(c.score)}">\${c.score}%</span>\`:'—'}</td><td class="td-muted">\${c.added}</td><td onclick="event.stopPropagation()"><button class="btn btn-sm" onclick="deleteCandidate('\${c.id}')" style="color:#C94040;border-color:#F09595;padding:4px 10px;">✕</button></td></tr>\`).join(''):\`<tr><td colspan="8" style="text-align:center;padding:40px;color:#9B96B8;">No candidates found</td></tr>\`;
}

// ── JOB DESCRIPTIONS ─────────────────────────────────────────────
function renderJDs() {
  const grid=document.getElementById('jd-grid');
  grid.innerHTML=state.jobs.length?state.jobs.map(j=>\`<div class="jd-card"><div class="jd-card-title">\${j.title}</div><div class="jd-card-meta">\${j.location} · \${j.type} · \${j.client||'—'}</div>\${j.salary?\`<div style="font-size:12px;color:#5C5780;margin-bottom:10px;font-weight:500;">\${j.salary}</div>\`:''}<div style="font-size:12px;color:#9B96B8;line-height:1.5;margin-bottom:14px;">\${(j.description||'').slice(0,120)}...</div><div class="jd-card-footer"><span style="font-size:12px;color:#5C5780;"><span class="status-dot dot-active"></span>\${j.active?'Active':'Closed'}</span><div style="display:flex;gap:6px;"><button class="btn btn-sm" onclick="event.stopPropagation();openScreeningForJD('\${j.id}')">Screen candidates</button><button class="btn btn-sm" onclick="event.stopPropagation();deleteJD('\${j.id}')" style="color:#C94040;border-color:#F09595;">✕</button></div></div></div>\`).join(''):'<div class="empty-state"><div class="empty-icon">◻</div><div class="empty-title">No job descriptions yet</div><div class="empty-sub">Add your first JD to start screening</div></div>';
}

// ── PROFILES ────────────────────────────────────────────────────
function renderProfiles() {
  document.getElementById('profiles-table-body').innerHTML=state.candidates.map(c=>\`<tr><td><div style="display:flex;align-items:center;gap:10px;"><div style="width:30px;height:30px;border-radius:8px;background:\${avatarColor(c.id)};display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:white;">\${initials(c)}</div><span class="td-name">\${c.firstName} \${c.lastName}</span></div></td><td>\${c.title}</td><td>\${c.profile?(c.profileSent?'<span class="badge" style="background:#E1F5EE;color:#1D9E75;">Sent</span>':'<span class="badge" style="background:#FDF0E6;color:#E87722;">Draft</span>'):'<span class="badge" style="background:#F0EEF8;color:#9B96B8;">Not started</span>'}</td><td class="td-muted">\${c.profile?'Generated':'—'}</td><td><div style="display:flex;gap:6px;"><button class="btn btn-sm" onclick="openCandidateDetail('\${c.id}');setTimeout(()=>showDetailTab('profile'),100)">View</button>\${c.profile&&!c.profileSent?\`<button class="btn btn-sm btn-orange" onclick="markSent('\${c.id}')">Mark sent</button>\`:''}\${c.profile?\`<button class="btn btn-sm" onclick="clearProfile('\${c.id}')" style="color:#C94040;border-color:#F09595;">Clear</button>\`:''}<button class="btn btn-sm" onclick="deleteCandidate('\${c.id}')" style="color:#C94040;border-color:#F09595;">✕</button></div></td></tr>\`).join('');
}

// ── SCREENING ───────────────────────────────────────────────────
function renderScreeningSelects() {
  document.getElementById('screen-candidate').innerHTML=state.candidates.map(c=>\`<option value="\${c.id}">\${c.firstName} \${c.lastName} — \${c.title}</option>\`).join('');
  document.getElementById('screen-jd').innerHTML=state.jobs.map(j=>\`<option value="\${j.id}">\${j.title} · \${j.location}</option>\`).join('');
}

async function runScreening() {
  const c=state.candidates.find(x=>x.id===document.getElementById('screen-candidate').value);
  const j=state.jobs.find(x=>x.id===document.getElementById('screen-jd').value);
  if(!c||!j) return;
  const el=document.getElementById('screening-result');
  el.innerHTML=\`<div class="ai-generating"><div class="ai-spinner"></div>Screening \${c.firstName} \${c.lastName}…</div>\`;
  await doScreening(c,j,el);
}

async function runDetailScreening() {
  const c=state.candidates.find(x=>x.id===currentCandidateId);
  const j=state.jobs.find(x=>x.id===document.getElementById('detail-screen-jd').value);
  if(!c||!j) return;
  const el=document.getElementById('detail-screening-result');
  el.innerHTML=\`<div class="ai-generating"><div class="ai-spinner"></div>Screening against \${j.title}…</div>\`;
  await doScreening(c,j,el);
}

async function doScreening(c,j,el) {
  const prompt=\`You are a recruitment consultant. Screen this candidate against the job description. Respond ONLY with JSON.
Candidate: \${c.firstName} \${c.lastName}, \${c.title}, \${c.location}. Skills: \${c.skills}. \${c.role1||''} \${c.role2||''}
Job: \${j.title} at \${j.client||j.location}. Requirements: \${j.requirements}. Description: \${j.description}
Return: {"overall":85,"skills":80,"experience":78,"culture":82,"summary":"2-3 sentence overall assessment","strengths":["strength1","strength2","strength3"],"gaps":["gap1","gap2"],"recommendation":"Recommend or Consider or Pass"}\`;
  try {
    const data=await callClaude({model:'claude-sonnet-4-6',max_tokens:600,messages:[{role:'user',content:prompt}]});
    const raw=(data.content||[]).map(x=>x.text||'').join('');
    const r=JSON.parse(raw.replace(/^\`\`\`json\\s*/,'').replace(/\\s*\`\`\`\$/,'').trim());
    c.score=r.overall; save();
    el.innerHTML=\`<div style="margin-bottom:16px;">\${[['Overall match',r.overall],['Skills',r.skills],['Experience',r.experience],['Culture fit',r.culture]].map(([l,v])=>\`<div class="score-row"><span class="score-label">\${l}</span><div class="score-track"><div class="score-fill" style="width:\${v}%;background:\${scoreColor(v)};"></div></div><span class="score-pct" style="color:\${scoreColor(v)};">\${v}%</span></div>\`).join('')}</div><div style="background:#F8F7FC;border-radius:10px;padding:14px;margin-bottom:12px;font-size:13px;color:#5C5780;line-height:1.6;">\${r.summary}</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px;"><div><div style="font-size:11px;font-weight:700;color:#1D9E75;text-transform:uppercase;margin-bottom:6px;">Strengths</div>\${(r.strengths||[]).map(s=>\`<div style="font-size:12px;color:#5C5780;padding:3px 0;padding-left:12px;position:relative;"><span style="position:absolute;left:0;color:#1D9E75;">✓</span>\${s}</div>\`).join('')}</div><div><div style="font-size:11px;font-weight:700;color:#E18F27;text-transform:uppercase;margin-bottom:6px;">Gaps</div>\${(r.gaps||[]).map(g=>\`<div style="font-size:12px;color:#5C5780;padding:3px 0;padding-left:12px;position:relative;"><span style="position:absolute;left:0;color:#E18F27;">△</span>\${g}</div>\`).join('')}</div></div><div style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:\${r.recommendation==='Recommend'?'#E1F5EE':r.recommendation==='Consider'?'#FEF3DC':'#FCEAEA'};border-radius:10px;"><span style="font-size:12px;font-weight:700;color:\${r.recommendation==='Recommend'?'#1D9E75':r.recommendation==='Consider'?'#E18F27':'#C94040'};">Recommendation: \${r.recommendation}</span></div>\`;
    showToast('Screening complete');
  } catch(e) {
    el.innerHTML=\`<div style="padding:16px;background:#FCEAEA;border-radius:10px;font-size:13px;color:#C94040;">Screening failed: \${e.message}</div>\`;
  }
}

// ── CANDIDATE DETAIL ─────────────────────────────────────────────
let currentCandidateId=null;

function openCandidateDetail(id) {
  currentCandidateId=id;
  const c=state.candidates.find(x=>x.id===id); if(!c) return;
  document.getElementById('detail-avatar').textContent=initials(c);
  document.getElementById('detail-avatar').style.background=avatarColor(id);
  document.getElementById('detail-name').textContent=c.firstName+' '+c.lastName;
  document.getElementById('detail-role').textContent=c.title+(c.location?' · '+c.location:'');
  document.getElementById('detail-badges').innerHTML=\`<span class="badge \${c.source==='LinkedIn'?'badge-linkedin':'badge-site'}">\${c.source}</span><span class="badge" style="background:#F0EEF8;color:#5C5780;">\${STAGE_LABELS[c.stage]}</span>\${c.score?\`<span class="score-badge \${scoreBadgeClass(c.score)}">\${c.score}% match</span>\`:''}\`;
  document.getElementById('detail-info-grid').innerHTML=[{l:'Email',v:c.email||'—'},{l:'Phone',v:c.phone||'—'},{l:'Location',v:c.location||'—'},{l:'Seniority',v:c.seniority||'—'},{l:'Availability',v:c.availability||'—'},{l:'LinkedIn',v:c.linkedin||'—'},{l:'Other processes',v:c.other||'—'},{l:'Added',v:c.added||'—'}].map(i=>\`<div class="info-item"><div class="info-label">\${i.l}</div><div class="info-val" style="font-size:13px;">\${i.v}</div></div>\`).join('');
  document.getElementById('stage-buttons').innerHTML=STAGES.map(s=>\`<button class="btn \${s===c.stage?'btn-primary':''} btn-sm" onclick="moveStage('\${id}','\${s}')">\${STAGE_LABELS[s]}</button>\`).join('');
  document.getElementById('detail-screen-jd').innerHTML=state.jobs.map(j=>\`<option value="\${j.id}">\${j.title} · \${j.location}</option>\`).join('');
  renderProfileContent(c);
  showDetailTab('overview');
  openModal('modal-candidate-detail');
}

function renderProfileContent(c) {
  const el=document.getElementById('profile-content');
  if(!c.profile){el.innerHTML=\`<div class="empty-state" style="padding:30px 0;"><div class="empty-icon">◻</div><div class="empty-title">No profile yet</div><div class="empty-sub">Click Regenerate Profile to generate an AI profile</div></div>\`;return;}
  const p=c.profile;
  const skillsHtml=(p.skills||[]).map(sg=>\`<div style="margin-bottom:10px;"><div style="font-size:11px;font-weight:600;color:#5C5780;margin-bottom:5px;">\${sg.category}</div><div>\${(sg.items||[]).map(s=>\`<span class="skill-chip">\${s}</span>\`).join('')}</div></div>\`).join('');
  const expHtml=(p.experience||[]).map(e=>\`<div class="exp-item"><div class="exp-title-text">\${e.title}</div><div class="exp-company">\${e.company}</div><div class="exp-dates">\${e.dates}</div>\${(e.bullets||[]).map(b=>\`<div class="exp-bullet">\${b}</div>\`).join('')}</div>\`).join('');
  el.innerHTML=\`<div class="profile-preview"><h4>Profile summary</h4><p>\${p.summary||''}</p><h4>Interview highlights</h4><p style="white-space:pre-wrap;">\${p.highlights||''}</p><h4>Skills</h4>\${skillsHtml}<h4>Work experience</h4>\${expHtml}<h4>Education & languages</h4><p>\${p.education||''}</p>\${p.languages?\`<p>\${p.languages}</p>\`:''}</div>\${c.score?\`<div class="score-section" style="margin-top:16px;"><div style="font-size:11px;font-weight:700;color:#9B96B8;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:10px;">AI match score</div>\${[['Skills match',c.score],['Experience',Math.max(40,c.score-7)],['Culture fit',Math.max(40,c.score-17)]].map(([l,v])=>\`<div class="score-row"><span class="score-label">\${l}</span><div class="score-track"><div class="score-fill" style="width:\${v}%;background:\${scoreColor(v)};"></div></div><span class="score-pct" style="color:\${scoreColor(v)};">\${v}%</span></div>\`).join('')}</div>\`:''}\`;
}

async function generateProfileForCurrent() {
  const c=state.candidates.find(x=>x.id===currentCandidateId); if(!c) return;
  const el=document.getElementById('profile-content');
  el.innerHTML=\`<div class="ai-generating"><div class="ai-spinner"></div>Generating AI profile for \${c.firstName} \${c.lastName}…</div>\`;
  const prompt=\`You are a recruitment consultant at HireSouth. Generate a candidate profile. Respond ONLY with valid JSON, no markdown.
Name: \${c.firstName} \${c.lastName}, Title: \${c.title}, Location: \${c.location}, Seniority: \${c.seniority}, Availability: \${c.availability}, Source: \${c.source}
Recent Role: \${c.role1||'Not provided'}, Previous Role: \${c.role2||'Not provided'}
Skills: \${c.skills||'Not provided'}, Education: \${c.education||'Not provided'}, Languages: \${c.languages||'Not provided'}
Recruiter Notes: \${c.notes||'Not provided'}
Return: {"summary":"3-4 sentence professional third-person summary","highlights":"2-3 paragraph recruiter highlights","skills":[{"category":"Category","items":["skill"]}],"experience":[{"title":"Title","company":"Company","dates":"Dates","bullets":["achievement"]}],"education":"string","languages":"string"}\`;
  try {
    const data=await callClaude({model:'claude-sonnet-4-6',max_tokens:1000,messages:[{role:'user',content:prompt}]});
    const raw=(data.content||[]).map(x=>x.text||'').join('');
    const profile=JSON.parse(raw.replace(/^\`\`\`json\\s*/,'').replace(/\\s*\`\`\`\$/,'').trim());
    c.profile=profile; c.score=c.score||(70+Math.floor(Math.random()*25));
    if(c.stage==='sourced') c.stage='profiled';
    save(); renderProfileContent(c); showToast('Profile generated for '+c.firstName+' '+c.lastName); renderPipeline();
  } catch(e) {
    el.innerHTML=\`<div style="padding:16px;background:#FCEAEA;border-radius:10px;font-size:13px;color:#C94040;">Failed: \${e.message}</div>\`;
  }
}

function moveStage(id,stage) {
  const c=state.candidates.find(x=>x.id===id); if(c){c.stage=stage;save();}
  document.getElementById('stage-buttons').innerHTML=STAGES.map(s=>\`<button class="btn \${s===stage?'btn-primary':''} btn-sm" onclick="moveStage('\${id}','\${s}')">\${STAGE_LABELS[s]}</button>\`).join('');
  const c2=state.candidates.find(x=>x.id===id);
  document.getElementById('detail-badges').innerHTML=\`<span class="badge \${c2.source==='LinkedIn'?'badge-linkedin':'badge-site'}">\${c2.source}</span><span class="badge" style="background:#F0EEF8;color:#5C5780;">\${STAGE_LABELS[stage]}</span>\${c2.score?\`<span class="score-badge \${scoreBadgeClass(c2.score)}">\${c2.score}% match</span>\`:''}\`;
  renderPipeline(); renderDashboard(); showToast('Moved to '+STAGE_LABELS[stage]);
}

function markProfileSent() {
  const c=state.candidates.find(x=>x.id===currentCandidateId);
  if(c){c.profileSent=true;c.stage='sent';save();showToast('Profile marked as sent');renderPipeline();}
}

function markSent(id) {
  const c=state.candidates.find(x=>x.id===id);
  if(c){c.profileSent=true;c.stage='sent';save();renderProfiles();showToast('Marked as sent');}
}

function showDetailTab(tab) {
  document.querySelectorAll('.detail-tab').forEach((t,i)=>{const tabs=['overview','profile','screening'];t.classList.toggle('active',tabs[i]===tab);});
  ['overview','profile','screening'].forEach(t=>document.getElementById('dtab-'+t).classList.toggle('active',t===tab));
}

// ── ADD CANDIDATE ───────────────────────────────────────────────
function openAddCandidate() {
  document.getElementById('resume-file-input').value='';
  document.getElementById('upload-zone-content').innerHTML=\`<div style="font-size:28px;margin-bottom:8px;opacity:0.4;">↑</div><div style="font-size:14px;font-weight:600;color:var(--gray-600);margin-bottom:4px;">Drop resume here or click to upload</div><div style="font-size:12px;color:var(--gray-400);">PDF or Word (.docx) — AI will extract and fill all fields automatically</div>\`;
  document.getElementById('resume-parsing-status').style.display='none';
  openModal('modal-add-candidate');
}

function saveCandidate() {
  const fn=document.getElementById('add-firstname').value.trim(), ln=document.getElementById('add-lastname').value.trim();
  if(!fn||!ln){showToast('Please enter a first and last name');return;}
  const c={id:'c'+Date.now(),firstName:fn,lastName:ln,title:document.getElementById('add-title').value.trim(),location:document.getElementById('add-location').value.trim(),email:document.getElementById('add-email').value.trim(),phone:document.getElementById('add-phone').value.trim(),source:document.getElementById('add-source').value,seniority:document.getElementById('add-seniority').value,availability:document.getElementById('add-avail').value.trim(),linkedin:document.getElementById('add-linkedin').value.trim(),other:document.getElementById('add-other').value.trim()||'Not provided',role1:document.getElementById('add-role1').value.trim(),role2:document.getElementById('add-role2').value.trim(),skills:document.getElementById('add-skills').value.trim(),education:document.getElementById('add-edu').value.trim(),languages:document.getElementById('add-lang').value.trim(),notes:document.getElementById('add-notes').value.trim(),stage:'sourced',score:null,profile:null,profileSent:false,added:new Date().toISOString().split('T')[0]};
  state.candidates.push(c); save();
  closeModal('modal-add-candidate');
  ['add-firstname','add-lastname','add-title','add-location','add-email','add-phone','add-avail','add-linkedin','add-other','add-role1','add-role2','add-skills','add-edu','add-lang','add-notes'].forEach(id=>document.getElementById(id).value='');
  showToast('Candidate added — generating profile…'); updateBadges();
  openCandidateDetail(c.id);
  setTimeout(()=>showDetailTab('profile'),300);
  setTimeout(()=>generateProfileForCurrent(),600);
}

// ── RESUME PARSING ──────────────────────────────────────────────
function handleResumeDrop(e) { const file=e.dataTransfer.files[0]; if(file) handleResumeFile(file); }

async function handleResumeFile(file) {
  if(!file) return;
  document.getElementById('upload-zone-content').innerHTML=\`<div style="font-size:22px;margin-bottom:8px;">📄</div><div style="font-size:13px;font-weight:600;color:var(--purple);">\${file.name}</div><div style="font-size:11px;color:var(--gray-400);margin-top:3px;">\${(file.size/1024).toFixed(0)} KB</div>\`;
  const status=document.getElementById('resume-parsing-status'), statusText=document.getElementById('parsing-status-text');
  status.style.display='block'; statusText.textContent='Reading resume with AI…';
  try {
    const ext=file.name.split('.').pop().toLowerCase();
    if(ext==='txt') {
      const text=await file.text();
      await parseResumeText(text);
    } else if(ext==='pdf'||ext==='docx'||ext==='doc') {
      const mediaTypes={'pdf':'application/pdf','docx':'application/vnd.openxmlformats-officedocument.wordprocessingml.document','doc':'application/msword'};
      const base64=await fileToBase64(file);
      statusText.textContent='AI is extracting candidate data…';
      const data=await callClaude({model:'claude-haiku-4-5-20251001',max_tokens:1200,messages:[{role:'user',content:[{type:'document',source:{type:'base64',media_type:mediaTypes[ext],data:base64}},{type:'text',text:buildResumePrompt()}]}]});
      const raw=(data.content||[]).map(x=>x.text||'').join('');
      const parsed=JSON.parse(raw.replace(/^\`\`\`json\\s*/,'').replace(/\\s*\`\`\`\$/,'').trim());
      applyParsedResume(parsed);
    } else {
      throw new Error('Please upload a PDF, .docx, or .txt file.');
    }
    status.style.display='none'; showToast('Resume parsed — review and save.');
  } catch(err) {
    status.style.display='none';
    const isKeyErr = err.message.includes('API key') || err.message.includes('Failed to fetch') || err.message.includes('401');
    document.getElementById('upload-zone-content').innerHTML=\`<div style="font-size:22px;margin-bottom:8px;color:var(--red);">⚠</div><div style="font-size:13px;font-weight:600;color:var(--red);">\${isKeyErr ? 'API key required' : err.message}</div><div style="font-size:11px;color:var(--gray-400);margin-top:4px;">\${isKeyErr ? '<a href="#" onclick="closeModal(\\'modal-add-candidate\\');showPage(\\'settings\\')" style="color:#2E1760;font-weight:600;">Go to Settings → enter your Anthropic API key</a>' : 'Fill in the fields manually below.'}</div>\`;
  }
}

function fileToBase64(file) {
  return new Promise((resolve,reject)=>{const r=new FileReader();r.onload=()=>resolve(r.result.split(',')[1]);r.onerror=()=>reject(new Error('Could not read file'));r.readAsDataURL(file);});
}

function buildResumePrompt() {
  return \`Extract all candidate information from this resume and return JSON only — no markdown, no extra text.\\nReturn ONLY this JSON (use "" for any field not found):\\n{"firstName":"","lastName":"","email":"","phone":"","title":"most recent job title","location":"city, state or country","seniority":"Junior or Senior or Director or VP or C-Suite","linkedin":"","skills":"comma separated key skills","education":"degree, institution, year","languages":"languages and levels","role1":"Most recent: Title, Company, Dates. Key achievements in 2-3 sentences.","role2":"Previous: Title, Company, Dates. Key achievements in 1-2 sentences.","availability":""}\`;
}

async function parseResumeText(text) {
  const data=await callClaude({model:'claude-haiku-4-5-20251001',max_tokens:1000,messages:[{role:'user',content:'Extract candidate info from this resume. '+buildResumePrompt()+'\\n\\nResume:\\n'+text.slice(0,5000)}]});
  const raw=(data.content||[]).map(x=>x.text||'').join('');
  const parsed=JSON.parse(raw.replace(/^\`\`\`json\\s*/,'').replace(/\\s*\`\`\`\$/,'').trim());
  applyParsedResume(parsed);
}

function applyParsedResume(parsed) {
  const fields={'add-firstname':parsed.firstName,'add-lastname':parsed.lastName,'add-email':parsed.email,'add-phone':parsed.phone,'add-title':parsed.title,'add-location':parsed.location,'add-linkedin':parsed.linkedin,'add-skills':parsed.skills,'add-edu':parsed.education,'add-lang':parsed.languages,'add-role1':parsed.role1,'add-role2':parsed.role2,'add-avail':parsed.availability};
  Object.entries(fields).forEach(([id,val])=>{const el=document.getElementById(id);if(el&&val)el.value=val;});
  if(parsed.seniority){const sel=document.getElementById('add-seniority');const match=['Junior','Senior','Director','VP','C-Suite'].find(o=>o.toLowerCase()===parsed.seniority.toLowerCase());if(match)sel.value=match;}
  document.getElementById('add-source').value='Resume Upload';
  Object.keys(fields).forEach(id=>{const el=document.getElementById(id);if(el&&el.value){el.style.borderColor='#1D9E75';el.style.background='#E1F5EE';setTimeout(()=>{el.style.borderColor='';el.style.background='';},2500);}});
}

// ── OPEN ROLES ──────────────────────────────────────────────────
let roleFilter='all';

function statusClass(s) {
  if(s==='Active') return 'status-active';
  if(s==='Paused') return 'status-paused';
  if(s==='Closed') return 'status-closed';
  if(s==='Hired - More') return 'status-hired';
  if(s==='Sourcing') return 'status-sourcing';
  return 'status-paused';
}

function setRoleFilter(f,btn) {
  roleFilter=f;
  document.querySelectorAll('.roles-filter-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  renderRoles();
}

function renderRoles() {
  const roles=(state.roles||[]).filter(r=>roleFilter==='all'||r.status===roleFilter);
  const tbody=document.getElementById('roles-table-body'); if(!tbody) return;
  tbody.innerHTML=roles.length?roles.map(r=>\`<tr onclick="openRoleDetail('\${r.id}')"><td><span class="role-status \${statusClass(r.status)}">\${r.status}</span></td><td style="font-weight:600;color:var(--gray-900);min-width:160px;">\${r.title}</td><td style="color:var(--gray-600);">\${r.client||'—'}</td><td style="color:var(--gray-400);white-space:nowrap;">\${r.opened||'—'}</td><td>\${r.priority&&r.priority!=='None'?\`<span class="priority-badge \${r.priority==='High'?'pri-high':'pri-medium'}">\${r.priority}</span>\`:'<span style="font-size:12px;color:var(--gray-400);">—</span>'}</td><td><span class="cand-count">\${r.activeCandidates||0}</span></td><td style="color:var(--gray-400);white-space:nowrap;">\${r.deadline||'—'}</td><td style="color:var(--gray-600);white-space:nowrap;">\${r.salary||'—'}</td><td>\${r.url?\`<a href="\${r.url}" target="_blank" onclick="event.stopPropagation()" style="color:#0A66C2;font-size:12px;text-decoration:none;font-weight:500;">View ↗</a>\`:'<span style="color:var(--gray-400);font-size:12px;">—</span>'}</td><td style="color:var(--gray-400);font-size:12px;max-width:140px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">\${r.notes||'—'}</td><td onclick="event.stopPropagation()"><div style="display:flex;gap:5px;"><button class="btn btn-sm" onclick="openRoleDetail('\${r.id}')">Edit</button><button class="btn btn-sm" onclick="deleteRole('\${r.id}')" style="color:#C94040;">✕</button></div></td></tr>\`).join(''):\`<tr><td colspan="11" style="text-align:center;padding:48px;color:var(--gray-400);">No roles found — click <strong>+ Add Role</strong> to get started</td></tr>\`;
  const nbRoles=document.getElementById('nb-roles');
  if(nbRoles) nbRoles.textContent=(state.roles||[]).filter(r=>r.status==='Active'||r.status==='Sourcing').length;
}

function openAddRole() {
  ['role-title','role-client','role-salary','role-location','role-url','role-email','role-musthave','role-notes','role-jd-paste','role-description'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
  document.getElementById('role-status').value='Sourcing';
  document.getElementById('role-priority').value='None';
  document.getElementById('role-opened').value=new Date().toISOString().split('T')[0];
  document.getElementById('role-deadline').value='';
  document.getElementById('role-parse-status').style.display='none';
  delete document.getElementById('modal-add-role').dataset.editId;
  openModal('modal-add-role');
}

function openRoleDetail(id) {
  const r=(state.roles||[]).find(x=>x.id===id); if(!r) return;
  ['title','client','salary','location','url','email','musthave','notes','description'].forEach(f=>{const el=document.getElementById('role-'+f);if(el)el.value=r[f]||'';});
  document.getElementById('role-status').value=r.status||'Sourcing';
  document.getElementById('role-priority').value=r.priority||'None';
  document.getElementById('role-opened').value=r.opened||'';
  document.getElementById('role-deadline').value=r.deadline||'';
  document.getElementById('role-jd-paste').value='';
  document.getElementById('role-parse-status').style.display='none';
  document.getElementById('modal-add-role').dataset.editId=id;
  openModal('modal-add-role');
}

function saveRole() {
  const title=document.getElementById('role-title').value.trim();
  if(!title){showToast('Please enter a role name');return;}
  const editId=document.getElementById('modal-add-role').dataset.editId;
  const roleData={title,client:document.getElementById('role-client').value.trim(),status:document.getElementById('role-status').value,priority:document.getElementById('role-priority').value,opened:document.getElementById('role-opened').value,deadline:document.getElementById('role-deadline').value,salary:document.getElementById('role-salary').value.trim(),location:document.getElementById('role-location').value.trim(),url:document.getElementById('role-url').value.trim(),email:document.getElementById('role-email').value.trim(),musthave:document.getElementById('role-musthave').value.trim(),notes:document.getElementById('role-notes').value.trim(),description:document.getElementById('role-description').value.trim()};
  if(editId){const idx=(state.roles||[]).findIndex(r=>r.id===editId);if(idx>=0)state.roles[idx]={...state.roles[idx],...roleData};}
  else{state.roles=state.roles||[];state.roles.push({id:'r'+Date.now(),activeCandidates:0,...roleData});}
  if(roleData.description){state.jobs.push({id:'j'+Date.now(),title:roleData.title,location:roleData.location,type:'Full-time',client:roleData.client,salary:roleData.salary,description:roleData.description,requirements:roleData.musthave,active:true,added:new Date().toISOString().split('T')[0]});}
  save(); closeModal('modal-add-role'); renderRoles(); showToast(editId?'Role updated':'Role added');
}

function deleteRole(id) {
  const r=(state.roles||[]).find(x=>x.id===id); if(!r) return;
  confirmAction('Delete "'+r.title+'"?','This role will be permanently removed.',()=>{state.roles=state.roles.filter(x=>x.id!==id);save();renderRoles();showToast('Role deleted');});
}

async function parseJDPaste() {
  const text=document.getElementById('role-jd-paste').value.trim();
  if(!text){showToast('Paste a job description first');return;}
  const statusEl=document.getElementById('role-parse-status'), statusText=document.getElementById('role-parse-text');
  statusEl.style.display='block'; statusText.textContent='Extracting role details with AI…';
  try {
    const data=await callClaude({model:'claude-sonnet-4-6',max_tokens:800,messages:[{role:'user',content:\`Extract job details from this job description. Return ONLY valid JSON, no markdown.\\n\\nJob description:\\n"""\\n\${text.slice(0,4000)}\\n"""\\n\\nReturn ONLY:\\n{"title":"job title","client":"company or client name","salary":"salary or rate range","location":"location or Remote","musthave":"key requirements comma separated","notes":"any important notes like timezone","description":"full cleaned up job description text"}\`}]});
    const raw=(data.content||[]).map(x=>x.text||'').join('');
    const parsed=JSON.parse(raw.replace(/^\`\`\`json\\s*/,'').replace(/\\s*\`\`\`\$/,'').trim());
    const fields={'role-title':parsed.title,'role-client':parsed.client,'role-salary':parsed.salary,'role-location':parsed.location,'role-musthave':parsed.musthave,'role-notes':parsed.notes,'role-description':parsed.description||text};
    Object.entries(fields).forEach(([id,val])=>{const el=document.getElementById(id);if(el&&val){el.value=val;el.style.borderColor='#1D9E75';el.style.background='#E1F5EE';setTimeout(()=>{el.style.borderColor='';el.style.background='';},2000);}});
    statusEl.style.display='none'; showToast('JD parsed — review and save');
  } catch(e) {
    statusEl.style.display='none'; showToast('Parse failed — fill in manually');
  }
}

// ── JD MANAGEMENT ───────────────────────────────────────────────
function openAddJD() { openModal('modal-add-jd'); }

function saveJD() {
  const title=document.getElementById('jd-title').value.trim();
  if(!title){showToast('Please enter a job title');return;}
  state.jobs.push({id:'j'+Date.now(),title,location:document.getElementById('jd-location').value.trim(),type:document.getElementById('jd-type').value,client:document.getElementById('jd-client').value.trim(),salary:document.getElementById('jd-salary').value.trim(),description:document.getElementById('jd-description').value.trim(),requirements:document.getElementById('jd-requirements').value.trim(),active:true,added:new Date().toISOString().split('T')[0]});
  save(); closeModal('modal-add-jd'); renderJDs(); showToast('Job description saved');
}

function openScreeningForJD(jdId) { showPage('screening'); setTimeout(()=>document.getElementById('screen-jd').value=jdId,100); }

// ── DELETE / CLEAR ──────────────────────────────────────────────
function confirmAction(title,body,action) {
  document.getElementById('confirm-title').textContent=title;
  document.getElementById('confirm-sub').textContent='This cannot be undone.';
  document.getElementById('confirm-body').textContent=body;
  document.getElementById('confirm-action-btn').onclick=()=>{closeModal('modal-confirm-clear');action();};
  openModal('modal-confirm-clear');
}

function confirmClear(type) {
  const configs={
    candidates:{title:'Clear all candidates?',body:'All candidate records, pipeline data, and HS profiles will be deleted. Roles and JDs are kept.',action:()=>{state.candidates=[];save();showToast('All candidates cleared');renderDashboard();updateBadges();}},
    roles:{title:'Clear all open roles?',body:'All roles in the Open Roles Tracker will be deleted. Candidates and JDs are kept.',action:()=>{state.roles=[];save();showToast('All roles cleared');renderRoles();updateBadges();}},
    jobs:{title:'Clear all job descriptions?',body:'All saved job descriptions will be deleted. Candidates and roles are kept.',action:()=>{state.jobs=[];save();showToast('JDs cleared');renderJDs();}},
    all:{title:'Reset everything?',body:'All candidates, roles, JDs, and profiles will be permanently wiped. This cannot be undone.',action:()=>{localStorage.removeItem('hs_state');location.reload();}}
  };
  const cfg=configs[type]; if(!cfg) return;
  confirmAction(cfg.title,cfg.body,cfg.action);
}

function deleteCandidate(id) {
  const c=state.candidates.find(x=>x.id===id); if(!c) return;
  confirmAction('Delete '+c.firstName+' '+c.lastName+'?','This candidate, their pipeline record, and any HS profile will be permanently deleted.',()=>{
    state.candidates=state.candidates.filter(x=>x.id!==id);
    save(); renderCandidatesTable(); renderProfiles(); renderPipeline(); renderDashboard(); updateBadges();
    if(document.getElementById('modal-candidate-detail').classList.contains('open')) closeModal('modal-candidate-detail');
    showToast(c.firstName+' '+c.lastName+' deleted');
  });
}

function deleteJD(id) {
  const j=state.jobs.find(x=>x.id===id); if(!j) return;
  confirmAction('Delete "'+j.title+'"?','This job description will be permanently removed.',()=>{state.jobs=state.jobs.filter(x=>x.id!==id);save();renderJDs();showToast('"'+j.title+'" deleted');});
}

function clearProfile(id) {
  const c=state.candidates.find(x=>x.id===id); if(!c) return;
  confirmAction('Clear profile for '+c.firstName+'?','The generated HS profile will be removed. The candidate record is kept.',()=>{c.profile=null;c.profileSent=false;save();renderProfiles();showToast('Profile cleared for '+c.firstName);});
}

// ── SETTINGS ────────────────────────────────────────────────────
function saveSettings() {
  state.settings={company:document.getElementById('s-company').value.trim(),website:document.getElementById('s-website').value.trim(),email:document.getElementById('s-email').value.trim(),avail:document.getElementById('s-avail').value.trim()};
  save(); showToast('Settings saved');
}

function loadSettings() {
  const s=state.settings||{};
  ['company','website','email','avail'].forEach(k=>{const el=document.getElementById('s-'+k);if(el)el.value=s[k]||'';});
  renderTeamProfilesGrid();
}

// ── MODALS ──────────────────────────────────────────────────────
function openModal(id) { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }
document.querySelectorAll('.modal-overlay').forEach(o=>o.addEventListener('click',e=>{if(e.target===o)o.classList.remove('open');}));

function showToast(msg) {
  const t=document.getElementById('toast'); t.textContent=msg; t.style.display='block';
  setTimeout(()=>t.style.display='none',2800);
}

// ── TEAM PROFILES & SWITCHER ─────────────────────────────────────

// Seed default team if not in state
if(!state.team) {
  state.team = [
    {id:'jared',firstName:'Jared',lastName:'Andreasson',role:'CEO',color:'#2E1760',email:'',phone:'',linkedin:'',photo:null},
    {id:'sol',firstName:'Sol',lastName:'',role:'SMO',color:'#E87722',email:'',phone:'',linkedin:'',photo:null},
    {id:'juanmi',firstName:'Juanmi',lastName:'',role:'Recruiter',color:'#1D9E75',email:'',phone:'',linkedin:'',photo:null}
  ];
  save();
}

let activeProfile = localStorage.getItem('hs_active_profile') || state.team[0]?.id || 'jared';

function getMember(id) { return (state.team||[]).find(m=>m.id===id); }

function memberInitials(m) {
  return ((m.firstName||'')[0]||(m.lastName||'')[0]||'?').toUpperCase() + ((m.lastName||'')[0]||'').toUpperCase();
}

function memberDisplayName(m) {
  return [m.firstName, m.lastName].filter(Boolean).join(' ') || 'Unnamed';
}

function renderMemberAvatar(m, size=30, radius=8) {
  const s = \`width:\${size}px;height:\${size}px;border-radius:\${radius}px;display:flex;align-items:center;justify-content:center;font-size:\${Math.round(size*0.38)}px;font-weight:700;color:white;flex-shrink:0;overflow:hidden;background:\${m.color||'#2E1760'};\`;
  if(m.photo) return \`<div style="\${s}"><img src="\${m.photo}" style="width:100%;height:100%;object-fit:cover;border-radius:\${radius}px;"></div>\`;
  return \`<div style="\${s}">\${memberInitials(m)}</div>\`;
}

function applyProfile(key) {
  const m = getMember(key) || state.team?.[0]; if(!m) return;
  const av = document.getElementById('active-avatar');
  const nm = document.getElementById('active-name');
  const rl = document.getElementById('active-role');
  if(!av||!nm||!rl) return;
  if(m.photo) {
    av.style.background = m.color||'#2E1760';
    av.innerHTML = \`<img src="\${m.photo}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">\`;
  } else {
    av.innerHTML = memberInitials(m);
    av.style.background = m.color||'#2E1760';
  }
  nm.textContent = memberDisplayName(m);
  rl.textContent = m.role||'';
  renderSidebarOptions();
}

function renderSidebarOptions() {
  const menu = document.getElementById('profile-menu'); if(!menu) return;
  const switcher = menu.querySelector('#profile-options-list');
  if(!switcher) return;
  switcher.innerHTML = (state.team||[]).map(m=>\`
    <div class="profile-option \${m.id===activeProfile?'active-profile':''}" onclick="switchProfile('\${m.id}')" id="opt-\${m.id}">
      \${renderMemberAvatar(m, 30, 50)}
      <div><div class="profile-opt-name">\${memberDisplayName(m)}</div><div class="profile-opt-role">\${m.role||''}</div></div>
    </div>\`).join('');
}

function switchProfile(key) {
  activeProfile=key; localStorage.setItem('hs_active_profile',key); applyProfile(key); toggleProfileMenu();
}

function toggleProfileMenu() {
  const menu=document.getElementById('profile-menu');
  menu.style.display=menu.style.display==='none'?'block':'none';
}

document.addEventListener('click',e=>{
  const menu=document.getElementById('profile-menu');
  const footer=menu&&menu.closest('.sidebar-footer');
  if(menu&&footer&&!footer.contains(e.target)) menu.style.display='none';
});

// ── TEAM PROFILE EDITING ──────────────────────────────────────────
let editingMemberId = null;
let selectedColor = '#2E1760';
let pendingPhoto = null;

function renderTeamProfilesGrid() {
  const grid = document.getElementById('team-profiles-grid'); if(!grid) return;
  grid.innerHTML = (state.team||[]).map(m=>\`
    <div class="team-card">
      <div class="team-avatar" style="background:\${m.color||'#2E1760'};margin:0 auto 10px;">
        \${m.photo ? \`<img src="\${m.photo}" style="width:100%;height:100%;object-fit:cover;">\` : memberInitials(m)}
      </div>
      <div style="font-size:14px;font-weight:700;color:#1A1630;margin-bottom:2px;">\${memberDisplayName(m)}</div>
      <div style="font-size:12px;color:#9B96B8;margin-bottom:4px;">\${m.role||''}</div>
      \${m.email ? \`<div style="font-size:11px;color:#9B96B8;margin-bottom:10px;">\${m.email}</div>\` : '<div style="margin-bottom:10px;"></div>'}
      <div style="display:flex;gap:6px;justify-content:center;">
        <button class="btn btn-sm" onclick="openEditMember('\${m.id}')">Edit</button>
        \${m.id===activeProfile ? '<span style="font-size:11px;padding:3px 10px;background:#EEEDFE;color:#2E1760;border-radius:20px;font-weight:600;">Active</span>' : \`<button class="btn btn-sm" onclick="switchProfile('\${m.id}')">Switch to</button>\`}
      </div>
    </div>\`).join('');
}

function openAddTeamMember() {
  editingMemberId = null; pendingPhoto = null; selectedColor = '#2E1760';
  document.getElementById('em-firstname').value='';
  document.getElementById('em-lastname').value='';
  document.getElementById('em-role').value='';
  document.getElementById('em-email').value='';
  document.getElementById('em-phone').value='';
  document.getElementById('em-linkedin').value='';
  document.getElementById('em-delete-btn').style.display='none';
  document.getElementById('edit-member-title').textContent='Add team member';
  updateMemberPreview();
  selectColor('#2E1760', document.querySelector('.color-swatch'));
  openModal('modal-edit-member');
}

function openEditMember(id) {
  const m = getMember(id); if(!m) return;
  editingMemberId = id; pendingPhoto = null; selectedColor = m.color||'#2E1760';
  document.getElementById('em-firstname').value = m.firstName||'';
  document.getElementById('em-lastname').value = m.lastName||'';
  document.getElementById('em-role').value = m.role||'';
  document.getElementById('em-email').value = m.email||'';
  document.getElementById('em-phone').value = m.phone||'';
  document.getElementById('em-linkedin').value = m.linkedin||'';
  document.getElementById('em-delete-btn').style.display = state.team.length > 1 ? 'block' : 'none';
  document.getElementById('edit-member-title').textContent = 'Edit profile — ' + memberDisplayName(m);
  // Set photo preview
  const prev = document.getElementById('em-avatar-preview');
  if(m.photo) { prev.innerHTML=\`<img src="\${m.photo}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">\`; prev.style.background=m.color; }
  else { prev.innerHTML=memberInitials(m); prev.style.background=m.color; }
  // Highlight current color
  document.querySelectorAll('.color-swatch').forEach(s=>{ s.classList.toggle('selected', s.style.background===m.color||(s.style.background.replace(/\\s/g,'')===m.color)); });
  openModal('modal-edit-member');
}

function handleMemberPhoto(input) {
  const file = input.files[0]; if(!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    pendingPhoto = e.target.result;
    const prev = document.getElementById('em-avatar-preview');
    prev.innerHTML = \`<img src="\${pendingPhoto}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">\`;
  };
  reader.readAsDataURL(file);
}

function updateMemberPreview() {
  const fn = document.getElementById('em-firstname').value||'';
  const ln = document.getElementById('em-lastname').value||'';
  const initials = ((fn[0]||'')+(ln[0]||'')).toUpperCase() || '?';
  const prev = document.getElementById('em-avatar-preview');
  if(!pendingPhoto) { prev.innerHTML=initials; prev.style.background=selectedColor; }
}

function selectColor(color, el) {
  selectedColor = color;
  document.querySelectorAll('.color-swatch').forEach(s=>s.classList.remove('selected'));
  if(el) el.classList.add('selected');
  const prev = document.getElementById('em-avatar-preview');
  prev.style.background = color;
  if(!pendingPhoto) updateMemberPreview();
}

function saveTeamMember() {
  const fn = document.getElementById('em-firstname').value.trim();
  if(!fn) { showToast('Please enter a first name'); return; }
  const memberData = {
    firstName: fn,
    lastName: document.getElementById('em-lastname').value.trim(),
    role: document.getElementById('em-role').value.trim(),
    email: document.getElementById('em-email').value.trim(),
    phone: document.getElementById('em-phone').value.trim(),
    linkedin: document.getElementById('em-linkedin').value.trim(),
    color: selectedColor,
    photo: pendingPhoto || (editingMemberId ? getMember(editingMemberId)?.photo : null) || null
  };
  if(editingMemberId) {
    const idx = state.team.findIndex(m=>m.id===editingMemberId);
    if(idx>=0) state.team[idx] = {...state.team[idx], ...memberData};
  } else {
    state.team.push({id:'m'+Date.now(), ...memberData});
  }
  save();
  closeModal('modal-edit-member');
  renderTeamProfilesGrid();
  renderSidebarOptions();
  applyProfile(activeProfile);
  showToast(editingMemberId ? 'Profile updated' : 'Team member added');
}

function deleteTeamMember() {
  if(!editingMemberId) return;
  const m = getMember(editingMemberId);
  confirmAction('Delete '+memberDisplayName(m)+'?', 'This team member will be removed from the app.', ()=>{
    state.team = state.team.filter(x=>x.id!==editingMemberId);
    if(activeProfile===editingMemberId) { activeProfile=state.team[0]?.id||''; localStorage.setItem('hs_active_profile',activeProfile); }
    save(); closeModal('modal-edit-member');
    renderTeamProfilesGrid(); renderSidebarOptions(); applyProfile(activeProfile);
    showToast('Team member removed');
  });
}


// ── API KEY MANAGEMENT ───────────────────────────────────────────
window.HS_API_KEY = localStorage.getItem('hs_api_key') || '';

function saveApiKey() {
  const key = document.getElementById('s-apikey').value.trim();
  const statusEl = document.getElementById('apikey-status');
  if(!key) { 
    statusEl.style.display = 'block';
    statusEl.style.color = '#C94040';
    statusEl.textContent = 'Please enter your API key.';
    return; 
  }
  window.HS_API_KEY = key;
  localStorage.setItem('hs_api_key', key);
  statusEl.style.display = 'block';
  statusEl.style.color = '#1D9E75';
  statusEl.textContent = '✓ Key saved — AI features are now active.';
  // Mask display
  document.getElementById('s-apikey').value = key.slice(0,10) + '••••••••••••••••••••••••••••';
}

function loadSettings() {
  const s = state.settings || {};
  ['company','website','email','avail'].forEach(k => {
    const el = document.getElementById('s-'+k); if(el) el.value = s[k]||'';
  });
  const keyEl = document.getElementById('s-apikey');
  if(keyEl && window.HS_API_KEY) {
    keyEl.value = window.HS_API_KEY.slice(0,10) + '••••••••••••••••••••••••••••';
    const statusEl = document.getElementById('apikey-status');
    statusEl.style.display = 'block';
    statusEl.style.color = '#1D9E75';
    statusEl.textContent = '✓ API key is saved and active.';
  }
}


// ── INIT ────────────────────────────────────────────────────────
applyProfile(activeProfile);
renderSidebarOptions();
renderDashboard();
updateBadges();

</script>
</body>
</html>
`;

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(frontendHTML);
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'HireSouth backend is running' });
});

app.post('/api/messages', async (req, res) => {
  try {
    const message = await anthropic.messages.create(req.body);
    res.json(message);
  } catch (err) {
    console.error('Claude error:', err);
    res.status(err.status || 500).json({ error: err.message });
  }
});

app.post('/api/parse-resume', async (req, res) => {
  try {
    const { base64, mediaType } = req.body;
    if (!base64 || !mediaType) {
      return res.status(400).json({ error: 'Missing base64 or mediaType' });
    }

    const prompt = `Extract all candidate information from this resume and return JSON only — no markdown, no extra text.
Return ONLY this JSON (use "" for any field not found):
{"firstName":"","lastName":"","email":"","phone":"","title":"most recent job title","location":"city, state or country","seniority":"Junior or Senior or Director or VP or C-Suite","linkedin":"","skills":"comma separated key skills","education":"degree, institution, year","languages":"languages and levels","role1":"Most recent: Title, Company, Dates. Key achievements in 2-3 sentences.","role2":"Previous: Title, Company, Dates. Key achievements in 1-2 sentences.","availability":""}`;

    const message = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1200,
      messages: [{
        role: 'user',
        content: [
          { type: 'document', source: { type: 'base64', media_type: mediaType, data: base64 } },
          { type: 'text', text: prompt }
        ]
      }]
    });

    const raw = message.content.map(c => c.text || '').join('');
    const parsed = JSON.parse(raw.replace(/^```json\s*/, '').replace(/\s*```$/, '').trim());
    res.json(parsed);
  } catch (err) {
    console.error('Parse error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/generate-profile', async (req, res) => {
  try {
    const { candidate } = req.body;
    if (!candidate) {
      return res.status(400).json({ error: 'Missing candidate data' });
    }

    const prompt = `You are a recruitment consultant at HireSouth. Generate a candidate profile. Respond ONLY with valid JSON, no markdown.
Name: ${candidate.firstName} ${candidate.lastName}, Title: ${candidate.title}, Location: ${candidate.location}, Seniority: ${candidate.seniority}, Availability: ${candidate.availability}, Source: ${candidate.source}
Recent Role: ${candidate.role1 || 'Not provided'}, Previous Role: ${candidate.role2 || 'Not provided'}
Skills: ${candidate.skills || 'Not provided'}, Education: ${candidate.education || 'Not provided'}, Languages: ${candidate.languages || 'Not provided'}
Recruiter Notes: ${candidate.notes || 'Not provided'}
Return: {"summary":"3-4 sentence professional third-person summary","highlights":"2-3 paragraph recruiter highlights","skills":[{"category":"Category","items":["skill"]}],"experience":[{"title":"Title","company":"Company","dates":"Dates","bullets":["achievement"]}],"education":"string","languages":"string"}`;

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }]
    });

    const raw = message.content.map(c => c.text || '').join('');
    const profile = JSON.parse(raw.replace(/^```json\s*/, '').replace(/\s*```$/, '').trim());
    res.json(profile);
  } catch (err) {
    console.error('Profile generation error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/screen-candidate', async (req, res) => {
  try {
    const { candidate, job } = req.body;
    if (!candidate || !job) {
      return res.status(400).json({ error: 'Missing candidate or job data' });
    }

    const prompt = `You are a recruitment consultant. Screen this candidate against the job description. Respond ONLY with JSON.
Candidate: ${candidate.firstName} ${candidate.lastName}, ${candidate.title}, ${candidate.location}. Skills: ${candidate.skills}. ${candidate.role1 || ''} ${candidate.role2 || ''}
Job: ${job.title} at ${job.client || job.location}. Requirements: ${job.requirements}. Description: ${job.description}
Return: {"overall":85,"skills":80,"experience":78,"culture":82,"summary":"2-3 sentence overall assessment","strengths":["strength1","strength2","strength3"],"gaps":["gap1","gap2"],"recommendation":"Recommend or Consider or Pass"}`;

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 600,
      messages: [{ role: 'user', content: prompt }]
    });

    const raw = message.content.map(c => c.text || '').join('');
    const result = JSON.parse(raw.replace(/^```json\s*/, '').replace(/\s*```$/, '').trim());
    res.json(result);
  } catch (err) {
    console.error('Screening error:', err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`HireSouth backend running on port ${PORT}`);
});
