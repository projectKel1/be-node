const { prisma } = require('../models/prisma');

async function getPresensi(req, res) {
  try {
    const presensi = await prisma.Presensi.findMany();
    res.json(presensi);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function createPresensi(req, res) {
  const { userId, inTime, outTime } = req.body;

  try {
    const newPresensi = await prisma.Presensi.create({
      data: {
        userId,
        inTime,
        outTime,
      },
    });
    res.json(newPresensi);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  getPresensi,
  createPresensi,
};
