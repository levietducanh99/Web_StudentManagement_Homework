import React from 'react';

export default function StudentTable({ students = [], onDelete }) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc', padding: 8 }}>Name</th>
          <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc', padding: 8 }}>Age</th>
          <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc', padding: 8 }}>Class</th>
          <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc', padding: 8 }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.map((s) => (
          <tr key={s.id}>
            <td style={{ padding: 8, borderBottom: '1px solid #eee' }}>{s.name}</td>
            <td style={{ padding: 8, borderBottom: '1px solid #eee' }}>{s.age}</td>
            <td style={{ padding: 8, borderBottom: '1px solid #eee' }}>{s.className || s.class}</td>
            <td style={{ padding: 8, borderBottom: '1px solid #eee' }}>
              <button onClick={() => onDelete && onDelete(s.id)} style={{ padding: '4px 8px' }}>Delete</button>
            </td>
          </tr>
        ))}
        {students.length === 0 && (
          <tr>
            <td colSpan={4} style={{ padding: 8, color: '#666' }}>No students</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
