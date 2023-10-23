import Joi from 'joi';
import { NewCreatedExam } from './exam.interfaces';
import { objectId } from '../validate';

const createExamBody: Record<keyof NewCreatedExam, any> = {
  title: Joi.string(),
  description: Joi.string(),
  totalTime: Joi.number().required(),
  classAge: Joi.number().integer().required(),
  answers: Joi.string(),
  source: Joi.string(),
  editor: Joi.string(),
  parts: Joi.array().required(),
  counter: Joi.number().integer(),
};

export const createExam = {
  body: Joi.object().keys(createExamBody),
};

export const getExams = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
  }),
};

export const getExam = {
  params: Joi.object().keys({
    examId: Joi.string().custom(objectId),
  }),
};

export const updateExam = {
  params: Joi.object().keys({
    examId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys(createExamBody),
};

export const deleteExam = {
  params: Joi.object().keys({
    examId: Joi.string().custom(objectId),
  }),
};
