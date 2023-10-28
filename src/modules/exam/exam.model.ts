import slugify from 'slugify';
import mongoose from 'mongoose';
import randomString from 'randomstring';
import { EExamTypes, IExamDoc, IExamModel } from './exam.interfaces';
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

const OptionSchema = {
  name: { type: String },
  content: { type: String, required: true },
  audio: { type: String },
};

const QuestionSchema: SchemaDefinition = {
  type: {
    type: mongoose.Schema.Types.String,
    default: EExamTypes.UNKNOWN,
    enum: EExamTypes,
  },
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
    slug: {
      type: String,
      unique: true,
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
    createdTime: {
      type: Date,
      default: new Date(),
    },
    updatedTime: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

examSchema.pre('save', async function (next) {
  this.slug = slugify(
    `${this.title} ${randomString.generate({
      length: 3,
      charset: 'numeric',
    })}`,
    {
      replacement: '-',
      lower: true,
      locale: 'vi',
    }
  );
  this.createdTime = new Date();
  next();
});

examSchema.pre('updateOne', function () {
  this.set({ updatedTime: new Date() });
});

examSchema.plugin(toJSON);
examSchema.plugin(paginate);

const Exam = mongoose.model<IExamDoc, IExamModel>('Exam', examSchema);

export default Exam;
