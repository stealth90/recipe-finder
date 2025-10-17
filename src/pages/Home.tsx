import SearchBar from '../components/SearchBar';
import { Form } from 'react-router';
import LastSearch from '../components/LastSearch';

const Home = () => (
  <div className="flex flex-col gap-y-8 sm:justify-center min-h-full">
    <div className="flex flex-col gap-y-4 justify-center">
      <h1 className="text-5xl font-semibold text-center">Welcome to Recipe Finder</h1>
      <h2 className="text-xl font-normal text-gray-400 text-center">Find your favorite recipes!</h2>
    </div>
    <Form className="flex justify-center" action="/recipes">
      <SearchBar />
    </Form>
    <LastSearch />
  </div>
);

export default Home;
