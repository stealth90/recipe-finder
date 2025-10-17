import React from 'react';
import { Link, useMatch } from 'react-router-dom';
import TheMealDBLogo from '../../assets/svg/theMealDbLogo.svg?react';

const Header: React.FC = () => {
  const isRecipeDetail = Boolean(useMatch('/recipes/:id'));

  if (isRecipeDetail) return null;
  return (
    <header className="w-full bg-white shadow-sm py-3 px-4">
      <nav aria-label="Main navigation" className="justify-between flex items-center">
        <Link to="/" className="text-xl font-bold">
          Recipe Finder
        </Link>
        <div className="flex gap-2 items-center justify-center">
          <span className="text-gray-400 text-xs">Powered by</span>
          <a
            href="https://www.themealdb.com"
            target="_blank"
            rel="noreferrer"
            className="bg-black/5 rounded-2xl p-1"
          >
            <TheMealDBLogo height={28} width={140} />
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
