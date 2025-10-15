import SearchBar from '../components/SearchBar';
import TheMealDBLogo from '../assets/svg/theMealDbLogo.svg?react';
import { Form } from 'react-router';

const Home = () => {
  return (
    <div className="flex flex-col gap-y-8 justify-center min-h-dvh p-5">
      <div className="flex flex-col gap-y-4 justify-center">
        <h1 className="text-5xl font-semibold text-center">Welcome to Recipe Finder</h1>
        <h2 className="text-xl font-normal text-gray-400 text-center">
          Find your favorite recipes!
        </h2>
      </div>
      <Form action="/recipes">
        <SearchBar />
      </Form>
      <a
        href="https://www.themealdb.com"
        target="_blank"
        rel="noreferrer"
        className="flex gap-2 items-center justify-center"
      >
        <span className="text-gray-400">Powerd by</span>
        <span className="bg-black">
          <TheMealDBLogo height={28} />
        </span>
      </a>
    </div>
  );
};

export default Home;
