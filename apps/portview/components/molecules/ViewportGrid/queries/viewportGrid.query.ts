import { gql } from "@apollo/client";

export const GET_GRID_COLUMNS = gql`
  query viewPortGridColumns {
    viewportProductMasterCols {
      fieldName
      key
      displayColumn
    }
  }
`;
export const GET_VIEWPORT_PRODUCTMASTER = gql`
  query vpPms(
    $csoId: Long!
    $startRowNum: Int!
    $endRowNum: Int!
    $cols: [ViewportProductMasterColsInput]
    $searchFields: [SearchInputInput]
  ) {
    viewportProductMasters(
      csoId: $csoId
      startRowNum: $startRowNum
      endRowNum: $endRowNum
      cols: $cols
      searchFields: $searchFields
    ) {
      moreDataAvailable
      productMasters {
        articleNumber
        articleNumberId
        centralContent
        componentGroup
        countryCategory
        csoId
        extProductCategory
        extProductName
        extProductNameTrans
        factsheetOwnerGlobal
        factsheetOwnerRegional
        id
        leads
        mainProductImage
        maktx
        mstae
        name
        productBrand
        productCategory
        productImages
        productLine
        productName
        productMasterId
        salesBrand
        sapMarketGenericDescription
        sapProductBrand
        sapProductLine
        sapProductName
        useCaseB2CWebsite
        useCaseCatalog
        useCaseEshop
      }
    }
  }
`;

export const GET_DEFAULT_GRID_COLUMNS = gql`
  query getDefaultGridGolumns {
    viewportDefaultCols {
      fieldName
      key
      displayColumn
    }
  }
`;
