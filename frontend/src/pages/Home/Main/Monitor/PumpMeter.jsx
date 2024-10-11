import image from "@assets/1.jpg";

export const PumpMeter = ({ tpump1, tpump2 }) => {
  return (
    <>
      <div className="flex items-center justify-center">
        <div className="bg-white shadow-md p-4 flex items-center rounded-lg">
          <div className="flex items-center justify-center p-4 rounded-lg">
            <img
              src={image}
              alt="Electricity Meter"
              className="h-24 w-24 object-cover"
            />
          </div>
          <div className="ml-6 space-y-4">
            <div className="bg-gray-100 p-2 rounded-lg shadow-sm text-lg">
              Bơm 1: {tpump1} h
            </div>
            <div className="bg-gray-100 p-2 rounded-lg shadow-sm text-lg">
              Bơm 2: {tpump2} h
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
