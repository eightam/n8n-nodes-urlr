import { INodeProperties } from 'n8n-workflow';

export const qrCodeOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['qrCode'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a QR code for a link',
				action: 'Create a QR code',
			},
		],
		default: 'create',
	},
];

export const qrCodeFields: INodeProperties[] = [
	{
		displayName: 'Link ID',
		name: 'linkId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['qrCode'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The ID of the link to generate QR code for',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['qrCode'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Size',
				name: 'size',
				type: 'number',
				default: 300,
				description: 'Size of the QR code in pixels',
				typeOptions: {
					minValue: 100,
					maxValue: 1000,
				},
			},
			{
				displayName: 'Format',
				name: 'format',
				type: 'options',
				options: [
					{
						name: 'PNG',
						value: 'png',
					},
					{
						name: 'SVG',
						value: 'svg',
					},
				],
				default: 'png',
				description: 'Output format for the QR code',
			},
			{
				displayName: 'Color',
				name: 'color',
				type: 'string',
				default: '#000000',
				description: 'Foreground color (hex code)',
			},
			{
				displayName: 'Background Color',
				name: 'backgroundColor',
				type: 'string',
				default: '#FFFFFF',
				description: 'Background color (hex code)',
			},
		],
	},
];
