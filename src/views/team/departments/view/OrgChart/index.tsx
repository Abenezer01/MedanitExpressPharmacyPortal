// pages/index.tsx
import React, { useEffect, useState } from "react";
import departmentApiService from "src/services/team/department-service";
import { defaultGetRequestParam } from "src/types/requests";
import Department from "src/types/team/department";
import OrgChartComponent from "src/views/components/org-chart";
import Page from "src/views/components/page/page";

const DepartmentOrgChart = ({ department }: { department: Department }) => {
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    // Fetch or set your data here
    const fetchData = async () => {
      try {
        const response = await departmentApiService.getDepartmentStructure(
          department.id,
          defaultGetRequestParam,
        );
        const data = await response.payload;

        setChartData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Page titleId="department-org-chart">
      <OrgChartComponent data={chartData} />
    </Page>
  );
};

export default DepartmentOrgChart;
