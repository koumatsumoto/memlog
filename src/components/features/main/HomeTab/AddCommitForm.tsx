import { Box, Button, Textarea, VStack } from "@chakra-ui/react";
import { Formik } from "formik";
import { createCommit } from "../../../hooks";

export const AddCommitForm = () => {
  return (
    <Formik
      initialValues={{ text: "" }}
      onSubmit={async (values, { resetForm }) => {
        await createCommit({ title: "メモ", text: values.text, tags: ["note"] }).then(() => {
          resetForm();
        });
      }}
      validateOnMount
    >
      {(props) => (
        <VStack spacing="16px" boxSize="full">
          <Box boxShadow="light.sm" border="2px solid #9999" borderRadius="6px" w="full">
            <Textarea minH="24vh" fontSize="14px" border="0" p="8px" {...props.getFieldProps("text")} />
          </Box>
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
