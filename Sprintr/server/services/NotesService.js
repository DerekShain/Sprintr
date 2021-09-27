import { dbContext } from '../db/DbContext.js'
import { BadRequest, Forbidden } from '../utils/Errors.js'

class NotesService {
  async getNoteById(noteItemId) {
    const noteItem = await dbContext.Notes.findById(noteItemId).populate('creator', 'name picture')
    if (!noteItem) {
      throw new BadRequest('invalid noteItem id')
    }
    return noteItem
  }

  async editNote(noteItemId, userId, noteItemData) {
    const noteItem = await this.getNoteById(noteItemId)
    if (userId !== noteItem.creatorId.toString()) {
      throw new Forbidden('not authorized')
    }
    noteItem.body = noteItemData.body || noteItem.body
    noteItem.backlogItemId = noteItemData.backlogItemId || noteItem.backlogItemId
    noteItem.noteId = noteItemData.noteId || noteItem.noteId
    noteItem.creatorId = noteItemData.creatorId || noteItem.creatorId
    await noteItem.save()
    return noteItem
  }

  async removeNote(noteItemId, userId) {
    const noteItem = await this.getNoteById(noteItemId)
    if (userId !== noteItem.creatorId.toString()) {
      throw new Forbidden('You are not authorized')
    }
    await noteItem.remove()
    return noteItem
  }

  async createNote(noteItemData) {
    const noteItem = await dbContext.Notes.create(noteItemData)
    await noteItem.populate('creator', 'name picture').execPopulate()
    return noteItem
  }

  async getNotes(query) {
    const noteItems = await dbContext.Notes.find(query).populate('creator', 'name picture')
    return noteItems
  }
}

export const noteItemsService = new NotesService()
