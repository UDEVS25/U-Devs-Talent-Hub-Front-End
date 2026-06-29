import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function Applicants() {
  const applications = useSelector(s => s.applications.list);
  const jobs = useSelector(s => s.jobs.list);
  const [filterJob, setFilterJob] = useState('all');

  const filtered = filterJob === 'all'
    ? applications
    : applications.filter(a => String(a.job_id) === filterJob);

  // Premium first (per spec: Core Premium Algorithm Modifier)
  const sorted = [...filtered].sort((a, b) => (b.is_premium ? 1 : 0) - (a.is_premium ? 1 : 0));

  return (
    <div className="page">
      <div className="applicants-header">
        <div>
          <h1 className="page-title" style={{ fontSize: 26 }}>Applicant stream</h1>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 4 }}>
            Premium Plus applicants are always pinned to the top with an amber badge.
          </p>
        </div>
        <select className="select-sm" value={filterJob} onChange={e => setFilterJob(e.target.value)}>
          <option value="all">All jobs</option>
          {jobs.map(j => (
            <option key={j.id} value={String(j.id)}>{j.title}</option>
          ))}
        </select>
      </div>

      {sorted.length === 0 ? (
        <p className="empty-state">No applications yet.</p>
      ) : (
        sorted.map(app => (
          <div key={app.id} className={`applicant-card ${app.is_premium ? 'premium' : ''}`}>
            <div className="applicant-info">
              <div className="name">{app.name || 'Applicant'}</div>
              <div className="role">{jobs.find(j => j.id === app.job_id)?.title || 'Unknown role'} · {app.current_stage}</div>
            </div>
            {app.is_premium && (
              <span className="badge-premium">✦ Premium Plus</span>
            )}
          </div>
        ))
      )}
    </div>
  );
}