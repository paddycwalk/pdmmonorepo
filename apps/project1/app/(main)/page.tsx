"use client";

import {
  Button,
  CustomTextEditor,
  Dropdown,
  Grid,
  Panel,
  notifier,
  DropdownEditor,
  BooleanEditor,
  TableEditor,
  Autocomplete,
  Contexify,
  Draggable,
  Droppable,
  Tree,
  PaperplaneIcon,
  CustomLabel,
} from "@repo/ui";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_MYPUBLICATIONS_QUERY } from "../../queries/getMyPublicationsQuery";
import { useLabels } from "../../hooks/useLabels";
import { ICellRendererParams } from "ag-grid-enterprise";
import { DndContext } from "@dnd-kit/core";
import initialData from "../../../../packages/ui/src/organisms/Tree/elements/initialData";
import { TreeDragDropMode } from "../../../../packages/ui/src/organisms/Tree/Tree.enums";
import { NodeProps } from "../../../../packages/ui/src/organisms/Tree/NodeProps";

export default function Home() {
  const label = useLabels();

  // const { loading, error, data } = useQuery(GET_MYPUBLICATIONS_QUERY);
  const showSuccess = () => notifier.success(label("common.close", ""));

  const initialGridData = [
    { make: "Chevrolet", model: "Bolt", price: 36620, electric: true },
    { make: "Nissan", model: "Leaf", price: 31620, electric: true },
    { make: "BMW", model: "i3", price: 44450, electric: false },
    { make: "Audi", model: "e-tron", price: 65900, electric: true },
    { make: "Hyundai", model: "Kona Electric", price: 37490, electric: true },
    { make: "Kia", model: "Soul EV", price: 33950, electric: true },
    { make: "Volkswagen", model: "ID.4", price: 39995, electric: true },
    { make: "Porsche", model: "Taycan", price: 103800, electric: true },
    { make: "Jaguar", model: "I-Pace", price: 69995, electric: true },
    { make: "Mercedes-Benz", model: "EQC", price: 67900, electric: true },
  ];

  const gridDropdownOptions = [
    { value: "Bolt", label: "Bolt" },
    { value: "Leaf", label: "Leaf" },
    { value: "i3", label: "i3" },
    { value: "e-tron", label: "e-tron" },
    { value: "Kona Electric", label: "Kona Electric" },
  ];

  // const handleCellValueChanged = (params) => {
  //   const updatedData = [...gridData]; // Kopiere die aktuellen Daten
  //   const rowIndex = updatedData.findIndex(
  //     (row) => row.make === params.data.make,
  //   ); // Suche den entsprechenden Eintrag

  //   if (rowIndex !== -1) {
  //     updatedData[rowIndex] = {
  //       ...updatedData[rowIndex],
  //       [params.colDef.field]: params.newValue, // Setze den neuen Wert auf das geänderte Feld
  //     };
  //     setGridData(updatedData); // Aktualisiere den State
  //   }
  // };

  const options = [
    { value: "value1", label: "Value1" },
    { value: "value2", label: "Value2" },
    { value: "value3", label: "Value3" },
  ];

  // const gridData = data?.myPublications;

  const [gridData, setGridData] = useState(initialGridData);

  const programmingLanguages = [
    { name: "JavaScript", year: 1995 },
    { name: "JavaScript", year: 1995 },
    { name: "JavaScript", year: 1995 },
    { name: "JavaScript", year: 1995 },
    { name: "JavaScript", year: 1995 },
    { name: "JavaScript", year: 1995 },
    { name: "JavaScript", year: 1995 },
    { name: "JavaScript", year: 1995 },
    { name: "JavaScript", year: 1995 },
    { name: "JavaScript", year: 1995 },
    { name: "JavaScript", year: 1995 },
    { name: "JavaScript", year: 1995 },
    { name: "JavaScript", year: 1995 },
    { name: "JavaScript", year: 1995 },
    { name: "JavaScript", year: 1995 },
    { name: "Python", year: 1991 },
    { name: "Java", year: 1995 },
    { name: "C#", year: 2000 },
    { name: "Ruby", year: 1995 },
    { name: "PHP", year: 1994 },
  ];

  const handleSuggestionSelected = async (
    event: React.FormEvent<HTMLElement>,
    data: { suggestion: { name: string; year: number } },
  ): Promise<string> => {
    console.log("selected item in autocomplete:", data.suggestion);
    return Promise.resolve(data.suggestion.name);
  };

  const handleCopyClick = () => {
    console.log("Copy clicked");
  };

  const handlePasteClick = () => {
    console.log("Paste clicked");
  };

  const menuItems = [
    { id: "copy", text: "Copy", action: () => handleCopyClick() },
    { id: "paste", text: "Paste", action: handlePasteClick },
  ];

  // DragDrop
  const containers = ["A", "B", "C"];
  const [parent, setParent] = useState(null);
  const draggableMarkup = <Draggable id="draggable">Drag me</Draggable>;

  const handleDragEnd = (event: { over: any }) => {
    const { over } = event;
    setParent(over ? over.id : null);
  };

  return (
    <main>
      {/* <CustomLabel labelKey="common.close" /> */}
      <Button theme="primary" onClick={showSuccess}>
        Project1
      </Button>
      <Panel hdl="Lorem Grid" collapsible>
        <Grid rowData={gridData} height={400} labelFunction={label}>
          {/* <Grid rowData={gridData} onCellValueChanged={handleCellValueChanged}> */}
          <Grid.Column
            field="make"
            headerName="Make"
            editable={true}
            cellEditor={CustomTextEditor}
            cellEditorPopup={true}
            // rowGroup
          />
          <Grid.Column
            field="model"
            headerName="Model"
            editable={true}
            cellEditor={DropdownEditor}
            cellEditorPopup={true}
            cellEditorParams={(params: ICellRendererParams) => {
              return {
                options: gridDropdownOptions,
              };
            }}
            onCellValueChanged={(params) => {
              console.log("DropdownEditor onCellValueChanged", params);
            }}
          />

          <Grid.Column
            field="price"
            headerName="Price"
            editable={true}
            singleClickEdit
            cellRenderer={(params: ICellRendererParams) => {
              return (
                <Button
                  onClick={() => console.log("Table Button clicked")}
                  theme="primary"
                  size="small"
                >
                  Table
                </Button>
              );
            }}
            cellEditor={TableEditor}
            cellEditorParams={(params: ICellRendererParams) => {
              return {
                rowData: [
                  {
                    id: 1,
                    name: "John Doe",
                    age: 25,
                    email: "test@test.de",
                  },
                ],
                columns: [
                  { field: "name", headerName: "Name" },
                  { field: "age", headerName: "Age" },
                  { field: "email", headerName: "Email" },
                ],
              };
            }}
          />
          <Grid.Column
            field="electric"
            headerName="Electric"
            editable={false}
            cellRenderer={BooleanEditor}
            pinned="right"
          />
        </Grid>

        {/* <Grid rowData={gridData}>
          <Grid.Column
            field="publicationId"
            headerName="Lorem ipsum"
            editable={false}
            rowDrag
          />
          <Grid.Column
            field="brand"
            editable={true}
            cellEditor={CustomTextEditor}
            cellEditorPopup={true}
            onCellValueChanged={(params) => {
              console.log("CustomTextEditor onCellValueChanged", params);
              console.log(
                "CustomTextEditor onCellValueChanged newValue",
                params.newValue,
              );
            }}
          />
          <Grid.Column
            field="country"
            editable={true}
            onCellValueChanged={(params) => {
              console.log("onCellValueChanged", params);
            }}
          />

          <Grid.Column field="useCase" editable={true} />
        </Grid> */}
      </Panel>
      <Panel>
        <Dropdown
          options={options}
          isMulti
          hideSelectedOptions={false}
          placeholder="Select..."
          label="Dropdown Label"
          showLabel
        ></Dropdown>
      </Panel>

      <Panel>
        <Autocomplete
          label="Autocomplete Label"
          //suggestions={programmingLanguages}
          getSuggestionValue={(suggestion: any) => suggestion.name}
          renderSuggestion={(suggestion: any) => (
            <>
              {suggestion.name} ({suggestion.year})
            </>
          )}
          customOnSuggestionFetchRequested={async (params: any) => {
            console.log("fetching suggestions", params);
            return programmingLanguages; // Ensure it returns the expected array
          }}
          initialValue=""
          placeholder="Type a programming language"
          onSuggestionSelected={handleSuggestionSelected}
          showLabel
        />
      </Panel>

      <Contexify menuId="menu-id2" menuItems={menuItems} clickType="right">
        <Button theme="primary">Right click inside the box</Button>
      </Contexify>

      <DndContext onDragEnd={handleDragEnd}>
        {parent === null ? draggableMarkup : null}

        {containers.map((id) => (
          <Droppable key={id} id={id}>
            {parent === id ? draggableMarkup : "Drop here"}
          </Droppable>
        ))}
      </DndContext>

      <Panel hdl="Tree Example" collapsible noPadding>
        <Tree
          data={initialData}
          nodeIdField="id"
          dragDropMode={TreeDragDropMode.VERTICAL}
          contextFunctions={[
            {
              text: "Copy",
              action: () => console.log("Copy clicked"),
              icon: <PaperplaneIcon />,
            },
            {
              text: "Paste",
              action: () => console.log("Paste clicked"),
            },
          ]}
          suppressContextMenu={(node: NodeProps<"id">) =>
            node.parentId === null
          }
        ></Tree>
      </Panel>
    </main>
  );
}
