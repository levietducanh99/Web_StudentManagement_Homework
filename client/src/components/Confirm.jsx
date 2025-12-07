import React from 'react';

export default function Confirm({ open, title = 'Confirm', description, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div className="modal-backdrop" role="alertdialog" aria-modal="true">
      <div className="modal-panel" style={{ position: 'relative' }}>
        <h3 style={{ marginTop: 0 }}>{title}</h3>
        {description && <div style={{ marginTop: 8 }}>{description}</div>}
        <div className="confirm-actions">
          <button className="confirm-cancel" onClick={onCancel}>Cancel</button>
          <button className="confirm-danger" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}

