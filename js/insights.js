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
  { label: 'Avg. price gap',           value: '-€1,240',  change: '↓ €210 vs last 7 days',     good: false },
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
      <p className={`text-[12px] font-medium ${good === true ? 'text-[#16a34a]' : good === false ? 'text-[#b91c1c]' : 'text-[#6b7280]'}`}>{change}</p>
    </div>
  );
}

/* ── Conversion funnel ── */
const FUNNEL = [
  { label: 'New',            n: 132, pct: null,    color: '#c7d9ea' },
  { label: 'Valuation sent', n: 96,  pct: '72.7%', color: '#9ab8d0' },
  { label: 'Offered',        n: 68,  pct: '51.5%', color: '#6d97b6' },
  { label: 'Won',            n: 48,  pct: '36.4%', color: '#4a7a9b' },
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

function PriceBands({ setPage }) {
  return (
    <div className="bg-white border border-[#e5e7eb] rounded-[8px] p-[20px]">
      <div className="flex items-center justify-between mb-[14px]">
        <div className="flex items-center gap-[6px]">
          <p className="text-[14px] font-semibold text-[#111827]">Conversion by price band</p>
          <span className="text-[#d1d5db]"><IconInfo /></span>
        </div>
        <button onClick={() => setPage('deals')} className="text-[12px] text-[#6b7280] flex items-center gap-[2px] hover:text-[#111827]">View all <IconChevronRight /></button>
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
function OnsiteOffsite({ setPage }) {
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
        <button onClick={() => setPage('pipeline')} className="text-[12px] text-[#6b7280] flex items-center gap-[2px] hover:text-[#111827]">View all <IconChevronRight /></button>
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
  { dot: '#dc2626', title: '12 deals at risk', desc: 'High price gap or no customer response in 24h+', cta: 'View deals',       target: 'pipeline' },
  { dot: '#f97316', title: '5 deals stuck',    desc: 'No action for more than 24h',                    cta: 'View deals',       target: 'pipeline' },
  { dot: '#16a34a', title: 'Top performer',    desc: 'Chris leads with 48% conversion this week',       cta: 'View leaderboard', target: 'team'     },
];

function SmartInsights({ setPage }) {
  return (
    <div className="bg-white border border-[#e5e7eb] rounded-[8px] p-[20px] flex flex-col gap-[12px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[6px]">
          <p className="text-[14px] font-semibold text-[#111827]">Smart insights</p>
        </div>
        <button className="text-[#9ca3af] text-[18px] leading-none hover:text-[#6b7280]">∧</button>
      </div>
      {SMART.map(({ dot, title, desc, cta, target }, i) => (
        <div key={i} className="border border-[#f1f5f9] rounded-[8px] p-[12px]">
          <div className="flex items-center gap-[8px] mb-[4px]">
            <span className="size-[8px] rounded-full shrink-0" style={{ background: dot }} />
            <p className="text-[13px] font-semibold text-[#111827]">{title}</p>
          </div>
          <p className="text-[12px] text-[#6b7280] leading-[16px] mb-[8px]">{desc}</p>
          <button onClick={() => setPage(target)} className="flex items-center gap-[4px] text-[12px] font-medium text-[#374151] hover:text-[#111827] transition-colors">
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
  const cols = ['Vehicle', 'Owner', 'Status', 'Price offered', 'Customer exp.', 'Gap', 'Next action', 'Due date', 'Time in stage'];
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
            {PIPELINE.map((r, i) => {
              const gap = parseEuro(r.price) - parseEuro(r.exp);
              const gapLabel = (gap >= 0 ? '+' : '−') + '€' + Math.abs(gap).toLocaleString();
              const gapColor = gap >= 0 ? '#16a34a' : '#dc2626';
              return (
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
                <td className="px-[14px] py-[11px] text-right font-semibold" style={{ color: gapColor }}>{gapLabel}</td>
                <td className="px-[14px] py-[11px] text-right text-[#374151]">{r.action}</td>
                <td className="px-[14px] py-[11px] text-right font-medium" style={{ color: r.dC }}>{r.due}</td>
                <td className="px-[20px] py-[11px] text-right">
                  <div className="flex items-center justify-end gap-[6px]">
                    <span className="text-[#374151]">{r.time}</span>
                    {r.dot && <span className="size-[8px] rounded-full shrink-0" style={{ background: r.dot }} />}
                  </div>
                </td>
              </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ── Insights page ── */
function InsightsOverviewPage({ setPage }) {
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
      </div>
      <div className="flex gap-[12px]">
        {KPI_DATA.map((k, i) => <KpiCard key={i} {...k} />)}
      </div>
      <div className="grid gap-[16px]" style={{ gridTemplateColumns: '1fr 1fr 1fr 260px' }}>
        <ConversionFunnel />
        <PriceBands setPage={setPage} />
        <OnsiteOffsite setPage={setPage} />
        <SmartInsights setPage={setPage} />
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
  { name: 'Michael Chen',   activity: 'Sent offer to customer',          customer: 'Tech Solutions',     value: '€18,000', time: '3 hours ago', status: 'Valuation sent', sBg: '#eff6ff', sC: '#2563eb' },
  { name: 'Emma Wilson',    activity: 'Deal moved to Customer Approval', customer: 'Global Industries',  value: '€32,000', time: '4 hours ago', status: 'Negotiating',    sBg: '#fff7ed', sC: '#c2410c' },
  { name: 'David Martinez', activity: 'Lost deal #49856701',             customer: 'Smart Systems',      value: '€15,000', time: '5 hours ago', status: 'Lost',           sBg: '#fff1f2', sC: '#dc2626' },
  { name: 'Sarah Johnson',  activity: 'Created new deal',                customer: 'Innovation Corp',    value: '€28,000', time: '6 hours ago', status: 'New',            sBg: '#f9fafb', sC: '#6b7280' },
  { name: 'Lisa Anderson',  activity: 'Sent follow-up to customer',      customer: 'Future Tech',        value: '€12,000', time: '7 hours ago', status: 'Negotiating',    sBg: '#fff7ed', sC: '#c2410c' },
  { name: 'James Taylor',   activity: 'Won deal #49856690',              customer: 'Digital Enterprises', value: '€19,500', time: '8 hours ago', status: 'Won',           sBg: '#f0fdf4', sC: '#16a34a' },
  { name: 'Emma Wilson',    activity: 'Scheduled demo call',             customer: 'Cloud Services Inc', value: '€22,000', time: '9 hours ago', status: 'Negotiating',    sBg: '#fff7ed', sC: '#c2410c' },
];

function MemberAvatar({ avatar, color }) {
  return (
    <div className="size-[28px] rounded-full flex items-center justify-center text-white text-[11px] font-bold shrink-0"
      style={{ background: color }}>{avatar}</div>
  );
}

function TeamPerformancePage() {
  const [teamTab, setTeamTab] = useState('Summary');
  return (
    <div className="flex flex-col gap-[24px] px-[32px] py-[24px] pb-[40px]">

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[24px] font-bold text-[#111827]">Team Performance</h1>
          <p className="text-[14px] text-[#6b7280] mt-[2px]">Track and compare team metrics</p>
        </div>
        <button className="flex items-center gap-[8px] border border-[#e5e7eb] rounded-[8px] px-[14px] h-[36px] text-[13px] font-medium text-[#374151] bg-white hover:bg-[#f9fafb] transition-colors">
          Date range: Last 7 days <IconChevronDown />
        </button>
      </div>

      {/* KPI summary */}
      <div className="flex gap-[12px]">
        <KpiCard label="Top Performer"    value="Sarah Johnson" change="75% conversion rate" />
        <KpiCard label="Team Average"     value="63.2%"         change="Conversion rate" />
        <KpiCard label="Avg. Time to Win" value="2.9 days"      change="Team average" />
        <KpiCard label="Total Pipeline"   value="€1.64M"        change="All team members" />
      </div>

      {/* Leaderboard (tabbed) */}
      <div className="bg-white border border-[#e5e7eb] rounded-[8px]">
        <div className="px-[20px] py-[14px] flex items-center justify-between" style={{ borderBottom: '1px solid #f1f5f9' }}>
          <p className="text-[14px] font-semibold text-[#111827]">Team Leaderboard</p>
          <div className="flex border border-[#e5e7eb] rounded-[6px] overflow-hidden">
            {['Summary', 'Detailed'].map(t => (
              <button key={t} onClick={() => setTeamTab(t)}
                className={`px-[14px] h-[30px] text-[12px] font-medium transition-colors ${
                  teamTab === t ? 'bg-[#111827] text-white' : 'text-[#374151] hover:bg-[#f9fafb]'
                }`}>{t}</button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          {teamTab === 'Summary' ? (
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
                    <td className="pl-[20px] pr-[14px] py-[11px] text-[13px] font-semibold" style={{ color: i === 0 ? '#d97706' : '#9ca3af' }}>{i + 1}</td>
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
          ) : (
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
          )}
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

/* ── Pipeline data ── */
const PIPELINE_STAGES = [
  { stage: 'New',            count: 24, value: '€168.0k', avgSize: '€7.0k', pct: 47.9 },
  { stage: 'Valuation sent', count: 14, value: '€94.0k',  avgSize: '€6.7k', pct: 26.8 },
  { stage: 'Offered',        count: 8,  value: '€51.0k',  avgSize: '€6.4k', pct: 14.5 },
  { stage: 'Negotiating',    count: 6,  value: '€38.0k',  avgSize: '€6.3k', pct: 10.8 },
];

const STAGE_STYLE = {
  'New':            { sBg: '#f9fafb', sC: '#6b7280' },
  'Valuation sent': { sBg: '#eff6ff', sC: '#2563eb' },
  'Offered':        { sBg: '#eff6ff', sC: '#2563eb' },
  'Negotiating':    { sBg: '#fff7ed', sC: '#c2410c' },
  'Won':            { sBg: '#f0fdf4', sC: '#16a34a' },
  'Lost':           { sBg: '#fff1f2', sC: '#dc2626' },
};

const ALL_DEALS = [
  { id: '49854683', make: 'FORD FOCUS',       owner: 'Sarah',   oBg: '#7c3aed', status: 'New',            sBg: '#f9fafb', sC: '#6b7280', price: '€1,000',  exp: '€3,500',  action: 'Review valuation',   due: '15 Jan', dC: '#b91c1c', time: '3d', dot: '#b91c1c',
    disc: 'Mechanical noise noted by inspector',
    tl: [
      { ts: 'Jan 12 10:05', event: 'Valuation created',         flag: null   },
      { ts: 'Jan 12 10:08', event: 'Deal opened — New stage',   flag: null   },
      { ts: 'Jan 15 10:05', event: 'No action in 3 days',       flag: 'slow' },
    ] },
  { id: '49854682', make: 'BMW 5 SERIES',     owner: 'Michael', oBg: '#0891b2', status: 'Valuation sent', sBg: '#eff6ff', sC: '#2563eb', price: '€6,000',  exp: '€7,000',  action: 'Awaiting response',  due: '14 Jan', dC: '#f97316', time: '2d', dot: '#f97316',
    disc: null,
    tl: [
      { ts: 'Jan 12 09:20', event: 'Valuation created',          flag: null   },
      { ts: 'Jan 12 11:45', event: 'Valuation sent to customer', flag: null   },
      { ts: 'Jan 14 11:45', event: 'Awaiting response — 2 days', flag: 'slow' },
    ] },
  { id: '49854681', make: 'AUDI A3',          owner: 'Emma',    oBg: '#16a34a', status: 'Offered',        sBg: '#eff6ff', sC: '#2563eb', price: '€8,000',  exp: '€7,000',  action: 'Follow up call',     due: '12 Jan', dC: '#374151', time: '5d', dot: '#16a34a',
    disc: 'Cosmetic damage: rear bumper scuff',
    tl: [
      { ts: 'Jan 07 14:10', event: 'Valuation created',            flag: null   },
      { ts: 'Jan 08 09:30', event: 'Valuation sent to customer',   flag: null   },
      { ts: 'Jan 09 15:20', event: 'Customer responded',           flag: null   },
      { ts: 'Jan 09 16:00', event: 'Offer made: €8,000',           flag: null   },
      { ts: 'Jan 12 16:00', event: 'No response — follow up due',  flag: 'slow' },
    ] },
  { id: '49854680', make: 'TOYOTA CAMRY',     owner: 'David',   oBg: '#d97706', status: 'Negotiating',    sBg: '#fff7ed', sC: '#c2410c', price: '€4,500',  exp: '€5,200',  action: 'Counter offer call', due: '11 Jan', dC: '#374151', time: '1d', dot: '#16a34a',
    disc: null,
    tl: [
      { ts: 'Jan 10 08:45', event: 'Valuation created',                   flag: null },
      { ts: 'Jan 10 10:00', event: 'Valuation sent to customer',           flag: null },
      { ts: 'Jan 10 14:30', event: 'Customer expectation received: €5,200',flag: null },
      { ts: 'Jan 10 15:00', event: 'Counter offer call scheduled',         flag: null },
    ] },
  { id: '49854679', make: 'HONDA CIVIC',      owner: 'Lisa',    oBg: '#dc2626', status: 'New',            sBg: '#f9fafb', sC: '#6b7280', price: '€6,800',  exp: '€8,000',  action: 'Send valuation',     due: '16 Jan', dC: '#374151', time: '4d', dot: '#f97316',
    disc: 'Service history incomplete — 2 years missing',
    tl: [
      { ts: 'Jan 11 11:20', event: 'Valuation created',               flag: null   },
      { ts: 'Jan 15 11:20', event: 'Valuation not yet sent — 4 days', flag: 'slow' },
    ] },
  { id: '49854678', make: 'MERCEDES C-CLASS', owner: 'James',   oBg: '#6d28d9', status: 'Valuation sent', sBg: '#eff6ff', sC: '#2563eb', price: '€12,000', exp: '€13,500', action: 'Send updated offer',  due: '13 Jan', dC: '#374151', time: '6d', dot: '#b91c1c',
    disc: null,
    tl: [
      { ts: 'Jan 07 09:00', event: 'Valuation created',          flag: null   },
      { ts: 'Jan 07 12:30', event: 'Valuation sent to customer', flag: null   },
      { ts: 'Jan 09 12:30', event: 'Follow-up sent',             flag: null   },
      { ts: 'Jan 13 12:30', event: 'No response — 6 days',       flag: 'slow' },
    ] },
  { id: '49854677', make: 'VW GOLF',          owner: 'Sarah',   oBg: '#7c3aed', status: 'Offered',        sBg: '#eff6ff', sC: '#2563eb', price: '€3,200',  exp: '€3,800',  action: 'Check-in',           due: '10 Jan', dC: '#374151', time: '3d', dot: '#16a34a',
    disc: 'Minor body work: passenger door dent',
    tl: [
      { ts: 'Jan 07 10:15', event: 'Valuation created',           flag: null },
      { ts: 'Jan 07 14:00', event: 'Valuation sent to customer',  flag: null },
      { ts: 'Jan 08 09:00', event: 'Offer accepted in principle', flag: null },
      { ts: 'Jan 10 09:00', event: 'Check-in scheduled',          flag: null },
    ] },
  { id: '49854676', make: 'NISSAN QASHQAI',   owner: 'Michael', oBg: '#0891b2', status: 'Negotiating',    sBg: '#fff7ed', sC: '#c2410c', price: '€9,500',  exp: '€10,000', action: 'Create sale',         due: '09 Jan', dC: '#374151', time: '2d', dot: '#16a34a',
    disc: null,
    tl: [
      { ts: 'Jan 07 08:30', event: 'Valuation created',                     flag: null },
      { ts: 'Jan 07 10:15', event: 'Valuation sent to customer',             flag: null },
      { ts: 'Jan 08 14:00', event: 'Customer expectation received: €10,000', flag: null },
      { ts: 'Jan 08 15:30', event: 'Negotiation started',                    flag: null },
      { ts: 'Jan 09 15:30', event: 'Sale creation pending',                  flag: null },
    ] },
];

function parseEuro(s) { return parseInt(s.replace(/[€,]/g, ''), 10) || 0; }

function PipelinePage() {
  const [statusFilter, setStatusFilter] = useState('All');
  const [ownerFilter,  setOwnerFilter]  = useState('All');
  const [actionFilter, setActionFilter] = useState('All');
  const [dueFilter,    setDueFilter]    = useState('All');
  const [expandedId,   setExpandedId]   = useState(null);
  const statuses = ['All', 'New', 'Valuation sent', 'Offered', 'Negotiating', 'Won'];
  const owners   = ['All', ...Array.from(new Set(ALL_DEALS.map(d => d.owner)))];
  const actions  = ['All', ...Array.from(new Set(ALL_DEALS.map(d => d.action)))];
  const dueDates = ['All', 'Overdue', 'Due soon', 'On track'];
  const filtered = ALL_DEALS.filter(d =>
    (statusFilter === 'All' || d.status === statusFilter) &&
    (ownerFilter  === 'All' || d.owner  === ownerFilter)  &&
    (actionFilter === 'All' || d.action === actionFilter) &&
    (dueFilter    === 'All' ||
     (dueFilter === 'Overdue'  && d.dC === '#b91c1c') ||
     (dueFilter === 'Due soon' && d.dC === '#f97316') ||
     (dueFilter === 'On track' && d.dC === '#374151'))
  );

  return (
    <div className="flex flex-col gap-[24px] px-[32px] py-[24px] pb-[40px]">

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[24px] font-bold text-[#111827]">Pipeline</h1>
          <p className="text-[14px] text-[#6b7280] mt-[2px]">Manage and track all deals in progress</p>
        </div>
        <div className="flex items-center gap-[8px]">
          <button className="flex items-center gap-[8px] border border-[#e5e7eb] rounded-[8px] px-[14px] h-[36px] text-[13px] font-medium text-[#374151] bg-white hover:bg-[#f9fafb] transition-colors">
            Date range: Last 7 days <IconChevronDown />
          </button>
          <button className="flex items-center gap-[6px] border border-[#e5e7eb] rounded-[8px] px-[12px] h-[34px] text-[13px] font-medium text-[#374151] bg-white hover:bg-[#f9fafb] transition-colors">
            ↓ Export
          </button>
        </div>
      </div>

      {/* KPI summary */}
      <div className="flex gap-[12px]">
        <KpiCard label="Total Pipeline Value" value="€351.0k" change="8 deals" />
        <KpiCard label="Weighted Pipeline"    value="€29.8k"  change="Probability-adjusted" />
        <KpiCard label="Avg Days in Stage"    value="3.3"     change="Across all deals" />
        <KpiCard label="Deals Closing Soon"   value="3"       change="Probability ≥ 70%" />
      </div>

      {/* Pipeline by Stage */}
      <div className="bg-white border border-[#e5e7eb] rounded-[8px]">
        <div className="px-[20px] py-[14px]" style={{ borderBottom: '1px solid #f1f5f9' }}>
          <p className="text-[14px] font-semibold text-[#111827]">Pipeline by Stage</p>
        </div>
        <table className="w-full text-[13px]">
          <thead>
            <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
              {['STAGE', 'DEAL COUNT', 'TOTAL VALUE', 'AVG DEAL SIZE', '% OF PIPELINE'].map((h, i) => (
                <th key={i} className={`px-[20px] py-[10px] text-[11px] font-medium text-[#9ca3af] uppercase tracking-wide ${i === 0 ? 'text-left' : 'text-right'}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PIPELINE_STAGES.map((r, i) => (
              <tr key={i} className="hover:bg-[#f9fafb] transition-colors" style={{ borderBottom: i < PIPELINE_STAGES.length - 1 ? '1px solid #f9fafb' : 'none' }}>
                <td className="px-[20px] py-[12px]">
                  <div className="flex items-center gap-[10px]">
                    <div className="h-[8px] rounded-full shrink-0" style={{ width: `${r.pct * 1.4}px`, background: STAGE_STYLE[r.stage].sC, opacity: 0.5 }} />
                    <p className="font-semibold text-[#111827]">{r.stage}</p>
                  </div>
                </td>
                <td className="px-[20px] py-[12px] text-right font-semibold text-[#111827]">{r.count}</td>
                <td className="px-[20px] py-[12px] text-right text-[#374151]">{r.value}</td>
                <td className="px-[20px] py-[12px] text-right text-[#374151]">{r.avgSize}</td>
                <td className="px-[20px] py-[12px] text-right font-bold text-[#111827]">{r.pct}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* All Deals */}
      <div className="bg-white border border-[#e5e7eb] rounded-[8px]">
        <div className="px-[20px] pt-[14px] pb-[12px] flex flex-col gap-[12px]" style={{ borderBottom: '1px solid #f1f5f9' }}>
          {/* Row 1: title + owner dropdown + action dropdown */}
          <div className="flex items-center justify-between">
            <p className="text-[14px] font-semibold text-[#111827]">All Deals <span className="text-[13px] font-normal text-[#9ca3af] ml-[6px]">{filtered.length} deals</span></p>
            <div className="flex items-center gap-[8px]">
              <select value={ownerFilter} onChange={e => setOwnerFilter(e.target.value)}
                className="border border-[#e5e7eb] rounded-[6px] px-[8px] h-[28px] text-[12px] text-[#374151] bg-white focus:outline-none cursor-pointer">
                {owners.map(o => <option key={o}>{o === 'All' ? 'All owners' : o}</option>)}
              </select>
              <select value={actionFilter} onChange={e => setActionFilter(e.target.value)}
                className="border border-[#e5e7eb] rounded-[6px] px-[8px] h-[28px] text-[12px] text-[#374151] bg-white focus:outline-none cursor-pointer">
                {actions.map(a => <option key={a}>{a === 'All' ? 'All actions' : a}</option>)}
              </select>
            </div>
          </div>
          {/* Row 2: status pills | separator | due date pills */}
          <div className="flex items-center gap-[6px] flex-wrap">
            {statuses.map(s => (
              <button key={s} onClick={() => setStatusFilter(s)}
                className={`px-[10px] h-[26px] rounded-full text-[12px] font-medium transition-colors ${
                  statusFilter === s ? 'bg-[#111827] text-white' : 'border border-[#e5e7eb] text-[#374151] hover:bg-[#f9fafb]'
                }`}>{s}</button>
            ))}
            <span className="w-[1px] h-[18px] bg-[#e5e7eb] mx-[2px]" />
            {dueDates.map(d => (
              <button key={d} onClick={() => setDueFilter(d)}
                className={`px-[10px] h-[26px] rounded-full text-[12px] font-medium transition-colors ${
                  dueFilter === d ? 'bg-[#111827] text-white' : 'border border-[#e5e7eb] text-[#374151] hover:bg-[#f9fafb]'
                }`}>{d}</button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                {['Vehicle', 'Owner', 'Status', 'Price offered', 'Customer exp.', 'Gap', 'Next action', 'Due date', 'Time in stage'].map((h, i) => (
                  <th key={i} className={`px-[14px] py-[10px] text-[11px] font-medium text-[#9ca3af] uppercase tracking-wide whitespace-nowrap ${i === 0 ? 'text-left pl-[20px]' : i < 3 ? 'text-left' : 'text-right'}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td colSpan={9} className="px-[20px] py-[24px] text-center text-[13px] text-[#9ca3af]">No deals match the selected filters.</td></tr>
              )}
              {filtered.map((r, i) => {
                const gap = parseEuro(r.price) - parseEuro(r.exp);
                const gapLabel = (gap >= 0 ? '+' : '−') + '€' + Math.abs(gap).toLocaleString();
                const gapColor = gap >= 0 ? '#16a34a' : '#dc2626';
                const isExpanded = expandedId === r.id;
                const isLast = i === filtered.length - 1;
                return (
                  <React.Fragment key={r.id}>
                    <tr onClick={() => setExpandedId(isExpanded ? null : r.id)} className="hover:bg-[#f9fafb] cursor-pointer transition-colors"
                        style={{ borderBottom: (!isExpanded && !isLast) ? '1px solid #f9fafb' : isExpanded ? '1px solid #e5e7eb' : 'none' }}>
                      <td className="px-[20px] py-[11px]">
                        <div className="flex items-center gap-[6px]">
                          <span className="text-[#9ca3af]"><IconExternal /></span>
                          <div>
                            <p className="font-semibold text-[#111827]">{r.id}</p>
                            <p className="text-[11px] text-[#9ca3af]">{r.make}</p>
                            {r.disc && <span className="inline-block mt-[2px] text-[10px] font-semibold text-[#92400e] bg-[#fff7ed] px-[5px] py-[0.5px] rounded-full">Disclosure</span>}
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
                      <td className="px-[14px] py-[11px] text-right font-semibold" style={{ color: gapColor }}>{gapLabel}</td>
                      <td className="px-[14px] py-[11px] text-right text-[#374151]">{r.action}</td>
                      <td className="px-[14px] py-[11px] text-right font-medium" style={{ color: r.dC }}>{r.due}</td>
                      <td className="px-[20px] py-[11px] text-right">
                        <div className="flex items-center justify-end gap-[6px]">
                          <span className="text-[#374151]">{r.time}</span>
                          {r.dot && <span className="size-[8px] rounded-full shrink-0" style={{ background: r.dot }} />}
                        </div>
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr style={{ borderBottom: isLast ? 'none' : '1px solid #f9fafb' }}>
                        <td colSpan={9} className="px-[20px] py-[16px] bg-[#f9fafb]">
                          <div className="flex flex-col gap-[6px]">
                            <p className="text-[11px] font-semibold text-[#9ca3af] uppercase tracking-wide mb-[4px]">Deal timeline</p>
                            {r.tl.map((t, j) => (
                              <div key={j} className="flex items-center gap-[10px]">
                                <p className="text-[11px] text-[#9ca3af] shrink-0 w-[110px]">{t.ts}</p>
                                <span className="size-[6px] rounded-full shrink-0" style={{ background: t.flag === 'slow' ? '#f97316' : '#d1d5db' }} />
                                <p className={`text-[12px] ${t.flag === 'slow' ? 'font-semibold text-[#c2410c]' : 'text-[#374151]'}`}>{t.event}</p>
                                {t.flag === 'slow' && <span className="text-[10px] font-bold bg-[#fff7ed] text-[#c2410c] border border-[#fed7aa] px-[6px] py-[1px] rounded-full">slow</span>}
                              </div>
                            ))}
                          </div>
                          {r.disc && (
                            <div className="mt-[12px] pt-[12px] border-t border-[#e5e7eb] flex items-start gap-[8px]">
                              <span className="text-[10px] font-semibold text-[#92400e] bg-[#fff7ed] border border-[#fed7aa] px-[6px] py-[1px] rounded-full shrink-0 mt-[1px]">Disclosure</span>
                              <p className="text-[12px] text-[#374151]">{r.disc}</p>
                            </div>
                          )}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

/* ── Deal Analysis data ── */
const WIN_LOSS_BANDS = [
  { band: 'Overall',  total: 132, won: 48, lost: 84, rate: 36, avgTime: '2.8 days' },
  { band: '€0–3k',   total: 40,  won: 18, lost: 22, rate: 45, avgTime: '2.1 days' },
  { band: '€3k–7k',  total: 55,  won: 21, lost: 34, rate: 38, avgTime: '2.6 days' },
  { band: '€7k–15k', total: 27,  won: 7,  lost: 20, rate: 26, avgTime: '3.4 days' },
  { band: '€15k+',   total: 10,  won: 2,  lost: 8,  rate: 20, avgTime: '4.8 days' },
];

const LOSS_REASONS = [
  { reason: 'Price too high',   count: 29, pct: 35, avgSize: '€8,420'  },
  { reason: 'Competitor won',   count: 24, pct: 28, avgSize: '€12,150' },
  { reason: 'Timing issues',    count: 15, pct: 18, avgSize: '€6,800'  },
  { reason: 'No response',      count: 10, pct: 12, avgSize: '€5,200'  },
  { reason: 'Other',            count: 6,  pct: 7,  avgSize: '€4,100'  },
];

const PRICE_GAP = [
  { band: '€0–3k',   offered: '€2,200',  expected: '€2,800',  gap: -21 },
  { band: '€3k–7k',  offered: '€4,800',  expected: '€5,600',  gap: -14 },
  { band: '€7k–15k', offered: '€9,400',  expected: '€11,200', gap: -16 },
  { band: '€15k+',   offered: '€18,200', expected: '€21,500', gap: -15 },
];

const FUNNEL_STAGES = [
  { stage: 'New',            deals: 168, value: '€1.28M', dropOff: null, dropOffRate: null, avgTime: '3.2 days', conv: 100 },
  { stage: 'Valuation sent', deals: 94,  value: '€720k',  dropOff: 74,   dropOffRate: 44,   avgTime: '4.1 days', conv: 56  },
  { stage: 'Offered',        deals: 51,  value: '€420k',  dropOff: 43,   dropOffRate: 46,   avgTime: '2.8 days', conv: 30  },
  { stage: 'Negotiating',    deals: 38,  value: '€310k',  dropOff: 13,   dropOffRate: 25,   avgTime: '1.5 days', conv: 23  },
  { stage: 'Won',            deals: 48,  value: '€405k',  dropOff: null, dropOffRate: null, avgTime: '—',        conv: 29  },
];


const LOST_DEALS = [
  { id: '49854685', make: 'FORD MONDEO',    owner: 'Michael', oBg: '#0891b2', exp: '€9,500',  trade: '€7,200',  fair: '€8,400',  gap: -2300, reason: 'Price too high' },
  { id: '49854684', make: 'BMW 3 SERIES',   owner: 'Sarah',   oBg: '#7c3aed', exp: '€14,000', trade: '€11,500', fair: '€12,800', gap: -2500, reason: 'Competitor won'  },
  { id: '49854683', make: 'FORD FOCUS',     owner: 'Sarah',   oBg: '#7c3aed', exp: '€3,500',  trade: '€1,000',  fair: '€2,800',  gap: -2500, reason: 'Price too high' },
  { id: '49854675', make: 'RENAULT MEGANE', owner: 'Emma',    oBg: '#16a34a', exp: '€6,000',  trade: '€4,800',  fair: '€5,400',  gap: -1200, reason: 'Timing issues'  },
  { id: '49854674', make: 'VW PASSAT',      owner: 'David',   oBg: '#d97706', exp: '€11,000', trade: '€9,200',  fair: '€10,100', gap: -1800, reason: 'No response'    },
  { id: '49854673', make: 'OPEL ASTRA',     owner: 'Lisa',    oBg: '#dc2626', exp: '€5,500',  trade: '€4,200',  fair: '€4,800',  gap: -1300, reason: 'Price too high' },
];

function DealAnalysisPage() {
  return (
    <div className="flex flex-col gap-[24px] px-[32px] py-[24px] pb-[40px]">

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[24px] font-bold text-[#111827]">Deal Analysis</h1>
          <p className="text-[14px] text-[#6b7280] mt-[2px]">Deep insights into deal performance, patterns, and opportunities</p>
        </div>
        <button className="flex items-center gap-[8px] border border-[#e5e7eb] rounded-[8px] px-[14px] h-[36px] text-[13px] font-medium text-[#374151] bg-white hover:bg-[#f9fafb] transition-colors">
          Date range: Last 7 days <IconChevronDown />
        </button>
      </div>

      {/* KPI summary */}
      <div className="flex gap-[12px]">
        <KpiCard label="Overall Win Rate" value="36.4%"    change="+2.1% vs last period" good={true}  />
        <KpiCard label="Avg Time to Win"  value="2.8 days" change="+0.3d vs last period" good={false} />
        <KpiCard label="Avg Deal Value"   value="€8,420"   change="-€240 vs last period" good={false} />
      </div>

      {/* Price gap callout */}
      <div className="bg-[#fff7ed] border border-[#fed7aa] rounded-[8px] px-[20px] py-[14px] flex items-center gap-[12px]">
        <span className="size-[8px] rounded-full shrink-0 bg-[#f97316]" />
        <p className="text-[13px] text-[#92400e]">
          <span className="font-semibold">Price gap is the #1 driver of non-conversion</span>
          {' — '}35% of lost deals cite price as the primary reason, with an average gap of €1,240 between customer expectation and trade price.
        </p>
      </div>

      {/* Win/Loss by Price Band */}
      <div className="bg-white border border-[#e5e7eb] rounded-[8px]">
        <div className="px-[20px] py-[14px]" style={{ borderBottom: '1px solid #f1f5f9' }}>
          <p className="text-[14px] font-semibold text-[#111827]">Win/Loss Analysis by Price Band</p>
        </div>
        <table className="w-full text-[13px]">
          <thead>
            <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
              {['PRICE BAND','TOTAL','WON','LOST','WIN RATE','AVG TIME TO CLOSE'].map((h, i) => (
                <th key={i} className={`px-[20px] py-[10px] text-[11px] font-medium text-[#9ca3af] uppercase tracking-wide ${i === 0 ? 'text-left' : i === 4 ? 'text-left pl-[40px]' : i === 5 ? 'text-right' : 'text-right'}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {WIN_LOSS_BANDS.map((r, i) => (
              <tr key={i} className="hover:bg-[#f9fafb] transition-colors" style={{ borderBottom: i < WIN_LOSS_BANDS.length - 1 ? '1px solid #f9fafb' : 'none' }}>
                <td className="px-[20px] py-[12px] font-semibold text-[#111827]">{r.band}</td>
                <td className="px-[20px] py-[12px] text-right text-[#374151]">{r.total}</td>
                <td className="px-[20px] py-[12px] text-right font-semibold text-[#16a34a]">{r.won}</td>
                <td className="px-[20px] py-[12px] text-right font-semibold text-[#dc2626]">{r.lost}</td>
                <td className="px-[20px] py-[12px] pl-[40px]">
                  <div className="flex items-center gap-[10px]">
                    <div className="flex-1 h-[6px] bg-[#f1f5f9] rounded-full overflow-hidden" style={{ maxWidth: 80 }}>
                      <div className="h-full rounded-full bg-[#16a34a]" style={{ width: `${r.rate}%` }} />
                    </div>
                    <span className="font-semibold text-[#111827] text-[13px] shrink-0">{r.rate}%</span>
                  </div>
                </td>
                <td className="px-[20px] py-[12px] text-right text-[#374151]">{r.avgTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Loss Reasons + Price Gap side by side */}
      <div className="grid grid-cols-2 gap-[16px]">

        {/* Loss Reasons */}
        <div className="bg-white border border-[#e5e7eb] rounded-[8px]">
          <div className="px-[20px] py-[14px]" style={{ borderBottom: '1px solid #f1f5f9' }}>
            <p className="text-[14px] font-semibold text-[#111827]">Loss Reasons</p>
          </div>
          <table className="w-full text-[13px]">
            <thead>
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                {['REASON','COUNT','%','AVG SIZE'].map((h, i) => (
                  <th key={i} className={`px-[20px] py-[10px] text-[11px] font-medium text-[#9ca3af] uppercase tracking-wide ${i === 0 ? 'text-left' : 'text-right'}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {LOSS_REASONS.map((r, i) => (
                <tr key={i} className="hover:bg-[#f9fafb] transition-colors" style={{ borderBottom: i < LOSS_REASONS.length - 1 ? '1px solid #f9fafb' : 'none' }}>
                  <td className="px-[20px] py-[11px] font-semibold text-[#111827]">{r.reason}</td>
                  <td className="px-[20px] py-[11px] text-right text-[#374151]">{r.count}</td>
                  <td className="px-[20px] py-[11px] text-right text-[#374151]">{r.pct}%</td>
                  <td className="px-[20px] py-[11px] text-right text-[#374151]">{r.avgSize}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Price Gap Analysis */}
        <div className="bg-white border border-[#e5e7eb] rounded-[8px]">
          <div className="px-[20px] py-[14px]" style={{ borderBottom: '1px solid #f1f5f9' }}>
            <p className="text-[14px] font-semibold text-[#111827]">Price Gap Analysis</p>
          </div>
          <table className="w-full text-[13px]">
            <thead>
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                {['BAND','OFFERED','EXPECTED','GAP %'].map((h, i) => (
                  <th key={i} className={`px-[20px] py-[10px] text-[11px] font-medium text-[#9ca3af] uppercase tracking-wide ${i === 0 ? 'text-left' : 'text-right'}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PRICE_GAP.map((r, i) => (
                <tr key={i} className="hover:bg-[#f9fafb] transition-colors" style={{ borderBottom: i < PRICE_GAP.length - 1 ? '1px solid #f9fafb' : 'none' }}>
                  <td className="px-[20px] py-[11px] font-semibold text-[#111827]">{r.band}</td>
                  <td className="px-[20px] py-[11px] text-right text-[#374151]">{r.offered}</td>
                  <td className="px-[20px] py-[11px] text-right text-[#374151]">{r.expected}</td>
                  <td className="px-[20px] py-[11px] text-right font-semibold text-[#dc2626]">{r.gap}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Conversion Funnel Analysis */}
      <div className="bg-white border border-[#e5e7eb] rounded-[8px]">
        <div className="px-[20px] py-[14px]" style={{ borderBottom: '1px solid #f1f5f9' }}>
          <p className="text-[14px] font-semibold text-[#111827]">Conversion Funnel Analysis</p>
        </div>
        <table className="w-full text-[13px]">
          <thead>
            <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
              {['STAGE','DEALS','TOTAL VALUE','DROP-OFF','DROP-OFF RATE','AVG TIME','CONVERSION'].map((h, i) => (
                <th key={i} className={`px-[20px] py-[10px] text-[11px] font-medium text-[#9ca3af] uppercase tracking-wide ${i === 0 ? 'text-left' : 'text-right'}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {FUNNEL_STAGES.map((r, i) => (
              <tr key={i} className="hover:bg-[#f9fafb] transition-colors" style={{ borderBottom: i < FUNNEL_STAGES.length - 1 ? '1px solid #f9fafb' : 'none' }}>
                <td className="px-[20px] py-[12px] font-semibold text-[#111827]">{r.stage}</td>
                <td className="px-[20px] py-[12px] text-right text-[#374151]">{r.deals}</td>
                <td className="px-[20px] py-[12px] text-right text-[#374151]">{r.value}</td>
                <td className="px-[20px] py-[12px] text-right font-medium text-[#dc2626]">
                  {r.dropOff ? `↘${r.dropOff}` : '—'}
                </td>
                <td className="px-[20px] py-[12px] text-right text-[#374151]">
                  {r.dropOffRate ? `${r.dropOffRate}%` : '—'}
                </td>
                <td className="px-[20px] py-[12px] text-right text-[#374151]">{r.avgTime}</td>
                <td className="px-[20px] py-[12px] text-right font-semibold text-[#111827]">{r.conv}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Lost Deal Explainer */}
      <div className="bg-white border border-[#e5e7eb] rounded-[8px]">
        <div className="px-[20px] py-[14px]" style={{ borderBottom: '1px solid #f1f5f9' }}>
          <p className="text-[14px] font-semibold text-[#111827]">Lost Deal Explainer</p>
          <p className="text-[12px] text-[#6b7280] mt-[2px]">All non-converting units with price expectation vs. trade price breakdown</p>
        </div>
        <table className="w-full text-[13px]">
          <thead>
            <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
              {['VEHICLE','OWNER','CUSTOMER EXP.','TRADE PRICE','FAIR CONDITION','GAP','LOSS REASON'].map((h, i) => (
                <th key={i} className={`px-[20px] py-[10px] text-[11px] font-medium text-[#9ca3af] uppercase tracking-wide whitespace-nowrap ${i <= 1 ? 'text-left' : 'text-right'} ${i === 0 ? 'pl-[20px]' : ''}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {LOST_DEALS.map((r, i) => (
              <tr key={i} className="hover:bg-[#f9fafb] transition-colors" style={{ borderBottom: i < LOST_DEALS.length - 1 ? '1px solid #f9fafb' : 'none' }}>
                <td className="px-[20px] py-[11px]">
                  <p className="font-semibold text-[#111827]">{r.id}</p>
                  <p className="text-[11px] text-[#9ca3af]">{r.make}</p>
                </td>
                <td className="px-[20px] py-[11px]">
                  <div className="flex items-center gap-[8px]">
                    <div className="size-[26px] rounded-full flex items-center justify-center text-white text-[11px] font-bold shrink-0" style={{ background: r.oBg }}>{r.owner[0]}</div>
                    <p className="text-[#374151]">{r.owner}</p>
                  </div>
                </td>
                <td className="px-[20px] py-[11px] text-right text-[#374151]">{r.exp}</td>
                <td className="px-[20px] py-[11px] text-right font-medium text-[#111827]">{r.trade}</td>
                <td className="px-[20px] py-[11px] text-right text-[#9ca3af]">{r.fair}</td>
                <td className="px-[20px] py-[11px] text-right font-semibold text-[#dc2626]">−€{Math.abs(r.gap).toLocaleString()}</td>
                <td className="px-[20px] py-[11px] text-right">
                  <span className="text-[12px] font-medium px-[8px] py-[2px] rounded-full bg-[#fff1f2] text-[#dc2626]">{r.reason}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

function InsightsPage({ page, setPage }) {
  if (page === 'team') return <TeamPerformancePage />;
  if (page === 'pipeline') return <PipelinePage />;
  if (page === 'deals') return <DealAnalysisPage />;
  return <InsightsOverviewPage setPage={setPage} />;
}

Object.assign(window, { InsightsSidebar, InsightsPage });
