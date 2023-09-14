const express = require('express');
const app = express();
const presensiRoutes = require('./src/routes/presensi');
const cutiRoutes = require('./routes/requestCuti');
const authMiddleware = require('./middleware/authMiddleware');

app.use(authMiddleware);

app.use(express.json());

app.use('/presensi', presensiRoutes);
app.use('/cuti', cutiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});