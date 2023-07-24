import * as yup from 'yup';

export const todoValidationSchema = yup.object().shape({
  task: yup.string().required(),
  hyperlink: yup.string().required(),
  organization_id: yup.string().nullable(),
  user_id: yup.string().nullable(),
});
