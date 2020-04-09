import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { metricCalculation } from '../../../Helpers/metric_calculation';
import AxisLabel from '../../../Components/axis_label';

export default class MetricGraph extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/zjb47e83/';

  constructor(props) {
    super(props);
  }

  getXaxis = (data) => { return  metricCalculation.getXaxis(data.elapsed_time, this.props.totalElapsedTime);  }
  getPace = (data) => { return  metricCalculation.getPaceKPH(data.speed);  }
  getSpeed = (data) => { return metricCalculation.getSpeedKPH(data.speed); }
  getHeartRate = (data) => { return metricCalculation.getHeartRate(data.heart_rate); }
  getElevation = (data) => { return metricCalculation.getElevation(data.altitude); }

  render() {
    console.log('LAP RECORDS');
    console.log(this.props.lapData);
    return (
      <LineChart
        width={1000}
        height={500}
        data={this.props.lapData}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <Legend layout="horizontal"  verticalAlign="top" align="center" />
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={this.getXaxis} label={<AxisLabel axisType="xAxis" stroke="#6d889c" x={500} y={480} width={0} height={0}>Seconds</AxisLabel>} />
        <YAxis yAxisId="left" stroke="#525c2d"  domain={[50, 180]}  label={<AxisLabel axisType="yAxis" stroke="#525c2d" x={100} y={200} width={0} height={0}>Heart Rate</AxisLabel>}/>
        <YAxis yAxisId="left2" stroke="#e87743" domain={[1700, 1800]}  label={<AxisLabel axisType="yAxis" stroke="#e87743" x={30} y={200} width={0} height={0}>Elevation</AxisLabel>} />
        <YAxis yAxisId="right" stroke="#662e4f" orientation="right"  label={<AxisLabel axisType="yAxis" stroke="#662e4f" x={885} y={200} width={0} height={0}>Speed</AxisLabel>}/>
        <YAxis yAxisId="right2" stroke="#6d889c" orientation="right" label={<AxisLabel axisType="yAxis" stroke="#6d889c" x={945} y={200} width={0} height={0}>Pace</AxisLabel>}/>
        <Tooltip />
        
        <Line yAxisId="left" type="monotone"  name="HR" dataKey={this.getHeartRate} stroke="#525c2d" activeDot={{ r: 8 }}  dot={false} unit=" (bpm)"/>
        <Line yAxisId="left2" type="monotone"  name="Elevation" dataKey={this.getElevation} stroke="#e87743" activeDot={{ r: 8 }} dot={false} unit=" (m)" />
        <Line yAxisId="right" type="monotone"  name="Speed" dataKey={this.getSpeed} stroke="#662e4f" activeDot={{ r: 8 }} dot={false} unit=" (kph)" />
        <Line yAxisId="right2"  type="monotone"  name="Pace"  dataKey={this.getPace} stroke="#6d889c" activeDot={{ r: 8 }} dot={false} unit=" (min/km)" />
      </LineChart>
    );
  }
}
