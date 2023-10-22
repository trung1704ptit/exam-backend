import mongoose from 'mongoose';
import { IExamDoc, IExamModel } from './exam.interfaces';
import { toJSON } from '../toJSON';
import { paginate } from '../paginate';

export type SchemaDefinition =
  | {
      [path: string]: mongoose.SchemaDefinitionProperty<undefined>;
    }
  | {
      [x: string]: mongoose.SchemaDefinitionProperty<any> | undefined;
    }
  | undefined;

const OptionSchema: SchemaDefinition = {
  name: { type: mongoose.Schema.Types.String },
  content: { type: mongoose.Schema.Types.String, required: true },
  audio: { type: mongoose.Schema.Types.String },
};

const QuestionSchema: SchemaDefinition = {
  type: { type: mongoose.Schema.Types.String },
  question: { type: mongoose.Schema.Types.String },
  description: { type: mongoose.Schema.Types.String },
  options: { type: [OptionSchema], required: true },
  answer: { type: mongoose.Schema.Types.String, required: true },
  audio: { type: mongoose.Schema.Types.String },
  score: { type: mongoose.Schema.Types.Number, default: 0 },
};

const SectionSchema: SchemaDefinition = {
  requirement: { type: mongoose.Schema.Types.String },
  description: { type: mongoose.Schema.Types.String },
  content: { type: mongoose.Schema.Types.String },
  questions: { type: [QuestionSchema], required: true },
  audio: { type: mongoose.Schema.Types.String },
  score: { type: mongoose.Schema.Types.Number },
};

const PartSchema: SchemaDefinition = {
  title: { type: mongoose.Schema.Types.String, required: true },
  description: { type: mongoose.Schema.Types.String },
  score: { type: mongoose.Schema.Types.Number, default: 0 },
  sections: { type: [SectionSchema], required: true },
};

const examSchema = new mongoose.Schema<IExamDoc, IExamModel>(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    totalTime: {
      type: Number,
      default: 0,
      required: true,
    },
    counter: {
      type: Number,
      default: 0,
    },
    classAge: {
      type: Number,
      required: true,
    },
    parts: {
      type: [PartSchema],
      required: true,
    },
    answers: {
      type: String,
    },
    editor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    source: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

examSchema.plugin(toJSON);
examSchema.plugin(paginate);

const Exam = mongoose.model<IExamDoc, IExamModel>('Exam', examSchema);

export default Exam;
