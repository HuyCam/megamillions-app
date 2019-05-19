import React, { Component } from 'react';
import request from 'request';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import action
import { fetchData } from '../actions/actions';
// import canvas
import CanvasJSReact from '../components/canvasjs.react';


class Body extends Component {
    componentDidMount() {
        const options = {
            url: 'http://localhost:5000/sorted-gold-ball-report',
            headers: {
              'Access-Control-Allow-Origin': '*',
            }
          };
        
        request(options, (err, res, body) => {
            if (err) {
                return console.log('err: ', err);
            }
            this.props.fetchData(JSON.parse(body));
        });
    }

    addSymbols(e){
        const { CanvasJS } = CanvasJSReact;
		let suffixes = ["", "K", "M", "B"];
		let order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
		if(order > suffixes.length - 1)
			order = suffixes.length - 1;
		let suffix = suffixes[order];
		return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
    }
    
    // this return data to dataPoint for the graph to render
    integrateData() {
        const filteredData = this.props.data.filter((data, index) => {
            if ( index < 10) {
                return true;
            } else {
                return false;
            }
        });

       const dataPoint = filteredData.map( data => {
           return {
               y: data.times,
               label: data.number
           }
       });

       return dataPoint;
    }
   
    render() {
        console.log(this.props.state);
        const { CanvasJSChart } = CanvasJSReact;
        // canvast option
        const canvasOptions = {
            height: 700,
            animationEnabled: true,
            theme: "light2",
            title:{
                text: "Numbers probability"
            },
            axisY: {
                title: "Numbers recurring probability",
                labelFormatter: this.addSymbols,
                labelAutoFit: true
            },
            axisX: {
                reversed: true,
                interval: 1
			},
            data: [{
                type: "bar",
                dataPoints: this.integrateData()
            }]
        }
        return (
            <div>
                <div className="canvas">
                <CanvasJSChart options = {canvasOptions}
				/* onRef={ref => this.chart = ref} */
			    />
                </div>
            </div>
        )
    }
}

const mapStateToProp = (state) => {
    return {
        data: state.data,
        state: state
    }
};

const mapDispatchToProp = (dispatch) => {
    return {
        fetchData: bindActionCreators(fetchData, dispatch)
    }
}
export default connect(mapStateToProp, mapDispatchToProp)(Body);