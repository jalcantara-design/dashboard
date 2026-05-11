const { useState } = React;
const {
  IconChevronRight, IconChevronDown, IconSearch, IconPlus,
  IcoCreateVal, IcoDashboard, IcoMgmt, IcoCar, IcoPricing, IcoCustomer, IcoAdmin,
} = window;

const WS_NAV = [
  { key: 'create',    label: 'Create Valuation', Icon: IcoCreateVal },
  { key: 'dashboard', label: 'My Dashboard',     Icon: IcoDashboard },
  { key: 'mgmt',      label: 'Management View',  Icon: IcoMgmt      },
  { key: 'vehicles',  label: 'All Vehicles',     Icon: IcoCar       },
  { key: 'pricing',   label: 'Estimate Pricing', Icon: IcoPricing   },
  { key: 'customers', label: 'Customer Status',  Icon: IcoCustomer  },
  { key: 'admin',     label: 'Valuation Admin',  Icon: IcoAdmin     },
];

function WorkspaceSidebar({ page, setPage, goInsights }) {
  return (
    <div className="w-[210px] shrink-0 bg-white flex flex-col h-full" style={{ borderRight: '1px solid #e5e7eb' }}>
      <div className="px-[14px] py-[10px] shrink-0" style={{ borderBottom: '1px solid #e5e7eb' }}>
        <p className="text-[11px] text-[#9ca3af] font-medium uppercase tracking-wide mb-[6px]">Markets</p>
        <button className="w-full flex items-center justify-between border border-[#e5e7eb] rounded-[6px] px-[10px] h-[34px] bg-white hover:bg-[#f9fafb] transition-colors">
          <span className="text-[13px] font-medium text-[#111827] truncate">TradeBid TradeDesk,...</span>
          <span className="text-[#9ca3af] shrink-0 ml-[4px]"><IconChevronDown /></span>
        </button>
      </div>
      <nav className="flex flex-col flex-1 py-[6px] overflow-y-auto">
        {WS_NAV.map(({ key, label, Icon }) => {
          const active = page === key;
          return (
            <button key={key} onClick={() => setPage(key)}
              className={`flex items-center gap-[12px] w-full px-[14px] py-[9px] text-left transition-colors ${active ? 'bg-[#f3f4f6]' : 'hover:bg-[#f9fafb]'}`}>
              <span className={`shrink-0 ${active ? 'text-[#111827]' : 'text-[#6b7280]'}`}><Icon /></span>
              <span className={`text-[14px] ${active ? 'font-semibold text-[#111827]' : 'font-medium text-[#4b5563]'}`}>{label}</span>
            </button>
          );
        })}
      </nav>
      <div className="m-[12px] border border-[#e5e7eb] rounded-[8px] p-[14px] shrink-0">
        <p className="text-[13px] font-semibold text-[#111827] mb-[4px]">New: Insights &amp; Performance</p>
        <p className="text-[12px] text-[#6b7280] leading-[16px] mb-[10px]">Track team performance, conversion, price bands and more.</p>
        <button onClick={goInsights} className="flex items-center justify-between w-full text-[13px] font-medium text-[#111827] hover:text-[#4b5563] transition-colors">
          Go to Insights <IconChevronRight />
        </button>
      </div>
    </div>
  );
}

function StatCard({ count, label, actions }) {
  return (
    <div className="flex-1 bg-white border border-[#e5e7eb] rounded-[8px] p-[20px] flex flex-col items-center gap-[10px]">
      <p className="text-[28px] font-bold text-black">{count}</p>
      <p className="text-[14px] font-medium text-[#6b7280]">{label}</p>
      <div className="bg-[#fef2f2] border border-[#b91c1c] rounded-full px-[10px] py-[2px]">
        <p className="text-[12px] font-semibold text-[#b91c1c]">{actions} Action{actions !== 1 ? 's' : ''}</p>
      </div>
    </div>
  );
}

function LiveCard({ name, plate, make, price, time }) {
  return (
    <div className="flex-1 bg-white border border-[#e5e7eb] rounded-[8px] px-[16px] py-[14px] flex flex-col gap-[6px] cursor-pointer hover:border-[#9ca3af] transition-colors">
      <div className="flex items-center justify-between">
        <p className="text-[15px] font-bold text-[#111827]">{name}</p>
        <span className="text-[#6b7280]"><IconChevronRight size={18} /></span>
      </div>
      <p className="text-[13px] text-[#374151] truncate">{plate} • {make}</p>
      <div className="flex justify-between mt-[4px]">
        <p className="text-[13px] text-[#6b7280]">Current price</p>
        <p className="text-[13px] font-medium text-[#111827]">{price}</p>
      </div>
      <div className="flex justify-between">
        <p className="text-[13px] text-[#6b7280]">Time remaining</p>
        <p className="text-[13px] font-medium text-[#b91c1c]">{time}</p>
      </div>
    </div>
  );
}

function RecentRow({ name, plate, make, amount, ago }) {
  return (
    <div className="bg-white border border-[#e5e7eb] rounded-[8px] px-[20px] py-[14px]">
      <div className="flex items-center gap-[20px]">
        <div className="shrink-0" style={{ width: 200 }}>
          <p className="text-[14px] font-bold text-[#111827]">{name}</p>
          <p className="text-[13px] text-[#6b7280]">{plate} • {make}</p>
        </div>
        <div className="shrink-0" style={{ width: 150 }}>
          <p className="text-[11px] text-[#9ca3af] mb-[2px]">Valuation amount</p>
          <p className="text-[14px] text-[#111827]">{amount}</p>
        </div>
        <div className="shrink-0" style={{ width: 150 }}>
          <p className="text-[11px] text-[#9ca3af] mb-[2px]">Valuation received</p>
          <p className="text-[14px] text-[#111827]">{ago}</p>
        </div>
        <div className="flex gap-[10px] flex-1 justify-end">
          <button className="h-[38px] px-[20px] border border-[#e5e7eb] rounded-[8px] text-[13px] font-medium text-[#111827] bg-white hover:bg-[#f9fafb] transition-colors">Cancel</button>
          <button className="h-[38px] px-[20px] bg-[#111827] rounded-[8px] text-[13px] font-medium text-white hover:bg-[#1f2937] transition-colors">Accept</button>
        </div>
      </div>
    </div>
  );
}

function WorkspacePage() {
  const [q, setQ] = useState('');
  const liveVals = [
    { name: '10D18365-Chris', plate: '10D18365', make: 'NISSAN QASHQAI', price: '€7,500',  time: '32m 15s' },
    { name: '11C29472-Sarah', plate: '11C29472', make: 'TOYOTA COROLLA',  price: '€12,200', time: '32m 15s' },
    { name: '09D55821-Mark',  plate: '09D55821', make: 'VW GOLF',         price: '€9,850',  time: '32m 15s' },
  ];
  return (
    <div className="flex flex-col gap-[28px] px-[32px] py-[24px] pb-[40px]">
      <div className="flex items-center justify-between">
        <h1 className="text-[20px] font-bold text-[#111827]">My dashboard</h1>
        <button className="bg-[#111827] text-white h-[44px] px-[20px] rounded-[8px] flex items-center gap-[8px] text-[14px] font-medium hover:bg-[#1f2937] transition-colors">
          Create <IconPlus />
        </button>
      </div>
      <div className="flex flex-col gap-[14px]">
        <div className="flex items-center justify-between">
          <p className="text-[16px] font-bold text-[#111827]">My overview</p>
          <div className="relative" style={{ width: 360, height: 34 }}>
            <span className="absolute left-[10px] top-1/2 -translate-y-1/2 text-[#9ca3af] pointer-events-none"><IconSearch /></span>
            <input value={q} onChange={e => setQ(e.target.value)}
              placeholder="Search by registration, reference, created by"
              className="w-full h-full bg-white border border-[#e5e7eb] rounded-[8px] pl-[32px] pr-[10px] text-[13px] text-[#111827] placeholder-[#9ca3af] focus:outline-none focus:border-[#6b7280] transition-colors" />
          </div>
        </div>
        <div className="flex gap-[16px]">
          <StatCard count={32} label="Sale agreed"  actions={3} />
          <StatCard count={16} label="Valuations"   actions={1} />
          <StatCard count={65} label="Inspections"  actions={2} />
        </div>
      </div>
      <div className="flex flex-col gap-[12px]">
        <div className="flex items-center justify-between">
          <p className="text-[16px] font-bold text-[#111827]">Live valuations</p>
          <button className="flex items-center gap-[4px] text-[13px] font-medium text-[#374151] hover:text-[#111827] transition-colors">View all <IconChevronRight /></button>
        </div>
        <div className="flex gap-[16px]">
          {liveVals.map((v, i) => <LiveCard key={i} {...v} />)}
        </div>
      </div>
      <div className="flex flex-col gap-[12px]">
        <div className="flex items-center justify-between">
          <p className="text-[16px] font-bold text-[#111827]">Recent valuations</p>
          <button className="flex items-center gap-[4px] text-[13px] font-medium text-[#374151] hover:text-[#111827] transition-colors">View all <IconChevronRight /></button>
        </div>
        <RecentRow name="10D18365-Chris" plate="10D18365" make="NISSAN QASHQAI" amount="€1,720" ago="4 hrs ago" />
      </div>
    </div>
  );
}

Object.assign(window, { WorkspaceSidebar, WorkspacePage });
