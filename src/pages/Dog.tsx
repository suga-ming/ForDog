import React from "react";

const Dog = () => {
  return (
    <div className="pt-16 ">
      <div className="flex flex-col mt-7">
        <div className="flex flex-col items-center mb-3">
          <div className="w-36 h-36 bg-orange-300 rounded-full mb-4" />
          <div className="text-3xl font-semibold">슈가밍</div>
        </div>
        <div className="flex justify-center">
          <div className="flex items-center px-5 py-3 bg-white">
            <div className="mr-1 font-medium">게시물:</div>
            <div className="font-semibold">0</div>
          </div>
          <div className="flex items-center px-5 py-3 bg-white">
            <div className="mr-1 font-medium">펫친:</div>
            <div className="font-semibold">0</div>
          </div>
        </div>
      </div>
      <div className="flex justify-center px-20 mt-10">
        <div className="w-56 h-56 bg-red-300 mr-5" />
        <div className="w-56 h-56 bg-red-300 mr-5" />
        <div className="w-56 h-56 bg-red-300 mr-5" />
        <div className="w-56 h-56 bg-red-300" />
      </div>
      <div className="flex justify-center px-20 mt-5">
        <div className="w-56 h-56 bg-red-300 mr-5" />
        <div className="w-56 h-56 bg-red-300 mr-5" />
        <div className="w-56 h-56 bg-red-300 mr-5" />
        <div className="w-56 h-56 bg-red-300" />
      </div>
    </div>
  );
};

export default Dog;
