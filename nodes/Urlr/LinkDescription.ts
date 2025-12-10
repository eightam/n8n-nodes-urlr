import { INodeProperties } from 'n8n-workflow';

export const linkOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['link'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new short link',
				action: 'Create a link',
			},
			{
				name: 'Edit',
				value: 'edit',
				description: 'Edit an existing short link',
				action: 'Edit a link',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a short link by ID',
				action: 'Get a link',
			},
			{
				name: 'Get Many',
				value: 'getMany',
				description: 'Get many short links',
				action: 'Get many links',
			},
		],
		default: 'create',
	},
];

export const linkFields: INodeProperties[] = [
	// Create operation fields
	{
		displayName: 'URL',
		name: 'url',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['link'],
				operation: ['create'],
			},
		},
		default: '',
		placeholder: 'https://example.com',
		description: 'The long URL to shorten',
	},
	{
		displayName: 'Team ID',
		name: 'teamId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['link'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The workspace/team ID to create the link in',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['link'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Code',
				name: 'code',
				type: 'string',
				default: '',
				description: 'Custom short code for the link (e.g., "mycode" for urlr.me/mycode)',
			},
			{
				displayName: 'Domain ID',
				name: 'domainId',
				type: 'string',
				default: '',
				description: 'Custom domain ID to use',
			},
			{
				displayName: 'Folder ID',
				name: 'folderId',
				type: 'string',
				default: '',
				description: 'Folder ID to organize the link',
			},
			{
				displayName: 'Label',
				name: 'label',
				type: 'string',
				default: '',
				description: 'Label or title for the link',
			},
			{
				displayName: 'Expires At',
				name: 'expiresAt',
				type: 'dateTime',
				default: '',
				description: 'Expiration date for the link',
			},
			{
				displayName: 'Password',
				name: 'password',
				type: 'string',
				typeOptions: {
					password: true,
				},
				default: '',
				description: 'Password protection for the link',
			},
			{
				displayName: 'UTM Source',
				name: 'utmSource',
				type: 'string',
				default: '',
				description: 'UTM source parameter',
			},
			{
				displayName: 'UTM Medium',
				name: 'utmMedium',
				type: 'string',
				default: '',
				description: 'UTM medium parameter',
			},
			{
				displayName: 'UTM Campaign',
				name: 'utmCampaign',
				type: 'string',
				default: '',
				description: 'UTM campaign parameter',
			},
		],
	},

	// Edit operation fields
	{
		displayName: 'Link ID',
		name: 'linkId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['link'],
				operation: ['edit', 'get'],
			},
		},
		default: '',
		description: 'The ID of the link to edit or retrieve',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['link'],
				operation: ['edit'],
			},
		},
		options: [
			{
				displayName: 'URL',
				name: 'url',
				type: 'string',
				default: '',
				description: 'The destination URL',
			},
			{
				displayName: 'Code',
				name: 'code',
				type: 'string',
				default: '',
				description: 'Custom short code',
			},
			{
				displayName: 'Label',
				name: 'label',
				type: 'string',
				default: '',
				description: 'Label or title for the link',
			},
			{
				displayName: 'Folder ID',
				name: 'folderId',
				type: 'string',
				default: '',
				description: 'Move to a different folder',
			},
			{
				displayName: 'Expires At',
				name: 'expiresAt',
				type: 'dateTime',
				default: '',
				description: 'Expiration date for the link',
			},
			{
				displayName: 'Password',
				name: 'password',
				type: 'string',
				typeOptions: {
					password: true,
				},
				default: '',
				description: 'Password protection',
			},
		],
	},

	// Get Many operation fields
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['link'],
				operation: ['getMany'],
			},
		},
		default: false,
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['link'],
				operation: ['getMany'],
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		default: 50,
		description: 'Max number of results to return',
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['link'],
				operation: ['getMany'],
			},
		},
		options: [
			{
				displayName: 'Team ID',
				name: 'teamId',
				type: 'string',
				default: '',
				description: 'Filter by workspace/team ID',
			},
			{
				displayName: 'Folder ID',
				name: 'folderId',
				type: 'string',
				default: '',
				description: 'Filter by folder ID',
			},
			{
				displayName: 'Search',
				name: 'search',
				type: 'string',
				default: '',
				description: 'Search term to filter links',
			},
		],
	},
];
