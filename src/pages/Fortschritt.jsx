import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { SUBJECTS, TOPICS } from '@/lib/subjectData';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

export default function Fortschritt() {
  const qc = useQueryClient();
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const { data: progress = [], isLoading } = useQuery({
    queryKey: ['learning_progress'],
    queryFn: () => base44.entities.LearningProgress.list(),
  });

  const { data: tasks = [] } = useQuery({
    queryKey: ['weekly_tasks'],
    queryFn: () => base44.entities.WeeklyTask.list(),
  });

  const resetAll = useMutation({
    mutationFn: async () => {
      await Promise.all(progress.map(p => base44.entities.LearningProgress.delete(p.id)));
      await Promise.all(tasks.map(t => base44.entities.WeeklyTask.delete(t.id)));
    },
    onSuccess: () => { qc.invalidateQueries(['learning_progress']); qc.invalidateQueries(['weekly_tasks']); setShowResetConfirm(false); },
  });

  const getSubjectStats = () => SUBJECTS.map(subj => {
    const allTopics = Object.values(TOPICS[subj.id] || {}).flat();
    const done = allTopics.filter(t => progress.find(p => p.topic_key === t.key && p.completed)).length;
    return { name: subj.name.substring(0, 6), emoji: subj.emoji, full: subj.name, done, total: allTopics.length, pct: allTopics.length > 0 ? Math.round(done / allTopics.length * 100) : 0 };
  });

  const stats = getSubjectStats();
  const totalTopics = stats.reduce((a, s) => a + s.total, 0);
  const totalDone = stats.reduce((a, s) => a + s.done, 0);
  const totalTasksDone = tasks.filter(t => t.completed).length;
  const radarData = stats.map(s => ({ subject: s.emoji, value: s.pct }));

  const barColors = ['#6c63ff', '#00e5ff', '#ff9a3c', '#a78bfa', '#ff4d6d', '#00e676', '#00e676', '#00e676', '#ff4d6d'];

  return (
    <div style={{ padding: '24px 20px', maxWidth: '1100px', margin: '0 auto' }}>
      <style>{`
        .prog-card { background:#13161e;border:1px solid #252836;border-radius:14px;padding:20px; }
        .stat-pill { background:#1a1e2a;border:1px solid #252836;border-radius:12px;padding:16px;text-align:center; }
        .reset-btn { background:rgba(255,77,109,0.1);border:1px solid rgba(255,77,109,0.3);color:#ff4d6d;border-radius:8px;padding:8px 16px;cursor:pointer;font-size:0.82rem;font-weight:600; }
        .confirm-box { background:#1a1e2a;border:2px solid #ff4d6d;border-radius:12px;padding:20px;margin-top:16px; }
      `}</style>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, background: 'linear-gradient(90deg,#6c63ff,#00e5ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            📈 Mein Fortschritt
          </h1>
          <div style={{ fontSize: '0.75rem', color: '#7b7f94', marginTop: '4px' }}>Alle Lernfortschritte auf einen Blick</div>
        </div>
        <button className="reset-btn" onClick={() => setShowResetConfirm(true)}>🔄 Alles zurücksetzen</button>
      </div>

      {/* Reset Confirm */}
      {showResetConfirm && (
        <div className="confirm-box" style={{ marginBottom: '20px' }}>
          <div style={{ fontWeight: 700, color: '#ff4d6d', marginBottom: '8px' }}>⚠️ Wirklich alles zurücksetzen?</div>
          <div style={{ fontSize: '0.8rem', color: '#7b7f94', marginBottom: '14px' }}>Alle Themen-Fortschritte und Wochenplan-Aufgaben werden gelöscht. Das kann nicht rückgängig gemacht werden.</div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="reset-btn" onClick={() => resetAll.mutate()} disabled={resetAll.isPending}>{resetAll.isPending ? 'Lädt...' : '✓ Ja, alles löschen'}</button>
            <button style={{ background: 'none', border: '1px solid #252836', borderRadius: '8px', padding: '8px 16px', color: '#7b7f94', cursor: 'pointer', fontSize: '0.82rem' }} onClick={() => setShowResetConfirm(false)}>Abbrechen</button>
          </div>
        </div>
      )}

      {/* Summary Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '12px', marginBottom: '24px' }}>
        {[
          { label: 'Themen gelernt', value: `${totalDone}/${totalTopics}`, color: '#6c63ff' },
          { label: 'Gesamtfortschritt', value: `${totalTopics > 0 ? Math.round(totalDone / totalTopics * 100) : 0}%`, color: '#00e5ff' },
          { label: 'Aufgaben erledigt', value: `${totalTasksDone}/${tasks.length}`, color: '#00e676' },
          { label: 'Fächer aktiv', value: `${stats.filter(s => s.done > 0).length}/${stats.length}`, color: '#ff9a3c' },
        ].map(stat => (
          <div key={stat.label} className="stat-pill">
            <div style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: "'Space Mono', monospace", color: stat.color }}>{stat.value}</div>
            <div style={{ fontSize: '0.65rem', color: '#7b7f94', marginTop: '4px' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
        <div className="prog-card">
          <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#7b7f94', marginBottom: '14px' }}>Fortschritt nach Fach (%)</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={stats} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
              <XAxis dataKey="emoji" tick={{ fill: '#7b7f94', fontSize: 14 }} />
              <YAxis domain={[0, 100]} tick={{ fill: '#7b7f94', fontSize: 10 }} />
              <Tooltip
                contentStyle={{ background: '#1a1e2a', border: '1px solid #252836', borderRadius: '8px', color: '#e8eaf0', fontSize: '0.75rem' }}
                formatter={(v, n, props) => [`${v}%`, props.payload.full]}
                labelFormatter={() => ''}
              />
              <Bar dataKey="pct" radius={[4, 4, 0, 0]}>
                {stats.map((_, i) => <Cell key={i} fill={barColors[i % barColors.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="prog-card">
          <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#7b7f94', marginBottom: '14px' }}>Radar – Lernfortschritt</div>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#252836" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#7b7f94', fontSize: 14 }} />
              <Radar dataKey="value" stroke="#6c63ff" fill="#6c63ff" fillOpacity={0.3} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Per-Subject Table */}
      <div className="prog-card">
        <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#7b7f94', marginBottom: '14px' }}>Details pro Fach</div>
        {isLoading ? <div style={{ color: '#7b7f94' }}>Lädt...</div> : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {stats.map(s => (
              <div key={s.full} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '28px', textAlign: 'center', fontSize: '1.1rem' }}>{s.emoji}</div>
                <div style={{ width: '110px', fontSize: '0.82rem', fontWeight: 600, color: '#e8eaf0' }}>{s.full}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ background: '#252836', borderRadius: '4px', height: '6px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', background: s.pct === 100 ? '#00e676' : 'linear-gradient(90deg,#6c63ff,#00e5ff)', borderRadius: '4px', width: `${s.pct}%`, transition: 'width 0.5s' }} />
                  </div>
                </div>
                <div style={{ fontSize: '0.75rem', fontFamily: "'Space Mono',monospace", color: s.pct === 100 ? '#00e676' : '#7b7f94', width: '80px', textAlign: 'right' }}>
                  {s.done}/{s.total} ({s.pct}%)
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Share hint */}
      <div style={{ marginTop: '16px', padding: '14px 18px', background: 'rgba(108,99,255,0.08)', border: '1px solid rgba(108,99,255,0.2)', borderRadius: '10px', fontSize: '0.75rem', color: '#7b7f94' }}>
        💡 <strong style={{ color: '#00e5ff' }}>Fortschritt teilen:</strong> Deine Lernfortschritte werden automatisch gespeichert und können von Lehrern oder Eltern eingesehen werden, wenn sie ebenfalls Zugang zu dieser Plattform haben.
      </div>
    </div>
  );
}