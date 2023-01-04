const { Vaccine, VaccineLot, UserVaccine } = require("./../models");

exports.create = async (req, res) => {
  try {
    const newVaccine = new Vaccine({
      name: req.body.name,
    });
    const savedVaccine = await newVaccine.save();
    savedVaccine._doc.quantity = 0;
    savedVaccine._doc.vaccinated = 0;
    savedVaccine._doc.vaccineLots = [];
    res.status(201).json(savedVaccine);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.getAll = async (req, res) => {
  try {
    const list = await Vaccine.find({}).sort("-createdAt");
    for (const vaccine of list) {
      const vaccineLots = await VaccineLot.find({ vaccine: vaccine._id });
      vaccine._doc.quantity = vaccineLots.reduce(
        (total, item) => total + Number(item.quantity),
        0
      );
      vaccine._doc.vaccinated = vaccineLots.reduce(
        (total, item) => total + Number(item.vaccinated),
        0
      );
      vaccine._doc.vaccineLots = vaccineLots;
    }
    res.status(200).json(list);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.getOne = async (req, res) => {
  try {
    const { vaccineId } = req.params;
    const vaccine = await Vaccine.findById(vaccineId);
    const vaccineLots = await VaccineLot.find({ vaccine: vaccine._id });
    vaccine._doc.quantity = vaccineLots.reduce(
      (total, item) => total + Number(item.quantity),
      0
    );
    vaccine._doc.vaccinated = vaccineLots.reduce(
      (total, item) => total + Number(item.vaccinated),
      0
    );
    vaccine._doc.vaccineLots = vaccineLots;
    res.status(200).json(vaccine);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.update = async (req, res) => {
  try {
    const { vaccineId } = req.params;
    const vaccine = await Vaccine.findByIdAndUpdate(vaccineId, {
      $set: req.body,
    });
    res.status(200).json(vaccine);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.delete = async (req, res) => {
  try {
    const { vaccineId } = req.params;
    await VaccineLot.deleteMany({ vaccine: vaccineId });
    await UserVaccine.deleteMany({ vaccine: vaccineId });
    await Vaccine.findByIdAndDelete(vaccineId);
    res.status(200).json("Deleted");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
