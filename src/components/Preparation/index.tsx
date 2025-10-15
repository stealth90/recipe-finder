import React from 'react';

interface PreparationProps {
  steps: string[];
}

const Preparation: React.FC<PreparationProps> = ({ steps }) => {
  return (
    <div className="flex flex-col gap-y-4 max-w-xl">
      <p className="text-2xl font-bold">Preparation</p>
      <div className="flex flex-col gap-y-2">
        {steps.map((step, index) => (
          <div key={step} className="flex flex-row gap-x-4">
            <span className="font-bold">{index + 1}</span>
            <p className="mb-2 text-gray-700">{step}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Preparation;
