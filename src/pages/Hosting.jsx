import { useState } from 'react';
import { toast } from 'react-toastify';

const PLANS = [
  {
    name: 'Starter Shared',
    tagline: 'For personal projects & portfolios.',
    icon: '🖥',
    price: 4,
    popular: false,
    features: ['1 website', '10 GB SSD storage', 'Unmetered bandwidth', 'Free SSL certificate', 'Daily backups'],
    cta: 'Choose Starter Shared',
  },
  {
    name: 'Developer Pro',
    tagline: 'Most popular for production apps.',
    icon: '⚡',
    price: 18,
    popular: true,
    features: ['Unlimited websites', '100 GB NVMe storage', 'Global CDN edge cache', 'Staging environments', '24/7 priority support', 'Free domain (1 yr)'],
    cta: 'Choose Developer Pro',
  },
  {
    name: 'Cloud VPS',
    tagline: 'Dedicated compute, full root access.',
    icon: '☁',
    price: 49,
    popular: false,
    features: ['8 vCPU · 16 GB RAM', '200 GB NVMe', 'Dedicated IPv4 + IPv6', 'DDoS protection', 'Snapshot & rollback', 'Root SSH access'],
    cta: 'Choose Cloud VPS',
  },
];

const DOMAINS = [
  { ext: '.com', price: 'From $11.99/yr' },
  { ext: '.dev', price: 'From $14.99/yr' },
  { ext: '.io',  price: 'From $39.99/yr' },
  { ext: '.ai',  price: 'From $89.00/yr' },
  { ext: '.app', price: 'From $14.99/yr' },
  { ext: '.co',  price: 'From $24.99/yr' },
];

export default function Hosting() {
  const [domain, setDomain] = useState('');

  return (
    <div className="page">
      {/* Hero */}
      <div className="hosting-hero">
        <div className="hosting-badge">○ UDevs Infrastructure</div>
        <h1>Hosting &amp; Domains, engineered for builders.</h1>
        <p>
          Ship faster with a developer-first hosting stack — managed runtimes, global edge, and
          instant domain registration. Transparent pricing, no lock-in.
        </p>
        <div className="domain-search">
          <input
            className="form-control"
            placeholder="Find your perfect domain…"
            value={domain}
            onChange={e => setDomain(e.target.value)}
          />
          <button className="btn-check" onClick={() => toast.info(`Searching for "${domain}"…`)}>
            Check availability
          </button>
        </div>
      </div>

      {/* Plans */}
      <div className="section-header">
        <div>
          <h2>Hosting plans</h2>
          <p>Scale from your first deploy to enterprise traffic.</p>
        </div>
        <span className="badge-moneyback">30-day money back</span>
      </div>

      <div className="plans-grid">
        {PLANS.map(plan => (
          <div key={plan.name} className={`plan-card ${plan.popular ? 'popular' : ''}`}>
            {plan.popular && <span className="plan-badge">Most popular</span>}
            <div className="plan-icon">{plan.icon}</div>
            <div className="plan-name">{plan.name}</div>
            <div className="plan-tagline">{plan.tagline}</div>
            <div className="plan-price">${plan.price}<span>/mo</span></div>
            <ul className="plan-features">
              {plan.features.map(f => <li key={f}>{f}</li>)}
            </ul>
            <button
              className={`btn-plan ${plan.popular ? 'cyan' : ''}`}
              onClick={() => toast.success(`Selected: ${plan.name}`)}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>

      {/* Domains */}
      <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>🌐 Domain registration</h2>
      <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 14 }}>
        First-year pricing. Free WHOIS privacy on every domain.
      </p>
      <div className="domains-grid">
        {DOMAINS.map(d => (
          <div key={d.ext} className="domain-item">
            <div>
              <div className="domain-ext">{d.ext}</div>
              <div className="domain-price">{d.price}</div>
            </div>
            <button className="btn-register" onClick={() => toast.info(`Registering ${d.ext}…`)}>
              Register
            </button>
          </div>
        ))}
      </div>

      {/* Perks */}
      <div className="perks-box">
        <h3>Every plan includes</h3>
        <div className="perks-grid">
          {['Free SSL & DDoS protection', 'Edge cache in 280+ cities', 'One-click deploys from Git', '99.99% uptime SLA'].map(p => (
            <div key={p} className="perk-item">
              <span className="perk-dot" />
              {p}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}