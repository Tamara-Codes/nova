import { NovaDocument } from '../types'

const API_BASE_URL = 'http://localhost:8000/api'

export interface DocumentResponse {
  id: number
  title: string
  content: NovaDocument
  created_at: string
  updated_at: string | null
}

export const api = {
  // Get all documents
  async getDocuments(): Promise<DocumentResponse[]> {
    const response = await fetch(`${API_BASE_URL}/documents`)
    if (!response.ok) {
      throw new Error('Failed to fetch documents')
    }
    return response.json()
  },

  // Get a single document
  async getDocument(id: number): Promise<DocumentResponse> {
    const response = await fetch(`${API_BASE_URL}/documents/${id}`)
    if (!response.ok) {
      throw new Error('Failed to fetch document')
    }
    return response.json()
  },

  // Create a new document
  async createDocument(title: string, content: NovaDocument): Promise<DocumentResponse> {
    const response = await fetch(`${API_BASE_URL}/documents`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    })
    if (!response.ok) {
      throw new Error('Failed to create document')
    }
    return response.json()
  },

  // Update a document
  async updateDocument(id: number, title?: string, content?: NovaDocument): Promise<DocumentResponse> {
    const response = await fetch(`${API_BASE_URL}/documents/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    })
    if (!response.ok) {
      throw new Error('Failed to update document')
    }
    return response.json()
  },

  // Delete a document
  async deleteDocument(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/documents/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      throw new Error('Failed to delete document')
    }
  },
}
