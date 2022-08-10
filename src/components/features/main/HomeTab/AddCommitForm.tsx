import { Button, Textarea, VStack } from "@chakra-ui/react";
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
        <VStack spacing="16px">
          <Textarea minW="56vw" h="24vh" fontSize="14px" borderColor="#fff9" {...props.getFieldProps("text")} />
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
