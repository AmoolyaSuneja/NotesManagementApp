import React from 'react';

const NoteCard = ({ note, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncateText = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="card" style={{
      position: 'relative',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
    }}>
      {/* Note Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '16px'
      }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#1e293b',
          margin: 0,
          lineHeight: '1.4'
        }}>
          {note.title}
        </h3>
        
        <div style={{
          display: 'flex',
          gap: '8px'
        }}>
          <button
            onClick={() => onEdit(note)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              borderRadius: '4px',
              color: '#6b7280',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.color = '#3b82f6'}
            onMouseLeave={(e) => e.target.style.color = '#6b7280'}
            title="Edit note"
          >
            ✏️
          </button>
          <button
            onClick={() => onDelete(note._id)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              borderRadius: '4px',
              color: '#6b7280',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.color = '#ef4444'}
            onMouseLeave={(e) => e.target.style.color = '#6b7280'}
            title="Delete note"
          >
            🗑️
          </button>
        </div>
      </div>

      {/* Note Content */}
      <div style={{
        color: '#4b5563',
        lineHeight: '1.6',
        marginBottom: '16px'
      }}>
        {truncateText(note.description)}
      </div>

      {/* Note Footer */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '12px',
        color: '#9ca3af',
        borderTop: '1px solid #f3f4f6',
        paddingTop: '12px'
      }}>
        <span>Created: {formatDate(note.createdAt)}</span>
        {note.updatedAt !== note.createdAt && (
          <span>Updated: {formatDate(note.updatedAt)}</span>
        )}
      </div>
    </div>
  );
};

export default NoteCard;
