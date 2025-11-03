from sqlalchemy.orm import Session
import models
import schemas
import json


def get_document(db: Session, document_id: int):
    """Get a single document by ID"""
    return db.query(models.Document).filter(models.Document.id == document_id).first()


def get_documents(db: Session, skip: int = 0, limit: int = 100):
    """Get all documents with pagination"""
    return db.query(models.Document).offset(skip).limit(limit).all()


def create_document(db: Session, document: schemas.DocumentCreate):
    """Create a new document"""
    db_document = models.Document(
        title=document.title,
        content=json.dumps(document.content)
    )
    db.add(db_document)
    db.commit()
    db.refresh(db_document)
    return db_document


def update_document(db: Session, document_id: int, document: schemas.DocumentUpdate):
    """Update an existing document"""
    db_document = get_document(db, document_id)
    if db_document is None:
        return None

    if document.title is not None:
        db_document.title = document.title
    if document.content is not None:
        db_document.content = json.dumps(document.content)

    db.commit()
    db.refresh(db_document)
    return db_document


def delete_document(db: Session, document_id: int):
    """Delete a document"""
    db_document = get_document(db, document_id)
    if db_document is None:
        return None

    db.delete(db_document)
    db.commit()
    return db_document
