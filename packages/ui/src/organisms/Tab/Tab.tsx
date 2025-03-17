"use client";

import React, { useState } from "react";
import "./Tab.scss";
import { Button } from "../../atoms/Button/Button";

export interface Tab {
  title: string;
  content: React.ReactNode;
  hidden?: boolean;
}

export interface TabsProps {
  tabs: Tab[];
  defaultActiveTab?: number;
}

export const Tab: React.FC<TabsProps> = ({ tabs, defaultActiveTab = 0 }) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab);

  return (
    <div className="Tab">
      <div className="Tab_header">
        {tabs.map(
          (tab, index) =>
            !tab.hidden && (
              <Button
                key={index}
                className={`Tab_btn ${activeTab === index ? "Tab_btn-active" : ""}`}
                onClick={() => setActiveTab(index)}
                theme={activeTab === index ? "primary" : undefined}
              >
                {tab.title}
              </Button>
            ),
        )}
      </div>
      <div className="Tab_content">{tabs[activeTab]?.content}</div>
    </div>
  );
};
