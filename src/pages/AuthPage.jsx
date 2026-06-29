import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginSuccess, setError } from '../redux/slices/authSlice';
import { toast } from 'react-toastify';

// Mock admin credentials (replace with real API call when backend is ready)
const ADMIN_EMAIL = 'ceo@udevs.com';
const ADMIN_PASSWORD = 'leadership123';

export default function AuthPage({ dark, onToggleDark }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [tab, setTab] = useState('signin'); // 'signin' | 'join'
  const [role, setRole] = useState('developer');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSignIn(e) {
    e.preventDefault();
    setLoading(true);
    // Mock auth — swap this block for real API call
    setTimeout(() => {
      const isAdmin = form.email === ADMIN_EMAIL && form.password === ADMIN_PASSWORD;
      if (form.email && form.password) {
        dispatch(loginSuccess({
          id: 1,
          name: isAdmin ? 'Usama Aslam' : form.email.split('@')[0],
          email: form.email,
          role: isAdmin ? 'admin' : 'developer',
          is_premium_plus: false,
          token: 'mock-jwt-token',
        }));
        toast.success('Signed in successfully!');
        navigate('/dashboard');
      } else {
        toast.error('Enter email and password.');
      }
      setLoading(false);
    }, 600);
  }

  async function handleRegister(e) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (form.name && form.email && form.password) {
        dispatch(loginSuccess({
          id: Date.now(),
          name: form.name,
          email: form.email,
          role: role === 'internee' ? 'intern' : 'developer',
          is_premium_plus: false,
          token: 'mock-jwt-token',
        }));
        toast.success('Account created!');
        navigate('/dashboard');
      } else {
        toast.error('Fill in all fields.');
      }
      setLoading(false);
    }, 600);
  }

  return (
    <div className="auth-page">
      {/* Navbar strip on auth page */}
      <nav className="navbar">
        <Link to="/" className="navbar-logo">
          <div className="navbar-logo-icon">U—</div>
          <span><span style={{ color: 'var(--text-primary)' }}>U</span>Devs</span>
        </Link>
        <ul className="navbar-nav">
          <li><Link to="/dashboard">Command Center</Link></li>
          <li><Link to="/jobs">Jobs</Link></li>
          <li><Link to="/applicants">Applicants</Link></li>
          <li><Link to="/hosting">Hosting</Link></li>
        </ul>
        <div className="navbar-actions">
          <button className="btn-ghost" onClick={onToggleDark}>
            {dark ? '☀ Light' : '🌙 Dark'}
          </button>
          <button className="btn-ghost">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Sign out
          </button>
        </div>
      </nav>

      <div className="auth-card" style={{ marginTop: '56px' }}>
        <h2>Welcome to UDevs</h2>
        <p className="subtitle">Sign in to apply, or join as a developer or internee.</p>

        <div className="tab-switch">
          <button className={tab === 'signin' ? 'active' : ''} onClick={() => setTab('signin')}>Sign In</button>
          <button className={tab === 'join' ? 'active' : ''} onClick={() => setTab('join')}>Join UDevs</button>
        </div>

        {tab === 'signin' ? (
          <form onSubmit={handleSignIn}>
            <div className="form-group">
              <label>Email</label>
              <input className="form-control" type="email" name="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input className="form-control" type="password" name="password" placeholder="••••••••" value={form.password} onChange={handleChange} required />
            </div>
            <button className="btn-primary" type="submit" disabled={loading}>
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
            <p className="auth-hint">
              Admin? Use <code>ceo@udevs.com</code> with the leadership password.
            </p>
          </form>
        ) : (
          <form onSubmit={handleRegister}>
            <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 10 }}>I am joining as</p>
            <div className="role-picker">
              <div className={`role-card ${role === 'developer' ? 'selected' : ''}`} onClick={() => setRole('developer')}>
                <div className="role-title">Developer</div>
                <div className="role-sub">Full-time engineer</div>
              </div>
              <div className={`role-card ${role === 'internee' ? 'selected' : ''}`} onClick={() => setRole('internee')}>
                <div className="role-title">Internee</div>
                <div className="role-sub">Internship track</div>
              </div>
            </div>
            <div className="form-group">
              <label>Full name</label>
              <input className="form-control" type="text" name="name" value={form.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input className="form-control" type="email" name="email" value={form.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input className="form-control" type="password" name="password" value={form.password} onChange={handleChange} required />
            </div>
            <button className="btn-primary" type="submit" disabled={loading}>
              {loading ? 'Creating…' : 'Create account'}
            </button>
          </form>
        )}

        <Link to="/" className="auth-back">← Back to home</Link>
      </div>
    </div>
  );
}