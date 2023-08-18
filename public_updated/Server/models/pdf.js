const mongoose = require('mongoose');

const pdfSchema = new mongoose.Schema({
    name: String,      // Name of the PDF document
    pdfData: Buffer,   // PDF data buffer
    generated: String,
});

const PDF = mongoose.model('PDF', pdfSchema);

module.exports = PDF;
