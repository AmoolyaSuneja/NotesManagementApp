import React, { useState, useEffect } from 'react';

const NoteForm = ({ note, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (note) {
      setFormData({
        title: note.title,
        description: note.description
      });
    }
  }, [note]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }

    if (!formData.description.trim()) {
      setError('Description is required');
      return;
    }

    if (formData.title.length > 100) {
      setError('Title must be less than 100 characters');
      return;
    }

    if (formData.description.length > 1000) {
      setError('Description must be less than 1000 characters');
      return;
    }

    onSubmit(formData);
  };

  return (
    <div style={{ padding: '24px' }}>
      <h2 style={{
        fontSize: '24px',
        fontWeight: '600',
        color: '#1e293b',
        marginBottom: '24px',
        textAlign: 'center'
      }}>
        {note ? 'Edit Note' : 'Create New Note'}
      </h2>

      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="title">
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-input"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter note title"
            maxLength={100}
          />
          <div style={{
            fontSize: '12px',
            color: '#6b7280',
            textAlign: 'right',
            marginTop: '4px'
          }}>
            {formData.title.length}/100 characters
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="description">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            className="form-textarea"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter note description"
            rows={6}
            maxLength={1000}
          />
          <div style={{
            fontSize: '12px',
            color: '#6b7280',
            textAlign: 'right',
            marginTop: '4px'
          }}>
            {formData.description.length}/1000 characters
          </div>
        </div>

        <div style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'flex-end'
        }}>
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
          >
            {note ? 'Update Note' : 'Create Note'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoteForm;
