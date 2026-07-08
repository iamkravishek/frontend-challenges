import Tab from "./Tab";
import "./TabList.css";

type Tab = {
  id: number;
  tabName: string;
  tabContent: string;
};

type TabListProps = {
  tabs: Tab[];
  activeTab?: (id: number) => void;
};

export default function TabList({
  tabs,
  activeTab,
}: TabListProps) {
  return (
    <section className="tab-list">
      {tabs.map((item) => (
        <Tab
          key={item.id}
          name={item.tabName}
          onClick={() => activeTab?.(item.id)}
        />
      ))}
    </section>
  );
}