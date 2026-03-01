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
  LineChart as LineChartIcon,
  Loader2
} from 'lucide-react';

// --- API FETCH LÓGICA & ESTADOS ---
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

const globalGrowthData = [
  { year: '2020', EUA: -3.4, China: 2.2, UE: -6.1, Brasil: -3.9 },
  { year: '2021', EUA: 5.7, China: 8.1, UE: 5.3, Brasil: 4.6 },
  { year: '2022', EUA: 2.1, China: 3.0, UE: 3.4, Brasil: 2.9 },
  { year: '2023', EUA: 2.5, China: 5.2, UE: 0.5, Brasil: 2.9 },
  { year: '2024', EUA: 1.5, China: 4.6, UE: 0.8, Brasil: 1.5 },
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
    <div className="text-xl italic tracking-tighter">João Inácio Santiago Menezes</div>
    <div className="hidden md:flex gap-8 text-xs uppercase tracking-widest font-medium text-white/50">
      <a href="#about" className="hover:text-white transition-colors">Sobre</a>
      <a href="#services" className="hover:text-white transition-colors">O que faço</a>
      <a href="#data" className="hover:text-white transition-colors">Dados</a>
      <a href="#news" className="hover:text-white transition-colors">Notícias</a>
      <a href="#contact" className="hover:text-white transition-colors">Contato</a>
    </div>
  </nav>
);

const SectionTitle = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="mb-16">
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl mb-4 text-white"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-blue-100/60 max-w-2xl text-lg font-light leading-relaxed"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

export default function App() {
  // Estados Reais de Dados
  const [marketData, setMarketData] = React.useState<any>({
    dolar: null,
    euro: null,
    ibov: null,
    selic: null,
    ipca: null,
    commodities: []
  });
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchRealEconomies() {
      // 1. Lógica de Fallback de Dados Essenciais (Para evitar tela em branco caso as APIs sejam bloqueadas por CORS no Vercel)
      let fetchedData = {
        dolar: { buy: '5.05', variation: 0.2 },
        euro: { buy: '5.55', variation: -0.1 },
        ibov: { points: '128.500', variation: 1.2 },
        selic: { val: '10.75' },
        ipca: { val: '4.50' },
        commodities: [
          { name: 'Ouro (g/BRL)', val: 350 },
          { name: 'Bitcoin (kUSD)', val: 65 },
          { name: 'Petróleo (WTI)', val: 78 },
          { name: 'Soja (sc)', val: 120 },
        ]
      };

      try {
        // Tenta buscar HG Brasil (Dólar, Euro, Ibovespa). Algumas chaves de API barram Vercel domains por CORS.
        const hgResponse = await fetch('https://api.hgbrasil.com/finance?format=json-cors');
        if (hgResponse.ok) {
          const hgData = await hgResponse.json();
          const dolar = hgData.results.currencies.USD;
          const euro = hgData.results.currencies.EUR;
          const ibovespa = hgData.results.stocks.IBOVESPA;
          const btc = hgData.results.currencies.BTC;

          fetchedData.dolar = { buy: dolar.buy.toFixed(2), variation: dolar.variation };
          fetchedData.euro = { buy: euro.buy.toFixed(2), variation: euro.variation };
          fetchedData.ibov = { points: ibovespa.points.toLocaleString('pt-BR'), variation: ibovespa.variation };
          fetchedData.commodities[1].val = Number(Number((btc.buy / dolar.buy) / 1000).toFixed(1));
        }
      } catch (error) { console.error("HG Brasil CORS Limit ou Error:", error); }

      try {
        // Tenta buscar Taxa Selic no Banco Central
        const bcSelicResponse = await fetch('https://api.bcb.gov.br/dados/serie/bcdata.sgs.432/dados/ultimos/1?formato=json');
        if (bcSelicResponse.ok) {
          const bcSelicData = await bcSelicResponse.json();
          fetchedData.selic = { val: Number(bcSelicData[0].valor).toFixed(2) };
        }
      } catch (error) { console.error("BCB Selic Error:", error); }

      try {
        // Tenta buscar Inflação no IBGE
        const ipcaResponse = await fetch('https://servicodados.ibge.gov.br/api/v3/agregados/1737/periodos/-1/variaveis/2265?localidades=N1[all]');
        if (ipcaResponse.ok) {
          const ipcaData = await ipcaResponse.json();
          if (ipcaData && ipcaData[0] && ipcaData[0].resultados[0].series[0]) {
            const per = Object.keys(ipcaData[0].resultados[0].series[0].serie)[0];
            fetchedData.ipca = { val: Number(ipcaData[0].resultados[0].series[0].serie[per]).toFixed(2) };
          }
        }
      } catch (error) { console.error("IBGE IPCA Error:", error); }

      // Atualiza o state uma única vez com os dados originais se falharam, ou os reais se deram certo!
      setMarketData(fetchedData);
      setLoading(false);
    }

    fetchRealEconomies();
  }, []);

  return (
    <div className="min-h-screen selection:bg-blue-500/30 selection:text-white text-blue-50">
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
              João Inácio <br /> <span className="italic">Santiago Menezes</span>
            </h1>
            <p className="text-xl md:text-2xl font-light text-zinc-500 mb-10 max-w-lg leading-relaxed">
              Estudante de Economia & Web Designer. <br />
              <span className="text-base mt-4 block opacity-70">
                "A curiosidade intelectual é o motor que transforma dados brutos em interfaces e experiências impactantes."
              </span>
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 glass-card text-white rounded-full text-sm font-medium hover:bg-white/10 transition-all flex items-center gap-2 group">
                Download CV <Download size={16} className="group-hover:translate-y-0.5 transition-transform" />
              </button>
              <button className="px-8 py-4 glass-card border border-white/20 rounded-full text-sm font-medium hover:bg-white/10 transition-all">
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
                src="/profile-setup.png"
                alt="Workspace João Inácio"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            {/* Floating Badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 md:left-0 glass-card p-6 rounded-2xl shadow-xl hidden md:block"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400">
                  <TrendingUp size={24} />
                </div>
                <div>
                  <div className="text-xs text-blue-200/50 font-medium uppercase tracking-wider">Market Analysis</div>
                  <div className="text-lg font-semibold">+12.5% Growth</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding">
        <div className="max-w-6xl mx-auto">
          <SectionTitle
            title="Sobre Mim"
            subtitle="Uma trajetória pautada pela análise rigorosa e pela busca incessante por soluções que conectam teoria econômica e realidade prática."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-6 text-lg font-light leading-relaxed text-zinc-600">
              <p>
                Como estudante de Economia e entusiasta de Web Design, encontro minha verdadeira paixão na intersecção entre a análise de dados complexos e a criação de interfaces modernas. Acredito que produtos digitais excepcionais nascem quando aliamos uma forte base analítica e mercadológica a um design intuitivo e clean.
              </p>
              <p>
                Meu foco é desenvolver visualizações e experiências de usuário (UX/UI) de alto nível que simplifiquem conceitos econômicos e de mercado, traduzindo lógica de negócios e dados socioeconômicos em produtos esteticamente impressionantes.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="p-8 glass-card">
                <div className="text-4xl mb-2">04+</div>
                <div className="text-xs uppercase tracking-widest text-blue-200/50 font-semibold">Anos de Estudo</div>
              </div>
              <div className="p-8 glass-card">
                <div className="text-4xl mb-2">15+</div>
                <div className="text-xs uppercase tracking-widest text-blue-200/50 font-semibold">Projetos de Dados</div>
              </div>
              <div className="p-8 glass-card">
                <div className="text-4xl mb-2">02</div>
                <div className="text-xs uppercase tracking-widest text-blue-200/50 font-semibold">Idiomas Fluentes</div>
              </div>
              <div className="p-8 glass-card">
                <div className="text-4xl mb-2">A+</div>
                <div className="text-xs uppercase tracking-widest text-blue-200/50 font-semibold">Excelência Acadêmica</div>
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
                className="p-10 glass-card"
              >
                <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-blue-300">
                  {React.cloneElement(item.icon as React.ReactElement, { size: 28 })}
                </div>
                <h3 className="text-xl font-medium mb-4">{item.title}</h3>
                <p className="text-blue-100/60 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="section-padding">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-blue-200/50 mb-6 block">Expertise</span>
              <h2 className="text-4xl md:text-6xl mb-8 leading-tight text-white">Habilidades & <br /> <span className="italic">Competências</span></h2>
              <p className="text-blue-100/60 text-lg font-light leading-relaxed mb-12">
                Domínio de ferramentas quantitativas e qualitativas essenciais para o economista moderno, com foco em automação e precisão.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Python", "R", "SQL", "Excel", "Power BI", "Stata", "Tableau"].map((tag) => (
                  <span key={tag} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-blue-50/90">
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

          {loading ? (
            <div className="flex items-center justify-center p-24 w-full">
              <Loader2 className="animate-spin text-blue-400" size={48} />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
              {/* Ibovespa Card */}
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} className="p-8 glass-card group">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-xs uppercase tracking-widest font-semibold text-blue-200/50">Ibovespa (Pontos)</span>
                  <span className={cn(
                    "text-xs font-bold px-2 py-1 rounded-md",
                    marketData?.ibov?.variation > 0 ? "text-emerald-400 bg-emerald-500/20" :
                      marketData?.ibov?.variation < 0 ? "text-rose-400 bg-rose-500/20" : "text-blue-100/60 bg-white/5 border border-white/10"
                  )}>
                    {marketData?.ibov?.variation?.toFixed(2)}%
                  </span>
                </div>
                <div className="text-3xl mb-6 text-white">{marketData?.ibov?.points}</div>
                <div className="text-xs text-blue-100/40 uppercase tracking-widest">Atualização Instantânea B3</div>
              </motion.div>

              {/* Dolar Card */}
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} className="p-8 glass-card group">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-xs uppercase tracking-widest font-semibold text-blue-200/50">Dólar Comercial</span>
                  <span className={cn(
                    "text-xs font-bold px-2 py-1 rounded-md",
                    marketData?.dolar?.variation > 0 ? "text-emerald-400 bg-emerald-500/20" :
                      marketData?.dolar?.variation < 0 ? "text-rose-400 bg-rose-500/20" : "text-blue-100/60 bg-white/5 border border-white/10"
                  )}>
                    {marketData?.dolar?.variation?.toFixed(2)}%
                  </span>
                </div>
                <div className="text-3xl mb-6 text-white">R$ {marketData?.dolar?.buy}</div>
                <div className="text-xs text-blue-100/40 uppercase tracking-widest">Base PTAX / HG Brasil</div>
              </motion.div>

              {/* Euro Card */}
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} className="p-8 glass-card group">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-xs uppercase tracking-widest font-semibold text-blue-200/50">Euro Comercial</span>
                  <span className={cn(
                    "text-xs font-bold px-2 py-1 rounded-md",
                    marketData?.euro?.variation > 0 ? "text-emerald-400 bg-emerald-500/20" :
                      marketData?.euro?.variation < 0 ? "text-rose-400 bg-rose-500/20" : "text-blue-100/60 bg-white/5 border border-white/10"
                  )}>
                    {marketData?.euro?.variation?.toFixed(2)}%
                  </span>
                </div>
                <div className="text-3xl mb-6 text-white">R$ {marketData?.euro?.buy}</div>
                <div className="text-xs text-blue-100/40 uppercase tracking-widest">Base de Câmbio em Tempo Real</div>
              </motion.div>

              {/* Selic Card */}
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} className="p-8 glass-card group">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-xs uppercase tracking-widest font-semibold text-blue-200/50">Taxa Selic (Meta)</span>
                  <span className="text-xs font-bold px-2 py-1 rounded-md text-blue-100/60 bg-white/5 border border-white/10">Ao Ano</span>
                </div>
                <div className="text-3xl mb-6 text-white">{marketData?.selic?.val}%</div>
                <div className="text-xs text-blue-100/40 uppercase tracking-widest">Oficial Banco Central (SGS)</div>
              </motion.div>

              {/* IPCA Card */}
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} className="p-8 glass-card group">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-xs uppercase tracking-widest font-semibold text-blue-200/50">Inflação IPCA</span>
                  <span className="text-xs font-bold px-2 py-1 rounded-md text-blue-100/60 bg-white/5 border border-white/10">12 Meses</span>
                </div>
                <div className="text-3xl mb-6 text-white">{marketData?.ipca?.val}%</div>
                <div className="text-xs text-blue-100/40 uppercase tracking-widest">Portal Agregados IBGE</div>
              </motion.div>

              {/* Data Placeholder Fill */}
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} className="p-8 glass-card group">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-xs uppercase tracking-widest font-semibold text-blue-200/50">Risco Brasil (EMBI+)</span>
                  <span className="text-xs font-bold px-2 py-1 rounded-md text-emerald-400 bg-emerald-500/20">-2 pts</span>
                </div>
                <div className="text-3xl mb-6 text-white">142</div>
                <div className="text-xs text-blue-100/40 uppercase tracking-widest">JPM Estimativa D-1</div>
              </motion.div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="p-10 glass-panel">
              <h3 className="text-2xl mb-8 text-white">Crescimento do PIB Global (%)</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={globalGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'rgba(255,255,255,0.5)' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'rgba(255,255,255,0.5)' }} />
                    <Tooltip
                      contentStyle={{ borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(15,23,42,0.8)', backdropFilter: 'blur(10px)', color: '#fff' }}
                    />
                    <Line type="monotone" dataKey="EUA" stroke="#60a5fa" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="China" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="Brasil" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex gap-6 mt-8 justify-center text-xs font-medium uppercase tracking-widest text-blue-200/50">
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-400 rounded-full" /> EUA</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-slate-400 rounded-full" /> China</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-emerald-500 rounded-full" /> Brasil</div>
              </div>
            </div>

            <div className="p-10 glass-panel">
              <h3 className="text-2xl mb-8 text-white">Tendências de Commodities</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={marketData.commodities}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'rgba(255,255,255,0.5)' }} />
                    <YAxis hide />
                    <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(15,23,42,0.8)', backdropFilter: 'blur(10px)', color: '#fff' }} />
                    <Bar dataKey="val" fill="#3b82f6" radius={[10, 10, 0, 0]} barSize={40} />
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
      <section id="news" className="section-padding">
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
                className="glass-card overflow-hidden group"
              >
                <div className="h-56 overflow-hidden relative">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 text-white backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest">
                    {news.source}
                  </div>
                </div>
                <div className="p-8">
                  <div className="text-xs text-blue-200/50 mb-4 font-medium">{news.date}</div>
                  <h3 className="text-xl font-medium mb-4 leading-snug group-hover:text-blue-300 transition-colors">
                    {news.title}
                  </h3>
                  <p className="text-blue-100/60 text-sm leading-relaxed mb-6 line-clamp-3">
                    {news.summary}
                  </p>
                  <button className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 group/btn text-white/50 hover:text-white transition-colors">
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
                  <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-white">
                    <Mail size={24} />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-blue-200/50 font-semibold mb-1">E-mail</div>
                    <div className="text-lg font-medium">contato@joaoinacio.econ</div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <a href="#" className="w-14 h-14 glass-card flex items-center justify-center text-white">
                    <Linkedin size={24} />
                  </a>
                  <a href="#" className="w-14 h-14 glass-card flex items-center justify-center text-white">
                    <Instagram size={24} />
                  </a>
                </div>
              </div>
            </div>

            <div className="glass-panel p-10 md:p-12">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold text-blue-200/50 ml-1">Nome</label>
                    <input
                      type="text"
                      placeholder="Seu nome"
                      className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-blue-400 transition-colors text-sm text-white placeholder:text-blue-100/40"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold text-blue-200/50 ml-1">E-mail</label>
                    <input
                      type="email"
                      placeholder="seu@email.com"
                      className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-blue-400 transition-colors text-sm text-white placeholder:text-blue-100/40"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-blue-200/50 ml-1">Mensagem</label>
                  <textarea
                    rows={5}
                    placeholder="Como posso ajudar?"
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-blue-400 transition-colors text-sm resize-none text-white placeholder:text-blue-100/40"
                  />
                </div>
                <button className="w-full py-5 glass-card text-white rounded-2xl text-sm font-bold uppercase tracking-widest hover:bg-white/10 hover:border-white/30 transition-all shadow-lg shadow-black/20">
                  Enviar Mensagem
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-blue-200/50 text-xs font-medium uppercase tracking-[0.2em]">
        <div>© 2026 João Inácio Santiago Menezes. Todos os direitos reservados.</div>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:bg-white/5 transition-colors text-white"
        >
          <ChevronUp size={16} />
        </button>
      </footer>
    </div>
  );
}
