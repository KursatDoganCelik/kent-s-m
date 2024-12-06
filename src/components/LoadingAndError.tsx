const Loading: React.FC = () => {
  return (
    <div className="mt-20 text-center">
      <h2 className="text-2xl font-semibold">Loading...</h2>
      <p className="text-gray-600">Loading products, please wait a moment.</p>
    </div>
  );
};

const Error: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className="mt-20 text-center text-red-600">
      <h2 className="text-2xl font-semibold">Error</h2>
      <p>{message}</p>
      <p>Try refreshing the page or check your internet connection.</p>
    </div>
  );
};

export { Loading, Error };
