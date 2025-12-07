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
    <form onSubmit={submit} className="student-form" aria-live="polite">
      {error && <div className="form-error" role="alert">{error}</div>}
      <div className="form-row">
        <label style={{display:'none'}} htmlFor="s-name">Name</label>
        <input
          id="s-name"
          className="form-field"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-invalid={!!error && !name}
        />

        <label style={{display:'none'}} htmlFor="s-age">Age</label>
        <input
          id="s-age"
          className="form-field form-input--small"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          aria-invalid={!!error && !age}
        />

        <label style={{display:'none'}} htmlFor="s-class">Class</label>
        <input
          id="s-class"
          className="form-field"
          placeholder="Class"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          aria-invalid={!!error && !className}
        />

        <button type="submit" className="form-submit" disabled={submitting}>{submitting ? 'Adding...' : 'Add'}</button>
      </div>
    </form>
  );
}
