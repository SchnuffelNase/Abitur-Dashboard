import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { SUBJECTS } from '@/lib/subjectData';
import { format, startOfWeek, addDays } from 'date-fns';
import { de } from 'date-fns/locale';

const DAYS = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
const PRIORITY_COLORS = {
  red:    { bg: 'rgba(255,77,109,0.1)',  border: '#ff4d6d', text: '#ff4d6d' },
  orange: { bg: 'rgba(255,154,60,0.1)', border: '#ff9a3c', text: '#ff9a3c' },
  green:  { bg: 'rgba(0,230,118,0.1)',  border: '#00e676', text: '#00e676' },
};

const weekStart = () => format(startOfWeek(new Date(), { weekStartsOn: 1 }), 'yyyy-MM-dd');

export default function Lernplan() {
  const qc = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', subject_id: 'mathe', due_day: 'Mo', priority: 'orange', description: '' });

  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ['weekly_tasks'],
    queryFn: () => base44.entities.WeeklyTask.filter({ week_start: weekStart() }, 'due_day'),
  });

  const createTask = useMutation({
    mutationFn: (data) => base44.entities.WeeklyTask.create({ ...data, week_start: weekStart(), completed: false }),
    onSuccess: () => { qc.invalidateQueries(['weekly_tasks']); setShowForm(false); setForm({ title: '', subject_id: 'mathe', due_day: 'Mo', priority: 'orange', description: '' }); },
  });

  const toggleTask = useMutation({
    mutationFn: ({ id, completed }) => base44.entities.WeeklyTask.update(id, { completed }),
    onSuccess: () => qc.invalidateQueries(['weekly_tasks']),
  });

  const deleteTask = useMutation({
    mutationFn: (id) => base44.entities.WeeklyTask.delete(id),
    onSuccess: () => qc.invalidateQueries(['weekly_tasks']),
  });

  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;

  return (
    <div style={{ padding: '24px 20px', maxWidth: '1100px', margin: '0 auto' }}>
      <style>{`
        .lp-card { background:#13161e;border:1px solid #252836;border-radius:14px;padding:18px; }
        .lp-day-col { background:#1a1e2a;border:1px solid #252836;border-radius:12px;padding:14px;min-height:120px; }
        .lp-task { border-radius:8px;padding:8px 10px;margin-bottom:8px;border-left:3px solid;cursor:pointer;transition:opacity 0.2s; }
        .lp-task.done { opacity:0.45; }
        .lp-task-title { font-size:0.82rem;font-weight:600;display:flex;align-items:center;gap:6px; }
        .lp-task-sub { font-size:0.65rem;color:#7b7f94;margin-top:3px; }
        .lp-btn { background:rgba(108,99,255,0.15);border:1px solid rgba(108,99,255,0.35);color:#6c63ff;border-radius:8px;padding:8px 16px;cursor:pointer;font-size:0.82rem;font-weight:600;transition:background 0.2s; }
        .lp-btn:hover { background:rgba(108,99,255,0.25); }
        .lp-input { background:#0d0f14;border:1px solid #252836;border-radius:8px;padding:8px 12px;color:#e8eaf0;font-size:0.85rem;width:100%;outline:none; }
        .lp-input:focus { border-color:#6c63ff; }
        .lp-select { background:#0d0f14;border:1px solid #252836;border-radius:8px;padding:8px 12px;color:#e8eaf0;font-size:0.85rem;outline:none; }
        .lp-delete { background:none;border:none;color:#7b7f94;cursor:pointer;font-size:0.75rem;padding:2px 4px;border-radius:4px;transition:color 0.2s; }
        .lp-delete:hover { color:#ff4d6d; }
      `}</style>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, background: 'linear-gradient(90deg,#6c63ff,#00e5ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            📅 Wochenplan
          </h1>
          <div style={{ fontSize: '0.75rem', color: '#7b7f94', marginTop: '4px' }}>
            KW {format(new Date(), 'w', { locale: de })} · {format(new Date(), "'Heute:' EEEE, d. MMMM", { locale: de })}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {totalCount > 0 && (
            <div style={{ fontSize: '0.78rem', color: '#7b7f94', background: '#1a1e2a', border: '1px solid #252836', borderRadius: '20px', padding: '5px 12px' }}>
              ✅ {completedCount}/{totalCount} erledigt
            </div>
          )}
          <button className="lp-btn" onClick={() => setShowForm(!showForm)}>
            {showForm ? '✕ Abbrechen' : '+ Aufgabe hinzufügen'}
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      {totalCount > 0 && (
        <div style={{ marginBottom: '20px', background: '#252836', borderRadius: '8px', height: '6px', overflow: 'hidden' }}>
          <div style={{ height: '100%', background: 'linear-gradient(90deg,#6c63ff,#00e5ff)', borderRadius: '8px', width: `${(completedCount / totalCount * 100)}%`, transition: 'width 0.5s' }} />
        </div>
      )}

      {/* Add Task Form */}
      {showForm && (
        <div className="lp-card" style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#7b7f94', marginBottom: '14px' }}>Neue Aufgabe</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
            <input className="lp-input" style={{ gridColumn: '1/-1' }} placeholder="Aufgabentitel z.B. Ableitungen üben" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
            <select className="lp-select" style={{ width: '100%' }} value={form.subject_id} onChange={e => setForm({ ...form, subject_id: e.target.value })}>
              {SUBJECTS.map(s => <option key={s.id} value={s.id}>{s.emoji} {s.name}</option>)}
            </select>
            <select className="lp-select" style={{ width: '100%' }} value={form.due_day} onChange={e => setForm({ ...form, due_day: e.target.value })}>
              {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            <select className="lp-select" style={{ width: '100%' }} value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })}>
              <option value="red">🔴 Kritisch (Retten)</option>
              <option value="orange">🟠 Wichtig (Stabilisieren)</option>
              <option value="green">🟢 Normal (Halten)</option>
            </select>
            <input className="lp-input" placeholder="Beschreibung (optional)" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
          </div>
          <button className="lp-btn" onClick={() => form.title && createTask.mutate(form)} disabled={!form.title}>
            {createTask.isPending ? 'Speichern...' : '✓ Aufgabe speichern'}
          </button>
        </div>
      )}

      {/* Week Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: '10px' }}>
        {DAYS.map(day => {
          const dayTasks = tasks.filter(t => t.due_day === day);
          return (
            <div key={day} className="lp-day-col">
              <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#7b7f94', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {day}
                {dayTasks.length > 0 && <span style={{ fontSize: '0.6rem', background: '#252836', borderRadius: '10px', padding: '1px 6px' }}>{dayTasks.filter(t => t.completed).length}/{dayTasks.length}</span>}
              </div>
              {isLoading ? <div style={{ fontSize: '0.7rem', color: '#7b7f94' }}>Lädt...</div> : null}
              {dayTasks.map(task => {
                const col = PRIORITY_COLORS[task.priority] || PRIORITY_COLORS.orange;
                const subj = SUBJECTS.find(s => s.id === task.subject_id);
                return (
                  <div key={task.id} className={`lp-task${task.completed ? ' done' : ''}`}
                    style={{ background: col.bg, borderColor: col.border }}
                    onClick={() => toggleTask.mutate({ id: task.id, completed: !task.completed })}>
                    <div className="lp-task-title">
                      <span>{task.completed ? '✅' : '⬜'}</span>
                      <span style={{ flex: 1, textDecoration: task.completed ? 'line-through' : 'none', fontSize: '0.78rem' }}>{task.title}</span>
                      <button className="lp-delete" onClick={e => { e.stopPropagation(); deleteTask.mutate(task.id); }}>✕</button>
                    </div>
                    {subj && <div className="lp-task-sub">{subj.emoji} {subj.name}</div>}
                    {task.description && <div className="lp-task-sub">{task.description}</div>}
                  </div>
                );
              })}
              {dayTasks.length === 0 && !isLoading && (
                <div style={{ fontSize: '0.65rem', color: '#7b7f94', textAlign: 'center', marginTop: '20px' }}>Frei</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}