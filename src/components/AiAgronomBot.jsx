import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { generateAiAgronomAnswer } from '../utils/aiAgronomEngine';

export default function AiAgronomBot({ onNavigate, onShowToast }) {
  const { t, lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: lang === 'ru' 
        ? "Здравствуйте! Я AI Агроном Agro Tarmoq. Готов помочь с диагностикой болезней растений, расчетом удобрений, уходом за культурами и нормами полива. Задайте любой вопрос или покажите фото листа!"
        : lang === 'en'
        ? "Hello! I am the Agro Tarmoq AI Agronomist. Ready to assist with plant disease diagnosis, fertilizer calculations, crop care, and watering schedules. Ask any question or upload a leaf photo!"
        : "Assalomu alaykum! Men Agro Tarmoq sunʼiy intellekt agronomiman. Ekin kasalliklari, oʻgʻit meʼyori, zararkunandalarga qarshi kurash va parvarish boʻyicha qanday yordam bera olaman? Savolingizni yozing yoki barg rasmini yuboring!",
      time: 'Hozir'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const handleOpenEvent = () => setIsOpen(true);
    window.addEventListener('open-ai-bot', handleOpenEvent);
    return () => window.removeEventListener('open-ai-bot', handleOpenEvent);
  }, []);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  const quickPrompts = [
    {
      label: '🍅 Pomidor fitoftorozi',
      prompt: 'Pomidor bargida qora va qoʻngʻir dogʻlar paydo boʻldi, qanday dori sepish kerak?'
    },
    {
      label: '🌾 Bugʻdoy zang kasalligi',
      prompt: 'Bugʻdoy bargida sariq-zargʻaldoq changsimon dogʻlar bor, nima qilish kerak?'
    },
    {
      label: '💧 Sugʻorish meʼyori',
      prompt: 'Issiqxonada bodring va pomidorni necha kunda bir sugʻorish kerak?'
    },
    {
      label: '📸 Bargni skanerlash',
      action: 'scanner'
    }
  ];

  const handleSend = (textToSend = null) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: text.trim(),
      time: 'Hozir'
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateAiAgronomAnswer(text, lang);
      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        title: response.title,
        text: response.text,
        hasAction: !!response.action,
        actionLabel: response.action?.label,
        actionPage: response.action?.page || 'agronom',
        time: 'Hozir'
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 650);
  };

  const handleQuickClick = (qp) => {
    if (qp.action === 'scanner') {
      setIsOpen(false);
      onNavigate('agronom');
      if (onShowToast) {
        onShowToast("AI Kasallik skaneri ochildi 🌿");
      }
    } else {
      handleSend(qp.prompt);
    }
  };

  const handleActionClick = (page = 'agronom') => {
    setIsOpen(false);
    onNavigate(page);
  };

  return (
    <>
      {/* Floating AI Bot Launch Capsule Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="ai-bot-float-btn"
          style={{
            position: 'fixed',
            bottom: '84px',
            right: '16px',
            zIndex: 85,
            background: 'linear-gradient(135deg, #15803d 0%, #166534 100%)',
            color: '#fff',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '999px',
            padding: '10px 16px',
            boxShadow: '0 8px 24px rgba(21, 128, 61, 0.45)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            transition: 'all 0.25s ease',
            fontFamily: 'inherit'
          }}
          aria-label="AI Agronom Bot"
        >
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '1.3rem' }}>🤖</span>
            <span 
              style={{
                position: 'absolute',
                top: '-2px',
                right: '-2px',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#22c55e',
                boxShadow: '0 0 8px #22c55e'
              }}
            />
          </div>
          <div style={{ textAlign: 'left', lineHeight: 1.15 }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 800 }}>AI Bot</div>
            <div style={{ fontSize: '0.68rem', opacity: 0.85 }}>Online agronom</div>
          </div>
        </button>
      )}

      {/* Interactive AI Bot Chat Modal / Drawer */}
      {isOpen && (
        <div
          className="uzum-modal-backdrop"
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="uzum-modal"
            style={{
              maxWidth: '440px',
              width: '95%',
              height: '82vh',
              maxHeight: '680px',
              borderRadius: '24px',
              padding: '0',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
              margin: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              style={{
                padding: '16px 20px',
                background: 'linear-gradient(135deg, #15803d 0%, #14532d 100%)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.18)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.4rem',
                    border: '1.5px solid rgba(255,255,255,0.4)'
                  }}
                >
                  🤖
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0, color: '#fff' }}>
                      AI Agronom Bot
                    </h3>
                    <span style={{ background: '#22c55e', color: '#fff', fontSize: '9px', fontWeight: 900, padding: '1px 5px', borderRadius: '4px' }}>
                      PRO
                    </span>
                  </div>
                  <div style={{ fontSize: '0.74rem', opacity: 0.9, display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', display: 'inline-block' }}></span>
                    Sunʼiy intellekt · 24/7 Maslahat
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    onNavigate('agronom');
                  }}
                  title="Toʻliq skanerga oʻtish"
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    border: 'none',
                    color: '#fff',
                    borderRadius: '8px',
                    padding: '6px 10px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  📸 Skaner
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    border: 'none',
                    color: '#fff',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    fontSize: '14px',
                    display: 'grid',
                    placeItems: 'center',
                    cursor: 'pointer'
                  }}
                  aria-label="Yopish"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Quick action buttons row */}
            <div
              style={{
                display: 'flex',
                gap: '6px',
                padding: '10px 14px',
                background: 'var(--surface-color, #f8fafc)',
                borderBottom: '1px solid var(--border-color, #e2e8f0)',
                overflowX: 'auto',
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'none'
              }}
            >
              {quickPrompts.map((qp, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleQuickClick(qp)}
                  style={{
                    padding: '5px 10px',
                    borderRadius: '999px',
                    background: '#fff',
                    border: '1px solid var(--border-color, #e2e8f0)',
                    fontSize: '0.74rem',
                    fontWeight: 600,
                    color: 'var(--text-color, #0f172a)',
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                    flexShrink: 0
                  }}
                >
                  {qp.label}
                </button>
              ))}
            </div>

            {/* Messages Body */}
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                background: '#fafbfc'
              }}
            >
              {messages.map((m) => {
                const isBot = m.sender === 'bot';
                return (
                  <div
                    key={m.id}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: isBot ? 'flex-start' : 'flex-end',
                      maxWidth: '88%',
                      alignSelf: isBot ? 'flex-start' : 'flex-end'
                    }}
                  >
                    <div
                      style={{
                        padding: '12px 14px',
                        borderRadius: isBot ? '16px 16px 16px 4px' : '16px 16px 4px 16px',
                        background: isBot ? '#ffffff' : 'var(--primary-color, #166534)',
                        color: isBot ? 'var(--text-color, #0f172a)' : '#ffffff',
                        border: isBot ? '1px solid var(--border-color, #e2e8f0)' : 'none',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                        fontSize: '0.86rem',
                        lineHeight: 1.55,
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word'
                      }}
                    >
                      {m.text}
                      {m.hasAction && (
                        <div style={{ marginTop: '10px' }}>
                          <button
                            type="button"
                            onClick={handleActionClick}
                            style={{
                              background: 'var(--green-soft, #dcfce7)',
                              color: 'var(--primary-dark, #14532d)',
                              border: '1px solid #86efac',
                              padding: '6px 12px',
                              borderRadius: '8px',
                              fontSize: '0.78rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px'
                            }}
                          >
                            {m.actionLabel || '📸 Ekin bargini skanerlash'}
                          </button>
                        </div>
                      )}
                    </div>
                    <span style={{ fontSize: '0.65rem', color: '#94a3b8', marginTop: '3px', padding: '0 4px' }}>
                      {m.time}
                    </span>
                  </div>
                );
              })}

              {isTyping && (
                <div style={{ alignSelf: 'flex-start', background: '#fff', border: '1px solid #e2e8f0', padding: '8px 14px', borderRadius: '16px 16px 16px 4px', fontSize: '0.8rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>🤖 AI Agronom tahlil qilmoqda...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Footer Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              style={{
                padding: '12px 14px',
                background: '#fff',
                borderTop: '1px solid var(--border-color, #e2e8f0)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  onNavigate('agronom');
                }}
                title="Barg fotosuratini skanerlash"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'var(--green-soft, #dcfce7)',
                  border: '1px solid #86efac',
                  color: 'var(--primary-dark, #14532d)',
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  flexShrink: 0
                }}
              >
                📸
              </button>

              <input
                type="text"
                placeholder="Kasallik yoki ekin haqida soʻrang..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  borderRadius: '999px',
                  border: '1px solid var(--border-color, #cbd5e1)',
                  fontSize: '0.88rem',
                  outline: 'none',
                  background: 'var(--background-color, #f8fafc)'
                }}
              />

              <button
                type="submit"
                disabled={!inputText.trim()}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: inputText.trim() ? 'var(--primary-color, #166534)' : '#cbd5e1',
                  border: 'none',
                  color: '#fff',
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: '0.95rem',
                  cursor: inputText.trim() ? 'pointer' : 'default',
                  flexShrink: 0,
                  transition: '0.2s'
                }}
                aria-label="Yuborish"
              >
                ➤
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
