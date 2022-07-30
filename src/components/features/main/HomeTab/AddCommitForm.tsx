import { Button, Textarea, VStack } from '@chakra-ui/react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { notifySuccess, notifyError, useCommit } from '../../../../hooks';

export const AddCommitForm = () => {
  const { commit } = useCommit();

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
            notifySuccess(`commit created successfully, #${lastCommitId}`);
            resetForm();
          })
          .catch((error) => {
            notifyError(`commit failed with an error, ${error}`);
          });
      }}
      validateOnMount
    >
      {(props) => (
        <VStack spacing="16px">
          <Textarea minW="56vw" h="24vh" fontSize="14px" borderColor="#fff9" {...props.getFieldProps('text')} />
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
