import { useState } from "react";

// Define types for the tab object
interface Tab {
  title: string;
  content: React.ReactNode;
}

const ClientsTable: React.FC = () => {
  // Define state to track the active tab
  const [activeTab, setActiveTab] = useState<number>(0);

  // Define the tabs content with TypeScript type
  const tabs: Tab[] = [
    { title: "Fiche", content: null  },
    { title: "Receptions", content: null},
    // { title: "Hospitalisation", content: <HospitalisationPage /> },
    // { title: "Rapports", content: <RapportsPage /> },
    // { title: "Rapport commande", content: <null /> },
  ];

  return (
    <div className="p-4">
      {/* Tab navigation */}
      <div className="tabs tabs-boxed justify-center space-x-4">
        {tabs.map((tab, index) => (
          <a
            key={index}
            className={`tab ${
              activeTab === index
                ? "tab-active bg-blue-500 text-white p-4 hover:cursor-pointer"
                : "cursor-pointer"
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.title}
          </a>
        ))}
      </div>

      {/* Tab content */}
      <div className="mt-4">
        <div className="p-4 border border-gray-300 rounded-lg bg-white">
          {tabs[activeTab].content}
        </div>
      </div>
    </div>
  );
};

export default ClientsTable;
