const Houses = require("../models/Houses");

// GET all houses
exports.getAllHouses = async (req, res) => {
  try {
    const houses = await Houses.find({});
    res.status(200).json({
      data: houses,
      success: true,
      message: `${req.method} - Retrieved all Hogwarts Houses.`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "The server is experiencing an issue. Try again.",
      error: error.message,
    });
  }
};

// GET house by ID
exports.getHouseByID = async (req, res) => {
  try {
    const { id } = req.params;
    const house = await Houses.findById(id); 
    if (!house) {
      return res.status(404).json({
        success: false,
        message: `House with ID ${id} not found.`,
      });
    }
    res.status(200).json({
      data: house,
      success: true,
      message: `${req.method} - Retrieved specific Hogwarts House.`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "The server is experiencing an issue. Try again.",
      error: error.message,
    });
  }
};


// POST house
exports.createHouse = async (req, res) => {
  try {
    const newHouse = await Houses.create(req.body);
    res.status(201).json({
      data: newHouse,
      success: true,
      message: `House created successfully.`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create House. Check your input.",
      error: error.message,
    });
  }
};

// PUT (update) house
exports.updateHouse = async (req, res) => {
  try {
    const { id } = req.params;
    const house = await Houses.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!house) {
      return res.status(404).json({
        success: false,
        message: `House with ID ${id} not found.`,
      });
    }

    res.status(200).json({
      data: house,
      success: true,
      message: `House updated successfully.`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update House.",
      error: error.message,
    });
  }
};

// DELETE
exports.deleteHouse = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Houses.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: `House ${id} not found. `,
      });
    }
    res.status(200).json({
      data: deleted,
      success: true,
      message: `House deleted successfully.`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "The server is experiencing an issue. Try again.",
      error: error.message,
    });
  }
};
