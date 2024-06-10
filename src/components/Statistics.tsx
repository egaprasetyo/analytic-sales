import { AiOutlineLineChart } from "react-icons/ai";
import { BsCashCoin } from "react-icons/bs";
import { IoCartOutline } from "react-icons/io5";

interface StatisticsProps {
  totalSales: number;
  totalRevenue: number;
  bestSellingProduct: string;
}

const Statistics = ({
  totalSales,
  totalRevenue,
  bestSellingProduct,
}: StatisticsProps) => {
  return (
    <div className="flex flex-wrap -mx-3">
      <div className="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/3">
        <div className="relative flex flex-col min-w-0 break-words bg-white rounded-lg">
          <div className="flex-auto p-4">
            <div className="flex flex-row -mx-3">
              <div className="flex-none w-2/3 max-w-full px-3">
                <div>
                  <p className="mb-0 font-sans text-sm font-semibold leading-normal capitalize">
                    Total Sales
                  </p>
                  <h5 className="font-bold">{totalSales}</h5>
                </div>
              </div>
              <div className="px-3 ml-auto">
                <div className="flex items-center justify-center w-12 h-12 text-center bg-orange-500 rounded-lg">
                  <AiOutlineLineChart className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/3">
        <div className="relative flex flex-col min-w-0 break-words bg-white rounded-lg">
          <div className="flex-auto p-4">
            <div className="flex flex-row -mx-3">
              <div className="flex-none w-2/3 max-w-full px-3">
                <div>
                  <p className="mb-0 font-sans text-sm font-semibold leading-normal capitalize">
                    Total Revenue
                  </p>
                  <h5 className="font-bold">
                    $
                    {totalRevenue.toLocaleString("en-US", {
                      maximumFractionDigits: 2,
                    })}
                  </h5>
                </div>
              </div>
              <div className="px-3 ml-auto">
                <div className="flex items-center justify-center w-12 h-12 text-center rounded-lg bg-emerald-500">
                  <BsCashCoin className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/3">
        <div className="relative flex flex-col min-w-0 break-words bg-white rounded-lg">
          <div className="flex-auto p-4">
            <div className="flex flex-row -mx-3">
              <div className="flex-none w-2/3 max-w-full px-3">
                <div>
                  <p className="mb-0 font-sans text-sm font-semibold leading-normal capitalize">
                    Best Selling Product
                  </p>
                  <h5 className="font-bold">{bestSellingProduct ? bestSellingProduct : "-"}</h5>
                </div>
              </div>
              <div className="px-3 ml-auto">
                <div className="flex items-center justify-center w-12 h-12 text-center rounded-lg bg-sky-500">
                  <IoCartOutline className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
