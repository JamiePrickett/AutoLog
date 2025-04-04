import React from "react";
import { Dimensions, View } from "react-native";
import { LineChart } from "react-native-gifted-charts";

const deviceWidth = Dimensions.get("window").width;
const chartWidth = deviceWidth - 100;

type chartData = {
  value: number;
  label: string;
  dataPointText?: string;
};

type Props = {
  data: chartData[];
  maxValue?: number;
};

const LineChartComp = ({ data, maxValue = 5 }: Props) => {
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <LineChart
      data={data} // data..
      width={chartWidth} // width
      height={200} // height
      maxValue={maxValue} // max Y Value
      noOfSections={5} // number of y axis sections
      stepValue={maxValue / 5} // y axis increase by value //TODO: overrides noOfSections..
      // adjustToWidth // Adjusts to parent width
      // stepChart // removes angle of lines //TODO: make option i think
      hideRules // hides x axis rules
      color={"#F4743A"} // line color
      dataPointsRadius={4} // data point size
      dataPointsColor={"#FBAF40"} // data points color
      yAxisTextStyle={{ color: "#F5F5F5" }}
      yAxisColor={"#EF4336"}
      yAxisThickness={2}
      roundToDigits={0}
      yAxisLabelPrefix="$"
      xAxisLabelTextStyle={{ color: "#F5F5F5" }}
      xAxisColor={"#EF4336"}
      xAxisThickness={2}
      showVerticalLines
      verticalLinesColor="#AC603D"
      thickness={3}
      textColor="#F5F5F5"
      textFontSize={16}
      textShiftY={-5}
      textShiftX={5}
    />
  );
};

export default LineChartComp;
