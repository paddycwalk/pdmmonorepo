import {
  toast,
  ToastContainer,
  ToastOptions,
  TypeOptions,
} from "react-toastify";
import "./Notifier.scss";
import { ErrorIcon, InfoIcon, SuccessIcon, WarningIcon } from "../../..";

const Notifier: React.FC = () => (
  <ToastContainer
    closeOnClick
    closeButton={false}
    icon={({ type }: { type?: TypeOptions }) => {
      switch (type) {
        case "info":
          return <InfoIcon />;
        case "error":
          return <ErrorIcon />;
        case "success":
          return <SuccessIcon />;
        case "warning":
          return <WarningIcon />;
        default:
          return null;
      }
    }}
  />
);

type NotifierFunction = (message: string, options?: ToastOptions) => void;

const notifier: Record<
  "success" | "info" | "warning" | "error",
  NotifierFunction
> = {
  success: (message, options) => toast.success(message, { ...options }),
  info: (message, options) => toast.info(message, { ...options }),
  warning: (message, options) => toast.warning(message, { ...options }),
  error: (message, options) => toast.error(message, { ...options }),
};

export { Notifier, notifier };
