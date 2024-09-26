# EPUB Backend

This repository contains the backend code for a EPUB Reader application. Built with Node.js, Express.js, and MongoDB.

## Backend (Node.js/Express)

The backend handles the following tasks:

- File uploads (EPUB files)
- Parsing EPUB files to extract metadata (e.g., title, author, cover image)
- Storing book metadata and file paths in MongoDB
- Providing API endpoints for fetching books and metadata

### Endpoints

- **POST /ebook/upload**: Upload an EPUB file.
    - Request body: `multipart/form-data` with the EPUB file.
    - Response: Metadata (title, author, cover image) and file path.
- **GET /ebook**: Fetch a list of all uploaded eBooks with their metadata.
- **DELETE /ebook/:id**  : Delete a specific eBook's metadata and local file.
- **PUT /ebook/favorite/id** : Set a favorite book


nstallation and Setup

**Prerequisites:**

- Node.js
- npm (Node Package Manager)

**Instructions:**

1. Clone the repository:

```
git clone https://github.com/manoje8/ebook-backend.git
```

2. Install dependencies:

```
npm install
```

3. Start the development server:

```
npm run dev  (OR)
npm start
```

The server will start on port `8000` by default. You can access the application routes in your browser.
