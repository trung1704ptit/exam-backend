import { Document, Model } from 'mongoose';
import { QueryResult } from '../paginate/paginate';

export enum EExamTypes {
  UNKNOWN,
  PRONUNCIATION_UNDERLINED,
  PRIMARY_STRESS,
  SINGLE_FILL_IN_BLANK,
  MULTIPLE_FILL_IN_BLANK_NO_OPTIONS,
  REWRITE_SENTENCE,
  MATCHING,
  SINGLE_CHOICE,
  MULTIPLE_CHOICE,
  CHOOSE_THE_UNDERLINED_IN_SENTENCE,
  CIRCLE_THE_CORRECT_ANWSER_IN_SENTENCE,
  PARAGRAPH_AND_LIST_OF_SINGLE_CHOICE,
  PARAGRAPH_AND_LIST_OF_REWRITE_SENTENCE,
}

export interface IExamOptions {
  name: string;
  content: string;
  audio?: string;
}

export interface IQuestion {
  type: EExamTypes;
  question: string;
  description?: string;
  options: IExamOptions[];
  answer: string;
  audio?: string;
  score?: number;
}

export interface IExamSection {
  requirement: string;
  description?: string;
  content?: string;
  questions: IQuestion[];
  audio?: string;
  score?: number;
}

export interface IExamParts {
  title: string;
  descriptin?: string;
  sections: IExamSection[];
  score?: number;
}

export interface IExam {
  title: string;
  slug: string;
  description?: string;
  totalTime: number;
  counter?: number;
  classAge: number;
  parts: IExamParts[];
  answers?: string;
  editor?: string;
  source?: string;
  createdTime?: Date;
  updatedTime?: Date;
}

export interface IExamDoc extends IExam, Document {}

export interface IExamModel extends Model<IExamDoc> {
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}

export type NewCreatedExam = IExam;

export type UpdateExamBody = IExam;
