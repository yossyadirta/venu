import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import DesignTokens from './pages/DesignTokens';
import ComponentsShowcase from './pages/ComponentsShowcase';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-[#f8fafc] text-slate-900 font-sans overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 border-r border-slate-200 bg-white/70 backdrop-blur-xl flex flex-col z-20">
          <div className="p-6 border-b border-slate-200/50 flex items-center">
            <h1 className="text-xl font-black uppercase tracking-[0.25em] bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
              LOKA
            </h1>
          </div>
          
          <nav className="flex-1 overflow-y-auto py-4">
            <div className="px-4 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Foundation</div>
            <ul className="space-y-1 mb-6">
              <li>
                <NavLink 
                  to="/tokens" 
                  className={({isActive}) => `block px-4 py-2 mx-2 rounded-md transition-all ${isActive ? 'bg-blue-50 text-blue-600 font-medium' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
                >
                  Design Tokens
                </NavLink>
              </li>
            </ul>

            <div className="px-4 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Components</div>
            <ul className="space-y-1">
              <li>
                <NavLink 
                  to="/components" 
                  className={({isActive}) => `block px-4 py-2 mx-2 rounded-md transition-all ${isActive ? 'bg-blue-50 text-blue-600 font-medium' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
                >
                  Primitives
                </NavLink>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto relative bg-[#f8fafc]">
          {/* Subtle Abstract Background Blob */}
          <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-blue-100/50 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
          
          <Routes>
            <Route path="/" element={<Navigate to="/tokens" replace />} />
            <Route path="/tokens" element={<DesignTokens />} />
            <Route path="/components" element={<ComponentsShowcase />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
