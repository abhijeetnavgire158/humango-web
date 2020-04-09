import React from 'react';
import MetricGraph from './MetricGraph/metric-graph';
import { activityService } from '../../Services/activity-service';
import Loader from '../../Components/Shared/loader';
import "./styles.scss";

class Dashboard extends React.Component {

  constructor() { 
    super(); 
    this.state = { lapData: [], isGraphLoading: false, totalElapsedTime: 0 } 
  }

  async componentDidMount() {
    this.setState({ isGraphLoading: true });
    if (typeof fetch == 'undefined') return
    const response = await activityService.fetchLapRecords(52735164156, 4165820);

    console.dir({ response })

    this.setState({ lapData: response.lap_records, isGraphLoading: false, totalElapsedTime: 7823 });
    
  }

  render() {
    return (
      <div className="metric-graph container">
        <div className="row">
          <div className="col-md-12 heading">
            <h2>Dashboard Page!</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 graph-conetent">
            {this.state.isGraphLoading 
            ? <Loader />
            : <MetricGraph lapData={this.state.lapData} totalElapsedTime={this.state.totalElapsedTime}/>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;