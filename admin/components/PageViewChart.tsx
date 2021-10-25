import { ReactElement, useEffect, useState } from "react";
import { Button, Modal, Tooltip } from "antd";
import { Line } from "@ant-design/charts";
import { AliasedLinkType } from "utils";
import { dateToString, generateTimeSeries } from "utils/date";

interface PageViewChartProps {
  aliasedLink: AliasedLinkType;
}

interface ChartEntry {
  date: string;
  hits: number;
}

export default function PageViewChart(props: PageViewChartProps): ReactElement {
  const { aliasedLink } = props;
  const { hits, name } = aliasedLink;
  const [modal, setModal] = useState(false);
  const [chartEntries, setChartEntries] = useState<ChartEntry[]>([]);

  useEffect(() => {
    const timeSeries = generateTimeSeries(hits);

    setChartEntries(
      timeSeries.map(({ date, instances }) => ({
        hits: instances,
        date: dateToString(date),
      }))
    );
  }, [hits]);

  function toggleModal(): void {
    setModal((prevModal) => !prevModal);
  }

  return (
    <>
      <Tooltip title="Click to view chart.">
        <Button onClick={toggleModal}>
          {hits.length} view{hits.length !== 1 ? "s" : ""}
        </Button>
      </Tooltip>
      <Modal
        visible={modal}
        closable={false}
        onCancel={toggleModal}
        footer={[
          <Button type="primary" key="back" onClick={toggleModal}>
            Exit
          </Button>,
        ]}
      >
        <h3>{name}</h3>
        <Line
          data={chartEntries}
          xField="date"
          yField="hits"
          meta={{ hits: { alias: "Page views" } }}
          xAxis={{ title: { text: "Date" } }}
          yAxis={{ title: { text: "Page views" } }}
        />
      </Modal>
    </>
  );
}
