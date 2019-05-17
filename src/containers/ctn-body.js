import React, { Component } from 'react';
import request from 'request';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import fetchData from '../actions/actions';
// import canvas
import CanvasJSReact from '../components/canvasjs.react';

// import action


class Body extends Component {
    componentDidMount() {
        const options = {
            url: 'http://localhost:5000/sorted-report',
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
       const dataPoint = this.props.data.map( data => {
           return {
               y: data.times,
               label: data.number
           }
       });

       return dataPoint;
    }
   
    render() {
        const { CanvasJSChart } = CanvasJSReact;
        // canvast option
        const canvasOptions = {
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
			},
            data: [{
                type: "bar",
                dataPoints: this.integrateData()
            }]
        }
        return (
            <div>
                <h3>Body goes here</h3>

                <CanvasJSChart options = {canvasOptions}
				/* onRef={ref => this.chart = ref} */
			    />
            </div>
        )
    }
}

const mapStateToProp = (state) => {
    return {
        data: state.data
    }
};

const mapDispatchToProp = (dispatch) => {
    return {
        fetchData: bindActionCreators(fetchData, dispatch)
    }
}
export default connect(mapStateToProp, mapDispatchToProp)(Body);