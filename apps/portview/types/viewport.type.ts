import { ViewportGridColumn } from "../components/molecules/ViewportGrid/types/viewportGrid.types";

export interface ViewportCso {
  csoId: string;
  csoName: string;
  uiClId: number;
}

export interface ViewportCsoVariables {
  uiClId: number;
}

export interface ViewportCsoData {
  viewportCsos: ViewportCso[];
}

export interface ViewportDownloadParams {
  csoId: number;
  cols: ViewportGridColumn[];
}

export interface ViewportDownloadResult {
  downloadViewport: boolean;
}
