const fetch = require('node-fetch');
const FormData = require('form-data');
const { fromBuffer } = require('file-type');
const fs = require('fs');
const path = require('path');

/**
 * Upload file to a hosting service
 * @param {Buffer} buffer File buffer
 * @param {string} [type=null] File mimetype
 * @returns {Promise<string>} URL of the uploaded file
 */
async function hochladenFile(buffer, type = null) {
  try {
    // Determine file type if not provided
    const fileType = type ? { mime: type } : await fromBuffer(buffer);
    if (!fileType) throw new Error('Cannot determine file type');

    // Create a temporary file with a random name
    const tempFilePath = path.join(__dirname, '..', 'tmp', `upload_${Math.random().toString(36).substring(2)}`);
    fs.writeFileSync(tempFilePath, buffer);

    // Create form data
    const form = new FormData();
    form.append('file', fs.createReadStream(tempFilePath));
    
    // Upload to a file hosting service
    const response = await fetch('https://telegra.ph/upload', {
      method: 'POST',
      body: form
    });

    // Clean up the temporary file
    fs.unlinkSync(tempFilePath);

    // Process response
    const result = await response.json();
    if (!response.ok) throw new Error(`Upload failed with status ${response.status}`);
    if (!result[0] || !result[0].src) throw new Error('Invalid response from server');

    return 'https://telegra.ph' + result[0].src;
  } catch (error) {
    console.error('File upload error:', error);
    throw error;
  }
}

module.exports = hochladenFile;