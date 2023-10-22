import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { Request, Response } from 'express';
import { ApiError } from '../errors';
import { catchAsync, pick } from '../utils';
import * as examService from './exam.service';
import { IOptions } from '../paginate/paginate';

export const createExam = catchAsync(async (req: Request, res: Response) => {
  const exam = await examService.createExam(req.body);
  res.status(httpStatus.CREATED).send(exam);
});

export const getExams = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, ['classAge']);
  const options: IOptions = pick(req.query, ['sortBy', 'limit', 'page', 'projectBy']);
  const result = await examService.queryExams(filter, options);
  res.send(result);
});

export const getExam = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['examId'] === 'string') {
    const exam = await examService.getExamById(new mongoose.Types.ObjectId(req.params['examId']));
    if (!exam) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Exam not found');
    }
    res.send(exam);
  }
});

export const updateExam = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['examId'] === 'string') {
    const exam = await examService.updateExamById(new mongoose.Types.ObjectId(req.params['examId']), req.body);
    res.send(exam);
  }
});

export const deleteExam = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['examId'] === 'string') {
    await examService.deleteExamById(new mongoose.Types.ObjectId(req.params['examId']));
    res.status(httpStatus.NO_CONTENT).send();
  }
});
