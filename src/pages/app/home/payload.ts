/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseAuthDataRequest, ObjectType } from "@/interface/types";

export const TABLE_PAYLOAD = {
	_id: "dashboard1516252439345",
	chartObject: {
		metadata: {
			title: "chartobject:1516252439345",
			img_thumbnail: "../img/chart.png",
			chartType: "table",
			dataLimit: 50,
		},
		requestParam: {
			granularity: "hour",
			timeZone: {
				name: "UTC (+00:00)",
				location: "UTC",
			},
			dateRange: {
				startDate: "1493337600000",
				endDate: "1493510400000",
			},
			xAxis: ["D044"],
			yAxis: ["M002"],
			approxCountDistinct: [],
			specialCalculation: [],
			filter: [],
			orderBy: {
				metricOrdByList: [
					{
						id: "M002",
						desc: true,
					},
				],
			},
			percentCalList: [],
		},
	},
};

export const BAR_CHART_PAYLOAD = {
	_id: "dashboard1516252235693",
	chartObject: {
		metadata: {
			title: "chartobject:1516252235693",
			img_thumbnail: "../img/chart.png",
			chartType: "bar",
			dataLimit: 50,
		},
		requestParam: {
			granularity: "hour",
			timeZone: {
				name: "UTC (+00:00)",
				location: "UTC",
			},
			dateRange: {
				startDate: "1493337600000",
				endDate: "1493510400000",
			},
			xAxis: ["D017"],
			yAxis: ["M002"],
			approxCountDistinct: [],
			specialCalculation: [],
			filter: [],
			orderBy: {
				metricOrdByList: [
					{
						id: "M002",
						desc: true,
					},
				],
			},
			percentCalList: [],
		},
	},
};

export const PIE_CHART_PAYLOAD = {
	_id: "Datastory_ChartId_1535224664111",
	chartObject: {
		metadata: {
			title: "",
			img_thumbnail: "images/pie.png",
			chartType: "pie",
			dataLimit: 500,
		},
		text: [],
		requestParam: {
			granularity: "hour",
			timeZone: {
				name: "UTC (+00:00)",
				location: "UTC",
			},
			dateRange: {
				startDate: "1493424000000",
				endDate: "1493596800000",
			},
			xAxis: ["D005"],
			yAxis: [],
			approxCountDistinct: [],
			specialCalculation: ["CM001"],
			filter: [],
			orderBy: {
				customMetricOrdByList: [
					{
						id: "CM001",
						desc: true,
					},
				],
			},
			percentCalList: [
				{
					id: "CM001",
				},
			],
		},
	},
};

export const updatePayload = (payload: any, updateValue: { dateRange: ObjectType; orgViewReq: BaseAuthDataRequest; emailId: string }) => {
	if (updateValue.dateRange) {
		payload.chartObject.requestParam.dateRange = updateValue.dateRange;
	}

	if (updateValue.orgViewReq) {
		payload.orgViewReq = updateValue.orgViewReq;
	}

	if (updateValue.emailId) {
		payload.emailId = updateValue.emailId;
	}

	return payload;
};
