import { createStandaloneToast } from "@chakra-ui/toast";

const { ToastContainer, toast } = createStandaloneToast();

const notifySuccess = (message: string) => {
  toast({
    description: message,
    status: "info",
    duration: 3000,
    isClosable: true,
    containerStyle: {
      maxWidth: "88vw",
    },
  });
};

const notifyError = (message: string) => {
  toast({
    description: message,
    status: "error",
    duration: 6000,
    isClosable: true,
    containerStyle: {
      maxWidth: "88vw",
    },
  });
};

export { ToastContainer, notifySuccess, notifyError };
