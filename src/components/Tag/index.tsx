import React from 'react';

interface TagProps {
  name: string;
}

const Tag: React.FC<TagProps> = ({ name }) => {
  return <div className="px-3 py-1 border-2 border-red-500 text-red-500 rounded-2xl text-sm">{name}</div>;
};

export default Tag;
