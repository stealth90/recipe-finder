import React from 'react';
import AreaIcon from '../../assets/svg/area.svg?react';
import CategoryIcon from '../../assets/svg/category.svg?react';
import CloseIcon from '../../assets/svg/close-ellipse.svg?react';

interface RecipeProps {
  imageUrl?: string;
  title: string;
  description?: string;
  category?: string;
  area?: string;
  onPress?: () => void;
  onDelete?: () => void;
}

const Recipe: React.FC<RecipeProps> = ({
  title,
  description,
  category,
  imageUrl,
  area,
  onPress,
  onDelete,
}) => {
  return (
    <div
      onClick={onPress}
      className="bg-white relative flex flex-col rounded-lg shadow-lg overflow-hidden h-100 max-w-xs sm:flex-1/2 md:flex-1/3 lg:flex-1/4 xl:flex-1/5 transition-transform hover:scale-105 hover:cursor-pointer"
    >
      {onDelete && (
        <button
          type="button"
          aria-label={`Delete ${title} recipe`}
          className="absolute flex items-center justify-center right-2 top-2 bg-white/50 hover:bg-white/70 cursor-pointer transition-colors rounded-full p-1 z-10"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onDelete();
          }}
        >
          <CloseIcon width={18} height={18} className="text-black/50" />
        </button>
      )}
      {imageUrl && <img src={imageUrl} alt={title} className="w-full h-1/2 object-cover" />}
      <div className="p-4 flex gap-y-4 flex-col justify-between h-40 flex-shrink-0 flex-1">
        <div className="flex flex-col gap-y-2 flex-1">
          <h2 className="text-xl font-bold text-gray-800 line-clamp-2">{title}</h2>
          {description && <p className="text-gray-700 line-clamp-3 flex-1">{description}</p>}
        </div>
        <div className="flex justify-between items-center">
          {category && (
            <div className="flex flex-row gap-x-1 items-center">
              <CategoryIcon width={14} height={14} color="gray" />
              <span className="text-red-400 text-sm">{category}</span>
            </div>
          )}
          {area && (
            <div className="flex flex-row gap-x-1 items-center">
              <AreaIcon width={14} height={14} color="gray" />
              <span className="text-gray-600 text-sm">{area}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Recipe;
