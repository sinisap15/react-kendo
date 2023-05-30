import * as React from "react";
import { TabStrip, TileLayout, TabStripTab, PanelBar, PanelBarItem } from "@progress/kendo-react-layout";
import { Form, Field, FormElement, FieldWrapper } from "@progress/kendo-react-form";
import { ArcGauge } from "@progress/kendo-react-gauges";
import { DashboardGrid } from "../components/dashboard/DashboardGrid";
import ProductsGrid from "../components/dashboard/ProductsGrid";
import { TextBox, NumericTextBox } from "@progress/kendo-react-inputs";
import { Label } from "@progress/kendo-react-labels";

const colors = [
  {
    color: "#0058e9",
  },
];

const ArcGaugeComponent = () => {
  const [value] = React.useState(50);

  const arcOptions = {
    value: value,
    colors,
  };
  const arcCenterRenderer = (value, color) => {
    return (
      <h3
        style={{
          color: color,
        }}
      >
        {value}%
      </h3>
    );
  };
  return (
    <div
      style={{
        height: "150px",
      }}
    >
      <ArcGauge {...arcOptions} arcCenterRender={arcCenterRenderer} />
    </div>
  );
};

const tiles = [
  {
    defaultPosition: {
      col: 1,
      colSpan: 1,
      rowSpan: 1,
    },
    header: "Tasks On Track",
    body: (
      <div className="dashboard-card-content">
        <p className="dashboard-card-content-number green">22</p>
        <div>
          <p className="footer">In Backlog: 43</p>
        </div>
      </div>
    ),
  },
  {
    defaultPosition: {
      col: 2,
      colSpan: 1,
      rowSpan: 1,
    },
    header: "Overdue Tasks",
    body: (
      <div className="dashboard-card-content">
        <p className="dashboard-card-content-number red">7</p>
        <div>
          <p className="footer">From Yesterday: 16</p>
        </div>
      </div>
    ),
  },
  {
    defaultPosition: {
      col: 3,
      colSpan: 1,
      rowSpan: 1,
    },
    header: "Issues",
    body: (
      <div className="dashboard-card-content">
        <p className="dashboard-card-content-number orange">47</p>
        <div>
          <p className="footer">Closed By Team 15</p>
        </div>
      </div>
    ),
  },
  {
    defaultPosition: {
      col: 4,
      colSpan: 1,
      rowSpan: 1,
    },
    header: "Used Space",
    body: (
      <div className="gauge-div">
        <ArcGaugeComponent />
        <p className="gauge-footer">Closed By Team 15</p>
      </div>
    ),
  },
];

export const Dashboard = () => {

  const [selected, setSelected] = React.useState(0);
  const handleSelect = (e) => {
    setSelected(e.selected);
  }

  const [data, setData] = React.useState([
    {
      col: 1,
      colSpan: 3,
      rowSpan: 2,
    },
    {
      col: 1,
      colSpan: 2,
      rowSpan: 3,
    },
  ]);
  const secondSectionTiles = [
    {
      header: "MK Team",
      body: <DashboardGrid />,
    },
  ];

  return (
    <div>
      <div className="greeting">Hello again, Test User!</div>

      <TileLayout columns={4} items={tiles} rowHeight={230} />

      <TabStrip selected={selected} onSelect={handleSelect}>
        <TabStripTab title="My Team" className="mb-2">
          <PanelBar>
            <PanelBarItem expanded={true} title="Filters">
              <div className="row p-4 mb-2">
                <div className="col-3">
                  <Label>Contact Name: </Label>
                  <TextBox placeholder="Type contact name: "></TextBox>
                </div>
                <div className="col-3">
                  <Label>Job title: </Label>
                  <TextBox placeholder="Type job title: "></TextBox>
                </div>
                <div className="col-3">
                  <Label>Budget: </Label>
                  <NumericTextBox placeholder="Type budget"></NumericTextBox>
                </div>
                <div className="col-3">
                  <Label>Test</Label>
                  <NumericTextBox></NumericTextBox>
                </div>
              </div>
            </PanelBarItem>
          </PanelBar>
          <DashboardGrid />
        </TabStripTab>
        <TabStripTab title="Products">
          <ProductsGrid />
        </TabStripTab>
      </TabStrip>

      {/* <TileLayout
        columns={2}
        rowHeight={255}
        positions={data}
        gap={{
          rows: 10,
          columns: 10,
        }}
        items={secondSectionTiles}
      /> */}
    </div>
  );
};
