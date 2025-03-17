import { Modal, Panel } from "@repo/ui";
import { useLabels } from "../../../hooks/useLabels";
import ChangePassword from "../ChangePassword/ChangePassword";
import { useState } from "react";
import { ConfMapData } from "../ChangePassword/types/changePassword.types";
import { Formik } from "formik";
import { handleChangePassword } from "../ChangePassword/functions/passwordChangeHandler.function";

interface ChangePasswordModalProps {
  isOpenChangePassword: boolean;
  setIsOpenChangePassword: (value: boolean) => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  isOpenChangePassword,
  setIsOpenChangePassword,
}: ChangePasswordModalProps): React.ReactElement => {
  const label = useLabels();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [configMapData, setConfigMapData] = useState<ConfMapData[]>([]);

  return (
    <Formik
      initialValues={{
        currentPassword: "",
        newPassword: "",
        repeatNewPassword: "",
      }}
      onSubmit={async (values, { setSubmitting }) => {
        if (values) {
          handleChangePassword(
            values,
            configMapData,
            label,
            setIsLoading,
            setIsOpenChangePassword,
          );
        }
        setSubmitting(false);
      }}
    >
      {({ submitForm }) => (
        <Modal
          title={label(
            "molecules.profileMenu.changePassword",
            "Passwort ändern",
          )}
          onApply={(): void => {
            submitForm();
          }}
          onApplyLabel={label("common.confirm", "[Confirm]")}
          closeLabel={label("Common.close", "[Close]")}
          isOpen={isOpenChangePassword}
          onClose={() => setIsOpenChangePassword(false)}
          isLoading={isLoading}
        >
          <Panel>
            <ChangePassword setConfigMapData={setConfigMapData} />
          </Panel>
        </Modal>
      )}
    </Formik>
  );
};

export default ChangePasswordModal;
