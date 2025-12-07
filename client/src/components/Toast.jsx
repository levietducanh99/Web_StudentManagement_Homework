import React from 'react';

export default function Toast({ message, type = 'info', onClose }) {
  if (!message) return null;
  const bg = type === 'error' ? '#fee2e2' : type === 'success' ? '#ecfdf5' : '#f1f5f9';
  const color = type === 'error' ? '#b91c1c' : type === 'success' ? '#065f46' : '#0f172a';
  return (
    <div style={{ position: 'fixed', right: 20, top: 20, zIndex: 9999 }}>
      <div style={{ background: bg, color, padding: '10px 14px', borderRadius: 8, boxShadow: '0 6px 18px rgba(15,23,42,0.06)' }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <div>{message}</div>
          <button onClick={onClose} style={{ marginLeft: 8, border: 'none', background: 'transparent', cursor: 'pointer' }}>✕</button>
        </div>
      </div>
    </div>
  );
}

