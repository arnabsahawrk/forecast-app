const LocationModal = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-950/60">
      <div className="h-75 w-100 bg-gray-100 shadow-2xl rounded-2xl">
        <h2 className="text-xl font-medium">Where are you today?</h2>
      </div>
    </div>
  );
};

export default LocationModal;
