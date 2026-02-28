import React from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  BarChart3, 
  Globe2, 
  Leaf, 
  Download, 
  Mail, 
  Linkedin, 
  Instagram,
  ArrowRight,
  ChevronUp,
  Newspaper,
  Database,
  Cpu,
  LineChart as LineChartIcon
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  BarChart,
  Bar
} from 'recharts';
import { cn } from './lib/utils';

// --- Mock Data ---

const economicIndicators = [
  { name: 'Dólar Comercial', value: 'R$ 5,24', change: '+0.45%', trend: 'up', sparkline: [5.18, 5.20, 5.22, 5.21, 5.24] },
  { name: 'Euro', value: 'R$ 5,68', change: '-0.12%', trend: 'down', sparkline: [5.72, 5.70, 5.71, 5.69, 5.68] },
  { name: 'Ibovespa', value: '128.450 pts', change: '+1.20%', trend: 'up', sparkline: [126000, 127000, 126500, 127800, 128450] },
  { name: 'Taxa Selic', value: '10.75%', change: '0.00%', trend: 'neutral', sparkline: [10.75, 10.75, 10.75, 10.75, 10.75] },
  { name: 'IPCA (Inflação)', value: '4.52%', change: '+0.05%', trend: 'up', sparkline: [4.40, 4.45, 4.48, 4.50, 4.52] },
  { name: 'PIB Brasil', value: '2.9%', change: '+0.2%', trend: 'up', sparkline: [2.5, 2.6, 2.7, 2.8, 2.9] },
];

const globalGrowthData = [
  { year: '2020', EUA: -3.4, China: 2.2, UE: -6.1, Brasil: -3.9 },
  { year: '2021', EUA: 5.9, China: 8.4, UE: 5.3, Brasil: 4.8 },
  { year: '2022', EUA: 1.9, China: 3.0, UE: 3.4, Brasil: 3.0 },
  { year: '2023', EUA: 2.5, China: 5.2, UE: 0.5, Brasil: 2.9 },
  { year: '2024', EUA: 2.1, China: 4.6, UE: 0.8, Brasil: 2.2 },
];

const newsFeed = [
  {
    title: "O Impacto da IA na Produtividade Global",
    summary: "Novos estudos sugerem que a integração de modelos de linguagem pode elevar o PIB global em até 7% na próxima década.",
    source: "Economic Insight",
    date: "28 Fev, 2026",
    image: "https://picsum.photos/seed/ai-econ/400/250"
  },
  {
    title: "Sustentabilidade: O Novo Pilar do Mercado Financeiro",
    summary: "Investimentos ESG deixam de ser nicho e passam a ditar as regras de alocação de capital em grandes fundos soberanos.",
    source: "Green Finance",
    date: "27 Fev, 2026",
    image: "https://picsum.photos/seed/ecology/400/250"
  },
  {
    title: "Brasil e a Nova Rota das Commodities",
    summary: "A demanda por minerais críticos para a transição energética coloca o Brasil em posição estratégica no cenário internacional.",
    source: "Global Trade",
    date: "26 Fev, 2026",
    image: "https://picsum.photos/seed/trade/400/250"
  }
];

const skills = [
  { name: "Macroeconomia", level: 90 },
  { name: "Análise de Dados (Python/R)", level: 85 },
  { name: "Finanças e Mercados", level: 80 },
  { name: "Estatística Aplicada", level: 88 },
  { name: "Visualização de Dados", level: 92 },
  { name: "Pesquisa Acadêmica", level: 85 },
  { name: "Inglês Fluente", level: 95 },
  { name: "IA Aplicada à Economia", level: 75 },
];

// --- Components ---

const Navbar = () => (
  <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-6 glass border-b border-zinc-100">
    <div className="text-xl italic tracking-tighter">Portfolio.Econ</div>
    <div className="hidden md:flex gap-8 text-xs uppercase tracking-widest font-medium text-zinc-500">
      <a href="#about" className="hover:text-black transition-colors">Sobre</a>
      <a href="#services" className="hover:text-black transition-colors">O que faço</a>
      <a href="#data" className="hover:text-black transition-colors">Dados</a>
      <a href="#news" className="hover:text-black transition-colors">Notícias</a>
      <a href="#contact" className="hover:text-black transition-colors">Contato</a>
    </div>
  </nav>
);

const SectionTitle = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="mb-16">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl mb-4"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-zinc-500 max-w-2xl text-lg font-light leading-relaxed"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

export default function App() {
  return (
    <div className="min-h-screen selection:bg-zinc-900 selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center section-padding pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-zinc-400 mb-6 block">
              Estudante de Economia
            </span>
            <h1 className="text-6xl md:text-8xl leading-[0.9] mb-8 tracking-tighter">
              Lucas <br /> <span className="italic">Menezes</span>
            </h1>
            <p className="text-xl md:text-2xl font-light text-zinc-500 mb-10 max-w-lg leading-relaxed">
              Análise de Dados | Mercados e Inovação. <br />
              <span className="text-base mt-4 block opacity-70">
                "A curiosidade intelectual é o motor que transforma dados brutos em impacto social e inovação financeira."
              </span>
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-zinc-900 text-white rounded-full text-sm font-medium hover:bg-zinc-800 transition-all flex items-center gap-2 group">
                Download CV <Download size={16} className="group-hover:translate-y-0.5 transition-transform" />
              </button>
              <button className="px-8 py-4 border border-zinc-200 rounded-full text-sm font-medium hover:bg-zinc-50 transition-all">
                Entrar em Contato
              </button>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="w-full max-w-md aspect-[3/4] bg-zinc-100 rounded-[2rem] overflow-hidden relative group">
              <img 
                src="https://picsum.photos/seed/economist/800/1200" 
                alt="Lucas Menezes" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            {/* Floating Badge */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 md:left-0 bg-white p-6 rounded-2xl shadow-xl border border-zinc-100 hidden md:block"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600">
                  <TrendingUp size={24} />
                </div>
                <div>
                  <div className="text-xs text-zinc-400 font-medium uppercase tracking-wider">Market Analysis</div>
                  <div className="text-lg font-semibold">+12.5% Growth</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding bg-soft-gray">
        <div className="max-w-6xl mx-auto">
          <SectionTitle 
            title="Sobre Mim" 
            subtitle="Uma trajetória pautada pela análise rigorosa e pela busca incessante por soluções que conectam teoria econômica e realidade prática."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-6 text-lg font-light leading-relaxed text-zinc-600">
              <p>
                Como estudante de Economia, minha paixão reside na intersecção entre a macroeconomia clássica e as novas fronteiras da tecnologia e sustentabilidade. Acredito que o futuro dos mercados financeiros está intrinsecamente ligado à nossa capacidade de interpretar tendências globais e aplicá-las ao contexto brasileiro com precisão estatística.
              </p>
              <p>
                Meu foco acadêmico e profissional concentra-se em análise de dados e economia internacional, buscando compreender como a inovação tecnológica pode servir como catalisador para um desenvolvimento econômico mais equitativo e ecologicamente responsável.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8">
              <div className="p-8 bg-white rounded-3xl border border-zinc-100 shadow-sm">
                <div className="text-4xl mb-2">04+</div>
                <div className="text-xs uppercase tracking-widest text-zinc-400 font-semibold">Anos de Estudo</div>
              </div>
              <div className="p-8 bg-white rounded-3xl border border-zinc-100 shadow-sm">
                <div className="text-4xl mb-2">15+</div>
                <div className="text-xs uppercase tracking-widest text-zinc-400 font-semibold">Projetos de Dados</div>
              </div>
              <div className="p-8 bg-white rounded-3xl border border-zinc-100 shadow-sm">
                <div className="text-4xl mb-2">02</div>
                <div className="text-xs uppercase tracking-widest text-zinc-400 font-semibold">Idiomas Fluentes</div>
              </div>
              <div className="p-8 bg-white rounded-3xl border border-zinc-100 shadow-sm">
                <div className="text-4xl mb-2">A+</div>
                <div className="text-xs uppercase tracking-widest text-zinc-400 font-semibold">Excelência Acadêmica</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section-padding">
        <div className="max-w-6xl mx-auto">
          <SectionTitle 
            title="O Que Faço" 
            subtitle="Especialidades que combinam rigor analítico com visão estratégica de mercado."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <BarChart3 />, title: "Análise Econômica", desc: "Interpretação de cenários macroeconômicos e projeções de indicadores." },
              { icon: <Database />, title: "Data Science", desc: "Visualização e interpretação de grandes volumes de dados estatísticos." },
              { icon: <Globe2 />, title: "Mercados Globais", desc: "Estudos sobre fluxos de capitais e economia internacional." },
              { icon: <Leaf />, title: "Sustentabilidade", desc: "Pesquisa sobre inovação verde e economia circular." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="p-10 bg-white border border-zinc-100 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="w-14 h-14 bg-zinc-50 rounded-2xl flex items-center justify-center mb-8 text-zinc-900">
                  {React.cloneElement(item.icon as React.ReactElement, { size: 28 })}
                </div>
                <h3 className="text-xl font-medium mb-4">{item.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="section-padding bg-zinc-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-zinc-500 mb-6 block">Expertise</span>
              <h2 className="text-4xl md:text-6xl mb-8 leading-tight">Habilidades & <br /> <span className="italic">Competências</span></h2>
              <p className="text-zinc-400 text-lg font-light leading-relaxed mb-12">
                Domínio de ferramentas quantitativas e qualitativas essenciais para o economista moderno, com foco em automação e precisão.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Python", "R", "SQL", "Excel", "Power BI", "Stata", "Tableau"].map((tag) => (
                  <span key={tag} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-zinc-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="space-y-8">
              {skills.map((skill, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-3">
                    <span className="font-medium text-zinc-300">{skill.name}</span>
                    <span className="text-zinc-500">{skill.level}%</span>
                  </div>
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-white"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Economic Data Section */}
      <section id="data" className="section-padding">
        <div className="max-w-6xl mx-auto">
          <SectionTitle 
            title="Dados Econômicos" 
            subtitle="Monitoramento em tempo real dos principais indicadores que movem a economia brasileira e global."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
            {economicIndicators.map((indicator, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 border border-zinc-100 rounded-3xl bg-white hover:border-zinc-300 transition-colors group"
              >
                <div className="flex justify-between items-start mb-6">
                  <span className="text-xs uppercase tracking-widest font-semibold text-zinc-400">{indicator.name}</span>
                  <span className={cn(
                    "text-xs font-bold px-2 py-1 rounded-md",
                    indicator.trend === 'up' ? "text-emerald-600 bg-emerald-50" : 
                    indicator.trend === 'down' ? "text-rose-600 bg-rose-50" : "text-zinc-500 bg-zinc-50"
                  )}>
                    {indicator.change}
                  </span>
                </div>
                <div className="text-3xl mb-6">{indicator.value}</div>
                <div className="h-12 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={indicator.sparkline.map((v, idx) => ({ v, idx }))}>
                      <defs>
                        <linearGradient id={`gradient-${i}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={indicator.trend === 'up' ? "#10b981" : "#f43f5e"} stopOpacity={0.3}/>
                          <stop offset="95%" stopColor={indicator.trend === 'up' ? "#10b981" : "#f43f5e"} stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <Area 
                        type="monotone" 
                        dataKey="v" 
                        stroke={indicator.trend === 'up' ? "#10b981" : indicator.trend === 'down' ? "#f43f5e" : "#71717a"} 
                        fillOpacity={1} 
                        fill={`url(#gradient-${i})`} 
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="p-10 bg-soft-gray rounded-[2.5rem] border border-zinc-100">
              <h3 className="text-2xl mb-8">Crescimento do PIB Global (%)</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={globalGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" />
                    <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#a1a1aa' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#a1a1aa' }} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    />
                    <Line type="monotone" dataKey="EUA" stroke="#18181b" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="China" stroke="#71717a" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="Brasil" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex gap-6 mt-8 justify-center text-xs font-medium uppercase tracking-widest text-zinc-400">
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-zinc-900 rounded-full" /> EUA</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-zinc-400 rounded-full" /> China</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-emerald-500 rounded-full" /> Brasil</div>
              </div>
            </div>

            <div className="p-10 bg-white rounded-[2.5rem] border border-zinc-100 shadow-sm">
              <h3 className="text-2xl mb-8">Tendências de Commodities</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { name: 'Petróleo', val: 82 },
                    { name: 'Ouro', val: 95 },
                    { name: 'Soja', val: 74 },
                    { name: 'Minério', val: 68 },
                    { name: 'Cobre', val: 88 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#a1a1aa' }} />
                    <YAxis hide />
                    <Tooltip cursor={{ fill: '#f9f9f9' }} contentStyle={{ borderRadius: '16px', border: 'none' }} />
                    <Bar dataKey="val" fill="#18181b" radius={[10, 10, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="mt-8 text-sm text-zinc-400 text-center italic">
                * Valores normalizados para visualização de tendência relativa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* News Feed Section */}
      <section id="news" className="section-padding bg-soft-gray">
        <div className="max-w-6xl mx-auto">
          <SectionTitle 
            title="Notícias & Insights" 
            subtitle="Curadoria das manchetes mais relevantes para entender o pulso da economia global."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {newsFeed.map((news, i) => (
              <motion.article 
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white rounded-[2rem] overflow-hidden border border-zinc-100 shadow-sm group"
              >
                <div className="h-56 overflow-hidden relative">
                  <img 
                    src={news.image} 
                    alt={news.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-bold uppercase tracking-widest">
                    {news.source}
                  </div>
                </div>
                <div className="p-8">
                  <div className="text-xs text-zinc-400 mb-4 font-medium">{news.date}</div>
                  <h3 className="text-xl font-medium mb-4 leading-snug group-hover:text-zinc-600 transition-colors">
                    {news.title}
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed mb-6 line-clamp-3">
                    {news.summary}
                  </p>
                  <button className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 group/btn">
                    Ler Mais <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div>
              <SectionTitle 
                title="Vamos Conversar?" 
                subtitle="Estou sempre aberto a novas oportunidades, colaborações em projetos de dados ou apenas uma boa discussão sobre o cenário econômico."
              />
              
              <div className="space-y-8 mt-12">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-zinc-50 rounded-2xl flex items-center justify-center text-zinc-900">
                    <Mail size={24} />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-zinc-400 font-semibold mb-1">E-mail</div>
                    <div className="text-lg font-medium">contato@lucasmenezes.econ</div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <a href="#" className="w-14 h-14 bg-zinc-900 text-white rounded-2xl flex items-center justify-center hover:bg-zinc-800 transition-colors">
                    <Linkedin size={24} />
                  </a>
                  <a href="#" className="w-14 h-14 border border-zinc-200 rounded-2xl flex items-center justify-center hover:bg-zinc-50 transition-colors">
                    <Instagram size={24} />
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-soft-gray p-10 md:p-12 rounded-[3rem] border border-zinc-100">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold text-zinc-400 ml-1">Nome</label>
                    <input 
                      type="text" 
                      placeholder="Seu nome"
                      className="w-full px-6 py-4 bg-white border border-zinc-100 rounded-2xl focus:outline-none focus:border-zinc-400 transition-colors text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold text-zinc-400 ml-1">E-mail</label>
                    <input 
                      type="email" 
                      placeholder="seu@email.com"
                      className="w-full px-6 py-4 bg-white border border-zinc-100 rounded-2xl focus:outline-none focus:border-zinc-400 transition-colors text-sm"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-zinc-400 ml-1">Mensagem</label>
                  <textarea 
                    rows={5}
                    placeholder="Como posso ajudar?"
                    className="w-full px-6 py-4 bg-white border border-zinc-100 rounded-2xl focus:outline-none focus:border-zinc-400 transition-colors text-sm resize-none"
                  />
                </div>
                <button className="w-full py-5 bg-zinc-900 text-white rounded-2xl text-sm font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all shadow-lg shadow-zinc-200">
                  Enviar Mensagem
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-8 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-6 text-zinc-400 text-xs font-medium uppercase tracking-[0.2em]">
        <div>© 2026 Lucas Menezes. Todos os direitos reservados.</div>
        <div className="flex gap-8">
          <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-black transition-colors">Terms of Service</a>
        </div>
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-10 h-10 border border-zinc-100 rounded-full flex items-center justify-center hover:bg-zinc-50 transition-colors"
        >
          <ChevronUp size={16} />
        </button>
      </footer>
    </div>
  );
}
