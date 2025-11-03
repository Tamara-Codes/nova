from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
import json

import models
import schemas
import crud
from database import engine, get_db

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Nova Document API", version="1.0.0")

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    """API root endpoint"""
    return {"message": "Nova Document API", "version": "1.0.0"}


@app.get("/api/documents", response_model=List[schemas.Document])
def get_documents(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Get all documents"""
    documents = crud.get_documents(db, skip=skip, limit=limit)
    # Parse JSON content for each document
    for doc in documents:
        if isinstance(doc.content, str):
            doc.content = json.loads(doc.content)
    return documents


@app.get("/api/documents/{document_id}", response_model=schemas.Document)
def get_document(document_id: int, db: Session = Depends(get_db)):
    """Get a specific document by ID"""
    document = crud.get_document(db, document_id=document_id)
    if document is None:
        raise HTTPException(status_code=404, detail="Document not found")
    # Parse JSON content
    if isinstance(document.content, str):
        document.content = json.loads(document.content)
    return document


@app.post("/api/documents", response_model=schemas.Document, status_code=201)
def create_document(document: schemas.DocumentCreate, db: Session = Depends(get_db)):
    """Create a new document"""
    db_document = crud.create_document(db=db, document=document)
    # Parse JSON content
    if isinstance(db_document.content, str):
        db_document.content = json.loads(db_document.content)
    return db_document


@app.put("/api/documents/{document_id}", response_model=schemas.Document)
def update_document(
    document_id: int,
    document: schemas.DocumentUpdate,
    db: Session = Depends(get_db)
):
    """Update an existing document"""
    db_document = crud.update_document(db=db, document_id=document_id, document=document)
    if db_document is None:
        raise HTTPException(status_code=404, detail="Document not found")
    # Parse JSON content
    if isinstance(db_document.content, str):
        db_document.content = json.loads(db_document.content)
    return db_document


@app.delete("/api/documents/{document_id}")
def delete_document(document_id: int, db: Session = Depends(get_db)):
    """Delete a document"""
    db_document = crud.delete_document(db=db, document_id=document_id)
    if db_document is None:
        raise HTTPException(status_code=404, detail="Document not found")
    return {"message": "Document deleted successfully"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
