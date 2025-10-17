import React, { useRef } from 'react';
import Spinner from '../Spinner';
import SearchIcon from '../../assets/svg/search.svg?react';

interface SearchBarProps {
  isLoading?: boolean;
  isDisabled?: boolean;
  onSearch?: (query: string) => void;
  onChange?: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ isLoading, isDisabled, onChange, onSearch }) => {
  const textRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      e.preventDefault();
      onSearch(textRef.current?.value || '');
    }
  };

  return (
    <div className="bg-white flex flex-col sm:flex-row items-center justify-center border py-2 px-2 rounded-2xl gap-4 shadow-2xl focus-within:border-gray-400 border-gray-200 max-w-2xl w-5/6 mx-auto">
      <input
        id="search-bar"
        name="query"
        ref={textRef}
        placeholder="Search for recipes by entering ingredients or keywords..."
        className="px-2 w-full rounded-md flex-1 outline-none bg-white text-ellipsis"
        onKeyDown={handleKeyDown}
        onChange={(e) => {
          onChange?.(e.target.value);
        }}
      />
      <button
        type={onSearch ? 'button' : 'submit'}
        disabled={isLoading || isDisabled}
        onClick={() => {
          onSearch?.(textRef.current?.value || '');
        }}
        className="w-full sm:w-auto flex justify-center px-6 py-3 gap-x-2 bg-black border-black text-white duration-100 border rounded-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <SearchIcon width={18} height={18} color="white" />
            <span className="text-sm font-semibold sm:hidden text-white">Search</span>
          </>
        )}
      </button>
    </div>
  );
};

export default SearchBar;
