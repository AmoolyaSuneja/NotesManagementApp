import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NoteCard from './notes/NoteCard';
import NoteForm from './notes/NoteForm';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const { user } = useAuth();

  // Fetch notes on component mount
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/notes');
      setNotes(response.data.notes);
      setError('');
    } catch (error) {
      console.error('Error fetching notes:', error);
      setError('Failed to fetch notes');
    } finally {
      setLoading(false);
    }
  };

  const handleAddNote = async (noteData) => {
    try {
      const response = await axios.post('/api/notes', noteData);
      setNotes([response.data.note, ...notes]);
      setShowForm(false);
      setError('');
    } catch (error) {
      console.error('Error creating note:', error);
      setError('Failed to create note');
    }
  };

  const handleUpdateNote = async (noteId, noteData) => {
    try {
      const response = await axios.put(`/api/notes/${noteId}`, noteData);
      setNotes(notes.map(note => 
        note._id === noteId ? response.data.note : note
      ));
      setEditingNote(null);
      setError('');
    } catch (error) {
      console.error('Error updating note:', error);
      setError('Failed to update note');
    }
  };

  const handleDeleteNote = async (noteId) => {
    if (!window.confirm('Are you sure you want to delete this note?')) {
      return;
    }

    try {
      await axios.delete(`/api/notes/${noteId}`);
      setNotes(notes.filter(note => note._id !== noteId));
      setError('');
    } catch (error) {
      console.error('Error deleting note:', error);
      setError('Failed to delete note');
    }
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingNote(null);
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px 0' }}>
      <div className="container">
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px'
        }}>
          <div>
            <h1 style={{
              fontSize: '32px',
              fontWeight: '700',
              color: '#1e293b',
              marginBottom: '8px'
            }}>
              Your Notes
            </h1>
            <p style={{ color: '#6b7280', fontSize: '16px' }}>
              {notes.length} {notes.length === 1 ? 'note' : 'notes'} saved
            </p>
          </div>
          
          <button
            onClick={() => setShowForm(true)}
            className="btn btn-primary"
            style={{ fontSize: '16px', padding: '12px 24px' }}
          >
            + Add New Note
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        {/* Note Form Modal */}
        {showForm && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}>
            <div style={{
              background: 'white',
              borderRadius: '12px',
              width: '100%',
              maxWidth: '600px',
              maxHeight: '90vh',
              overflow: 'auto'
            }}>
              <NoteForm
                note={editingNote}
                onSubmit={editingNote ? 
                  (data) => handleUpdateNote(editingNote._id, data) : 
                  handleAddNote
                }
                onCancel={handleCancelForm}
              />
            </div>
          </div>
        )}

        {/* Notes Grid */}
        {notes.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: '#6b7280'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>📝</div>
            <h3 style={{ fontSize: '24px', marginBottom: '12px', color: '#374151' }}>
              No notes yet
            </h3>
            <p style={{ marginBottom: '24px' }}>
              Start by creating your first note to get organized!
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="btn btn-primary"
            >
              Create Your First Note
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '24px'
          }}>
            {notes.map(note => (
              <NoteCard
                key={note._id}
                note={note}
                onEdit={handleEditNote}
                onDelete={handleDeleteNote}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
