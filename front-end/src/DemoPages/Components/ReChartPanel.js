import React, { Component } from 'react';
import { Card, CardBody, CardTitle, Col } from 'reactstrap';
import {
    Area, AreaChart, Bar, BarChart, CartesianGrid, ComposedChart, Legend, Line,
    LineChart, Pie, PieChart, ReferenceLine, ResponsiveContainer, Scatter, ScatterChart,
    Tooltip, XAxis, YAxis, Label
} from 'recharts';

// http://recharts.org/en-US/examples/LineChartWithReferenceLines

class ReChartPanel extends Component {

    getMax(attr, data) {
        if (data !== undefined && data.length > 0) {
            let max = data[0][attr];
            for (let i = 1; i < data.length; i++) {
                const datum = data[i];
                if (datum[attr] > max) {
                    max = datum[attr];
                }
            }
            return max;
        }
    }

    renderChart(chart_type, first_attr, second_attr, third_attr, fourth_attr, composed_line_attr, data, brush, y_label, y_label_2) {


        let label, label_2;
        if (y_label !== '') {
            label = { value: y_label, angle: -90, position: 'insideLeft' };
        } else {
            label = "";
        }

        if (y_label_2 !== '') {
            label_2 = { value: y_label_2, angle: 90, position: 'insideRight' };
        } else {
            label_2 = "";
        }

        let name = "";
        if (first_attr === "carbohydrates") name = "carbs";
        // else if (first_attr === "restingHeartRate") name = "Resting HR (bpm)";

        if (chart_type === "Line") {

            let first_max, second_max, third_max;
            if (data !== undefined && data.length > 0) {
                if (first_attr) first_max = this.getMax(first_attr, data);
                if (second_attr) second_max = this.getMax(second_attr, data);
                if (third_attr) third_max = this.getMax(third_attr, data);
            }

            let ret = <YAxis label={label} />;
            if (first_attr === 'restingHeartRate') {
                ret = <YAxis domain={[40, 80]} label={label} />;
            } else if (first_attr === 'calories') {
                ret = <YAxis domain={[0, 5000]} label={label} />;
            }

            return (<LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 20, right: 50, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                {
                    (first_attr !== 'bpm')
                        ? <XAxis dataKey="date" />
                        : <XAxis dataKey="time" />
                }
                {
                    ret
                }

                <Tooltip />
                {
                    (first_max && first_attr !== 'restingHeartRate' && first_attr !== 'bpm')
                        ? <ReferenceLine y={first_max} stroke="red" label={"max"} />
                        : <div />
                }
                {
                    (second_max)
                        ? <ReferenceLine y={second_max} stroke="red" label={"max"} />
                        : <div />
                }
                {
                    (third_max)
                        ? <ReferenceLine y={third_max} stroke="red" label={"max"} />
                        : <div />
                }

                <Line type="monotone"
                    dataKey={first_attr}
                    name={(name !== "") ? name : first_attr}
                    stroke="#8884d8"
                    dot={false}
                />
                {
                    second_attr ?
                        <Line type="monotone"
                            dataKey={`${second_attr}`}
                            name={(second_attr === "carbohydrates") ? "carbs" : second_attr}
                            stroke="#82ca9d"
                            dot={false}
                        />
                        :
                        <div />
                }
                {/* {
                    (first_attr !== "restingHeartRate")
                    ? <Legend wrapperStyle={{ lineHeight: '40px' }} />
                    : <div />
                } */}
            </LineChart>
            )
        }
        else if (chart_type === "Brush") {
            return (
                <BarChart
                    width={400}
                    height={300}
                    data={data}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis label={label} />
                    <Tooltip />
                    <Legend />
                    <ReferenceLine y={0} stroke="#000" />
                    {/* {
                        (brush)
                            ? <Brush dataKey="date" height={30} stroke="#8884d8" />
                            : <div />
                    } */}
                    <Bar
                        dataKey={`${first_attr}`}
                        fill="#8884d8"
                        dot={false}
                        name={(first_attr === "carbohydrates") ? "carbs" : first_attr}
                    />
                    <Bar
                        dataKey={`${second_attr}`}
                        fill="#82ca9d"
                        dot={false}
                        name={(second_attr === "carbohydrates") ? "carbs" : second_attr}
                    />
                    <Bar
                        dataKey={`${third_attr}`}
                        fill="#ffa500"
                        dot={false}
                        name={(third_attr === "carbohydrates") ? "carbs" : third_attr}
                    />
                </BarChart>
            );
        } else if (chart_type === "Scatter") {
            return (
                <ScatterChart
                    width={700}
                    height={400}
                    margin={{
                        top: 20, right: 20, bottom: 20, left: 20,
                    }}
                >
                    <CartesianGrid />
                    <XAxis type="number" dataKey="x" name="stature" unit="cm" />
                    <YAxis type="number" dataKey="y" name="weight" unit="kg" label={label} />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter name="A school" data={data} fill="#8884d8" />
                </ScatterChart>
            );
        } else if (chart_type === "Composed") {
            return (
                <ComposedChart width={400} data={data}
                >
                    <CartesianGrid stroke='#f5f5f5' />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" label={label} />
                    <YAxis yAxisId="right" orientation="right" label={label_2} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone"
                        dataKey={`${composed_line_attr}`}
                        stroke="#8884d8"
                        yAxisId="right"
                        dot={false}
                        name="Total Time In Bed"
                    />
                    <Bar yAxisId="left" dataKey={first_attr} barSize={20} fill='#413ea0' name={first_attr.toUpperCase()} />
                    <Bar yAxisId="left" dataKey={second_attr} barSize={20} fill='#ee9a00' name={second_attr.toUpperCase()} />
                    <Bar yAxisId="left" dataKey={third_attr} barSize={20} fill='#8884d8' name={third_attr.toUpperCase()} />
                    <Bar yAxisId="left" dataKey={fourth_attr} barSize={20} fill='#82ca9d' name={fourth_attr.toUpperCase()} />

                </ComposedChart>
            );
        } else if (chart_type === "Pie") {
            return (
                <PieChart width={400} height={400}>
                    <Pie isAnimationActive={false}
                        data={data}
                        cx={200}
                        cy={200}
                        outerRadius={80}
                        fill="#8884d8"
                        label
                    />
                    <Tooltip />
                </PieChart>
            );
        } else if (chart_type === "Area") {
            return (
                <AreaChart
                    width={500}
                    height={400}
                    data={data}
                    margin={{
                        top: 10, right: 30, left: 25, bottom: 0,
                    }}
                    padding={{
                        top: 10, right: 30, left: 25, bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis label={label} />
                    <Legend />
                    <Tooltip />
                    <Area type="monotone" dataKey={first_attr} stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
            );
        } else if (chart_type === "Bi-Line") {
            return (
                <LineChart
                    width={500}
                    height={400}
                    data={data}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timestamp" />
                    <YAxis yAxisId="left" orientation="right" stroke="#82ca9d" label={label_2} />
                    <YAxis yAxisId="right" stroke="#8884d8" label={label} />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey={first_attr} stroke="#82ca9d" dot={false} domain={[200, 600]} />
                    <Line yAxisId="right" type="monotone" dataKey={second_attr} stroke="#8884d8" dot={false} domain={[45, 190]} />
                </LineChart>
            )
        } else if (chart_type === "BF-Scatter") {
            {/* margin={{
                        top: 20, right: 20, bottom: 20, left: 20,
                    }} */}
            return (
                <ScatterChart
                    width={400}
                    height={400}
                >
                    <CartesianGrid />
                    <XAxis type="number" dataKey={first_attr} name="Avg Speed" />
                    <YAxis type="number" dataKey={second_attr} name="Avg Heart Rate" domain={[40, 200]} label={label} />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Legend />
                    <Scatter data={data} name="Best Fit" fill="#8884d8" line={{ stroke: 'red', strokeWidth: 2, lineType: 'fitting' }} />
                </ScatterChart>
            );
        }
        // else if (chart_type === "Synchronized") {
        //     return (
        //         <div>

        //             <Col lg="12" xl="4">
        //                 <Card className="main-card mb-3">
        //                     <CardBody>
        //                         <CardTitle>
        //                             Heart Rate
        //                             </CardTitle>
        //                         <ReChartPanel
        //                             data={data}
        //                             chart_type={"Line"}
        //                             brush={false}
        //                             first_attr={"avg_heart_rate"}
        //                         />
        //                     </CardBody>
        //                 </Card>
        //             </Col>
        //             <Col lg="12" xl="4">
        //                 <Card className="main-card mb-3">
        //                     <CardBody>
        //                         <CardTitle>
        //                             Elevation
        //                             </CardTitle>
        //                         <ReChartPanel
        //                             data={data}
        //                             chart_type={"Line"}
        //                             brush={false}
        //                             first_attr={"total_climb"}
        //                         />
        //                     </CardBody>
        //                 </Card>
        //             </Col>
        //             <Col lg="12" xl="4">
        //                 <Card className="main-card mb-3">
        //                     <CardBody>
        //                         <CardTitle>
        //                             Wind Speed
        //                             </CardTitle>
        //                         <ReChartPanel
        //                             data={data}
        //                             chart_type={"Line"}
        //                             brush={false}
        //                             first_attr={"wind_speed"}
        //                         />
        //                     </CardBody>
        //                 </Card>
        //             </Col>
        //         </div>
        //     );
        // } 
        else if (chart_type === "Bi-Area") {
            return (
                <AreaChart width={730} height={250} data={data}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="date" />
                    <YAxis label={label} />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey={second_attr} stroke="#8884d8" fillOpacity={1} fill="url(#colorPv)"
                        name={second_attr === 'dia' ? 'Diastolic' : second_attr}
                    />
                    <Area type="monotone" dataKey={first_attr} stroke="#82ca9d" fillOpacity={1} fill="url(#colorUv)"
                        name={first_attr === 'sys' ? 'Systolic' : first_attr}
                    />
                    {
                        (second_attr === 'dia')
                            ? <ReferenceLine y={80} stroke="red" label={"Diastolic Target = 80"} />
                            : <div />
                    }
                    {
                        (first_attr === 'sys')
                            ? <ReferenceLine y={130} stroke="red" label={"Systolic Target = 130"} />
                            : <div />
                    }
                </AreaChart>
            );
        }
    }

    render() {
        const {
            brush,
            chart_type,
            first_attr,
            second_attr,
            third_attr,
            fourth_attr,
            composed_line_attr,
            data,
            title,
            y_label,
            y_label_2
        } = this.props;
        if (chart_type !== "Synchronized") {
            return (
                <ResponsiveContainer width='100%' height={400}>
                    {this.renderChart(chart_type, first_attr, second_attr, third_attr, fourth_attr,
                        composed_line_attr, data, brush, y_label, y_label_2)
                    }
                </ResponsiveContainer>
            );
        } else {
            return (
                <div>
                    {this.renderChart(chart_type, first_attr, second_attr, third_attr, fourth_attr,
                        composed_line_attr, data, brush, y_label, y_label_2)
                    }
                </div>
            )
        }

    }
}

export default ReChartPanel;