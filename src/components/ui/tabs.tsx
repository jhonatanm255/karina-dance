import * as React from 'react';

interface TabsProps {
  defaultValue: string;
  children: React.ReactNode;
}

interface TabsListProps {
  children: React.ReactNode;
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
}

const TabsContext = React.createContext<{
  value: string;
  setValue: (value: string) => void;
}>({
  value: '',
  setValue: () => {},
});

export function Tabs({ defaultValue, children }: TabsProps) {
  const [value, setValue] = React.useState(defaultValue);

  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div className="space-y-4">{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children }: TabsListProps) {
  return (
    <div className="flex space-x-1 rounded-lg bg-gray-100 p-1">
      {children}
    </div>
  );
}

export function TabsTrigger({ value, children }: TabsTriggerProps) {
  const { value: selectedValue, setValue } = React.useContext(TabsContext);
  const isSelected = value === selectedValue;

  return (
    <button
      className={`px-3 py-1.5 text-sm font-medium transition-all rounded-md ${
        isSelected
          ? 'bg-white text-pink-600 shadow-sm'
          : 'text-gray-600 hover:text-pink-600'
      }`}
      onClick={() => setValue(value)}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children }: TabsContentProps) {
  const { value: selectedValue } = React.useContext(TabsContext);

  if (value !== selectedValue) return null;

  return <div className="mt-4">{children}</div>;
}