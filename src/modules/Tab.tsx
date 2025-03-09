import React from "react";
import { useState, ReactNode } from "react";

type Tab = {
    id: string;
    label: string;
    content: ReactNode;
};

type TabsProps = {
    tabs: Tab[];
};

export default function Tabs({ tabs }: TabsProps) {
    const [activeTab, setActiveTab] = useState(tabs[0].id);

    return (
        <div className="w-full max-w-md mx-auto mt-10">
            {/* タブボタン */}
            <div className="flex border-b">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`py-2 px-4 flex-1 text-center ${activeTab === tab.id ? "border-b-2 border-blue-500 font-bold" : "text-gray-500"
                            }`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* タブコンテンツ */}
            <div className="p-4 border rounded-b-md">
                {tabs.find((tab) => tab.id === activeTab)?.content}
            </div>
        </div>
    );
}
