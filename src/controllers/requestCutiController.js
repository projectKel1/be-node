const { prisma } = require('../models/prisma');

async function createCuti(req, res) {
  try {
    const { userId, startDate, endDate, status } = req.body;
    const newCuti = await prisma.Cuti.create({
      data: {
        userId,
        startDate,
        endDate,
        status,
      },
    });
    res.json(newCuti);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getCuti(req, res) {
  try {
    const cuti = await prisma.Cuti.findMany();
    res.json(cuti);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function editCuti(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedCuti = await prisma.Cuti.update({
      where: { id },
      data: { status },
    });

    res.json(updatedCuti);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function deleteCuti(req, res) {
  try {
    const { id } = req.params;
    await prisma.Cuti.delete({ where: { id } });
    res.json({ message: 'Cuti deleted successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  createCuti,
  getCuti,
  deleteCuti,
  editCuti,
};