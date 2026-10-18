import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Mail, Check, X, Bell, ArrowRight, Activity, Trash, MapPin } from 'lucide-react';

export default function ComponentsShowcase() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toasts, setToasts] = useState<
    { id: number; message: string; type: 'success' | 'error' | 'info' }[]
  >([]);
  const [activeTab, setActiveTab] = useState('Overview');
  const [toggle, setToggle] = useState(true);

  const tabs = ['Overview', 'Analytics', 'Settings'];

  const addToast = (type: 'success' | 'error' | 'info') => {
    const id = Date.now();
    const messages = {
      success: 'Action completed successfully!',
      error: 'Something went wrong. Please try again.',
      info: 'A new update is available.',
    };
    setToasts((t) => [...t, { id, message: messages[type], type }]);
    setTimeout(() => {
      setToasts((t) => t.filter((toast) => toast.id !== id));
    }, 3000);
  };

  return (
    <div className="max-w-6xl mx-auto p-12 relative z-10">
      <header className="mb-16">
        <h1 className="text-5xl font-extrabold tracking-tight mb-4 text-slate-900">Components</h1>
        <p className="text-xl text-slate-500 max-w-2xl leading-relaxed">
          The interactive building blocks of Loka. Designed with Awwwards-winning micro-interactions
          and absolute structural perfection.
        </p>
      </header>

      {/* BUTTONS */}
      <section className="mb-24">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900">Buttons</h2>
          <p className="text-slate-500 mt-2">
            Highly responsive with spring-based scale interactions.
          </p>
        </div>
        <div className="p-8 bg-white/70 backdrop-blur-md rounded-2xl border border-slate-200 shadow-sm space-y-8">
          <div>
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
              Variants
            </h3>
            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg shadow-sm hover:bg-blue-700 transition-colors"
              >
                Primary
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2.5 bg-white text-slate-700 font-medium rounded-lg border border-slate-200 shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-colors"
              >
                Secondary
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2.5 bg-transparent text-slate-600 font-medium rounded-lg hover:bg-slate-100 transition-colors"
              >
                Ghost
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2.5 bg-red-50 text-red-600 font-medium rounded-lg border border-red-100 hover:bg-red-100 transition-colors"
              >
                Danger
              </motion.button>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
              Sizes & Icons
            </h3>
            <div className="flex flex-wrap items-end gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md shadow-sm"
              >
                Small
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg shadow-sm"
              >
                Medium
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3.5 bg-blue-600 text-white text-lg font-medium rounded-xl shadow-sm"
              >
                Large
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2.5 bg-slate-900 text-white font-medium rounded-lg shadow-md flex items-center gap-2 hover:bg-slate-800 transition-colors"
              >
                <Mail size={18} /> Send Invite
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 flex items-center justify-center bg-white text-slate-700 rounded-lg border border-slate-200 shadow-sm hover:bg-slate-50 transition-colors"
              >
                <Search size={18} />
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* INPUTS & FORM */}
      <section className="mb-24">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900">Inputs & Form Controls</h2>
          <p className="text-slate-500 mt-2">Featuring smooth glowing rings and animated states.</p>
        </div>
        <div className="p-8 bg-white/70 backdrop-blur-md rounded-2xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Standard Input
              </label>
              <input
                type="text"
                placeholder="Enter your name..."
                className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Input with Icon
              </label>
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search events..."
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
                />
              </div>
            </div>
          </div>

          <div className="space-y-8 flex flex-col justify-center">
            <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl bg-white shadow-sm">
              <div>
                <div className="font-medium text-slate-900">Email Notifications</div>
                <div className="text-sm text-slate-500">Receive daily summaries</div>
              </div>
              <button
                onClick={() => setToggle(!toggle)}
                className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ease-in-out ${toggle ? 'bg-blue-500' : 'bg-slate-300'}`}
              >
                <motion.div
                  className="w-4 h-4 bg-white rounded-full shadow-sm"
                  animate={{ x: toggle ? 24 : 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </button>
            </div>

            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center w-5 h-5">
                <input
                  type="checkbox"
                  className="peer appearance-none w-5 h-5 border-2 border-slate-300 rounded focus:outline-none focus:ring-4 focus:ring-blue-500/20 checked:border-blue-500 checked:bg-blue-500 transition-all"
                  defaultChecked
                />
                <Check
                  size={14}
                  strokeWidth={3}
                  className="absolute text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"
                />
              </div>
              <span className="text-slate-700 font-medium group-hover:text-slate-900 transition-colors">
                I agree to the terms and conditions
              </span>
            </label>
          </div>
        </div>
      </section>

      {/* CARDS & BADGES */}
      <section className="mb-24">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900">Cards & Badges</h2>
          <p className="text-slate-500 mt-2">Display containers with subtle elevation shifts.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Base Card */}
          <motion.div
            whileHover={{
              y: -8,
              boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
            }}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm transition-all cursor-pointer group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                <Activity size={24} />
              </div>
              <div className="px-2.5 py-1 bg-emerald-50 text-emerald-600 text-xs font-semibold rounded-full border border-emerald-100">
                Live
              </div>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
              Server Analytics
            </h3>
            <p className="text-slate-500 mb-6 line-clamp-2">
              Monitor real-time traffic and performance metrics for the Venu checkout
              infrastructure.
            </p>
            <div className="flex items-center text-sm font-medium text-blue-600">
              View Report{' '}
              <ArrowRight
                size={16}
                className="ml-1 group-hover:translate-x-1 transition-transform"
              />
            </div>
          </motion.div>

          {/* Badges */}
          <div className="bg-white/70 backdrop-blur-md rounded-2xl border border-slate-200 p-8 shadow-sm flex flex-col justify-center gap-6">
            <div>
              <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Subtle Badges
              </h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-sm font-medium rounded-full border border-emerald-100">
                  Available
                </span>
                <span className="px-3 py-1 bg-amber-50 text-amber-600 text-sm font-medium rounded-full border border-amber-100">
                  Pending
                </span>
                <span className="px-3 py-1 bg-red-50 text-red-600 text-sm font-medium rounded-full border border-red-100">
                  Sold Out
                </span>
                <span className="px-3 py-1 bg-blue-50 text-blue-600 text-sm font-medium rounded-full border border-blue-100">
                  VIP Ticket
                </span>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Solid Badges
              </h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-emerald-500 text-white text-sm font-medium rounded-full shadow-sm">
                  Available
                </span>
                <span className="px-3 py-1 bg-amber-500 text-white text-sm font-medium rounded-full shadow-sm">
                  Pending
                </span>
                <span className="px-3 py-1 bg-slate-900 text-white text-sm font-medium rounded-full shadow-sm">
                  Draft
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Media Card (Event Representation) */}
        <div className="mb-4 text-sm font-semibold text-slate-400 uppercase tracking-wider">
          Media Cards (For Events)
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <motion.div
              key={item}
              whileHover={{ y: -8 }}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden group cursor-pointer"
            >
              <div className="h-40 bg-slate-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 group-hover:scale-105 transition-transform duration-500"></div>
                <div className="absolute top-3 left-3 px-2 py-1 bg-white/90 backdrop-blur-md rounded-md text-xs font-bold text-slate-900">
                  OCT {15 + item}
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                  Venu Music Festival {item}
                </h3>
                <div className="flex items-center text-slate-500 text-sm mb-4">
                  <MapPin size={14} className="mr-1" /> Grand Stadium
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                  <span className="font-semibold text-slate-900">$120.00</span>
                  <span className="text-blue-600 font-medium text-sm">Get Tickets</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* OVERLAYS (MODAL, TOAST, TABS) */}
      <section className="mb-24">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900">Overlays & Navigation</h2>
          <p className="text-slate-500 mt-2">
            Modals, notifications, and layout animations using Framer Motion.
          </p>
        </div>

        <div className="p-8 bg-white/70 backdrop-blur-md rounded-2xl border border-slate-200 shadow-sm space-y-12">
          {/* Animated Tabs */}
          <div>
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
              Animated Tabs
            </h3>
            <div className="flex space-x-1 p-1 bg-slate-100/80 rounded-xl">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-6 py-2.5 text-sm font-medium transition-colors rounded-lg z-10 ${
                    activeTab === tab ? 'text-blue-700' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {activeTab === tab && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-white rounded-lg shadow-sm"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      style={{ zIndex: -1 }}
                    />
                  )}
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-slate-200">
            {/* Modal Trigger */}
            <div>
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
                Dialog / Modal
              </h3>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-2.5 bg-slate-900 text-white font-medium rounded-lg shadow-md hover:bg-slate-800 transition-colors"
              >
                Open Confirmation Modal
              </button>
            </div>

            {/* Toast Triggers */}
            <div>
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
                Toast Notifications
              </h3>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => addToast('success')}
                  className="px-4 py-2 bg-emerald-50 text-emerald-700 font-medium rounded-lg border border-emerald-200 hover:bg-emerald-100 transition-colors"
                >
                  Success
                </button>
                <button
                  onClick={() => addToast('error')}
                  className="px-4 py-2 bg-red-50 text-red-700 font-medium rounded-lg border border-red-200 hover:bg-red-100 transition-colors"
                >
                  Error
                </button>
                <button
                  onClick={() => addToast('info')}
                  className="px-4 py-2 bg-blue-50 text-blue-700 font-medium rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors"
                >
                  Info
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKELETON */}
      <section className="mb-24">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900">Loading Skeleton</h2>
          <p className="text-slate-500 mt-2">
            Smooth shimmering wave effect for perceived performance.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
            {/* The shimmer animation requires a custom utility in tailwind, but we can fake it with framer motion or a CSS class if configured. 
                 Using framer motion for infinite shimmer here. */}
            <div className="flex gap-4">
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="w-16 h-16 bg-slate-200 rounded-xl"
              />
              <div className="flex-1 space-y-3 py-1">
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.1 }}
                  className="h-4 bg-slate-200 rounded-full w-3/4"
                />
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
                  className="h-4 bg-slate-200 rounded-full w-1/2"
                />
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                  className="h-4 bg-slate-200 rounded-full w-5/6"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PORTALS FOR MODAL AND TOASTS */}

      {/* Modal Overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', bounce: 0.3, duration: 0.5 }}
              className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 border border-slate-200"
            >
              <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-4">
                <Trash size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Delete Event?</h3>
              <p className="text-slate-500 mb-8">
                Are you sure you want to delete this event? This action cannot be undone and all
                tickets will be voided.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors shadow-sm shadow-red-500/20"
                >
                  Delete Event
                </button>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Toast Container */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-3 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 flex items-center gap-3 w-80 pointer-events-auto"
            >
              {toast.type === 'success' && (
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <Check size={16} />
                </div>
              )}
              {toast.type === 'error' && (
                <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                  <X size={16} />
                </div>
              )}
              {toast.type === 'info' && (
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <Bell size={16} />
                </div>
              )}
              <p className="text-sm font-medium text-slate-800">{toast.message}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
