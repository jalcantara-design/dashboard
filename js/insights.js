const { useState } = React;
const { IconChevronRight, IconChevronDown, IconSearch, IconInfo, IconExternal,
        IcoOverview, IcoTeam, IcoPipeline, IcoDeals } = window;

/* ── Sidebar ── */
const INS_NAV = [
  { key: 'overview',  label: 'Overview',         sub: null,                             Icon: IcoOverview },
  { key: 'team',      label: 'Team Performance', sub: 'Track performance by user',      Icon: IcoTeam     },
  { key: 'pipeline',  label: 'Pipeline',          sub: 'Monitor deals and next actions', Icon: IcoPipeline },
  { key: 'deals',     label: 'Deal Analysis',     sub: 'Deep dive into conversions',    Icon: IcoDeals    },
];

function InsightsSidebar({ page, setPage }) {
  return (
    <div className="w-[210px] shrink-0 bg-white flex flex-col h-full" style={{ borderRight: '1px solid #e5e7eb' }}>
      <nav className="flex flex-col flex-1 py-[8px]">
        {INS_NAV.map(({ key, label, sub, Icon }) => {
          const active = page === key;
          return (
            <button key={key} onClick={() => setPage(key)}
              className={`flex items-start gap-[12px] w-full px-[14px] py-[10px] text-left transition-colors ${active ? 'bg-[#f3f4f6]' : 'hover:bg-[#f9fafb]'}`}>
              <span className={`shrink-0 mt-[2px] ${active ? 'text-[#111827]' : 'text-[#6b7280]'}`}><Icon /></span>
              <div>
                <p className={`text-[14px] ${active ? 'font-semibold text-[#111827]' : 'font-medium text-[#4b5563]'}`}>{label}</p>
                {sub && <p className="text-[12px] text-[#9ca3af] mt-[2px] leading-[16px]">{sub}</p>}
              </div>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

/* ── KPI cards ── */
const KPI_DATA = [
  { label: 'Units priced',             value: '132',      change: '↑ 18% vs last 7 days',      good: true  },
  { label: 'Units won',                value: '48',       change: '↑ 12% vs last 7 days',      good: true  },
  { label: 'Conversion rate',          value: '36.4%',    change: '↓ 4.2pp vs last 7 days',    good: false },
  { label: 'Pipeline value',           value: '€1.28M',   change: '↑ 14% vs last 7 days',      good: true  },
  { label: 'Avg. delta (exp. vs won)', value: '-€1,240',  change: '↓ €210 vs last 7 days',     good: false },
  { label: 'Avg. time to win',         value: '2.8 days', change: '↓ 0.4 days vs last 7 days', good: true  },
];

function KpiCard({ label, value, change, good }) {
  return (
    <div className="flex-1 bg-white border border-[#e5e7eb] rounded-[8px] p-[16px] min-w-0">
      <div className="flex items-center gap-[4px] mb-[8px]">
        <p className="text-[12px] text-[#6b7280] font-medium truncate">{label}</p>
        <span className="text-[#d1d5db] shrink-0"><IconInfo /></span>
      </div>
      <p className="text-[24px] font-bold text-[#111827] mb-[6px]">{value}</p>
      <p className={`text-[12px] font-medium ${good ? 'text-[#16a34a]' : 'text-[#b91c1c]'}`}>{change}</p>
    </div>
  );
}

/* ── Conversion funnel ── */
const FUNNEL = [
  { label: 'Valuations created', n: 132, pct: null,    color: '#c7d9ea' },
  { label: 'Sent to customer',   n: 96,  pct: '72.7%', color: '#9ab8d0' },
  { label: 'Customer Approved',  n: 68,  pct: '51.5%', color: '#6d97b6' },
  { label: 'Won',                n: 48,  pct: '36.4%', color: '#4a7a9b' },
];

function ConversionFunnel() {
  return (
    <div className="bg-white border border-[#e5e7eb] rounded-[8px] p-[20px]">
      <div className="flex items-center gap-[6px] mb-[16px]">
        <p className="text-[14px] font-semibold text-[#111827]">Conversion funnel</p>
        <span className="text-[#d1d5db]"><IconInfo /></span>
      </div>
      <div className="flex flex-col gap-[6px]">
        {FUNNEL.map(({ label, n, pct, color }, i) => (
          <div key={i} className="flex items-center gap-[8px]">
            <p className="text-[12px] text-[#6b7280] shrink-0" style={{ width: 120 }}>{label}</p>
            <div className="flex-1 h-[32px] bg-[#f1f5f9] rounded-[2px] overflow-hidden">
              <div style={{ width: `${(n / 132) * 100}%`, background: color }}
                className="h-full flex items-center justify-end pr-[8px]">
                <span className="text-[12px] font-semibold text-white">{n}</span>
              </div>
            </div>
            <p className="text-[12px] text-[#9ca3af] shrink-0 text-right" style={{ width: 36 }}>{pct || ''}</p>
          </div>
        ))}
      </div>
      <div className="mt-[14px] pt-[12px] border-t border-[#f1f5f9] flex items-center justify-between">
        <p className="text-[13px] text-[#6b7280]">Conversion rate</p>
        <div className="flex items-center gap-[8px]">
          <p className="text-[15px] font-bold text-[#111827]">36.4%</p>
          <span className="text-[12px] font-medium text-[#b91c1c]">↓ 4.2pp</span>
        </div>
      </div>
    </div>
  );
}

/* ── Conversion by price band ── */
const BANDS = [
  { label: '€0 – €3k',   units: 40, pct: 65, color: '#3b82f6' },
  { label: '€3k – €7k',  units: 55, pct: 52, color: '#374151' },
  { label: '€7k – €15k', units: 30, pct: 38, color: '#f97316' },
  { label: '€15k+',      units: 10, pct: 20, color: '#ef4444' },
];

function PriceBands() {
  return (
    <div className="bg-white border border-[#e5e7eb] rounded-[8px] p-[20px]">
      <div className="flex items-center justify-between mb-[14px]">
        <div className="flex items-center gap-[6px]">
          <p className="text-[14px] font-semibold text-[#111827]">Conversion by price band</p>
          <span className="text-[#d1d5db]"><IconInfo /></span>
        </div>
        <button className="text-[12px] text-[#6b7280] flex items-center gap-[2px] hover:text-[#111827]">View all <IconChevronRight /></button>
      </div>
      <div className="flex text-[11px] font-medium text-[#9ca3af] uppercase tracking-wide mb-[10px]">
        <span className="flex-1">Price band</span>
        <span style={{ width: 36 }} className="text-right">Units</span>
        <span style={{ width: 116 }} className="text-right">Conversion rate</span>
      </div>
      <div className="flex flex-col gap-[12px]">
        {BANDS.map(({ label, units, pct, color }, i) => (
          <div key={i} className="flex items-center gap-[8px]">
            <p className="text-[13px] text-[#374151] flex-1">{label}</p>
            <p className="text-[13px] font-medium text-[#374151] text-right" style={{ width: 36 }}>{units}</p>
            <div className="h-[8px] rounded-full bg-[#f1f5f9] overflow-hidden" style={{ width: 80 }}>
              <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
            </div>
            <p className="text-[13px] font-semibold text-right" style={{ width: 30, color }}>{pct}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Onsite vs Offsite donut ── */
function OnsiteOffsite() {
  const r = 52, cx = 76, cy = 76, sw = 18;
  const circ = 2 * Math.PI * r;
  const onArc = 0.591 * circ;
  const offArc = 0.409 * circ;
  return (
    <div className="bg-white border border-[#e5e7eb] rounded-[8px] p-[20px]">
      <div className="flex items-center justify-between mb-[12px]">
        <div className="flex items-center gap-[6px]">
          <p className="text-[14px] font-semibold text-[#111827]">Onsite vs Offsite</p>
          <span className="text-[#d1d5db]"><IconInfo /></span>
        </div>
        <button className="text-[12px] text-[#6b7280] flex items-center gap-[2px] hover:text-[#111827]">View all <IconChevronRight /></button>
      </div>
      <div className="flex justify-center mb-[16px]">
        <svg width="152" height="152" viewBox="0 0 152 152">
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e5e7eb" strokeWidth={sw} />
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#93c5fd" strokeWidth={sw}
            strokeDasharray={`${offArc} ${circ}`} strokeDashoffset={-onArc}
            transform={`rotate(-90 ${cx} ${cy})`} />
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#1e3a5f" strokeWidth={sw}
            strokeDasharray={`${onArc} ${circ}`} strokeDashoffset={0}
            transform={`rotate(-90 ${cx} ${cy})`} />
          <text x={cx} y={cy - 6} textAnchor="middle" fontSize="20" fontWeight="700"
            fill="#111827" fontFamily="Inter,sans-serif">132</text>
          <text x={cx} y={cy + 12} textAnchor="middle" fontSize="10"
            fill="#6b7280" fontFamily="Inter,sans-serif">Total units</text>
        </svg>
      </div>
      {[
        ['#1e3a5f', 'Onsite',           '78 (59.1%)', 'Conversion 44.9%'],
        ['#93c5fd', 'Offsite (Auction)', '54 (40.9%)', 'Conversion 24.1%'],
      ].map(([bg, label, n, conv], i) => (
        <div key={i} className="flex items-center justify-between mb-[10px]">
          <div className="flex items-center gap-[8px]">
            <div className="size-[10px] rounded-full shrink-0" style={{ background: bg }} />
            <p className="text-[13px] font-medium text-[#374151]">{label}</p>
          </div>
          <div className="text-right">
            <p className="text-[13px] font-semibold text-[#111827]">{n}</p>
            <p className="text-[11px] text-[#6b7280]">{conv}</p>
          </div>
        </div>
      ))}
      <div className="pt-[10px] border-t border-[#f1f5f9] flex items-center justify-between">
        <p className="text-[12px] text-[#6b7280]">Onsite converts</p>
        <p className="text-[12px] font-semibold text-[#16a34a]">+20.8pp better</p>
      </div>
    </div>
  );
}

/* ── Smart insights ── */
const SMART = [
  { icon: '🔴', title: '12 deals at risk', desc: 'High price gap or no customer response in 24h+', cta: 'View deals'      },
  { icon: '🟠', title: '5 deals stuck',    desc: 'No action for more than 24h',                    cta: 'View deals'      },
  { icon: '🟢', title: 'Top performer',    desc: 'Chris leads with 48% conversion this week',       cta: 'View leaderboard'},
];

function SmartInsights() {
  return (
    <div className="bg-white border border-[#e5e7eb] rounded-[8px] p-[20px] flex flex-col gap-[12px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[6px]">
          <span>✨</span>
          <p className="text-[14px] font-semibold text-[#111827]">Smart insights</p>
        </div>
        <button className="text-[#9ca3af] text-[18px] leading-none hover:text-[#6b7280]">∧</button>
      </div>
      {SMART.map(({ icon, title, desc, cta }, i) => (
        <div key={i} className="border border-[#f1f5f9] rounded-[8px] p-[12px]">
          <div className="flex items-center gap-[8px] mb-[4px]">
            <span className="text-[14px]">{icon}</span>
            <p className="text-[13px] font-semibold text-[#111827]">{title}</p>
          </div>
          <p className="text-[12px] text-[#6b7280] leading-[16px] mb-[8px]">{desc}</p>
          <button className="flex items-center gap-[4px] text-[12px] font-medium text-[#374151] hover:text-[#111827] transition-colors">
            {cta} <IconChevronRight size={12} />
          </button>
        </div>
      ))}
    </div>
  );
}

/* ── Pipeline table ── */
const PIPELINE = [
  { id: '10D18365', make: 'NISSAN QASHQAI',  owner: 'Chris', oBg: '#7c3aed', status: 'Negotiating',   sBg: '#fff7ed', sC: '#c2410c', price: '€7,500',  exp: '€9,000',  action: 'Follow up call',    due: 'Today',    dC: '#b91c1c', time: '1d 3h', dot: '#b91c1c' },
  { id: '10D18364', make: 'BMW 320D',         owner: 'Emma',  oBg: '#0891b2', status: 'Offered',       sBg: '#eff6ff', sC: '#2563eb', price: '€11,200', exp: '€11,000', action: 'Awaiting response', due: 'Tomorrow', dC: '#f97316', time: '20h',   dot: '#f97316' },
  { id: '10D18363', make: 'AUDI A4',           owner: 'Mike',  oBg: '#16a34a', status: 'Valuation sent',sBg: '#eff6ff', sC: '#2563eb', price: '€6,900',  exp: '€7,500',  action: 'Check-in',          due: '22 May',   dC: '#374151', time: '18h',   dot: '#16a34a' },
  { id: '10D18362', make: 'VOLKSWAGEN GOLF',  owner: 'Sarah', oBg: '#d97706', status: 'New',           sBg: '#f9fafb', sC: '#6b7280', price: '€4,200',  exp: '€4,000',  action: 'Send offer',         due: '23 May',   dC: '#374151', time: '5h',    dot: '#16a34a' },
  { id: '10D18361', make: 'FORD KUGA',         owner: 'Chris', oBg: '#7c3aed', status: 'Won',           sBg: '#f0fdf4', sC: '#16a34a', price: '€8,750',  exp: '€8,500',  action: 'Create sale',        due: '—',        dC: '#374151', time: '—',     dot: null      },
];

function PipelineTable() {
  const cols = ['Vehicle', 'Owner', 'Status', 'Price offered', 'Customer expectation', 'Next action', 'Due date', 'Time in stage'];
  return (
    <div className="bg-white border border-[#e5e7eb] rounded-[8px]">
      <div className="flex items-center gap-[8px] px-[20px] py-[14px]" style={{ borderBottom: '1px solid #f1f5f9' }}>
        <p className="text-[16px] font-bold text-[#111827]">Pipeline</p>
        <button className="flex items-center gap-[4px] text-[13px] font-medium text-[#6b7280] hover:text-[#111827] transition-colors">
          View full pipeline <IconChevronRight size={14} />
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-[13px]">
          <thead>
            <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
              {cols.map((h, i) => (
                <th key={i} className={`px-[14px] py-[10px] text-[11px] font-medium text-[#9ca3af] uppercase tracking-wide whitespace-nowrap
                  ${i === 0 ? 'text-left pl-[20px]' : i < 3 ? 'text-left' : 'text-right'}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PIPELINE.map((r, i) => (
              <tr key={i} className="hover:bg-[#f9fafb] transition-colors"
                style={{ borderBottom: i < PIPELINE.length - 1 ? '1px solid #f9fafb' : 'none' }}>
                <td className="px-[20px] py-[11px]">
                  <div className="flex items-center gap-[6px]">
                    <span className="text-[#9ca3af]"><IconExternal /></span>
                    <div>
                      <p className="font-semibold text-[#111827]">{r.id}</p>
                      <p className="text-[11px] text-[#9ca3af]">{r.make}</p>
                    </div>
                  </div>
                </td>
                <td className="px-[14px] py-[11px]">
                  <div className="flex items-center gap-[8px]">
                    <div className="size-[26px] rounded-full flex items-center justify-center text-white text-[11px] font-bold shrink-0"
                      style={{ background: r.oBg }}>{r.owner[0]}</div>
                    <p className="text-[#374151]">{r.owner}</p>
                  </div>
                </td>
                <td className="px-[14px] py-[11px]">
                  <span className="text-[12px] font-medium px-[8px] py-[2px] rounded-full"
                    style={{ color: r.sC, background: r.sBg }}>{r.status}</span>
                </td>
                <td className="px-[14px] py-[11px] text-right font-medium text-[#111827]">{r.price}</td>
                <td className="px-[14px] py-[11px] text-right text-[#374151]">{r.exp}</td>
                <td className="px-[14px] py-[11px] text-right text-[#374151]">{r.action}</td>
                <td className="px-[14px] py-[11px] text-right font-medium" style={{ color: r.dC }}>{r.due}</td>
                <td className="px-[20px] py-[11px] text-right">
                  <div className="flex items-center justify-end gap-[6px]">
                    <span className="text-[#374151]">{r.time}</span>
                    {r.dot && <span className="size-[8px] rounded-full shrink-0" style={{ background: r.dot }} />}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ── Insights page ── */
function InsightsOverviewPage() {
  const [q, setQ] = useState('');
  return (
    <div className="flex flex-col gap-[24px] px-[32px] py-[24px] pb-[40px]">
      <div className="flex items-center justify-between">
        <h1 className="text-[24px] font-bold text-[#111827]">Insights</h1>
        <button className="flex items-center gap-[8px] border border-[#e5e7eb] rounded-[8px] px-[14px] h-[36px] text-[13px] font-medium text-[#374151] bg-white hover:bg-[#f9fafb] transition-colors">
          Date range: Last 7 days <IconChevronDown />
        </button>
      </div>
      <div className="flex items-center gap-[10px]">
        <p className="text-[16px] font-bold text-[#111827]">My overview</p>
        <button className="flex items-center gap-[4px] text-[13px] font-medium text-[#374151] hover:text-[#111827] transition-colors">
          View full performance <IconChevronRight size={14} />
        </button>
        <div className="flex-1" />
        <div className="relative" style={{ width: 320, height: 34 }}>
          <span className="absolute left-[10px] top-1/2 -translate-y-1/2 text-[#9ca3af] pointer-events-none"><IconSearch /></span>
          <input value={q} onChange={e => setQ(e.target.value)}
            placeholder="Search by registration, reference, created by..."
            className="w-full h-full bg-white border border-[#e5e7eb] rounded-[8px] pl-[32px] pr-[10px] text-[13px] text-[#111827] placeholder-[#9ca3af] focus:outline-none focus:border-[#6b7280] transition-colors" />
        </div>
      </div>
      <div className="flex gap-[12px]">
        {KPI_DATA.map((k, i) => <KpiCard key={i} {...k} />)}
      </div>
      <div className="grid gap-[16px]" style={{ gridTemplateColumns: '1fr 1fr 1fr 260px' }}>
        <ConversionFunnel />
        <PriceBands />
        <OnsiteOffsite />
        <SmartInsights />
      </div>
      <PipelineTable />
    </div>
  );
}

/* ── Team Performance data ── */
const TEAM = [
  { name: 'Sarah Johnson',  avatar: 'SJ', color: '#7c3aed', open: 24, won: 18, lost: 6, conv: 75, pipeline: '€340k', avgDeal: '€18.9k', timeToWin: '2.1 days', quota: 145, trend: '+12%', up: true,  thisWeek: 5, lastWeek: 4, thisMonth: 18, lastMonth: 15, avgCycle: '2.1 days', largestDeal: '€45,000', activities: 42 },
  { name: 'Michael Chen',   avatar: 'MC', color: '#0891b2', open: 21, won: 15, lost: 6, conv: 71, pipeline: '€315k', avgDeal: '€21k',   timeToWin: '2.3 days', quota: 132, trend: '+8%',  up: true,  thisWeek: 4, lastWeek: 4, thisMonth: 15, lastMonth: 14, avgCycle: '2.3 days', largestDeal: '€38,500', activities: 38 },
  { name: 'Emma Wilson',    avatar: 'EW', color: '#16a34a', open: 19, won: 12, lost: 7, conv: 63, pipeline: '€280k', avgDeal: '€23.3k', timeToWin: '2.8 days', quota: 118, trend: '+5%',  up: true,  thisWeek: 3, lastWeek: 3, thisMonth: 12, lastMonth: 11, avgCycle: '2.8 days', largestDeal: '€42,000', activities: 35 },
  { name: 'David Martinez', avatar: 'DM', color: '#d97706', open: 18, won: 11, lost: 7, conv: 61, pipeline: '€265k', avgDeal: '€24k',   timeToWin: '3.1 days', quota: 98,  trend: '-2%',  up: false, thisWeek: 3, lastWeek: 4, thisMonth: 11, lastMonth: 13, avgCycle: '3.1 days', largestDeal: '€35,000', activities: 31 },
  { name: 'Lisa Anderson',  avatar: 'LA', color: '#dc2626', open: 16, won: 9,  lost: 7, conv: 56, pipeline: '€225k', avgDeal: '€25k',   timeToWin: '3.4 days', quota: 92,  trend: '-4%',  up: false, thisWeek: 2, lastWeek: 3, thisMonth: 9,  lastMonth: 11, avgCycle: '3.4 days', largestDeal: '€32,500', activities: 28 },
  { name: 'James Taylor',   avatar: 'JT', color: '#6d28d9', open: 15, won: 8,  lost: 7, conv: 53, pipeline: '€210k', avgDeal: '€26.3k', timeToWin: '3.6 days', quota: 87,  trend: '+1%',  up: true,  thisWeek: 2, lastWeek: 2, thisMonth: 8,  lastMonth: 9,  avgCycle: '3.6 days', largestDeal: '€29,800', activities: 25 },
];

const ACTIVITY = [
  { name: 'Sarah Johnson',  activity: 'Won deal #49856732',              customer: 'ABC Corp',           value: '€24,500', time: '2 hours ago', status: 'Won',        sBg: '#f0fdf4', sC: '#16a34a' },
  { name: 'Michael Chen',   activity: 'Sent offer to customer',          customer: 'Tech Solutions',     value: '€18,000', time: '3 hours ago', status: 'Offer Sent', sBg: '#eff6ff', sC: '#2563eb' },
  { name: 'Emma Wilson',    activity: 'Deal moved to Customer Approval', customer: 'Global Industries',  value: '€32,000', time: '4 hours ago', status: 'In Progress',sBg: '#fff7ed', sC: '#c2410c' },
  { name: 'David Martinez', activity: 'Lost deal #49856701',             customer: 'Smart Systems',      value: '€15,000', time: '5 hours ago', status: 'Lost',       sBg: '#fff1f2', sC: '#dc2626' },
  { name: 'Sarah Johnson',  activity: 'Created new deal',                customer: 'Innovation Corp',    value: '€28,000', time: '6 hours ago', status: 'New',        sBg: '#f9fafb', sC: '#6b7280' },
  { name: 'Lisa Anderson',  activity: 'Sent follow-up to customer',      customer: 'Future Tech',        value: '€12,000', time: '7 hours ago', status: 'Follow-up',  sBg: '#f5f3ff', sC: '#6d28d9' },
  { name: 'James Taylor',   activity: 'Won deal #49856690',              customer: 'Digital Enterprises', value: '€19,500', time: '8 hours ago', status: 'Won',        sBg: '#f0fdf4', sC: '#16a34a' },
  { name: 'Emma Wilson',    activity: 'Scheduled demo call',             customer: 'Cloud Services Inc', value: '€22,000', time: '9 hours ago', status: 'In Progress',sBg: '#fff7ed', sC: '#c2410c' },
];

function MemberAvatar({ avatar, color }) {
  return (
    <div className="size-[28px] rounded-full flex items-center justify-center text-white text-[11px] font-bold shrink-0"
      style={{ background: color }}>{avatar}</div>
  );
}

function TeamPerformancePage() {
  return (
    <div className="flex flex-col gap-[24px] px-[32px] py-[24px] pb-[40px]">

      {/* Header */}
      <div>
        <h1 className="text-[24px] font-bold text-[#111827]">Team Performance</h1>
        <p className="text-[14px] text-[#6b7280] mt-[2px]">Track and compare team metrics</p>
      </div>

      {/* KPI summary */}
      <div className="flex gap-[48px]">
        <div>
          <p className="text-[13px] font-medium text-[#6b7280] mb-[8px]">Top Performer</p>
          <p className="text-[36px] font-bold text-[#111827] leading-[1.1]">Sarah<br />Johnson</p>
          <p className="text-[13px] text-[#6b7280] mt-[6px]">75% conversion rate</p>
        </div>
        <div>
          <p className="text-[13px] font-medium text-[#6b7280] mb-[8px]">Team Average</p>
          <p className="text-[36px] font-bold text-[#111827] leading-[1.1]">63.2%</p>
          <p className="text-[13px] text-[#6b7280] mt-[6px]">Conversion rate</p>
        </div>
        <div>
          <p className="text-[13px] font-medium text-[#6b7280] mb-[8px]">Avg. Time to Win</p>
          <p className="text-[36px] font-bold text-[#111827] leading-[1.1]">2.9 days</p>
          <p className="text-[13px] text-[#6b7280] mt-[6px]">Team average</p>
        </div>
        <div>
          <p className="text-[13px] font-medium text-[#6b7280] mb-[8px]">Total Pipeline</p>
          <p className="text-[36px] font-bold text-[#111827] leading-[1.1]">€1.64M</p>
          <p className="text-[13px] text-[#6b7280] mt-[6px]">All team members</p>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="bg-white border border-[#e5e7eb] rounded-[8px]">
        <div className="px-[20px] py-[14px]" style={{ borderBottom: '1px solid #f1f5f9' }}>
          <p className="text-[14px] font-semibold text-[#111827]">Team Leaderboard</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                {['RANK','TEAM MEMBER','OPEN','WON','LOST','CONVERSION','PIPELINE','AVG DEAL','TIME TO WIN','QUOTA','TREND'].map((h, i) => (
                  <th key={i} className={`px-[14px] py-[10px] text-[11px] font-medium text-[#9ca3af] uppercase tracking-wide whitespace-nowrap ${i <= 1 ? 'text-left' : 'text-right'} ${i === 0 ? 'pl-[20px] w-[48px]' : ''}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TEAM.map((r, i) => (
                <tr key={i} className="hover:bg-[#f9fafb] transition-colors" style={{ borderBottom: i < TEAM.length - 1 ? '1px solid #f9fafb' : 'none' }}>
                  <td className="pl-[20px] pr-[14px] py-[11px] text-[12px] text-[#9ca3af]">{i > 0 ? i + 1 : ''}</td>
                  <td className="px-[14px] py-[11px]">
                    <div className="flex items-center gap-[8px]">
                      <MemberAvatar avatar={r.avatar} color={r.color} />
                      <p className="font-semibold text-[#111827] whitespace-nowrap">{r.name}</p>
                    </div>
                  </td>
                  <td className="px-[14px] py-[11px] text-right text-[#374151]">{r.open}</td>
                  <td className="px-[14px] py-[11px] text-right font-semibold text-[#111827]">{r.won}</td>
                  <td className="px-[14px] py-[11px] text-right text-[#374151]">{r.lost}</td>
                  <td className="px-[14px] py-[11px] text-right font-semibold text-[#111827]">{r.conv}%</td>
                  <td className="px-[14px] py-[11px] text-right text-[#374151]">{r.pipeline}</td>
                  <td className="px-[14px] py-[11px] text-right text-[#374151]">{r.avgDeal}</td>
                  <td className="px-[14px] py-[11px] text-right text-[#374151]">{r.timeToWin}</td>
                  <td className="px-[14px] py-[11px] text-right font-semibold" style={{ color: r.quota >= 100 ? '#16a34a' : '#dc2626' }}>{r.quota}%</td>
                  <td className="pr-[20px] pl-[14px] py-[11px] text-right text-[12px] font-semibold whitespace-nowrap" style={{ color: r.up ? '#16a34a' : '#dc2626' }}>
                    {r.up ? '↗' : '↘'}{r.trend}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed Performance Metrics */}
      <div className="bg-white border border-[#e5e7eb] rounded-[8px]">
        <div className="px-[20px] py-[14px]" style={{ borderBottom: '1px solid #f1f5f9' }}>
          <p className="text-[14px] font-semibold text-[#111827]">Detailed Performance Metrics</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                {['TEAM MEMBER','THIS WEEK','LAST WEEK','THIS MONTH','LAST MONTH','AVG DEAL CYCLE','LARGEST DEAL','ACTIVITIES'].map((h, i) => (
                  <th key={i} className={`px-[14px] py-[10px] text-[11px] font-medium text-[#9ca3af] uppercase tracking-wide whitespace-nowrap ${i === 0 ? 'text-left pl-[20px]' : 'text-right'}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TEAM.map((r, i) => (
                <tr key={i} className="hover:bg-[#f9fafb] transition-colors" style={{ borderBottom: i < TEAM.length - 1 ? '1px solid #f9fafb' : 'none' }}>
                  <td className="pl-[20px] pr-[14px] py-[11px]">
                    <div className="flex items-center gap-[8px]">
                      <MemberAvatar avatar={r.avatar} color={r.color} />
                      <p className="font-semibold text-[#111827]">{r.name}</p>
                    </div>
                  </td>
                  <td className="px-[14px] py-[11px] text-right font-bold text-[#111827]">{r.thisWeek}</td>
                  <td className="px-[14px] py-[11px] text-right text-[#374151]">{r.lastWeek}</td>
                  <td className="px-[14px] py-[11px] text-right font-bold text-[#111827]">{r.thisMonth}</td>
                  <td className="px-[14px] py-[11px] text-right text-[#374151]">{r.lastMonth}</td>
                  <td className="px-[14px] py-[11px] text-right text-[#374151]">{r.avgCycle}</td>
                  <td className="px-[14px] py-[11px] text-right font-semibold text-[#111827]">{r.largestDeal}</td>
                  <td className="pr-[20px] pl-[14px] py-[11px] text-right text-[#374151]">{r.activities}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white border border-[#e5e7eb] rounded-[8px]">
        <div className="px-[20px] py-[14px]" style={{ borderBottom: '1px solid #f1f5f9' }}>
          <p className="text-[14px] font-semibold text-[#111827]">Recent Activity</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                {['TEAM MEMBER','ACTIVITY','CUSTOMER','DEAL VALUE','TIME','STATUS'].map((h, i) => (
                  <th key={i} className={`px-[14px] py-[10px] text-[11px] font-medium text-[#9ca3af] uppercase tracking-wide whitespace-nowrap ${i <= 1 ? 'text-left' : 'text-right'} ${i === 0 ? 'pl-[20px]' : ''}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ACTIVITY.map((r, i) => (
                <tr key={i} className="hover:bg-[#f9fafb] transition-colors" style={{ borderBottom: i < ACTIVITY.length - 1 ? '1px solid #f9fafb' : 'none' }}>
                  <td className="pl-[20px] pr-[14px] py-[11px] font-semibold text-[#111827] whitespace-nowrap">{r.name}</td>
                  <td className="px-[14px] py-[11px] text-[#374151]">{r.activity}</td>
                  <td className="px-[14px] py-[11px] text-right text-[#374151] whitespace-nowrap">{r.customer}</td>
                  <td className="px-[14px] py-[11px] text-right font-semibold text-[#111827]">{r.value}</td>
                  <td className="px-[14px] py-[11px] text-right text-[#9ca3af] whitespace-nowrap">{r.time}</td>
                  <td className="pr-[20px] pl-[14px] py-[11px] text-right">
                    <span className="text-[12px] font-medium px-[8px] py-[2px] rounded-full whitespace-nowrap" style={{ color: r.sC, background: r.sBg }}>{r.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

function InsightsPage({ page }) {
  if (page === 'team') return <TeamPerformancePage />;
  return <InsightsOverviewPage />;
}

Object.assign(window, { InsightsSidebar, InsightsPage });
