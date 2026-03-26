import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { SUBJECTS, TOPICS } from '@/lib/subjectData';

const KLASSEN = ['10', '11', '12'];

export default function Faecher() {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedKlasse, setSelectedKlasse] = useState('12');
  const [noteModal, setNoteModal] = useState(null);
  const [noteText, setNoteText] = useState('');
  const qc = useQueryClient();

  const { data: progress = [] } = useQuery({
    queryKey: ['learning_progress'],
    queryFn: () => base44.entities.LearningProgress.list(),
  });

  const toggleTopic = useMutation({
    mutationFn: async ({ topic_key, subject_id, klasse, completed, notes }) => {
      const existing = progress.find(p => p.topic_key === topic_key);
      if (existing) return base44.entities.LearningProgress.update(existing.id, { completed, notes: notes ?? existing.notes });
      return base44.entities.LearningProgress.create({ topic_key, subject_id, klasse, completed, notes: notes ?? '' });
    },
    onSuccess: () => qc.invalidateQueries(['learning_progress']),
  });

  const saveNote = useMutation({
    mutationFn: async ({ topic_key, subject_id, klasse, notes }) => {
      const existing = progress.find(p => p.topic_key === topic_key);
      if (existing) return base44.entities.LearningProgress.update(existing.id, { notes });
      return base44.entities.LearningProgress.create({ topic_key, subject_id, klasse, completed: false, notes });
    },
    onSuccess: () => { qc.invalidateQueries(['learning_progress']); setNoteModal(null); },
  });

  const resetSubjectProgress = useMutation({
    mutationFn: async (subject_id) => {
      const toDelete = progress.filter(p => p.subject_id === subject_id);
      await Promise.all(toDelete.map(p => base44.entities.LearningProgress.delete(p.id)));
    },
    onSuccess: () => qc.invalidateQueries(['learning_progress']),
  });

  const getProgress = (subj_id) => {
    const allTopics = Object.values(TOPICS[subj_id] || {}).flat();
    const done = allTopics.filter(t => progress.find(p => p.topic_key === t.key && p.completed)).length;
    return { done, total: allTopics.length };
  };

  const getTopicProgress = (topic_key) => progress.find(p => p.topic_key === topic_key);

  if (selectedSubject) {
    const subj = SUBJECTS.find(s => s.id === selectedSubject);
    const topics = TOPICS[selectedSubject] || {};
    const klasseTopics = topics[selectedKlasse] || [];
    const { done, total } = getProgress(selectedSubject);

    return (
      <div style={{ padding: '24px 20px', maxWidth: '900px', margin: '0 auto' }}>
        <style>{`
          .topic-row { background:#1a1e2a;border:1px solid #252836;border-radius:10px;padding:12px 14px;margin-bottom:8px;display:flex;align-items:center;gap:12px;transition:border-color 0.2s; }
          .topic-row.done { opacity:0.6;border-color:#00e676; }
          .topic-row:hover { border-color:#6c63ff; }
          .topic-check { width:20px;height:20px;border-radius:5px;border:2px solid #252836;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;transition:all 0.2s; }
          .topic-check.checked { background:#00e676;border-color:#00e676;color:#000;font-size:0.7rem; }
          .klasse-tab { padding:7px 16px;border-radius:20px;font-size:0.78rem;font-weight:600;cursor:pointer;border:1px solid #252836;background:#1a1e2a;color:#7b7f94;transition:all 0.2s; }
          .klasse-tab.active { background:rgba(108,99,255,0.2);border-color:#6c63ff;color:#6c63ff; }
          .note-btn { background:none;border:1px solid #252836;border-radius:6px;padding:3px 8px;color:#7b7f94;cursor:pointer;font-size:0.65rem;transition:all 0.2s; }
          .note-btn:hover { border-color:#6c63ff;color:#6c63ff; }
          .modal-overlay { position:fixed;inset:0;background:rgba(0,0,0,0.7);z-index:1000;display:flex;align-items:center;justify-content:center;padding:20px; }
          .modal-box { background:#13161e;border:1px solid #252836;border-radius:14px;padding:24px;width:100%;max-width:480px; }
          .lp-textarea { background:#0d0f14;border:1px solid #252836;border-radius:8px;padding:10px 12px;color:#e8eaf0;font-size:0.85rem;width:100%;outline:none;resize:vertical;min-height:120px;font-family:'Syne',sans-serif; }
          .lp-textarea:focus { border-color:#6c63ff; }
          .sub-btn { background:rgba(108,99,255,0.15);border:1px solid rgba(108,99,255,0.35);color:#6c63ff;border-radius:8px;padding:8px 16px;cursor:pointer;font-size:0.82rem;font-weight:600; }
        `}</style>

        {/* Note Modal */}
        {noteModal && (
          <div className="modal-overlay" onClick={() => setNoteModal(null)}>
            <div className="modal-box" onClick={e => e.stopPropagation()}>
              <div style={{ fontWeight: 700, marginBottom: '12px' }}>📝 Notiz: {noteModal.label}</div>
              <textarea className="lp-textarea" value={noteText} onChange={e => setNoteText(e.target.value)} placeholder="Deine Notizen, Fragen, Zusammenfassung..." />
              <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                <button className="sub-btn" onClick={() => saveNote.mutate({ topic_key: noteModal.key, subject_id: selectedSubject, klasse: selectedKlasse, notes: noteText })}>
                  Speichern
                </button>
                <button style={{ background: 'none', border: '1px solid #252836', borderRadius: '8px', padding: '8px 16px', color: '#7b7f94', cursor: 'pointer' }} onClick={() => setNoteModal(null)}>
                  Abbrechen
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Back + Header */}
        <button onClick={() => setSelectedSubject(null)} style={{ background: 'none', border: '1px solid #252836', borderRadius: '8px', padding: '6px 14px', color: '#7b7f94', cursor: 'pointer', marginBottom: '20px', fontSize: '0.82rem' }}>
          ← Zurück
        </button>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#e8eaf0' }}>{subj.emoji} {subj.name}</h1>
            <div style={{ fontSize: '0.75rem', color: '#7b7f94', marginTop: '4px' }}>{done}/{total} Themen abgeschlossen</div>
          </div>
          <button
            onClick={() => resetSubjectProgress.mutate(selectedSubject)}
            style={{ background: 'rgba(255,77,109,0.1)', border: '1px solid rgba(255,77,109,0.3)', borderRadius: '8px', padding: '7px 14px', color: '#ff4d6d', cursor: 'pointer', fontSize: '0.75rem' }}>
            🔄 Fortschritt zurücksetzen
          </button>
        </div>

        {/* Progress Bar */}
        <div style={{ background: '#252836', borderRadius: '8px', height: '6px', overflow: 'hidden', marginBottom: '20px' }}>
          <div style={{ height: '100%', background: 'linear-gradient(90deg,#6c63ff,#00e5ff)', borderRadius: '8px', width: `${total > 0 ? done / total * 100 : 0}%`, transition: 'width 0.5s' }} />
        </div>

        {/* Klasse Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
          {KLASSEN.map(k => {
            const kTopics = topics[k] || [];
            const kDone = kTopics.filter(t => progress.find(p => p.topic_key === t.key && p.completed)).length;
            return (
              <button key={k} className={`klasse-tab${selectedKlasse === k ? ' active' : ''}`} onClick={() => setSelectedKlasse(k)}>
                Klasse {k} ({kDone}/{kTopics.length})
              </button>
            );
          })}
        </div>

        {/* Topics */}
        {klasseTopics.length === 0 ? (
          <div style={{ color: '#7b7f94', fontSize: '0.85rem' }}>Keine Themen für diese Klasse.</div>
        ) : (
          klasseTopics.map(topic => {
            const tp = getTopicProgress(topic.key);
            const isDone = tp?.completed || false;
            return (
              <div key={topic.key} className={`topic-row${isDone ? ' done' : ''}`}>
                <div className={`topic-check${isDone ? ' checked' : ''}`}
                  onClick={() => toggleTopic.mutate({ topic_key: topic.key, subject_id: selectedSubject, klasse: selectedKlasse, completed: !isDone })}>
                  {isDone ? '✓' : ''}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.88rem', fontWeight: 600, textDecoration: isDone ? 'line-through' : 'none', color: isDone ? '#7b7f94' : '#e8eaf0' }}>{topic.label}</div>
                  {tp?.notes && <div style={{ fontSize: '0.65rem', color: '#6c63ff', marginTop: '3px' }}>📝 {tp.notes.substring(0, 60)}{tp.notes.length > 60 ? '...' : ''}</div>}
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button className="note-btn" onClick={() => { setNoteModal(topic); setNoteText(tp?.notes || ''); }}>
                    {tp?.notes ? '📝' : '+ Notiz'}
                  </button>
                  <a href={topic.url} target="_blank" rel="noopener noreferrer"
                    style={{ background: 'none', border: '1px solid #252836', borderRadius: '6px', padding: '3px 8px', color: '#00e5ff', cursor: 'pointer', fontSize: '0.65rem', textDecoration: 'none', whiteSpace: 'nowrap' }}>
                    Lernen ↗
                  </a>
                </div>
              </div>
            );
          })
        )}
      </div>
    );
  }

  return (
    <div style={{ padding: '24px 20px', maxWidth: '1100px', margin: '0 auto' }}>
      <style>{`
        .subj-card { background:#13161e;border:1px solid #252836;border-radius:14px;padding:20px;cursor:pointer;transition:border-color 0.2s,transform 0.2s; }
        .subj-card:hover { border-color:#6c63ff;transform:translateY(-2px); }
        .subj-emoji { font-size:2rem;margin-bottom:10px; }
      `}</style>

      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, background: 'linear-gradient(90deg,#6c63ff,#00e5ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          📚 Fächer & Themen
        </h1>
        <div style={{ fontSize: '0.75rem', color: '#7b7f94', marginTop: '4px' }}>Klicke auf ein Fach, um Themen abzuhaken und Notizen zu machen</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '14px' }}>
        {SUBJECTS.map(subj => {
          const { done, total } = getProgress(subj.id);
          const pct = total > 0 ? Math.round(done / total * 100) : 0;
          return (
            <div key={subj.id} className="subj-card" onClick={() => setSelectedSubject(subj.id)}>
              <div className="subj-emoji">{subj.emoji}</div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '4px' }}>{subj.name}</div>
              {subj.badge && <div style={{ fontSize: '0.6rem', background: 'rgba(108,99,255,0.15)', color: '#6c63ff', border: '1px solid rgba(108,99,255,0.3)', borderRadius: '4px', padding: '1px 6px', display: 'inline-block', marginBottom: '8px' }}>{subj.badge}</div>}
              <div style={{ fontSize: '0.7rem', color: '#7b7f94', marginBottom: '8px' }}>{done}/{total} Themen</div>
              <div style={{ background: '#252836', borderRadius: '4px', height: '4px', overflow: 'hidden' }}>
                <div style={{ height: '100%', background: pct === 100 ? '#00e676' : 'linear-gradient(90deg,#6c63ff,#00e5ff)', borderRadius: '4px', width: `${pct}%`, transition: 'width 0.5s' }} />
              </div>
              <div style={{ fontSize: '0.65rem', color: pct === 100 ? '#00e676' : '#7b7f94', marginTop: '5px' }}>{pct}% abgeschlossen</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}