import { Document, Model } from 'mongoose';
import { QueryResult } from '../paginate/paginate';

export interface IExamOptions {
  name: string;
  content: string;
  audio?: string;
}

export interface IQuestion {
  type: string;
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
  title?: string;
  description?: string;
  totalTime: number;
  counter?: number;
  classAge: number;
  parts: IExamParts[];
  answers?: string;
  editor?: string;
  source?: string;
}

export interface IExamDoc extends IExam, Document {}

export interface IExamModel extends Model<IExamDoc> {
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}

export type NewCreatedExam = IExam;

export type UpdateExamBody = IExam;
