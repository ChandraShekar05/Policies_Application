const express = require('express');
const bodyparser = require('body-parser');
const policyRoutes = require('./routers/policyRouter');

const app = express();

app.use(bodyparser.json());

app.use(express.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Welcome to Policy Management API');
});

app.use('/api/policies', policyRoutes);

app.use((error, req, res, next) => {
    console.error(error); // Log the error for debugging
    res.status(error.status || 500).json({
        error: {
            message: error.message || 'Internal Server Error'
        }
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;