import { gql } from "@apollo/client";

export const TRIGGER_VIEWPORT_DOWNLOAD = gql`
  mutation triggerViewportDownload(
    $csoId: Long!
    $cols: [ViewportProductMasterColsInput]
  ) {
    downloadViewport(csoId: $csoId, cols: $cols)
  }
`;
