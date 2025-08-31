import { useEffect, useRef, useState } from "react";
import ReactDOMServer from "react-dom/server";
import StructureCard from "./card";

const Obs = (props: any) => {
  const d3Container = useRef<HTMLDivElement>(null);

  const [data, setData] = useState<any>(null);
  const [chart, setChart] = useState<any>(null);

  useEffect(() => {
    const initializeChart = async () => {
      const { OrgChart } = await import("d3-org-chart");
      setChart(new OrgChart<any>());
    };

    setData(props.data);

    if (data && d3Container.current) {
      if (!chart) {
        initializeChart();

        return;
      }

      chart
        .container(d3Container.current)
        .data(data)
        .nodeWidth(() => 225)
        .nodeHeight(() => 110)
        .initialZoom(0.7)
        .siblingsMargin(() => 50)
        .childrenMargin(() => 75)
        .neighbourMargin(() => 100)
        .childrenMargin(() => 60)
        .compactMarginBetween(() => 35)
        .compactMarginPair(() => 80)
        .onNodeClick((d: any) => {
          console.log(d, "Id of clicked node ");
        })
        .nodeContent(function (d: any) {
          return ReactDOMServer.renderToStaticMarkup(<StructureCard d={d} />);
        })
        .render();
    }

    return () => {
      // Cleanup logic if needed
      if (chart) {
        // For example: chart.destroy();
      }
    };
  }, [data, d3Container.current, chart, props.data, props.showAvatar]);

  return <div ref={d3Container} />;
};

export default Obs;
