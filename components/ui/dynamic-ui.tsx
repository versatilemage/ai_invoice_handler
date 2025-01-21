import React from "react";

type DynamicRendererProps = {
  data: any;
  level?: number;
};

const DynamicRenderer: React.FC<DynamicRendererProps> = ({
  data,
  level = 0,
}) => {
  if (data === null || data === undefined) {
    return <p className="text-gray-500 ml-4">Null or Undefined</p>;
  }

  if (typeof data === "object" && !Array.isArray(data)) {
    return (
      <div className={`ml-${level * 4} w-full`}>
        {Object.entries(data).map(([key, value]) => {
            const keyLabel = key.split("_").join(" ")
          return (
            <div key={key} className="mb-4">
              <div className="font-semibold text-lg text-blue-600 capitalize">{keyLabel}:</div>
              <DynamicRenderer data={value} level={level + 1} />
            </div>
          );
        })}
      </div>
    );
  }

  if (Array.isArray(data)) {
    return (
      <div className={`ml-${level * 4}`}>
        {data.map((item, index) => (
          <div
            key={index}
            className="p-4 border rounded-lg shadow-sm bg-gray-50 mb-4"
          >
            <span className="font-semibold text-green-600">
              Item {index + 1}:
            </span>
            <DynamicRenderer data={item} level={level + 1} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <p className="ml-4 text-gray-700">
      {typeof data === "string" ? `"${data}"` : data.toString()}
    </p>
  );
};

export default DynamicRenderer;
