import React, { useState } from 'react';

export default function StudentForm({ onAdd }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [className, setClassName] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError(null);

    // client-side validation
    if (!name.trim()) return setError('Vui lòng nhập tên');
    const ageNum = Number(age);
    if (!age || Number.isNaN(ageNum) || ageNum <= 0) return setError('Vui lòng nhập tuổi hợp lệ');
    if (!className.trim()) return setError('Vui lòng nhập lớp');

    const payload = { name: name.trim(), age: ageNum, className: className.trim() };

    try {
      setSubmitting(true);
      await onAdd(payload);
      setName('');
      setAge('');
      setClassName('');
    } catch (err) {
      console.error('Error in StudentForm submit', err);
      setError('Lỗi khi thêm học sinh');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={submit} style={{ marginBottom: 12 }}>
      {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: 6 }}
        />
        <input
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          style={{ width: 80, padding: 6 }}
        />
        <input
          placeholder="Class"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          style={{ padding: 6 }}
        />
        <button type="submit" style={{ padding: '6px 12px' }} disabled={submitting}>{submitting ? 'Adding...' : 'Add'}</button>
      </div>
    </form>
  );
}
