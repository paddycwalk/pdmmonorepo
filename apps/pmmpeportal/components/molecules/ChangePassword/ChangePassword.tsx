import { Button, CheckIcon, List, Panel, Textfield } from "@repo/ui";
import { Form, useFormikContext } from "formik";
import { useLabels } from "../../../hooks/useLabels";
import { useEffect, useState } from "react";

import {
  BackendObject,
  ConfMapData,
  ConfObj,
  PasswordRule,
} from "./types/changePassword.types";
import { getCookie } from "cookies-next/client";
import { getPasswordRule } from "./functions/changePassword.function";
import "./ChangePassword.scss";

interface ChangePasswordProps {
  setConfigMapData: (confMapData: ConfMapData[]) => void;
}

const ChangePassword = ({ setConfigMapData }: ChangePasswordProps) => {
  const label = useLabels();

  const [configMap, setConfigMap] = useState<Map<string, ConfObj>>();

  const [isMinLength, setIsMinLength] = useState<boolean>(false);
  const [isUpperCaseLetter, setIsUpperCaseLetter] = useState<boolean>(false);
  const [isLowerCaseLetter, setIsLowerCaseLetter] = useState<boolean>(false);
  const [isNumber, setIsNumber] = useState<boolean>(false);
  const [isSpecialCharacter, setIsSpecialCharacter] = useState<boolean>(false);
  const [passwordRule, setPasswordRule] = useState<PasswordRule>();

  useEffect(() => {
    const init = async () => {
      const userId = Number(getCookie("userId"));
      if (userId) {
        const data = await getPasswordRule(userId);
        if (data) {
          setPasswordRule(data);
        }
      }
    };

    init();
  }, []);

  const validationObjects: BackendObject[] = [];
  if (passwordRule) {
    if (passwordRule.passwordMinLength && passwordRule.passwordMinLength > 0) {
      let labelText = label(
        "molecules.profileMenu.changePassword.minLength",
        "[Password must consist of at least ${passwordRule.passwordMinLength} characters]",
      );

      labelText = labelText.replace(
        "${minLength}",
        passwordRule.passwordMinLength.toString(),
      );

      validationObjects.push({
        id: "minLength",
        restriction: passwordRule.passwordMinLength.toString(),
        name: labelText,
      });
    }
    if (passwordRule.passwordMustContainUppercase) {
      validationObjects.push({
        id: "upperCaseLetter",
        restriction: /[A-Z]/g,
        name: label(
          "molecules.profileMenu.changePassword.upperCaseLetter",
          "[Password must contain upper case letters]",
        ),
      });
    }
    if (passwordRule.passwordMustContainLowercase) {
      validationObjects.push({
        id: "lowerCaseLetter",
        restriction: /[a-z]/g,
        name: label(
          "molecules.profileMenu.changePassword.lowerCaseLetter",
          "[Password must contain lower case letters]",
        ),
      });
    }
    if (passwordRule.passwordMustContainNumbers) {
      validationObjects.push({
        id: "number",
        restriction: /\d/g,
        name: label(
          "molecules.profileMenu.changePassword.number",
          "[Password must contain at least one number]",
        ),
      });
    }
    if (passwordRule.passwordMustContainSpecialCharacters) {
      validationObjects.push({
        id: "specialCharacter",
        // eslint-disable-next-line no-useless-escape
        restriction: /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g,
        name: label(
          "molecules.profileMenu.changePassword.specialCharacter",
          "[Password must contain at least one special character]",
        ),
      });
    }
  }

  const minLengthFunction = (
    value: string,
    backendObject: BackendObject,
  ): string => {
    if (
      backendObject.restriction &&
      value.length >= parseInt(backendObject.restriction as string)
    ) {
      setIsMinLength(true);
    } else {
      setIsMinLength(false);
    }
    return value;
  };

  const upperCaseLetterFunction = (
    value: string,
    backendObject: BackendObject,
  ): string => {
    if (backendObject.restriction && value.toLowerCase() !== value) {
      setIsUpperCaseLetter(true);
    } else {
      setIsUpperCaseLetter(false);
    }
    return value;
  };

  const lowerCaseLetterFunction = (
    value: string,
    backendObject: BackendObject,
  ): string => {
    if (backendObject.restriction && value.toUpperCase() !== value) {
      setIsLowerCaseLetter(true);
    } else {
      setIsLowerCaseLetter(false);
    }
    return value;
  };

  const numberFunction = (
    value: string,
    backendObject: BackendObject,
  ): string => {
    if (backendObject.restriction && value.match(backendObject.restriction)) {
      setIsNumber(true);
    } else {
      setIsNumber(false);
    }
    return value;
  };

  const specialCharacterFunction = (
    value: string,
    backendObject: BackendObject,
  ): string => {
    if (backendObject.restriction && value.match(backendObject.restriction)) {
      setIsSpecialCharacter(true);
    } else {
      setIsSpecialCharacter(false);
    }
    return value;
  };

  useEffect(() => {
    const configMap: Map<string, ConfObj> = new Map([
      [
        "minLength",
        {
          isValidate: isMinLength,
          validate: minLengthFunction,
        },
      ],
      [
        "upperCaseLetter",
        {
          isValidate: isUpperCaseLetter,
          validate: upperCaseLetterFunction,
        },
      ],
      [
        "lowerCaseLetter",
        {
          isValidate: isLowerCaseLetter,
          validate: lowerCaseLetterFunction,
        },
      ],
      [
        "number",
        {
          isValidate: isNumber,
          validate: numberFunction,
        },
      ],
      [
        "specialCharacter",
        {
          isValidate: isSpecialCharacter,
          validate: specialCharacterFunction,
        },
      ],
    ]);

    const array = Array.from(configMap, ([name, value]) => ({ name, value }));
    const activeFields = validationObjects.map((item) => {
      return item.id;
    });
    const filterArray = array.filter((item) => {
      return activeFields.includes(item.name);
    });
    setConfigMap(configMap);
    setConfigMapData(filterArray);
  }, [
    passwordRule,
    isMinLength,
    isUpperCaseLetter,
    isLowerCaseLetter,
    isNumber,
    isSpecialCharacter,
  ]);

  const validatePassword = (value: string): string => {
    validationObjects.forEach((object): void => {
      const validationObject = configMap?.get(object.id);
      if (validationObject) {
        validationObject.validate(value, object);
      }
    });
    return value;
  };

  return (
    <Form className="Form">
      <List>
        {validationObjects.map(function (object): React.ReactElement {
          let showCheck: boolean | undefined = false;
          if (configMap?.get(object.id)) {
            showCheck = configMap.get(object.id)?.isValidate;
          }
          return (
            <List.Item
              key={object.id}
              style={
                configMap?.get(object.id)?.isValidate ? "default" : "error"
              }
            >
              {object.name}
              {showCheck ? (
                <Button
                  className="CheckButton"
                  icon={<CheckIcon />}
                  iconPosition="right"
                  theme={showCheck ? "success" : "error"}
                  integrated
                />
              ) : (
                <></>
              )}
            </List.Item>
          );
        })}
      </List>

      <Textfield
        htmlFor="currentPassword"
        id="currentPassword"
        label={label(
          "molecules.profileMenu.changePassword.currentPassword",
          "Aktuelles Passwort*",
        )}
        name="currentPassword"
        type="password"
        placeholder="********"
        onChange={() => {}}
      ></Textfield>
      <Textfield
        htmlFor="newPassword"
        id="newPassword"
        label={label(
          "organisms.login.setNewPassword.field.newpassword",
          "Neues Passwort*",
        )}
        name="newPassword"
        type="password"
        placeholder="********"
        onChange={(elem) => {
          validatePassword(elem.target.value);
        }}
      ></Textfield>
      <Textfield
        htmlFor="repeatNewPassword"
        id="repeatNewPassword"
        label={label(
          "organisms.login.setNewPassword.field.repeat.newpassword",
          "Neues Passwort wiederholen*",
        )}
        name="repeatNewPassword"
        type="password"
        placeholder="********"
        onChange={() => {}}
      ></Textfield>
    </Form>
  );
};

export default ChangePassword;
