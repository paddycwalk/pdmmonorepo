"use client";
import React, { useEffect, useState } from "react";
import { useLabels } from "../../../../hooks/useLabels";
import {
  NewsletterCso,
  NewsletterData,
  NewsletterUseCase,
} from "../types/newsletter.types";
import { Dropdown, DropdownOption } from "@repo/ui";
import { Field, FieldProps } from "formik";
import clsx from "clsx";

export interface DropdownSelectorProps {
  newsletterData: NewsletterData;
  isDeregister: boolean;
  setIsDeregister: (reset: boolean) => void;
}

const DropdownSelector: React.FC<DropdownSelectorProps> = ({
  newsletterData,
  isDeregister,
  setIsDeregister,
}): React.ReactElement => {
  const label = useLabels();

  const [selectedCsos, setSelectedCsos] = useState<NewsletterCso[]>(
    newsletterData.newsletterCsos.filter((cso) =>
      newsletterData.newsletterSettings.registeredCsos.includes(cso.csoId),
    ),
  );
  const [selectedUseCases, setSelectedUseCases] = useState<NewsletterUseCase[]>(
    newsletterData.newsletterSettings.registeredUseCases
      .map((useCaseId) => {
        const cso = newsletterData.newsletterCsos.find((cso) =>
          cso.useCases.some((useCase) => useCase.useCaseId === useCaseId),
        );
        return cso
          ? cso.useCases.find((useCase) => useCase.useCaseId === useCaseId)
          : null;
      })
      .filter((useCase) => useCase !== null) as NewsletterUseCase[],
  );
  const [useCases, setUseCases] = useState<NewsletterUseCase[]>([]);

  useEffect(() => {
    if (isDeregister) {
      setSelectedCsos([]);
      setIsDeregister(false);
    }
  }, [isDeregister]);

  useEffect(() => {
    if (selectedCsos.length > 0) {
      const mergedUseCases = selectedCsos
        .flatMap((cso: NewsletterCso) => cso.useCases)
        .filter(
          (useCase: NewsletterUseCase, index: number, self) =>
            index ===
            self.findIndex(
              (uc: NewsletterUseCase) => uc.useCaseId === useCase.useCaseId,
            ),
        );
      setUseCases(mergedUseCases);
    } else {
      setUseCases([]);
      setSelectedUseCases([]);
    }
  }, [JSON.stringify(selectedCsos)]);

  const onCsoSelectionChanged = (values: string | string[]) => {
    const newSelectedCsos = newsletterData.newsletterCsos.filter((cso) =>
      values.includes(cso.csoId),
    );
    setSelectedCsos(newSelectedCsos);
  };

  const csoOptions: DropdownOption[] = newsletterData.newsletterCsos.map(
    (cso) => {
      return {
        value: cso.csoId,
        label: cso.csoName,
      };
    },
  );

  const useCaseOptions: DropdownOption[] = useCases.map((useCase) => {
    return {
      value: useCase.useCaseId,
      label: useCase.useCaseName,
    };
  });

  return (
    <div className={clsx("DropdownSelector_container")}>
      <p className={clsx("DropdownSelector_hint")}>
        {label("organisms.newsletterRegistry.optional.hint", "##Optional hint")}
      </p>
      <Field name="Cso">
        {({ form }: FieldProps) => (
          <Dropdown
            key={JSON.stringify(selectedCsos)}
            value={selectedCsos.map((cso) => cso.csoId)}
            options={csoOptions}
            placeholder={label("common.cso", "##Cso")}
            showLabel={true}
            label={label("common.cso", "##Cso")}
            isMulti={true}
            selectAllLabel={label("common.selectAll", "##Alle auswählen")}
            deselectAllLabel={label("common.allSelected", "##Alle ausgewählt")}
            hideSelectedOptions={false}
            closeMenuOnSelect={false}
            onValueChange={(values: string | string[]) => {
              onCsoSelectionChanged(values);
              form.setFieldValue("Cso", values);
            }}
          />
        )}
      </Field>
      <Field name="UseCase">
        {({ form }: FieldProps) => (
          <Dropdown
            value={selectedUseCases.map((useCase) => useCase.useCaseId)}
            options={useCaseOptions}
            placeholder={label("common.useCase", "##UseCase")}
            label={label("common.useCase", "##UseCase")}
            isMulti={true}
            showLabel={true}
            selectAllLabel={label("common.selectAll", "##Alle auswählen")}
            deselectAllLabel={label("common.allSelected", "##Alle ausgewählt")}
            hideSelectedOptions={false}
            closeMenuOnSelect={false}
            isDisabled={useCases.length === 0}
            onValueChange={(values: string | string[]) => {
              form.setFieldValue("UseCase", values);
            }}
          />
        )}
      </Field>
    </div>
  );
};

export default DropdownSelector;
