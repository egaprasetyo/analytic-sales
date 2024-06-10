import { useEffect, useState } from "react";
import { salesApi } from "../lib/api";
import { useDebounce } from "use-debounce";
import SearchBar from "./SearchBar";

const SalesTable = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchTerm] = useDebounce(searchQuery, 1000);

  const fetchData = async (searchTerm: string) => {
    setIsLoading(true);
    try {
      const res = await salesApi.get(`/sales?product=${searchTerm}`);
      setData(res.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch:", error);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    fetchData(searchTerm);
  }, [searchTerm]);

  return (
    <div className="overflow-auto rounded-lg">
      <div className="flex flex-col justify-between gap-4 p-6 bg-white md:flex-row">
        <SearchBar {...{ searchQuery, handleSearchChange }} />
      </div>
      <table className="w-full text-sm text-left text-gray-500 bg-white">
        <thead className="sticky top-0 z-10 flex w-full bg-white">
          <tr className="flex w-full">
            <th
              scope="col"
              className="w-1/4 px-6 py-4 font-medium text-gray-900"
            >
              Product
            </th>
            <th
              scope="col"
              className="w-1/4 px-6 py-4 font-medium text-gray-900"
            >
              Sales
            </th>
            <th
              scope="col"
              className="w-1/4 px-6 py-4 font-medium text-gray-900"
            >
              Revenue
            </th>
            <th
              scope="col"
              className="w-1/4 px-6 py-4 font-medium text-gray-900"
            >
              Date
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100 flex flex-col items-center overflow-y-scroll no-scrollbar w-full h-[60vh]">
          {isLoading ? (
            <tr className="flex items-center justify-center w-full">
              <td
                colSpan={4}
                className="flex items-center justify-center w-full px-6 py-4 font-medium text-center text-gray-500"
              >
                Loading...
              </td>
            </tr>
          ) : data.length > 0 ? (
            data.map(({ id, product, sales, revenue, date }) => (
              <tr key={id} className="flex w-full hover:bg-gray-50">
                <td className="w-1/4 px-6 py-4">{product}</td>
                <td className="w-1/4 px-6 py-4">{sales}</td>
                <td className="w-1/4 px-6 py-4">{revenue}</td>
                <td className="w-1/4 px-6 py-4">{date}</td>
              </tr>
            ))
          ) : (
            <tr className="flex items-center w-full hover:bg-gray-50">
              <th
                colSpan={4}
                className="flex items-center justify-center w-full px-6 py-4 font-normal text-center text-gray-500"
              >
                No Data Found
              </th>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SalesTable;
