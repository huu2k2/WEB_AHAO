import image from "@assets/2.jpg";

export const ElectricityMeter = ({ pow, vol, amp }) => {
  return (
    <>
      <div className="flex items-center justify-center">
        <div className="bg-white shadow-md rounded-lg p-4 flex items-center">
          <div className="flex items-center justify-center  p-4 rounded-lg">
            <img
              src={image}
              alt="Electricity Meter"
              className="h-24 w-24 object-cover"
            />
          </div>
          <div className="ml-6 space-y-4">
            <div className="bg-gray-100 p-2 rounded-lg shadow-sm text-lg">
              {pow} kw/h
            </div>
            <div className="bg-gray-100 p-2 rounded-lg shadow-sm text-lg">
              {vol} V
            </div>
            <div className="bg-gray-100 p-2 rounded-lg shadow-sm text-lg">
              {amp} A
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
