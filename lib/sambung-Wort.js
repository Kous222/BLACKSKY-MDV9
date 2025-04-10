const fetch = require('node-fetch')
const axios = require('axios')

/**
 * Get a random word for the word chain game
 * @returns {Promise<Object>} Word data object
 */
async function sKata() {
    try {
        // German dictionary API
        const response = await fetch('https://api.betabotz.eu.org/api/tools/kata')
        const json = await response.json()
        
        // Process the response
        return {
            Status: true,
            Wort: json.result || getRandomWord()
        }
    } catch (error) {
        console.error('Error in sKata:', error)
        // Fallback to static words if API fails
        return {
            Status: false,
            Wort: getRandomWord()
        }
    }
}

/**
 * Check if a word exists in the dictionary
 * @param {string} word - The word to check
 * @returns {Promise<Object>} Validation result
 */
async function cKata(word) {
    try {
        if (!word || word.length < 3) {
            return { Status: false }
        }
        
        // Check word in German dictionary
        const response = await axios.get(`https://api.betabotz.eu.org/api/tools/cek-kata?kata=${encodeURIComponent(word)}`)
        
        return {
            Status: response.data.result === true,
            Wort: word
        }
    } catch (error) {
        console.error('Error in cKata:', error)
        // Simple validation if API fails - just check if word is at least 3 chars
        return {
            Status: word.length >= 3,
            Wort: word
        }
    }
}

/**
 * Get a random word from fallback list
 * @returns {string} Random word
 */
function getRandomWord() {
    const wordList = [
        'apfel', 'banane', 'computer', 'dach', 'elefant', 'familie', 'garten', 
        'haus', 'insel', 'jacke', 'katze', 'lampe', 'maus', 'nacht', 'orange', 
        'papier', 'qualle', 'regen', 'sonne', 'tisch', 'uhr', 'vogel', 'wasser', 
        'xylophon', 'yoga', 'zucker', 'arbeit', 'buch', 'dose', 'ente', 'fenster', 
        'gabel', 'hund', 'idee', 'jahr', 'kind', 'lehrer', 'milch', 'name', 'ohr', 
        'pflanze', 'quelle', 'rose', 'schule', 'tag', 'urlaub', 'vater', 'woche', 
        'zahl', 'ast', 'bild', 'dorf', 'eis', 'freund'
    ]
    
    return wordList[Math.floor(Math.random() * wordList.length)]
}

module.exports = { sKata, cKata }