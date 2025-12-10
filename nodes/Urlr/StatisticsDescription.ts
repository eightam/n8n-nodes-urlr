import { INodeProperties } from 'n8n-workflow';

export const statisticsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['statistics'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get statistics for a link',
				action: 'Get link statistics',
			},
		],
		default: 'get',
	},
];

export const statisticsFields: INodeProperties[] = [
	{
		displayName: 'Link ID',
		name: 'linkId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['statistics'],
				operation: ['get'],
			},
		},
		default: '',
		description: 'The ID of the link to get statistics for',
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['statistics'],
				operation: ['get'],
			},
		},
		options: [
			{
				displayName: 'Start Date',
				name: 'startDate',
				type: 'dateTime',
				default: '',
				description: 'Start date for statistics',
			},
			{
				displayName: 'End Date',
				name: 'endDate',
				type: 'dateTime',
				default: '',
				description: 'End date for statistics',
			},
			{
				displayName: 'Group By',
				name: 'groupBy',
				type: 'options',
				options: [
					{
						name: 'Day',
						value: 'day',
					},
					{
						name: 'Week',
						value: 'week',
					},
					{
						name: 'Month',
						value: 'month',
					},
				],
				default: 'day',
				description: 'How to group the statistics',
			},
		],
	},
];
