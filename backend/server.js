import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import XLSX from 'xlsx';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

const DATA_DIR = path.join(__dirname, 'data');
const EXCEL_FILE = path.join(DATA_DIR, 'enquiries.xlsx');
const BLOG_FILE = path.join(DATA_DIR, 'blog.json');

app.use(cors());
app.use(express.json());

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

/* ============ ENQUIRY -> EXCEL ============ */
const HEADERS = ['Name', 'Email', 'Phone', 'Message', 'Date'];

function appendEnquiryToExcel(enquiry) {
  let worksheetRows;

  if (fs.existsSync(EXCEL_FILE)) {
    const workbook = XLSX.readFile(EXCEL_FILE);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    if (sheet) {
      worksheetRows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    }
  }

  if (!worksheetRows || !worksheetRows.length) {
    worksheetRows = [HEADERS];
  }

  worksheetRows.push([
    enquiry.name,
    enquiry.email,
    enquiry.phone,
    enquiry.message,
    enquiry.date
  ]);

  const newWorkbook = XLSX.utils.book_new();
  const newSheet = XLSX.utils.aoa_to_sheet(worksheetRows);
  XLSX.utils.book_append_sheet(newWorkbook, newSheet, 'Enquiries');
  XLSX.writeFile(newWorkbook, EXCEL_FILE);
}

app.post('/api/enquiry', (req, res) => {
  try {
    const body = req.body || {};
    const enquiry = {
      name: String(body.name || '').trim(),
      email: String(body.email || '').trim(),
      phone: String(body.phone || '').trim(),
      message: String(body.message || '').trim(),
      date: new Date().toLocaleString('en-IN', { hour12: true })
    };

    if (!enquiry.name || !enquiry.phone) {
      return res.status(400).json({ success: false, message: 'Name and phone are required.' });
    }

    appendEnquiryToExcel(enquiry);

    res.json({ success: true, message: 'Enquiry saved successfully. We will contact you soon!' });
  } catch (err) {
    console.error('Error saving enquiry:', err);
    res.status(500).json({ success: false, message: 'Failed to save enquiry. Please try again.' });
  }
});

/* ============ BLOG DATA ============ */
app.get('/api/blog', (req, res) => {
  try {
    if (fs.existsSync(BLOG_FILE)) {
      const data = JSON.parse(fs.readFileSync(BLOG_FILE, 'utf-8'));
      return res.json(data);
    }
    res.json([]);
  } catch (err) {
    console.error('Error reading blog:', err);
    res.json([]);
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

/* ============ SERVE FRONTEND BUILD (production) ============ */
const distDir = path.resolve(__dirname, '../my-app/dist');
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
  app.get('*', (req, res) => {
    // Don't serve index for /api routes
    if (req.path.startsWith('/api/')) return res.status(404).json({ message: 'Not found' });
    res.sendFile(path.join(distDir, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
  console.log(`Enquiries will be saved to: ${EXCEL_FILE}`);
});