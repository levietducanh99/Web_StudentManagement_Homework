import React, { useState, useEffect } from 'react';
import StudentForm from '../components/StudentForm.jsx';
import StudentTable from '../components/StudentTable.jsx';
import Loading from '../components/Loading.jsx';
import Toast from '../components/Toast.jsx';
import EditStudent from './EditStudent.jsx';
import Confirm from '../components/Confirm.jsx';
import api from '../api/axios.js';

export default function Home() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // UI state
  const [query, setQuery] = useState('');
  const [sortAsc, setSortAsc] = useState(true);
  const [editing, setEditing] = useState(null);
  const [toast, setToast] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  const normalize = (s) => ({ ...s, id: s._id || s.id });

  const fetchStudents = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/');
      setStudents(res.data.map(normalize));
    } catch (err) {
      console.error('Failed to fetch students', err);
      setError('Không tải được danh sách học sinh');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const addStudent = async (student) => {
    setError(null);
    try {
      const payload = {
        name: student.name,
        age: student.age,
        class: student.className || student.class || ''
      };
      const res = await api.post('/', payload);
      const newSt = normalize(res.data);
      setStudents((s) => [newSt, ...s]);
      setToast({ message: 'Thêm học sinh thành công', type: 'success' });
      setTimeout(() => setToast(null), 3000);
    } catch (err) {
      console.error('Failed to add student', err);
      setError('Thêm học sinh thất bại');
      setToast({ message: 'Thêm học sinh thất bại', type: 'error' });
      setTimeout(() => setToast(null), 3000);
    }
  };

  // request delete -> open confirm
  const removeStudent = (id) => {
    setToDelete(id);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!toDelete) return;
    setConfirmOpen(false);
    try {
      await api.delete(`/${toDelete}`);
      setStudents((s) => s.filter((st) => st.id !== toDelete));
      setToast({ message: 'Xóa học sinh thành công', type: 'success' });
      setTimeout(() => setToast(null), 3000);
    } catch (err) {
      console.error('Failed to delete student', err);
      setError('Xóa học sinh thất bại');
      setToast({ message: 'Xóa học sinh thất bại', type: 'error' });
      setTimeout(() => setToast(null), 3000);
    } finally {
      setToDelete(null);
    }
  };

  const cancelDelete = () => {
    setConfirmOpen(false);
    setToDelete(null);
  };

  const startEdit = (student) => {
    setEditing(student);
  };

  const cancelEdit = () => setEditing(null);

  const saveEdit = async (updated) => {
    try {
      const payload = { name: updated.name, age: updated.age, class: updated.className || updated.class || '' };
      const res = await api.put(`/${updated.id}`, payload);
      const saved = normalize(res.data);
      setStudents((s) => s.map((st) => (st.id === saved.id ? saved : st)));
      setToast({ message: 'Cập nhật học sinh thành công', type: 'success' });
      setEditing(null);
      setTimeout(() => setToast(null), 3000);
    } catch (err) {
      console.error('Failed to update student', err);
      setToast({ message: 'Cập nhật thất bại', type: 'error' });
      setTimeout(() => setToast(null), 3000);
      throw err;
    }
  };

  // derived: filtered + sorted list
  const processedStudents = students
    .filter((s) => s.name && s.name.toLowerCase().includes(query.trim().toLowerCase()))
    .sort((a, b) => {
      const na = (a.name || '').toLowerCase();
      const nb = (b.name || '').toLowerCase();
      if (na < nb) return sortAsc ? -1 : 1;
      if (na > nb) return sortAsc ? 1 : -1;
      return 0;
    });

  return (
    <div style={{ padding: 20 }}>
      <h1>Student Manager</h1>
      {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}

      <div style={{ display: 'flex', gap: 8, marginBottom: 12, alignItems: 'center' }}>
        <input className="form-field" placeholder="Tìm theo tên..." value={query} onChange={(e) => setQuery(e.target.value)} />
        <button className="action-btn" onClick={() => setSortAsc((s) => !s)}>{sortAsc ? 'A → Z' : 'Z → A'}</button>
      </div>

      <StudentForm onAdd={addStudent} />

      <div className="separator" />

      {loading ? (
        <Loading />
      ) : (
        <StudentTable students={processedStudents} onDelete={removeStudent} onEdit={startEdit} />
      )}

      {editing && (
        <EditStudent student={editing} onCancel={cancelEdit} onSave={saveEdit} />
      )}

      <Confirm open={confirmOpen} title="Xác nhận xóa" description="Bạn có chắc chắn muốn xóa học sinh này không?" onConfirm={confirmDelete} onCancel={cancelDelete} />

      <Toast message={toast?.message} type={toast?.type} onClose={() => setToast(null)} />
    </div>
  );
}
