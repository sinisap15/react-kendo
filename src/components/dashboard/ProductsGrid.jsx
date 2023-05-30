import {
  Grid,
  GridColumn,
  GridToolbar,
} from "@progress/kendo-react-grid";
import { products } from "../../data/products";
import React from "react";
import { filterBy } from "@progress/kendo-data-query";
import { ExcelExport } from "@progress/kendo-react-excel-export";
import { orderBy } from "@progress/kendo-data-query";
import { ColumnMenu } from "../ColumnMenu";

// Initialize filter
const initialFilter = {
  logic: "and",
  filters: [{ field: "ProductName", operator: "contains", value: "" }],
};

// Initialize sort
const initialSort = [{ field: "ProductID", dir: "asc" }];

function ProductsGrid() {
  const [data, setData] = React.useState(products);
  const [editId, setEditId] = React.useState(null);
  const [filter, setFilter] = React.useState(initialFilter);
  const _export = React.useRef(null);
  const [sort, setSort] = React.useState(initialSort);

  // exporting to excel
  const excelExport = () => {
    if (_export.current !== null) {
      _export.current.save();
    }
  };

  const rowClick = (event) => {
    setEditId(event.dataItem.ProductID);
  };

  const itemChange = (event) => {
    const inEditId = event.dataItem.ProductID;
    const field = event.field || "";
    const newData = data.map((item) =>
      item.ProductID === inEditId ? { ...item, [field]: event.value } : item
    );
    setData(newData);
  };

  const closeEdit = (event) => {
    if (event.target === event.currentTarget) {
      setEditId(null);
    }
  };

  const addRecord = () => {
    const newRecord = { ProductID: data.length + 1 };

    setData([newRecord, ...data]);
    setEditId(newRecord.ProductID);
  };

  const columnCheckbox = (props) => {
    return (
      <td>
        <input type="checkbox" checked={props.dataItem[props.field]} />
      </td>
    );
  };

  const finalData = orderBy(
    filterBy(
      data.map((item) => ({
        ...item,
        inEdit: item.ProductID === editId,
      })),
      filter
    ),
    sort
  );

  return (
    <ExcelExport data={data} ref={_export}>
      <Grid
        style={{ height: "600px" }}
        data={finalData}
        editField="inEdit"
        onRowClick={rowClick}
        onItemChange={itemChange}
        sortable={true}
        sort={sort}
        resizable={true}
        reorderable={true}
        onSortChange={(e) => {
          setSort(e.sort);
        }}
        filterable={true}
        filter={filter}
        onFilterChange={(e) => setFilter(e.filter)}
      >
        <GridToolbar>
          <div onClick={closeEdit}>
            <button
              title="Add new"
              className="k-button k-button-md k-rounded-md k-button k-button-solid k-button-solid-primary"
              onClick={addRecord}
            >
              Add new
            </button>
            <button
              title="Export Excel"
              className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
              onClick={excelExport}
            >
              Export to Excel
            </button>
          </div>
        </GridToolbar>

        <GridColumn
          field="ProductID"
          title="Id"
          editable={false}
          columnMenu={ColumnMenu}
        />
        <GridColumn field="ProductName" title="Name" />
        <GridColumn
          field="FirstOrderedOn"
          title="First Ordered"
          editor="date"
          format="{0:d}"
        />
        <GridColumn
          field="UnitsInStock"
          title="Units"
          width="150px"
          editor="numeric"
        />
        <GridColumn
          field="Discontinued"
          title="Discontinued"
          editor="boolean"
          cell={columnCheckbox}
        />
      </Grid>
    </ExcelExport>
  );
}

export default ProductsGrid;
