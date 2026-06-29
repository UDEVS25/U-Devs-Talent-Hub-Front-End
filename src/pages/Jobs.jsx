import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addJob, archiveJob } from '../redux/slices/jobSlice';
import { toast } from 'react-toastify';

export default function Jobs() {
  const dispatch = useDispatch();
  const jobs = useSelector(s => s.jobs.list);

  const [form, setForm] = useState({ title: '', description: '', job_type: 'Full-time', salary_range: '' });
  const [skillInput, setSkillInput] = useState('');
  const [skills, setSkills] = useState([]);

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  function addSkill() {
    const s = skillInput.trim();
    if (s && !skills.includes(s)) {
      setSkills(prev => [...prev, s]);
      setSkillInput('');
    }
  }

  function removeSkill(s) {
    setSkills(prev => prev.filter(x => x !== s));
  }

  function handlePost(e) {
    e.preventDefault();
    if (!form.title || !form.description) { toast.error('Title and description are required.'); return; }
    dispatch(addJob({ ...form, skills_required: skills }));
    setForm({ title: '', description: '', job_type: 'Full-time', salary_range: '' });
    setSkills([]);
    toast.success('Job posted!');
  }

  function handleArchive(id) {
    dispatch(archiveJob(id));
    toast.success('Job archived.');
  }

  return (
    <div className="page">
      <div className="jobs-layout">
        {/* Left — Post form */}
        <div className="panel">
          <h3>Post a new job</h3>
          <form onSubmit={handlePost}>
            <div className="form-group">
              <label>Title</label>
              <input className="form-control" name="title" value={form.title} onChange={handleChange} placeholder="e.g. Full Stack Developer" />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea className="form-control" name="description" value={form.description} onChange={handleChange} rows={5} style={{ resize: 'vertical' }} />
            </div>
            <div className="form-group">
              <label>Job type</label>
              <select className="form-control" name="job_type" value={form.job_type} onChange={handleChange}>
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contract</option>
                <option>Internship</option>
              </select>
            </div>
            <div className="form-group">
              <label>Salary range (optional)</label>
              <input className="form-control" name="salary_range" value={form.salary_range} onChange={handleChange} placeholder="e.g. $3,000 – $5,000/mo" />
            </div>
            <div className="form-group">
              <label>Required skills</label>
              <div className="skills-input-row">
                <input
                  className="form-control"
                  value={skillInput}
                  onChange={e => setSkillInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                  placeholder="e.g. React"
                />
                <button type="button" className="btn-add" onClick={addSkill}>Add</button>
              </div>
              {skills.length > 0 && (
                <div className="skills-tags">
                  {skills.map(s => (
                    <span key={s} className="skill-tag">
                      {s}
                      <button type="button" onClick={() => removeSkill(s)}>×</button>
                    </span>
                  ))}
                </div>
              )}
            </div>
            <button className="btn-post" type="submit">Post job</button>
          </form>
        </div>

        {/* Right — Jobs list */}
        <div>
          <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 16 }}>All jobs</h3>
          {jobs.length === 0 ? (
            <p className="empty-state">No jobs posted yet.</p>
          ) : (
            <div className="jobs-list">
              {jobs.map(job => (
                <div key={job.id} className="job-item">
                  <div>
                    <div className="job-item-title">{job.title}</div>
                    <div className="job-item-type">{job.job_type}</div>
                  </div>
                  <div className="job-item-right">
                    <span className={job.status === 'active' ? 'badge-active' : 'badge-archived'}>
                      {job.status}
                    </span>
                    {job.status === 'active' && (
                      <button className="btn-archive" onClick={() => handleArchive(job.id)}>Archive</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}