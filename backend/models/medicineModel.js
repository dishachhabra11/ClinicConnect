const Medicine = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dosage: {
    type: String,
    required: true,
  }, // Dosage (e.g., "1 OR 1 500GM TABLET")
  frequency: {
    type: String,
    required: true,
  }, // Frequency (e.g., "2 TIMES A DAY")
  instructions: {
    type: String,
    required: true,
  }, // Specific instructions (e.g., "Take after meals")
});
export default mongoose.model("Medicine", Medicine);
