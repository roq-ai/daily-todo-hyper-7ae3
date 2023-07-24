import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
  Center,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { getRerollById, updateRerollById } from 'apiSdk/rerolls';
import { rerollValidationSchema } from 'validationSchema/rerolls';
import { RerollInterface } from 'interfaces/reroll';
import { UserInterface } from 'interfaces/user';
import { TodoInterface } from 'interfaces/todo';
import { getUsers } from 'apiSdk/users';
import { getTodos } from 'apiSdk/todos';

function RerollEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<RerollInterface>(
    () => (id ? `/rerolls/${id}` : null),
    () => getRerollById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: RerollInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateRerollById(id, values);
      mutate(updated);
      resetForm();
      router.push('/rerolls');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<RerollInterface>({
    initialValues: data,
    validationSchema: rerollValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Rerolls',
              link: '/rerolls',
            },
            {
              label: 'Update Reroll',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Reroll
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <NumberInput
            label="Reroll Count"
            formControlProps={{
              id: 'reroll_count',
              isInvalid: !!formik.errors?.reroll_count,
            }}
            name="reroll_count"
            error={formik.errors?.reroll_count}
            value={formik.values?.reroll_count}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('reroll_count', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <AsyncSelect<TodoInterface>
            formik={formik}
            name={'todo_id'}
            label={'Select Todo'}
            placeholder={'Select Todo'}
            fetcher={getTodos}
            labelField={'task'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/rerolls')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'reroll',
    operation: AccessOperationEnum.UPDATE,
  }),
)(RerollEditPage);
