import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const jobs = useSelector(s => s.jobs.list);
  const applications = useSelector(s => s.applications.list);
  const { user } = useSelector(s => s.auth);

  const activeJobs = jobs.filter(j => j.status === 'active').length;
  const totalApplications = applications.length;
  // In real app these come from API; mock counts from registered users
  const registeredTalent = 1;
  const plusMembers = 0;

  return (
    <div className="page">
      <div className="page-label">✦ U Devs Leadership</div>
      <h1 className="page-title">Command Center</h1>
      <p className="page-desc">Hire smarter. Premium Plus applicants are always pinned to the top.</p>

      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-label">
            Active jobs
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
            </svg>
          </div>
          <div className="stat-value">{activeJobs}</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">
            Total applications
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
            </svg>
          </div>
          <div className="stat-value">{totalApplications}</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">
            Registered talent
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
          <div className="stat-value">{registeredTalent}</div>
        </div>

        <div className="stat-card gold">
          <div className="stat-label">
            Plus members
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--accent-amber)' }}>
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
          </div>
          <div className="stat-value gold">{plusMembers}</div>
        </div>
      </div>

      <div className="action-row">
        <button className="btn-action primary" onClick={() => navigate('/jobs')}>Manage Jobs</button>
        <button className="btn-action secondary" onClick={() => navigate('/applicants')}>View Applicant Stream</button>
      </div>
    </div>
  );
}