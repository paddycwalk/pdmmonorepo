import { LicenseManager } from "ag-grid-enterprise";

const agGridLicense = (): void => {
  LicenseManager.setLicenseKey(
    "Using_this_{AG_Grid}_Enterprise_key_{AG-061883}_in_excess_of_the_licence_granted_is_not_permitted___Please_report_misuse_to_legal@ag-grid.com___For_help_with_changing_this_key_please_contact_info@ag-grid.com___{Kittelberger_media_solutions_GmbH}_is_granted_a_{Multiple_Applications}_Developer_License_for_{3}_Front-End_JavaScript_developers___All_Front-End_JavaScript_developers_need_to_be_licensed_in_addition_to_the_ones_working_with_{AG_Grid}_Enterprise___This_key_has_been_granted_a_Deployment_License_Add-on_for_{2}_Production_Environments___This_key_works_with_{AG_Grid}_Enterprise_versions_released_before_{30_July_2025}____[v3]_[01]_MTc1MzgzMDAwMDAwMA==8701170f1836cef72021c66df0c22e3f",
  );
};

export default agGridLicense;
