import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Type, Palette, Move, Layers, Grid, 
  User, Search, Home, Settings, Bell, Mail, Star, Heart, 
  Menu, X, Check, ArrowRight, ChevronRight, Download, Upload, 
  Camera, Calendar, Clock, CreditCard, DollarSign, Filter, 
  Image, MapPin, Phone, Trash, Play, Pause, Power, Send, 
  Share, Sun, Moon, Link, Lock, Eye
} from 'lucide-react';

const ColorScale = ({ name, baseColor, scale }: { name: string, baseColor: string, scale: Record<string, string> }) => (
  <div className="mb-8 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-slate-200 shadow-[var(--shadow-sm)]">
    <div className="flex items-center gap-3 mb-6">
      <div className="w-6 h-6 rounded-md shadow-sm border border-slate-200" style={{ backgroundColor: baseColor }}></div>
      <h3 className="font-semibold text-slate-900 text-lg">{name}</h3>
    </div>
    <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
      {Object.entries(scale).map(([weight, hex]) => (
        <motion.div 
          key={weight}
          whileHover={{ y: -4, scale: 1.05 }}
          className="group relative cursor-pointer"
        >
          <div 
            className="w-full aspect-square rounded-lg shadow-sm border border-black/5 mb-2 transition-shadow group-hover:shadow-md"
            style={{ backgroundColor: hex }}
          ></div>
          <div className="text-center">
            <div className="text-xs font-medium text-slate-700">{weight}</div>
            <div className="text-[10px] text-slate-400 uppercase opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap">{hex}</div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

export default function DesignTokens() {
  const [previewText, setPreviewText] = useState('Sphinx of black quartz, judge my vow');

  const primaryScale = {
    '50': 'var(--color-primary-50)', '100': 'var(--color-primary-100)', '200': 'var(--color-primary-200)',
    '300': 'var(--color-primary-300)', '400': 'var(--color-primary-400)', '500': 'var(--color-primary-500)',
    '600': 'var(--color-primary-600)', '700': 'var(--color-primary-700)', '800': 'var(--color-primary-800)',
    '900': 'var(--color-primary-900)'
  };

  const neutralScale = {
    '50': 'var(--color-neutral-50)', '100': 'var(--color-neutral-100)', '200': 'var(--color-neutral-200)',
    '300': 'var(--color-neutral-300)', '400': 'var(--color-neutral-400)', '500': 'var(--color-neutral-500)',
    '600': 'var(--color-neutral-600)', '700': 'var(--color-neutral-700)', '800': 'var(--color-neutral-800)',
    '900': 'var(--color-neutral-900)'
  };

  return (
    <div className="max-w-6xl mx-auto p-12 relative z-10">
      <header className="mb-16">
        <h1 className="text-5xl font-extrabold tracking-tight mb-4 text-slate-900">Design Tokens</h1>
        <p className="text-xl text-slate-500 max-w-2xl leading-relaxed">
          The foundational visual elements of Loka. These tokens ensure absolute consistency and premium aesthetics across the entire Venu ecosystem.
        </p>
      </header>

      {/* COLORS */}
      <section className="mb-24">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-blue-100 rounded-lg text-blue-600 shadow-sm border border-blue-200"><Palette size={24} /></div>
          <h2 className="text-3xl font-bold text-slate-900">Colors</h2>
        </div>
        
        <ColorScale name="Primary" baseColor="var(--color-primary-500)" scale={primaryScale} />
        <ColorScale name="Neutral" baseColor="var(--color-neutral-500)" scale={neutralScale} />
        <ColorScale name="Success" baseColor="var(--color-success-500)" scale={{
          '50': 'var(--color-success-50)', '100': 'var(--color-success-100)', '200': 'var(--color-success-200)',
          '300': 'var(--color-success-300)', '400': 'var(--color-success-400)', '500': 'var(--color-success-500)',
          '600': 'var(--color-success-600)', '700': 'var(--color-success-700)', '800': 'var(--color-success-800)',
          '900': 'var(--color-success-900)'
        }} />
        <ColorScale name="Warning" baseColor="var(--color-warning-500)" scale={{
          '50': 'var(--color-warning-50)', '100': 'var(--color-warning-100)', '200': 'var(--color-warning-200)',
          '300': 'var(--color-warning-300)', '400': 'var(--color-warning-400)', '500': 'var(--color-warning-500)',
          '600': 'var(--color-warning-600)', '700': 'var(--color-warning-700)', '800': 'var(--color-warning-800)',
          '900': 'var(--color-warning-900)'
        }} />
        <ColorScale name="Danger" baseColor="var(--color-danger-500)" scale={{
          '50': 'var(--color-danger-50)', '100': 'var(--color-danger-100)', '200': 'var(--color-danger-200)',
          '300': 'var(--color-danger-300)', '400': 'var(--color-danger-400)', '500': 'var(--color-danger-500)',
          '600': 'var(--color-danger-600)', '700': 'var(--color-danger-700)', '800': 'var(--color-danger-800)',
          '900': 'var(--color-danger-900)'
        }} />
      </section>

      {/* TYPOGRAPHY */}
      <section className="mb-24">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg text-purple-600 shadow-sm border border-purple-200"><Type size={24} /></div>
            <h2 className="text-3xl font-bold text-slate-900">Typography</h2>
          </div>
          <input 
            type="text" 
            value={previewText}
            onChange={(e) => setPreviewText(e.target.value)}
            placeholder="Type to preview..."
            className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 w-64 shadow-sm transition-all"
          />
        </div>

        <div className="space-y-8 p-8 rounded-2xl border border-slate-200 bg-white/70 backdrop-blur-md shadow-[var(--shadow-glass)]">
          <div className="grid grid-cols-[120px_1fr] items-end gap-6 border-b border-slate-200 pb-6">
            <div className="text-slate-500 text-sm font-medium">H1 / 48px</div>
            <div className="text-5xl font-extrabold tracking-tight leading-none truncate text-slate-900">{previewText}</div>
          </div>
          <div className="grid grid-cols-[120px_1fr] items-end gap-6 border-b border-slate-200 pb-6">
            <div className="text-slate-500 text-sm font-medium">H2 / 36px</div>
            <div className="text-4xl font-bold tracking-tight leading-tight truncate text-slate-900">{previewText}</div>
          </div>
          <div className="grid grid-cols-[120px_1fr] items-end gap-6 border-b border-slate-200 pb-6">
            <div className="text-slate-500 text-sm font-medium">H3 / 24px</div>
            <div className="text-2xl font-semibold leading-snug truncate text-slate-800">{previewText}</div>
          </div>
          <div className="grid grid-cols-[120px_1fr] items-end gap-6 border-b border-slate-200 pb-6">
            <div className="text-slate-500 text-sm font-medium">Body / 16px</div>
            <div className="text-base text-slate-600 leading-relaxed truncate">{previewText}</div>
          </div>
          <div className="grid grid-cols-[120px_1fr] items-end gap-6">
            <div className="text-slate-400 text-sm font-medium">Caption / 12px</div>
            <div className="text-xs text-slate-500 uppercase tracking-wider truncate font-semibold">{previewText}</div>
          </div>
        </div>
      </section>

      {/* ELEVATIONS & Z-INDEX */}
      <section className="mb-24">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600 shadow-sm border border-emerald-200"><Layers size={24} /></div>
          <h2 className="text-3xl font-bold text-slate-900">Elevations & Layering</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Shadows */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-6">Drop Shadows</h3>
            <div className="space-y-6">
              <div className="h-24 rounded-2xl bg-white border border-slate-100 flex items-center justify-between px-8 shadow-[var(--shadow-sm)]">
                <span className="text-sm font-medium text-slate-700">Cards & Buttons</span>
                <code className="text-slate-400 text-xs bg-slate-50 px-2 py-1 rounded border border-slate-100">--shadow-sm</code>
              </div>
              <div className="h-24 rounded-2xl bg-white border border-slate-100 flex items-center justify-between px-8 shadow-[var(--shadow-md)] relative z-10">
                <span className="text-sm font-medium text-slate-700">Dropdowns & Popovers</span>
                <code className="text-slate-400 text-xs bg-slate-50 px-2 py-1 rounded border border-slate-100">--shadow-md</code>
              </div>
              <div className="h-24 rounded-2xl bg-white/90 backdrop-blur-xl border border-slate-100 flex items-center justify-between px-8 shadow-[var(--shadow-lg)] relative z-20">
                <span className="text-sm font-medium text-slate-700">Modals & Dialogs</span>
                <code className="text-slate-400 text-xs bg-slate-50 px-2 py-1 rounded border border-slate-100">--shadow-lg</code>
              </div>
            </div>
          </div>

          {/* Z-Index */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-6">Z-Index</h3>
            <div className="h-full min-h-[300px] bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-center p-12 relative overflow-hidden">
              {/* Perspective container for isometric look */}
              <div className="relative w-64 h-64 rotate-[-15deg] skew-x-[20deg] scale-90 origin-center transition-transform hover:rotate-[-5deg] hover:skew-x-[10deg] duration-500 ease-out">
                {/* Base */}
                <div className="absolute inset-0 bg-slate-200/80 border border-slate-300 rounded-xl shadow-sm flex items-end justify-end p-4 transition-transform duration-500">
                  <code className="text-xs text-slate-500 font-semibold bg-white/50 px-2 py-1 rounded">z-0</code>
                </div>
                {/* Dropdown */}
                <div className="absolute inset-0 bg-blue-100/80 backdrop-blur-md border border-blue-200 rounded-xl shadow-md -translate-y-8 translate-x-8 flex items-end justify-end p-4 transition-transform duration-500 hover:-translate-y-12 hover:translate-x-12">
                  <code className="text-xs text-blue-600 font-semibold bg-white/50 px-2 py-1 rounded">z-10</code>
                </div>
                {/* Modal */}
                <div className="absolute inset-0 bg-purple-100/80 backdrop-blur-md border border-purple-200 rounded-xl shadow-lg -translate-y-16 translate-x-16 flex items-end justify-end p-4 transition-transform duration-500 hover:-translate-y-24 hover:translate-x-24">
                  <code className="text-xs text-purple-600 font-semibold bg-white/50 px-2 py-1 rounded">z-40</code>
                </div>
                {/* Toast */}
                <div className="absolute inset-0 bg-emerald-100/90 backdrop-blur-md border border-emerald-200 rounded-xl shadow-xl -translate-y-24 translate-x-24 flex items-end justify-end p-4 transition-transform duration-500 hover:-translate-y-36 hover:translate-x-36">
                  <code className="text-xs text-emerald-600 font-semibold bg-white/50 px-2 py-1 rounded">z-50</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* SPACING & RADIUS */}
      <section className="mb-24">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600 shadow-sm border border-indigo-200"><Grid size={24} /></div>
          <h2 className="text-3xl font-bold text-slate-900">Spacing & Radius</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 bg-white/70 backdrop-blur-md rounded-2xl border border-slate-200 shadow-[var(--shadow-sm)]">
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-6">Spacing Scale</h3>
            <div className="space-y-4">
              {[4, 8, 16, 24, 32, 48].map(size => (
                <div key={size} className="flex items-center gap-4">
                  <div className="w-12 text-sm font-medium text-slate-500 text-right">{size}px</div>
                  <div className="h-8 bg-blue-100 border border-blue-200 rounded-md transition-all hover:bg-blue-200" style={{ width: size }}></div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-6">Border Radius</h3>
            <div className="flex flex-wrap gap-6 items-end">
              <div className="w-20 h-20 bg-slate-100 border border-slate-300 rounded-sm flex items-center justify-center text-sm font-medium text-slate-600 shadow-sm">sm</div>
              <div className="w-20 h-20 bg-slate-100 border border-slate-300 rounded-md flex items-center justify-center text-sm font-medium text-slate-600 shadow-sm">md</div>
              <div className="w-20 h-20 bg-slate-100 border border-slate-300 rounded-lg flex items-center justify-center text-sm font-medium text-slate-600 shadow-sm">lg</div>
              <div className="w-20 h-20 bg-slate-100 border border-slate-300 rounded-full flex items-center justify-center text-sm font-medium text-slate-600 shadow-sm">full</div>
            </div>
          </div>
        </div>
      </section>

      {/* MOTION */}
      <section className="mb-24">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-orange-100 rounded-lg text-orange-600 shadow-sm border border-orange-200"><Move size={24} /></div>
          <h2 className="text-3xl font-bold text-slate-900">Motion & Easing</h2>
        </div>
        <div className="p-8 rounded-2xl border border-slate-200 bg-white/70 backdrop-blur-md shadow-[var(--shadow-sm)]">
          <p className="text-slate-500 mb-8 font-medium">Hover over the tracks to see the easing tokens in action.</p>
          <div className="space-y-8">
            <div className="group cursor-pointer">
              <div className="flex justify-between text-sm mb-3"><span className="font-bold text-slate-800">Ease Out</span><code className="text-slate-500 bg-slate-100 px-2 py-1 rounded">duration-300 ease-out</code></div>
              <div className="w-full bg-slate-100 h-16 rounded-xl border border-slate-200 relative overflow-hidden shadow-inner">
                <div className="w-12 h-12 bg-blue-500 rounded-lg absolute left-2 top-2 transition-all duration-300 ease-out group-hover:left-[calc(100%-3.5rem)] shadow-md"></div>
              </div>
            </div>
            <div className="group cursor-pointer">
              <div className="flex justify-between text-sm mb-3"><span className="font-bold text-slate-800">Bouncy</span><code className="text-slate-500 bg-slate-100 px-2 py-1 rounded">duration-500 cubic-bezier(0.68, -0.55, 0.265, 1.55)</code></div>
              <div className="w-full bg-slate-100 h-16 rounded-xl border border-slate-200 relative overflow-hidden shadow-inner">
                <div className="w-12 h-12 bg-purple-500 rounded-lg absolute left-2 top-2 transition-all duration-500 group-hover:left-[calc(100%-3.5rem)] shadow-md" style={{ transitionTimingFunction: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ICONS */}
      <section className="mb-24">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-pink-100 rounded-lg text-pink-600 shadow-sm border border-pink-200"><Grid size={24} /></div>
          <h2 className="text-3xl font-bold text-slate-900">Iconography</h2>
        </div>
        <div className="p-8 rounded-2xl border border-slate-200 bg-white/70 backdrop-blur-md shadow-[var(--shadow-sm)]">
          <p className="text-slate-500 mb-8 font-medium">Loka uses <a href="https://lucide.dev" target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">Lucide React</a> for consistent, crisp vector icons.</p>
          <div className="grid grid-cols-6 md:grid-cols-10 lg:grid-cols-12 gap-3">
            {[
              Type, Palette, Move, Layers, Grid, User, Search, Home, Settings, Bell, Mail, Star, Heart,
              Menu, X, Check, ArrowRight, ChevronRight, Download, Upload, Camera, Calendar, Clock, CreditCard,
              DollarSign, Filter, Image, MapPin, Phone, Trash, Play, Pause, Power, Send, Share, Sun, Moon, Link, Lock, Eye
            ].map((Icon, idx) => (
              <div key={idx} className="aspect-square flex flex-col items-center justify-center rounded-xl border border-slate-100 bg-slate-50 text-slate-500 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-200 transition-colors cursor-pointer group">
                <Icon size={20} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
