import { notesService } from '../services/NotesService.js'
import BaseController from '../utils/BaseController.js'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { logger } from '../utils/Logger.js'

export class NotesController extends BaseController {
  constructor() {
    super('api/projects/:projectId/notes')
    this.router
      .get('', this.getNotes)
      .get('/:noteId', this.getNote)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createNote)
      .delete('/:noteId', this.removeNote)
  }

  async getNotes(req, res, next) {
    try {
      const notes = await notesService.getNotes(req.query)
      res.send(notes)
    } catch (error) {
      next(error)
    }
  }

  async getNote(req, res, next) {
    try {
      const note = await notesService.getNoteById(req.params.noteId)
      res.send(note)
    } catch (error) {
      next(error)
    }
  }

  async createNote(req, res, next) {
    try {
      // NOTE vvvv had to fix this stuffs
      req.body.creatorId = req.userInfo.id
      req.body.projectId = req.params.projectId
      req.body.backlogId = req.params.backlogId
      const note = await notesService.createNote(req.body)
      note.creator = req.userInfo
      res.send(note)
    } catch (error) {
      next(error)
    }
  }

  async removeNote(req, res, next) {
    try {
      const note = await notesService.removeNote(req.params.noteId, req.userInfo.id)
      res.send(note)
    } catch (error) {
      next(error)
    }
  }
}
