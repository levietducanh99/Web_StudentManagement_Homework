import React, { useState, useEffect } from 'react';
import StudentForm from '../components/StudentForm.jsx';
import StudentTable from '../components/StudentTable.jsx';
import Loading from '../components/Loading.jsx';
import api from '../api/axios.js';

export default function Home() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      setStudents((s) => [normalize(res.data), ...s]);
    } catch (err) {
      console.error('Failed to add student', err);
      setError('Thêm học sinh thất bại');
    }
  };

  const removeStudent = async (id) => {
    setError(null);
    try {
      await api.delete(`/${id}`);
      setStudents((s) => s.filter((st) => st.id !== id));
    } catch (err) {
      console.error('Failed to delete student', err);
      setError('Xóa học sinh thất bại');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Student Manager</h1>
      {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
      <StudentForm onAdd={addStudent} />
      <div className="separator" />
      {loading ? (
        <Loading />
      ) : (
        <StudentTable students={students} onDelete={removeStudent} />
      )}
    </div>
  );
}
