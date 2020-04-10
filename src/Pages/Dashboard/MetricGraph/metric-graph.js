import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceArea
} from 'recharts';
import Select from 'react-select';
import moment from 'moment';
import Switch from "react-switch";
import { metricCalculation } from '../../../Helpers/metric_calculation';
import AxisLabel from '../../../Components/axis_label';

const metricType = [
  { label: "Heart Rate", value: "heart_rate", yaxis: "hr_y_axis" },
  { label: "Elevation", value: "altitude", yaxis: "elv_y_axis" },
  { label: "Speed", value: "speed", yaxis: "speed_y_axis" },
  { label: "Pace", value: "pace", yaxis: "pace_y_axis" },
];

const data = [];
let initialState = {
  data,
  left: 'dataMin',
  right: 'dataMax',
  refAreaLeft: '',
  refAreaRight: '',
  top: 'dataMax+70',
  bottom: 'dataMin-50',
  top2: 'dataMax+20',
  bottom2: 'dataMin-20',
  top3: 'dataMax+20',
  bottom3: 'dataMin-20',
  top4: 'dataMax+20',
  bottom4: 'dataMin-20',
  animation: true,
  selectedXAxis: true,
  isLoading: false,
};

export default class MetricGraph extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/zjb47e83/';

  constructor(props) {
    super(props);
    initialState.data = this.props.lapData;
    this.state = initialState;
    this.switchXAxis = this.switchXAxis.bind(this);
  }

  switchXAxis(selectedXAxis) {
    this.zoomOut();
    this.setState({ selectedXAxis });
  }

  //Default Metric Selection
  selectedMetric = [metricType[0], metricType[1]];

  //metric selection dropdown
  metricSelection = (selectedOption) => {
    console.log(selectedOption);
    // this.selectedMetric.push(selectedOption)
    this.selectedMetric = selectedOption;
    console.log(this.selectedMetric);
    var { isLoading } = this.state;
    this.setState(() => ({
      isLoading: !isLoading
    }));

  }

  getAxisYDomain = (from, to, ref, offset) => {
    const refData = this.state.data;
    let [bottom, top] = [refData[0][ref], refData[0][ref]];
    refData.forEach((d) => {
      if (d[ref] > top && d[ref] != null) top = d[ref];
      if (d[ref] < bottom && d[ref] != null) bottom = d[ref];
    });
    bottom = Math.floor(bottom);
    top = Math.floor(top);
    return [(bottom | 0) - offset, (top | 0) + offset];
  };

  zoom() {

    let { refAreaLeft, refAreaRight, data, selectedXAxis } = this.state;
    console.log('Zoom');
    console.log(selectedXAxis);
    if (refAreaLeft === refAreaRight || refAreaRight === '') {
      this.setState(() => ({
        refAreaLeft: '',
        refAreaRight: '',
      }));
      return;
    }

    // xAxis domain
    if (refAreaLeft > refAreaRight) [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft];

    // yAxis domain
    const [bottom, top] = this.getAxisYDomain(refAreaLeft, refAreaRight, 'heart_rate', 50);
    const [bottom2, top2] = this.getAxisYDomain(refAreaLeft, refAreaRight, 'altitude', 50);
    const [bottom3, top3] = this.getAxisYDomain(refAreaLeft, refAreaRight, 'speed', 50);
    const [bottom4, top4] = this.getAxisYDomain(refAreaLeft, refAreaRight, 'speed', 50);

    console.log('ZOOM CALL BACK CALLed');
    console.log({ refAreaLeft, refAreaRight });
    this.setState(() => ({
      refAreaLeft: '',
      refAreaRight: '',
      data: data.slice(),
      left: refAreaLeft,
      right: refAreaRight,
      bottom,
      top,
      bottom2,
      top2,
      bottom3,
      top3,
      bottom4,
      top4,
      selectedXAxis,
    }));
  }

  zoomOut() {
    console.log('ZOOM out  CALLed');
    console.log('LOAD Initial State');
    const { data } = this.state;
    this.setState(() => ({
      data: data.slice(),
      refAreaLeft: '',
      refAreaRight: '',
      left: 'dataMin',
      right: 'dataMax',
      top: 'dataMax+70',
      bottom: 'dataMin-50',
      top2: 'dataMax+20',
      bottom2: 'dataMin-20',
      top3: 'dataMax+20',
      bottom3: 'dataMin-20',
      top4: 'dataMax+20',
      bottom4: 'dataMin-20',
    }));
  }

  getXaxis = (data) => { return metricCalculation.getXaxis(data.elapsed_time, this.props.totalElapsedTime); }
  getPace = (data) => { return metricCalculation.getPaceKPH(data.speed); }
  getSpeed = (data) => { return metricCalculation.getSpeedKPH(data.speed); }
  getHeartRate = (data) => { return metricCalculation.getHeartRate(data.heart_rate); }
  getElevation = (data) => { return metricCalculation.getElevation(data.altitude); }

  render() {
    var isHeartRateSelected = this.selectedMetric != null 
        ? this.selectedMetric.some(data => data.value == "heart_rate") 
        : false;
    var isElevationSelected = this.selectedMetric != null 
        ? this.selectedMetric.some(data => data.value == "altitude")
        : false;
    var isSpeedSelected = this.selectedMetric != null 
        ? this.selectedMetric.some(data => data.value == "speed")
        : false;
    var isPaceSelected = this.selectedMetric != null 
        ? this.selectedMetric.some(data => data.value == "pace")
        : false;

    const {
      data, barIndex, left, right, refAreaLeft, refAreaRight, top, bottom, top2, bottom2,
      top3, bottom3, top4, bottom4, selectedXAxis, isLoading
    } = this.state;
    
    return (
      <div className="highlight-bar-charts" style={{ userSelect: 'none' }}>
        <div className="row">
          <div className="col-md-2">
            <Switch
              width={120}
              offColor="#4D4084"
              onColor="#F3CE3D"
              checked={this.state.selectedXAxis}
              onChange={this.switchXAxis}
              defaultValue={true}
              uncheckedIcon={
                <div className="uncheck-switch">
                  Distance
                </div>
              }
              checkedIcon={
                <div className="check-switch">
                  Time
                </div>
              }
              className="react-switch"
              id="icon-switch"
            />
          </div>
          <div className="col-md-4">
            <button
              className="btn update btn-primary"
              onClick={this.zoomOut.bind(this)}>
              Zoom Out
            </button>
          </div>
          <div className="col-md-4">
            <Select options={metricType} defaultValue={this.selectedMetric} isMulti={true} onChange={this.metricSelection} />
          </div>
        </div>


        <LineChart
          width={1000}
          height={500}
          data={data}
          onMouseDown={e => this.setState({ refAreaLeft: e.activeLabel })}
          onMouseMove={e => this.state.refAreaLeft && this.setState({ refAreaRight: e.activeLabel })}
          onMouseUp={this.zoom.bind(this)}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <Legend layout="horizontal" verticalAlign="top" align="center" />
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            allowDataOverflow
            tickFormatter={seconds => Math.floor(moment.duration(seconds, 'seconds').asHours()) + ':' + moment.duration(seconds, 'seconds').minutes()}
            dataKey={this.state.selectedXAxis ? "elapsed_time" : "elapsed_time"}
            type="number"
            label={<AxisLabel axisType="xAxis" stroke="#6d889c" x={500} y={480} width={0} height={0}>Time(HH:MM)</AxisLabel>}
            domain={[left, right]} />

          {isHeartRateSelected ? (<YAxis
            allowDataOverflow
            yAxisId="hr_y_axis"
            allowDecimals={false}
            type="number"
            stroke="#525c2d"
            domain={[bottom, top]}
            label={{ value: "Heart Rate", position: "insideRight", angle: -90, dy: 20 }}
          // label={<AxisLabel axisType="yAxis" stroke="#525c2d" x={100} y={200} width={0} height={0}>Heart Rate</AxisLabel>}
          />) : null}
          {isElevationSelected ? (<YAxis
            allowDataOverflow
            yAxisId="elv_y_axis"
            allowDecimals={false}
            stroke="#e87743"
            domain={[bottom2, top2]}
            label={{ value: "Elevation", position: "insideRight", angle: -90, dy: 20 }}
          // type="number"
          // label={<AxisLabel axisType="yAxis" stroke="#e87743" x={30} y={200} width={0} height={0}>Elevation</AxisLabel>}
          />) : null}
          {isSpeedSelected ? (<YAxis
            allowDataOverflow
            yAxisId="speed_y_axis"
            allowDecimals={false}
            stroke="#662e4f"
            orientation="right"
            // type="number"
            domain={[bottom3, top3]}
            label={{ value: "Speed", position: "insideLeft", angle: -90, dy: 20 }}
          //label={<AxisLabel axisType="yAxis" stroke="#662e4f" x={885} y={200} width={0} height={0}>Speed</AxisLabel>}
          />) : null}
          {isPaceSelected ? (<YAxis
            allowDataOverflow
            yAxisId="pace_y_axis"
            stroke="#6d889c"
            orientation="right"
            domain={[bottom4, top4]}
            label={{ value: "Pace", position: "insideLeft", angle: -90, dy: 20 }}
          // label={<AxisLabel axisType="yAxis" stroke="#6d889c" x={945} y={200} width={0} height={0}>Pace</AxisLabel>}
          />) : null}
          <Tooltip />

          {isHeartRateSelected ? (
            <Line yAxisId="hr_y_axis" type="monotone" name="HR" dataKey={this.getHeartRate} stroke="#525c2d" activeDot={{ r: 8 }} dot={false} unit=" (bpm)" />
          ) : null}
          {isElevationSelected ? (
            <Line yAxisId="elv_y_axis" type="monotone" name="Elevation" dataKey={this.getElevation} stroke="#e87743" activeDot={{ r: 8 }} dot={false} unit=" (m)" />
          ) : null}
          {isSpeedSelected ? (
            <Line yAxisId="speed_y_axis" type="monotone" name="Speed" dataKey={this.getSpeed} stroke="#662e4f" activeDot={{ r: 8 }} dot={false} unit=" (kph)" />
          ) : null}
          {isPaceSelected ? (
            <Line yAxisId="pace_y_axis" type="monotone" name="Pace" dataKey={this.getPace} stroke="#6d889c" activeDot={{ r: 8 }} dot={false} unit=" (min/km)" />
          ) : null}

          {
            (refAreaLeft && refAreaRight) ? (
              <ReferenceArea yAxisId={this.selectedMetric.length >= 1 ? this.selectedMetric[0].yaxis : "elv_y_axis"} x1={refAreaLeft} x2={refAreaRight} strokeOpacity={0.3} />) : null
          }
        </LineChart>

        <div>
          Selected Area : Left <b>{left}</b> , Right <b>{right}</b>
        </div>
      </div>
    );
  }
}
