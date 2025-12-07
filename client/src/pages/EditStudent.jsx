import React, { useState } from 'react';

export default function EditStudent({ student, onCancel, onSave }) {
  const [name, setName] = useState(student.name || '');
  const [age, setAge] = useState(student.age || '');
  const [className, setClassName] = useState(student.className || student.class || '');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const save = async (e) => {
    e.preventDefault();
    setError(null);
    if (!name.trim()) return setError('Vui lòng nhập tên');
    const ageNum = Number(age);
    if (!age || Number.isNaN(ageNum) || ageNum <= 0) return setError('Vui lòng nhập tuổi hợp lệ');
    if (!className.trim()) return setError('Vui lòng nhập lớp');

    try {
      setSubmitting(true);
      await onSave({ ...student, name: name.trim(), age: ageNum, className: className.trim() });
    } catch (err) {
      setError('Lỗi khi cập nhật học sinh');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-panel" style={{ position: 'relative' }}>
        <button className="modal-close" aria-label="Close" onClick={onCancel}>✕</button>
        <h3 style={{ marginTop: 0 }}>Edit student</h3>
        <form onSubmit={save} style={{ display: 'grid', gap: 8 }}>
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <label style={{ display: 'none' }} htmlFor="edit-name">Name</label>
          <input id="edit-name" className="form-field" value={name} onChange={(e) => setName(e.target.value)} />
          <label style={{ display: 'none' }} htmlFor="edit-age">Age</label>
          <input id="edit-age" className="form-field form-input--small" value={age} onChange={(e) => setAge(e.target.value)} />
          <label style={{ display: 'none' }} htmlFor="edit-class">Class</label>
          <input id="edit-class" className="form-field" value={className} onChange={(e) => setClassName(e.target.value)} />
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button type="button" className="action-btn" onClick={onCancel}>Cancel</button>
            <button type="submit" className="form-submit" disabled={submitting}>{submitting ? 'Saving...' : 'Save'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
