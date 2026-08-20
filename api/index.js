module.exports = (req, res) => {
    res.status(200).json({
        status: "online",
        project: "Naraku Card API"
    });
};
