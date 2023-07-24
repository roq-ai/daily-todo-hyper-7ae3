import * as yup from 'yup';

export const rerollValidationSchema = yup.object().shape({
  reroll_count: yup.number().integer().required(),
  user_id: yup.string().nullable(),
  todo_id: yup.string().nullable(),
});
