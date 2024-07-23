import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URL!);
mongoose.Promise = global.Promise;

const todoSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    due: { type: Date, required: true },
    priority: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Todo = mongoose.models.Todo || mongoose.model("Todo", todoSchema);
export default Todo;
