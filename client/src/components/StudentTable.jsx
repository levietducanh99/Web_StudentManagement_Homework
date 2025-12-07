import React from 'react';

export default function StudentTable({ students = [], onDelete }) {
  return (
    <table className="table-root" aria-live="polite">
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Class</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.map((s, idx) => (
          <tr key={s.id || idx} className="table-row">
            <td>{s.name}</td>
            <td>{s.age}</td>
            <td>{s.className || s.class}</td>
            <td>
              <button
                onClick={() => onDelete && onDelete(s.id)}
                className="action-btn action-btn--danger"
                aria-label={`Delete ${s.name}`}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
        {students.length === 0 && (
          <tr>
            <td colSpan={4} className="empty-state">No students yet — add one above.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
