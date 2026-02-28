const fs = require('fs');

let content = fs.readFileSync('c:/Users/joaoi/OneDrive/Imagens/Documentos/joao-inacio/src/App.tsx', 'utf-8');

// Global backgrounds - Remove hard colors, rely on gradient
content = content.replace(/\bbg-soft-gray\b/g, '');
content = content.replace(/\bbg-zinc-900\b/g, '');
content = content.replace(/\bbg-zinc-800\b/g, 'bg-white/10');

// Containers to Glass Panels
content = content.replace(/\bp-10 (\w+)? border border-zinc-100 rounded-\[2.5rem\] shadow-sm\b/g, 'glass-panel p-10');
content = content.replace(/\bp-10 (\w+)? border border-zinc-100 rounded-\[2.5rem\]\b/g, 'glass-panel p-10');
content = content.replace(/\bg-soft-gray p-10 md:p-12 rounded-\[3rem\] border border-zinc-100\b/g, 'glass-panel p-10 md:p-12'); // target contact form
content = content.replace(/\bglass border-b border-zinc-100\b/g, 'glass border-b border-white/10');
content = content.replace(/\bborder-zinc-100\b/g, 'border-white/10');
content = content.replace(/\bborder-zinc-200\b/g, 'border-white/20');
content = content.replace(/\bborder-zinc-300\b/g, 'border-white/30');

// Cards
content = content.replace(/\bp-8 (\w+)? rounded-3xl border border-zinc-100 shadow-sm\b/g, 'glass-card p-8');
content = content.replace(/\bp-10 (\w+)? border border-zinc-100 rounded-\[2rem\] shadow-sm\b/g, 'glass-card p-10');
content = content.replace(/\b (\w+)? hover:border-zinc-300\b/g, ' glass-card hover:border-white/30'); // data cards
content = content.replace(/\bg-white rounded-\[2rem\]\b/g, 'glass-card rounded-[2rem]'); // news cards

// Convert all plain text references
content = content.replace(/\btext-zinc-900\b/g, 'text-white');
content = content.replace(/\btext-black\b/g, 'text-white');
content = content.replace(/\btext-zinc-600\b/g, 'text-blue-50/70');
content = content.replace(/\btext-zinc-500\b/g, 'text-blue-100/60');
content = content.replace(/\btext-zinc-400\b/g, 'text-blue-200/50');
content = content.replace(/\btext-zinc-300\b/g, 'text-white/80');

// Status and accents
content = content.replace(/\bbg-emerald-50\b/g, 'bg-emerald-500/20');
content = content.replace(/\btext-emerald-600\b/g, 'text-emerald-400');
content = content.replace(/\bbg-rose-50\b/g, 'bg-rose-500/20');
content = content.replace(/\btext-rose-600\b/g, 'text-rose-400');
content = content.replace(/\bbg-zinc-50\b/g, 'bg-white/5');
content = content.replace(/\bhover:bg-zinc-50\b/g, 'hover:bg-white/10');

// Specifics
content = content.replace(/\bselection:bg-zinc-900\b/g, 'selection:bg-blue-500/30');
content = content.replace(/\bbg-white\/90\b/g, 'bg-black/50 text-white backdrop-blur-md'); // news tags

// Remaining white bg inputs/buttons
content = content.replace(/\bbg-white\b(?!(\/|\w))/g, 'bg-white/5 border border-white/10');

// Recharts colors
content = content.replace(/stroke="#e4e4e7"/g, 'stroke="rgba(255,255,255,0.1)"');
content = content.replace(/stroke="#f4f4f5"/g, 'stroke="rgba(255,255,255,0.1)"');
content = content.replace(/stroke="#18181b"/g, 'stroke="#60a5fa"');
content = content.replace(/fill="#18181b"/g, 'fill="#3b82f6"');
content = content.replace(/stroke="#71717a"/g, 'stroke="#94a3b8"');
content = content.replace(/fill: '#a1a1aa'/g, "fill: 'rgba(255,255,255,0.5)'");
content = content.replace(/cursor=\{\{ fill: '#f9f9f9' \}\}/g, "cursor={{ fill: 'rgba(255,255,255,0.05)' }}");
content = content.replace(/contentStyle=\{\{ borderRadius: '16px', border: 'none'([^\}]*)\}\}/g, "contentStyle={{ borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(15,23,42,0.8)', backdropFilter: 'blur(10px)', color: '#fff' }}");

fs.writeFileSync('c:/Users/joaoi/OneDrive/Imagens/Documentos/joao-inacio/src/App.tsx', content);
console.log('App.tsx transformado via JS!');
