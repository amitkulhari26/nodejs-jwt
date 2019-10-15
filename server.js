require('dotenv').config();
const app = require('./app');
const port = process.env.PORT || 1500;
app.listen(port, () => {
    console.log('Server is availbe on port 1500');
});