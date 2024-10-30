import React from "react";
import { useState } from "react";
import { getCourseReserve } from "../../../../services/api/home/course-reserve-api";
import ReserveTable from "./ReserveTable";
import { useEffect } from "react";

const CourseReserve = () => {
 

  return (
    <div>
      <ReserveTable
        dataToShow={courseReserveList}
        // courseReserveList={courseReserveList}
        // onFilterChange={handleFilterChange}
        // filter={filter}
      />
    </div>
  );
};

export default CourseReserve;
