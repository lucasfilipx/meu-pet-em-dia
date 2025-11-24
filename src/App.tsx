import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import './App.css';

// ⚠️ COLE SUAS CHAVES DO SUPABASE AQUI ⚠️
const supabaseUrl = 'https://lkphwwslppkynyebjonl.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxrcGh3d3NscHBreW55ZWJqb25sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5NTE3ODAsImV4cCI6MjA3OTUyNzc4MH0.Icvsobocp6mXg0uU_TfWtG0QLV6Aei4fX72xj7AcK_c';
const supabase = createClient(supabaseUrl, supabaseKey);

// --- UTILITÁRIOS ---
const formatCurrency = (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

// --- COMPONENTES ---

function TelaSaude() {
  const [vacinas, setVacinas] = useState([]);
  const [form, setForm] = useState({ nome_vacina: '', data_prevista: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => { fetchVacinas() }, []);

  async function fetchVacinas() {
    const { data } = await supabase.from('vacinas').select('*').order('data_prevista', { ascending: true });
    if (data) setVacinas(data);
  }

  async function adicionarVacina(e) {
    e.preventDefault();
    if (!form.nome_vacina || !form.data_prevista) return;
    setLoading(true);
    const { error } = await supabase.from('vacinas').insert([{ 
      nome_vacina: form.nome_vacina, 
      data_prevista: form.data_prevista,
      status: 'pendente',
      nome_pet: 'Rex' 
    }]);
    if (error) { alert("Erro ao salvar. Verifique o RLS."); } 
    else { setForm({ nome_vacina: '', data_prevista: '' }); await fetchVacinas(); }
    setLoading(false);
  }

  async function excluirVacina(id) {
    if(!confirm("Remover este registro?")) return;
    await supabase.from('vacinas').delete().eq('id', id);
    fetchVacinas();
  }

  async function marcarVacina(id, statusAtual) {
    const novoStatus = statusAtual === 'pendente' ? 'realizada' : 'pendente';
    await supabase.from('vacinas').update({ status: novoStatus }).eq('id', id);
    fetchVacinas();
  }

  return (
    <div className="content-wrapper fade-in">
      <header className="section-header">
        <h2>Prontuário Médico</h2>
        <p>Gestão clínica e imunização</p>
      </header>

      <div className="clean-card form-card">
        <h3>Adicionar Registro</h3>
        <form onSubmit={adicionarVacina} className="clean-form">
          <input placeholder="Nome da Vacina ou Exame" value={form.nome_vacina} onChange={e => setForm({...form, nome_vacina: e.target.value})} />
          <input type="date" value={form.data_prevista} onChange={e => setForm({...form, data_prevista: e.target.value})} />
          <button type="submit" disabled={loading}>{loading ? '...' : 'Adicionar'}</button>
        </form>
      </div>

      <div className="list-container">
        {vacinas.map(v => (
          <div key={v.id} className={`list-item ${v.status}`}>
            <div className="item-info">
              <strong>{v.nome_vacina}</strong>
              <span>{new Date(v.data_prevista).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}</span>
            </div>
            <div className="item-actions">
              <span className={`status-pill ${v.status}`}>{v.status}</span>
              <button onClick={() => marcarVacina(v.id, v.status)} className="btn-icon">{v.status === 'pendente' ? '✅' : '↩️'}</button>
              <button onClick={() => excluirVacina(v.id)} className="btn-icon delete">🗑️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TelaRotina() {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => { fetchTarefas() }, []);

  async function fetchTarefas() {
    const { data } = await supabase.from('tarefas').select('*').order('id');
    if (data) setTarefas(data);
  }

  async function adicionarTarefa(e) {
    e.preventDefault();
    if (!novaTarefa) return;
    setLoading(true);
    const { error } = await supabase.from('tarefas').insert([{ nome: novaTarefa, feita: false }]);
    if (error) { alert("Erro ao salvar tarefa."); } 
    else { setNovaTarefa(''); await fetchTarefas(); }
    setLoading(false);
  }

  async function excluirTarefa(id) {
    await supabase.from('tarefas').delete().eq('id', id);
    fetchTarefas();
  }

  async function toggleTarefa(id, statusAtual) {
    await supabase.from('tarefas').update({ feita: !statusAtual }).eq('id', id);
    fetchTarefas();
  }

  return (
    <div className="content-wrapper fade-in">
      <header className="section-header">
        <h2>Rotina Diária</h2>
        <p>Checklist de atividades recorrentes</p>
      </header>

      <div className="clean-card form-card">
        <form onSubmit={adicionarTarefa} className="inline-form">
          <input placeholder="Nova atividade (ex: Passeio Manhã)" value={novaTarefa} onChange={e => setNovaTarefa(e.target.value)} />
          <button type="submit" disabled={loading}>+</button>
        </form>
      </div>

      <div className="task-list">
        {tarefas.map(t => (
          <div key={t.id} className={`task-row ${t.feita ? 'done' : ''}`}>
            <div className="checkbox-area" onClick={() => toggleTarefa(t.id, t.feita)}>
              <div className={`checkbox-custom ${t.feita ? 'checked' : ''}`}></div>
              <span>{t.nome}</span>
            </div>
            <button onClick={() => excluirTarefa(t.id)} className="btn-icon delete">✕</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function TelaAlimentos() {
  const [poteRacao, setPoteRacao] = useState(40);
  const [poteAgua, setPoteAgua] = useState(85);
  const [estoqueKg, setEstoqueKg] = useState(15);
  const consumoDiarioKg = 0.350;
  const diasRestantes = estoqueKg / consumoDiarioKg;
  const semanasRestantes = (diasRestantes / 7).toFixed(1);

  return (
    <div className="content-wrapper fade-in">
      <header className="section-header">
        <h2>Gestão de Nutrição</h2>
        <p>Monitoramento de consumo e estoque</p>
      </header>

      <div className="grid-3-col">
        {/* Pote Ração */}
        <div className="clean-card center-text">
          <div className="icon-header">🥣</div>
          <h3>Pote de Ração</h3>
          <p className="subtext">Disponível agora</p>
          <div className="circle-chart">
            <svg viewBox="0 0 36 36" className="circular-chart orange">
              <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="circle" strokeDasharray={`${poteRacao}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <text x="18" y="20.35" className="percentage">{poteRacao}%</text>
            </svg>
          </div>
          <div className="slider-control"><input type="range" value={poteRacao} onChange={e => setPoteRacao(e.target.value)} /></div>
        </div>

        {/* Pote Água */}
        <div className="clean-card center-text">
          <div className="icon-header">💧</div>
          <h3>Água Fresca</h3>
          <p className="subtext">Hidratação atual</p>
          <div className="circle-chart">
            <svg viewBox="0 0 36 36" className="circular-chart blue">
              <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="circle" strokeDasharray={`${poteAgua}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <text x="18" y="20.35" className="percentage">{poteAgua}%</text>
            </svg>
          </div>
          <div className="slider-control"><input type="range" value={poteAgua} onChange={e => setPoteAgua(e.target.value)} /></div>
        </div>

        {/* Estoque */}
        <div className="clean-card highlight-card">
          <div className="icon-header">📦</div>
          <h3>Estoque</h3>
          <p className="subtext">Previsão de duração</p>
          <div className="stat-big">{semanasRestantes} <span className="unit">semanas</span></div>
          <p className="stat-detail">Resta <strong>{estoqueKg} kg</strong></p>
          <div className="manual-input">
            <div className="input-row">
              <button onClick={() => setEstoqueKg(Math.max(0, estoqueKg - 1))}>-</button>
              <span>{estoqueKg}kg</span>
              <button onClick={() => setEstoqueKg(estoqueKg + 1)}>+</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TelaMarketplace({ adicionarAoCarrinho }) {
  const produtos = [
    { id: 1, nome: 'Ração Royal Canin 15kg', preco: 249.90, img: '🦴' },
    { id: 2, nome: 'Petisco Dental Flex', preco: 29.90, img: '🦷' },
    { id: 3, nome: 'Brinquedo Corda', preco: 45.00, img: '🪢' },
    { id: 4, nome: 'Shampoo Neutro', preco: 38.00, img: '🧼' },
    { id: 5, nome: 'Cama Ortopédica G', preco: 210.00, img: '🛏️' },
    { id: 6, nome: 'Coleira Antipulgas', preco: 89.90, img: '🦠' },
  ];

  return (
    <div className="content-wrapper fade-in">
      <header className="section-header">
        <h2>Loja Oficial</h2>
        <p>Curadoria de produtos premium</p>
      </header>
      <div className="products-grid">
        {produtos.map(p => (
          <div key={p.id} className="clean-card product-item">
            <div className="p-icon">{p.img}</div>
            <h4>{p.nome}</h4>
            <p className="p-price">{formatCurrency(p.preco)}</p>
            <button className="btn-outline" onClick={() => adicionarAoCarrinho(p)}>Adicionar</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function TelaCarrinho({ carrinho, removerDoCarrinho, finalizarCompra }) {
  const total = carrinho.reduce((acc, item) => acc + item.preco, 0);

  return (
    <div className="content-wrapper fade-in">
      <header className="section-header">
        <h2>Meu Carrinho</h2>
        <p>Finalize seu pedido</p>
      </header>

      {carrinho.length === 0 ? (
        <div className="empty-state">
          <p>Seu carrinho está vazio.</p>
          <small>Vá até a loja para adicionar itens.</small>
        </div>
      ) : (
        <div className="clean-card cart-container">
          {carrinho.map((item, index) => (
            <div key={index} className="cart-item-row">
              <div className="cart-info">
                <strong>{item.nome}</strong>
                <span>{formatCurrency(item.preco)}</span>
              </div>
              <button onClick={() => removerDoCarrinho(index)} className="btn-text-delete">Remover</button>
            </div>
          ))}
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total</span>
              <strong>{formatCurrency(total)}</strong>
            </div>
            <button className="btn-primary full" onClick={finalizarCompra}>Finalizar Compra</button>
          </div>
        </div>
      )}
    </div>
  );
}

// --- APP PRINCIPAL ---

export default function App() {
  const [abaAtiva, setAbaAtiva] = useState('saude');
  const [carrinho, setCarrinho] = useState([]);

  // Lógica do Carrinho
  const adicionarAoCarrinho = (produto) => {
    setCarrinho([...carrinho, produto]);
    alert("Item adicionado ao carrinho!");
  };

  const removerDoCarrinho = (index) => {
    const novo = [...carrinho];
    novo.splice(index, 1);
    setCarrinho(novo);
  };

  const finalizarCompra = () => {
    if(carrinho.length === 0) return;
    alert("Compra realizada com sucesso! 🎉");
    setCarrinho([]);
    setAbaAtiva('saude');
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">🐕 <span>Meu Pet em Dia</span></div>
        <nav>
          <button onClick={() => setAbaAtiva('saude')} className={abaAtiva === 'saude' ? 'active' : ''}>Saúde</button>
          <button onClick={() => setAbaAtiva('rotina')} className={abaAtiva === 'rotina' ? 'active' : ''}>Rotina</button>
          <button onClick={() => setAbaAtiva('food')} className={abaAtiva === 'food' ? 'active' : ''}>Nutrição</button>
          <button onClick={() => setAbaAtiva('market')} className={abaAtiva === 'market' ? 'active' : ''}>Loja</button>
          <button onClick={() => setAbaAtiva('carrinho')} className={`cart-btn ${abaAtiva === 'carrinho' ? 'active' : ''}`}>
            Carrinho {carrinho.length > 0 && <span className="badge">{carrinho.length}</span>}
          </button>
        </nav>
      </aside>

      <main className="main-content">
        {abaAtiva === 'saude' && <TelaSaude />}
        {abaAtiva === 'rotina' && <TelaRotina />}
        {abaAtiva === 'food' && <TelaAlimentos />}
        {abaAtiva === 'market' && <TelaMarketplace adicionarAoCarrinho={adicionarAoCarrinho} />}
        {abaAtiva === 'carrinho' && <TelaCarrinho carrinho={carrinho} removerDoCarrinho={removerDoCarrinho} finalizarCompra={finalizarCompra} />}
      </main>

      <nav className="mobile-bar">
        <button onClick={() => setAbaAtiva('saude')} className={abaAtiva === 'saude' ? 'active' : ''}>💉</button>
        <button onClick={() => setAbaAtiva('rotina')} className={abaAtiva === 'rotina' ? 'active' : ''}>📅</button>
        <button onClick={() => setAbaAtiva('food')} className={abaAtiva === 'food' ? 'active' : ''}>🥣</button>
        <button onClick={() => setAbaAtiva('market')} className={abaAtiva === 'market' ? 'active' : ''}>🛍️</button>
        <button onClick={() => setAbaAtiva('carrinho')} className={abaAtiva === 'carrinho' ? 'active' : ''}>
          🛒{carrinho.length > 0 && <span className="dot"></span>}
        </button>
      </nav>
    </div>
  );
}