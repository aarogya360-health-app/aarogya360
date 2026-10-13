import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Plus,
  Search,
  Filter,
  Edit3,
  Trash2,
  Calendar,
  Tag,
  Mic,
  AlertCircle,
  Volume2
} from 'lucide-react';
import { useHealthData } from '@/context/HealthDataContext';
import { HealthNote, HealthNoteCategory } from '@/types/database';
import { Button } from '@/components/common/Button';
import { Modal } from '@/components/common/Modal';
import { SpeechReader } from '@/components/common/SpeechReader';
import { VoiceInputModal } from '@/components/common/VoiceInputModal';
import { healthNoteSchema, HealthNoteFormData } from '@/utils/validation';
import { formatDate, getTodayDateInputString } from '@/utils/date';

export const HealthNotesPage: React.FC = () => {
  const { notes, createNote, updateNote, deleteNote, notesLoading } = useHealthData();

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingNote, setEditingNote] = useState<HealthNote | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [voiceDictationOpen, setVoiceDictationOpen] = useState<boolean>(false);

  // Form fields
  const [formData, setFormData] = useState<HealthNoteFormData>({
    title: '',
    category: 'General',
    note: '',
    note_date: getTodayDateInputString(),
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const categories: (HealthNoteCategory | 'All')[] = [
    'All',
    'General',
    'Consultation',
    'Symptoms',
    'Medication Note',
    'Vitals Note',
    'Lifestyle',
  ];

  // Open modal for new note
  const handleOpenNewNote = () => {
    setEditingNote(null);
    setFormData({
      title: '',
      category: 'General',
      note: '',
      note_date: getTodayDateInputString(),
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  // Open modal for editing
  const handleOpenEditNote = (note: HealthNote) => {
    setEditingNote(note);
    setFormData({
      title: note.title,
      category: note.category,
      note: note.note,
      note_date: note.note_date,
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleVoiceTranscribed = (transcript: string) => {
    setFormData(prev => ({
      ...prev,
      note: prev.note ? `${prev.note} ${transcript}` : transcript,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});

    const result = healthNoteSchema.safeParse(formData);
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.issues.forEach(issue => {
        if (issue.path[0]) {
          errors[issue.path[0].toString()] = issue.message;
        }
      });
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingNote) {
        await updateNote(editingNote.id, formData);
      } else {
        await createNote(formData);
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteConfirmId) return;
    await deleteNote(deleteConfirmId);
    setDeleteConfirmId(null);
  };

  // Filter notes
  const filteredNotes = notes.filter(n => {
    const matchesSearch = n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          n.note.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || n.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/80 backdrop-blur-md p-4 sm:p-6 rounded-3xl border border-teal-800/10 shadow-card">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-navy-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search notes by keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-teal-800/15 bg-canvas focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
          />
        </div>

        {/* Add Note Button */}
        <Button
          variant="primary"
          size="md"
          onClick={handleOpenNewNote}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Add Health Note
        </Button>
      </div>

      {/* Category Pills Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <Filter className="w-4 h-4 text-navy-500 shrink-0 ml-1" />
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-teal-800 text-white shadow-sm'
                : 'bg-white/80 hover:bg-teal-50 text-navy-700 border border-teal-800/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Notes List */}
      {notesLoading ? (
        <div className="py-20 text-center text-sm font-semibold text-navy-600">
          Loading your health notes...
        </div>
      ) : filteredNotes.length === 0 ? (
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-12 text-center border border-teal-800/10 shadow-card space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-800 mx-auto flex items-center justify-center">
            <FileText className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-navy-800">No Health Notes Found</h3>
          <p className="text-sm text-navy-600 max-w-sm mx-auto">
            {searchTerm || selectedCategory !== 'All'
              ? 'No notes match your filter criteria. Try clearing search keywords or selecting another category.'
              : 'Keep track of doctor consultations, symptoms, vitals, or lifestyle observations.'}
          </p>
          <Button variant="primary" size="sm" onClick={handleOpenNewNote} leftIcon={<Plus className="w-4 h-4" />}>
            Create First Note
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredNotes.map((note) => (
            <motion.div
              key={note.id}
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-teal-800/10 shadow-card hover:shadow-glass-hover transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-800/10">
                      {note.category}
                    </span>
                    <span className="text-xs text-navy-500 font-medium">
                      {formatDate(note.note_date)}
                    </span>
                  </div>
                  <SpeechReader
                    textToRead={`${note.title}. Category: ${note.category}. ${note.note}`}
                    label="Listen"
                    compact
                  />
                </div>

                <h3 className="text-base font-bold text-navy-800 mb-2 group-hover:text-teal-800 transition-colors">
                  {note.title}
                </h3>
                <p className="text-sm text-navy-700/80 leading-relaxed whitespace-pre-line">
                  {note.note}
                </p>
              </div>

              {/* Actions Footer */}
              <div className="pt-4 mt-4 border-t border-teal-800/10 flex items-center justify-end gap-2">
                <button
                  onClick={() => handleOpenEditNote(note)}
                  className="p-2 text-navy-600 hover:text-teal-800 hover:bg-teal-50 rounded-xl transition-colors"
                  aria-label={`Edit ${note.title}`}
                  title="Edit note"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeleteConfirmId(note.id)}
                  className="p-2 text-navy-600 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                  aria-label={`Delete ${note.title}`}
                  title="Delete note"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Note Create / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingNote ? 'Edit Health Note' : 'Add New Health Note'}
        description="Encrypted and saved exclusively to your authenticated health profile."
        maxWidth="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-navy-800 mb-1">
              Title / Subject
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Cardiology Consultation Summary"
              className="w-full p-3 rounded-xl border border-teal-800/15 bg-canvas focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none text-sm text-navy-900"
            />
            {formErrors.title && (
              <p className="text-xs text-rose-600 mt-1">{formErrors.title}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-navy-800 mb-1">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as HealthNoteCategory })}
                className="w-full p-3 rounded-xl border border-teal-800/15 bg-canvas focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none text-sm text-navy-900"
              >
                <option value="General">General</option>
                <option value="Consultation">Consultation</option>
                <option value="Symptoms">Symptoms</option>
                <option value="Medication Note">Medication Note</option>
                <option value="Vitals Note">Vitals Note</option>
                <option value="Lifestyle">Lifestyle</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-navy-800 mb-1">
                Observation Date
              </label>
              <input
                type="date"
                value={formData.note_date}
                onChange={(e) => setFormData({ ...formData, note_date: e.target.value })}
                className="w-full p-3 rounded-xl border border-teal-800/15 bg-canvas focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none text-sm text-navy-900"
              />
              {formErrors.note_date && (
                <p className="text-xs text-rose-600 mt-1">{formErrors.note_date}</p>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-navy-800">
                Detailed Observation / Doctor Advice
              </label>
              <button
                type="button"
                onClick={() => setVoiceDictationOpen(true)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100/60 px-2 py-0.5 rounded-lg transition-colors"
              >
                <Mic className="w-3.5 h-3.5" />
                <span>Voice Dictate</span>
              </button>
            </div>
            <textarea
              rows={5}
              value={formData.note}
              onChange={(e) => setFormData({ ...formData, note: e.target.value })}
              placeholder="Record clinical advice, how you felt, or follow-up recommendations..."
              className="w-full p-3.5 rounded-xl border border-teal-800/15 bg-canvas focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none text-sm text-navy-900 leading-relaxed"
            />
            {formErrors.note && (
              <p className="text-xs text-rose-600 mt-1">{formErrors.note}</p>
            )}
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-teal-800/10">
            <Button variant="ghost" size="sm" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit" isLoading={isSubmitting}>
              {editingNote ? 'Save Changes' : 'Record Health Note'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={Boolean(deleteConfirmId)}
        onClose={() => setDeleteConfirmId(null)}
        title="Delete Health Note?"
        description="This action will permanently remove this record from your health vault. It cannot be recovered."
        maxWidth="sm"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-rose-50 text-rose-800 rounded-xl text-xs">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>Are you sure you want to permanently delete this note?</span>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button variant="ghost" size="sm" onClick={() => setDeleteConfirmId(null)}>
              Keep Note
            </Button>
            <Button variant="danger" size="sm" onClick={handleConfirmDelete}>
              Confirm Delete
            </Button>
          </div>
        </div>
      </Modal>

      {/* Voice Dictation Modal */}
      <VoiceInputModal
        isOpen={voiceDictationOpen}
        onClose={() => setVoiceDictationOpen(false)}
        onTranscriptComplete={handleVoiceTranscribed}
        title="Dictate Note Content"
      />
    </div>
  );
};
