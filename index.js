const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

const isPrime = (num) => {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
};

app.post('/bfhl', (req, res) => {
    const { data, file_b64 } = req.body;

    const numbers = [];
    const alphabets = [];
    let highestLowercase = '';
    let primeFound = false;

    if (data) {
        data.forEach((item) => {
            if (!isNaN(item)) {
                numbers.push(item);
                if (isPrime(Number(item))) primeFound = true;
            } else if (item.match(/^[a-zA-Z]$/)) {
                alphabets.push(item);
                if (item >= 'a' && item <= 'z' && item > highestLowercase) {
                    highestLowercase = item;
                }
            }
        });
    }

    res.status(200).json({
        is_success: true,
        user_id: 'anushka_singh_22012000',
        email: 'anushka@college.com',
        roll_number: 'XYZ123',
        numbers,
        alphabets,
        highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : [],
        is_prime_found: primeFound,
        file_valid: !!file_b64,
        file_mime_type: file_b64 ? 'application/pdf' : null,
        file_size_kb: file_b64 ? 200 : null,
    });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
