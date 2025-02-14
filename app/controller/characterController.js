const Characters = require("../models/Characters");

// GET
exports.getAllCharacters = async (req, res) => {
  try {
    const characters = await Characters.find({}).populate("house", "name");
    res.status(200).json({
      data: characters,
      success: true,
      message: `${req.method} - request to Character endpoint`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "The server is experiencing an issue. Try again.",
      error: error.message,
    });
  }
};

// GET by ID
exports.getCharacterByID = async (req, res) => {
  try {
    const { id } = req.params;
    const character = await Characters.findById(id).populate("house", "name");
    if (!character) {
      return res.status(404).json({
        success: false,
        message: `Character with ID ${id} not found.`,
      });
    }
    res.status(200).json({
      data: character,
      success: true,
      message: `${req.method} - Retrieved specific character.`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "The server is experiencing an issue. Try again.",
      error: error.message,
    });
  }
};

// POST (create character)
exports.createCharacter = async (req, res) => {
  try {
    const newCharacter = await Characters.create(req.body);
    res.status(201).json({
      data: newCharacter,
      success: true,
      message: "Character created successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create character. Check your input.",
      error: error.message,
    });
  }
};

// PUT (update character)
exports.updateCharacter = async (req, res) => {
  try {
    const { id } = req.params;
    const character = await Characters.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!character) {
      return res.status(404).json({
        success: false,
        message: `Character with ID ${id} not found.`,
      });
    }
    res.status(200).json({
      data: character,
      success: true,
      message: "Character updated successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update character.",
      error: error.message,
    });
  }
};

// DELETE
exports.deleteCharacter = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Characters.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: `Character with ID ${id} not found.`,
      });
    }
    res.status(200).json({
      data: deleted,
      success: true,
      message: `Character deleted successfully.`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "The server is experiencing an issue. Try again.",
      error: error.message,
    });
  }
};
