# Nova Backend API

FastAPI backend for Nova document management with SQLite database.

## Setup

1. Create a conda environment:
```bash
conda create -n nova python=3.11
conda activate nova
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the server:
```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

## API Documentation

Once the server is running, visit:
- Interactive API docs: `http://localhost:8000/docs`
- Alternative docs: `http://localhost:8000/redoc`

## API Endpoints

- `GET /api/documents` - List all documents
- `GET /api/documents/{id}` - Get a specific document
- `POST /api/documents` - Create a new document
- `PUT /api/documents/{id}` - Update a document
- `DELETE /api/documents/{id}` - Delete a document

## Database

The application uses SQLite with the database file stored as `nova.db` in the backend directory.
