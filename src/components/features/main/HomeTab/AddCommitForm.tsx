import { Button, Textarea, VStack } from '@chakra-ui/react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { toast, useGitHub } from '../../../../hooks';

export const AddCommitForm = () => {
  const { commit } = useGitHub();

  return (
    <Formik
      initialValues={{
        text: '',
      }}
      validationSchema={yup.object({
        text: yup.string().required(),
      })}
      onSubmit={async (values: { text: string }, { resetForm }) => {
        await commit(values)
          .then(({ lastCommitId }) => {
            toast({ title: 'OK', description: `commit created successfully, #${lastCommitId}`, status: 'info' });
            resetForm();
          })
          .catch((error) => {
            toast({ title: 'Error', description: `commit failed with an error, ${error}`, status: 'error' });
          });
      }}
      validateOnMount
    >
      {(props) => (
        <VStack>
          <Textarea size="sm" {...props.getFieldProps('text')} />
          <Button
            colorScheme="green"
            size="sm"
            isLoading={props.isSubmitting}
            isDisabled={props.isSubmitting || !props.isValid}
            onClick={props.submitForm}
          >
            Commit
          </Button>
        </VStack>
      )}
    </Formik>
  );
};
