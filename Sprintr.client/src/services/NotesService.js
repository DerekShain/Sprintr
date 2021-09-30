import { AppState } from '../AppState.js'
import { Note } from '../models/Note.js'
import { logger } from '../utils/Logger.js'
import { api } from './AxiosService.js'

class NotesService {
  async getNotes(projectId, query = '') {
    AppState.notes = []
    const res = await api.get(`api/projects/${projectId}/notes` + query)
    AppState.notes = res.data.map(n => new Note(n))
  }

  async getNoteById(projectId, noteId) {
    AppState.note = null
    const res = await api.get(`api/projects/${projectId}/notes/${noteId}`)
    AppState.note = new Note(res.data)
  }

  async createNote(projectId, backlogId, note) {
    const res = await api.post(`api/projects/${projectId}/notes`, note)
    AppState.notes.push(new Note(res.data, projectId, backlogId))
    logger.log('create note res', res)
    return res.data.id
  }

  async removeNote(projectId, noteId) {
    await api.delete(`api/projects/${projectId}/notes/${noteId}`)
    AppState.note = null
    AppState.notes = AppState.notes.filter(n => n.id !== noteId)
  }
}
export const notesService = new NotesService()
