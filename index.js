const express = require('express');
const connection = require('./config/connection');
const bodyParser = require('body-parser');
const MemberRoutes = require('./routes/memberRoutes');
const BookRoutes = require('./routes/bookRoutes');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors())
app.use('/api/member', MemberRoutes);
// app.use('/api/book', BookRoutes);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});