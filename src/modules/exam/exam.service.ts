import httpStatus from 'http-status';
import mongoose from 'mongoose';
import Exam from './exam.model';
import { ApiError } from '../errors';
import { NewCreatedExam, UpdateExamBody, IExamDoc } from './exam.interfaces';
import { IOptions, QueryResult } from '../paginate/paginate';

/**
 * Create a Exam
 * @param {NewCreatedExam} examBody
 * @returns {Promise<IExamDoc>}
 */
export const createExam = async (examBody: NewCreatedExam): Promise<IExamDoc> => {
  return Exam.create(examBody);
};

/**
 * Query for exams
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
export const queryExams = async (filter: Record<string, any>, options: IOptions): Promise<QueryResult> => {
  const exams = await Exam.paginate(filter, options);
  return exams;
};

/**
 * Get exam by id
 * @param {mongoose.Types.ObjectId} examId
 * @returns {Promise<IExamDoc | null>}
 */
export const getExamById = async (examId: mongoose.Types.ObjectId): Promise<IExamDoc | null> => {
  return Exam.findById(examId);
};

/**
 * Update Exam by id
 * @param {mongoose.Types.ObjectId} examId
 * @param {UpdateExamBody} updateBody
 * @returns {Promise<IExamDoc | null>}
 */
export const updateExamById = async (
  examId: mongoose.Types.ObjectId,
  updateBody: UpdateExamBody
): Promise<IExamDoc | null> => {
  const exam = await getExamById(examId);
  if (!exam) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Exam not found');
  }
  Object.assign(exam, updateBody);
  await exam.save();
  return exam;
};

/** Delete exam by id
 * @param {mongoose.Types.ObjectId} examId
 * @returns {Promise<IExamDoc | null>}
 */
export const deleteExamById = async (examId: mongoose.Types.ObjectId): Promise<IExamDoc | null> => {
  const exam = await getExamById(examId);
  if (!exam) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Exam not found');
  }
  await exam.deleteOne();
  return exam;
};
