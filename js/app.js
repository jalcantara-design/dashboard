const { useState } = React;
const { IconGrid, IconHelp, IconLogout,
        WorkspaceSidebar, WorkspacePage,
        InsightsSidebar, InsightsPage } = window;

function TopNav({ tab, setTab }) {
  const cls = (t) =>
    `flex items-center gap-[6px] px-[14px] h-[56px] text-[14px] font-medium border-b-2 transition-colors ${
      tab === t
        ? 'text-white border-[#3b82f6]'
        : 'text-[#9ca3af] border-transparent hover:text-white'
    }`;
  return (
    <div className="h-[56px] bg-[#111827] shrink-0 flex items-center px-[24px] gap-[4px]">
      <span className="text-white text-[18px] font-bold tracking-widest mr-[16px]">TRAMOVO</span>
      <button onClick={() => setTab('workspace')} className={cls('workspace')}>
        <IconGrid /> Workspace
      </button>
      <button onClick={() => setTab('insights')} className={cls('insights')}>
        Insights
        <span className="bg-[#16a34a] text-white text-[10px] font-bold px-[6px] py-[1px] rounded-full leading-[14px]">NEW</span>
      </button>
      <div className="flex-1" />
      <button className="text-[#9ca3af] hover:text-white transition-colors p-[8px]"><IconHelp /></button>
      <button className="flex items-center gap-[8px] text-[#9ca3af] hover:text-white text-[14px] font-medium transition-colors ml-[4px]">
        Logout <IconLogout />
      </button>
    </div>
  );
}

function App() {
  const [tab,     setTab]     = useState('workspace');
  const [wsPage,  setWsPage]  = useState('dashboard');
  const [insPage, setInsPage] = useState('overview');

  return (
    <div className="flex flex-col h-screen bg-[#f9fafb]">
      <TopNav tab={tab} setTab={setTab} />
      <div className="flex flex-1 min-h-0">
        {tab === 'workspace'
          ? <WorkspaceSidebar page={wsPage}  setPage={setWsPage}  goInsights={() => setTab('insights')} />
          : <InsightsSidebar  page={insPage} setPage={setInsPage} />
        }
        <main className="flex-1 overflow-y-auto">
          {tab === 'workspace' && <WorkspacePage />}
          {tab === 'insights'  && <InsightsPage page={insPage} />}
        </main>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
