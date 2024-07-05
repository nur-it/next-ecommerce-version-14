import Skeleton from "react-loading-skeleton";

const loading = () => {
  return (
    <section>
      <div className="container mx-auto py-5 max-w-screen-2xl px-3 space-y-4 sm:px-10">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
          <div className="flex gap-5">
            <div className={`w-full`} key={item + 1}>
              <Skeleton count={1} height={50} />
            </div>

            <div className={`w-full`} key={item + 1}>
              <Skeleton count={1} height={50} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default loading;
