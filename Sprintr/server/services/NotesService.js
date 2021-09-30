import { dbContext } from '../db/DbContext.js'
import { BadRequest, Forbidden } from '../utils/Errors.js'

class NotesService {
  async getNoteById(noteId) {
    const note = await dbContext.Notes.findById(noteId).populate('creator', 'name picture')
    if (!note) {
      throw new BadRequest('invalid note id')
    }
    return note
  }

  async editNote(noteId, userId, noteData) {
    const note = await this.getNoteById(noteId)
    if (userId !== note.creatorId.toString()) {
      throw new Forbidden('not authorized')
    }
    note.body = noteData.body || note.body
    note.backlogId = noteData.backlogId || note.backlogId
    note.noteId = noteData.noteId || note.noteId
    note.creatorId = noteData.creatorId || note.creatorId
    await note.save()
    return note
  }

  async removeNote(noteId, userId) {
    const note = await this.getNoteById(noteId)
    if (userId !== note.creatorId.toString()) {
      throw new Forbidden('You are not authorized')
    }
    await note.remove()
    return note
  }

  async createNote(noteData) {
    const note = await dbContext.Notes.create(noteData)
    await note.populate('creator', 'name picture')
    return note
  }

  async getNotes(query) {
    const notes = await dbContext.Notes.find(query).populate('creator', 'name picture')
    return notes
  }
}

export const notesService = new NotesService()
