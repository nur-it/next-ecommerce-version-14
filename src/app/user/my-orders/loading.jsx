import Skeleton from "react-loading-skeleton";

const loading = () => {
  return (
    <div className="w-full bg-white mt-4 lg:mt-0 p-4 sm:p-5 lg:p-8 rounded-md overflow-hidden">
      <div>
        <Skeleton count={1} height={30} width={100} />
      </div>

      <div>
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item + 1} className="py-2">
            <Skeleton count={1} height={30} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default loading;
