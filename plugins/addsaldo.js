// lib/addsaldo.js

const fs = require('fs')
const path = require('path')
const bankFilePath = path.join(__dirname, 'bank.json')

// Function to add saldo (balance)
async function addSaldo(userId, amount, currency) {
    try {
        // Read the existing data
        let data = JSON.parse(fs.readFileSync(bankFilePath))

        // Ensure user exists in the database
        if (!data[userId]) {
            data[userId] = {
                balance: 0
            }
        }

        // Update user's balance
        data[userId].balance += amount

        // Save the updated data back to the file
        fs.writeFileSync(bankFilePath, JSON.stringify(data, null, 2))

        return true
    } catch (error) {
        console.error("Error updating saldo:", error)
        return false
    }
}

// Function to get saldo (balance)
function getBalance(userId) {
    try {
        // Read the existing data
        let data = JSON.parse(fs.readFileSync(bankFilePath))

        // Return the balance of the user or 0 if not found
        return data[userId] ? data[userId].balance : 0
    } catch (error) {
        console.error("Error reading saldo:", error)
        return 0
    }
}

module.exports = { addSaldo, getBalance }
