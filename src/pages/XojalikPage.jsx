import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { fmt, money } from '../utils/helpers';

export default function XojalikPage({ onShowToast }) {
  const { t } = useLanguage();

  const initialRecords = [
    { id: 1, type: 'income', name: 'Pomidor hosilini sotish', amount: 18500000, date: '2026-02-12' },
    { id: 2, type: 'expense', name: 'Selitra va fosforli oʻgʻit xaridi', amount: 3200000, date: '2026-02-08' },
    { id: 3, type: 'expense', name: 'Traktor ijarasi va haydovchi haqi', amount: 900000, date: '2026-02-05' },
    { id: 4, type: 'income', name: 'Kuzgi sabzi ulgurji sotuvi', amount: 7200000, date: '2026-01-28' }
  ];

  const [records, setRecords] = useState(() => {
    try {
      const saved = localStorage.getItem('agro_records');
      return saved ? JSON.parse(saved) : initialRecords;
    } catch {
      return initialRecords;
    }
  });

  const [formType, setFormType] = useState('income');
  const [formName, setFormName] = useState('');
  const [formAmount, setFormAmount] = useState('');
  const [formDate, setFormDate] = useState(() => new Date().toISOString().slice(0, 10));

  useEffect(() => {
    try {
      localStorage.setItem('agro_records', JSON.stringify(records));
    } catch {
      // ignore
    }
  }, [records]);

  const totalIncome = records.filter(r => r.type === 'income').reduce((s, r) => s + r.amount, 0);
  const totalExpense = records.filter(r => r.type === 'expense').reduce((s, r) => s + r.amount, 0);
  const netProfit = totalIncome - totalExpense;

  const handleAddRecord = (e) => {
    e.preventDefault();
    const val = parseFloat(formAmount);
    if (!formName.trim() || isNaN(val) || val <= 0) {
      onShowToast("Iltimos, maydonlarni to'g'ri to'ldiring");
      return;
    }

    const newRec = {
      id: Date.now(),
      type: formType,
      name: formName.trim(),
      amount: val,
      date: formDate
    };

    setRecords([newRec, ...records]);
    setFormName('');
    setFormAmount('');
    onShowToast(t('add_record') + " ✓");
  };

  const handleDeleteRecord = (id) => {
    setRecords(records.filter(r => r.id !== id));
    onShowToast(t('toast_deleted'));
  };

  return (
    <main id="top">
      <section id="xojalik" className="section">
        <div className="container">
          <div className="section-head">
            <span className="kicker">{t('farm_kicker')}</span>
            <h2>{t('farm_title')}</h2>
            <p className="lead">{t('farm_lead')}</p>
          </div>

          {/* Totals Cards */}
          <div className="fin-totals" id="finTotals" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
            <div className="ag-card" style={{ padding: '24px', background: 'var(--green-soft)' }}>
              <div className="sub">{t('total_income')}</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary-color)', marginTop: '8px' }}>
                +{money(totalIncome)}
              </div>
            </div>

            <div className="ag-card" style={{ padding: '24px', background: '#fdf2ef' }}>
              <div className="sub">{t('total_expense')}</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#b4452f', marginTop: '8px' }}>
                -{money(totalExpense)}
              </div>
            </div>

            <div className="ag-card" style={{ padding: '24px', background: 'var(--yellow-soft)' }}>
              <div className="sub">{t('net_profit')}</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: netProfit >= 0 ? 'var(--primary-color)' : '#b4452f', marginTop: '8px' }}>
                {netProfit >= 0 ? '+' : ''}{money(netProfit)}
              </div>
            </div>
          </div>

          {/* Layout: Form + Table */}
          <div className="price-layout">
            <div className="chart-box">
              <h3 style={{ fontSize: '1.05rem', marginBottom: '14px' }}>{t('add_record')}</h3>
              <form onSubmit={handleAddRecord}>
                <div className="form-grid">
                  <div className="field">
                    <label htmlFor="finType">Turi / Тип / Type</label>
                    <select 
                      id="finType"
                      value={formType}
                      onChange={(e) => setFormType(e.target.value)}
                    >
                      <option value="income">{t('total_income')}</option>
                      <option value="expense">{t('total_expense')}</option>
                    </select>
                  </div>

                  <div className="field">
                    <label htmlFor="finDate">Sana / Дата / Date</label>
                    <input 
                      type="date" 
                      id="finDate" 
                      value={formDate}
                      onChange={(e) => setFormDate(e.target.value)}
                      required 
                    />
                  </div>
                </div>

                <div className="field" style={{ marginTop: '14px' }}>
                  <label htmlFor="finName">Izoh / Описание / Note</label>
                  <input 
                    type="text" 
                    id="finName" 
                    placeholder="Masalan: Urugʻ xaridi" 
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    required 
                  />
                </div>

                <div className="field" style={{ marginTop: '14px' }}>
                  <label htmlFor="finAmount">Summa ({t('price_unit')})</label>
                  <input 
                    type="number" 
                    id="finAmount" 
                    placeholder="100000" 
                    value={formAmount}
                    onChange={(e) => setFormAmount(e.target.value)}
                    required 
                  />
                </div>

                <button 
                  type="submit" 
                  className="ag-btn ag-btn-yellow" 
                  style={{ marginTop: '18px', width: '100%' }}
                >
                  + {t('add_record')}
                </button>
              </form>
            </div>

            {/* Records List Table */}
            <div className="table-box">
              <h3 style={{ fontSize: '1.05rem', marginBottom: '14px' }}>Yozuvlar roʻyxati</h3>
              <div style={{ overflowX: 'auto' }}>
                <table className="ag-table" id="finTable">
                  <thead>
                    <tr>
                      <th>Sana</th>
                      <th>Izoh</th>
                      <th>Summa</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((r) => (
                      <tr key={r.id}>
                        <td>{r.date}</td>
                        <td>{r.name}</td>
                        <td style={{ fontWeight: 700, color: r.type === 'income' ? 'var(--primary-color)' : '#b4452f' }}>
                          {r.type === 'income' ? '+' : '-'}{fmt(r.amount)} {t('price_unit')}
                        </td>
                        <td>
                          <button 
                            type="button" 
                            className="del" 
                            onClick={() => handleDeleteRecord(r.id)}
                            aria-label="Oʻchirish"
                          >
                            <i className="fa-solid fa-xmark"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
