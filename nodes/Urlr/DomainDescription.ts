import { INodeProperties } from 'n8n-workflow';

export const domainOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['domain'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a custom domain',
				action: 'Create a domain',
			},
		],
		default: 'create',
	},
];

export const domainFields: INodeProperties[] = [
	{
		displayName: 'Team ID',
		name: 'teamId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['domain'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The workspace/team ID',
	},
	{
		displayName: 'Domain Name',
		name: 'domainName',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['domain'],
				operation: ['create'],
			},
		},
		default: '',
		placeholder: 'example.com',
		description: 'The custom domain name to add',
	},
];
