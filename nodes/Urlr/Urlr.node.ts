import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
} from 'n8n-workflow';

import { urlrApiRequest, urlrApiRequestAllItems } from './GenericFunctions';

import { linkFields, linkOperations } from './LinkDescription';
import { qrCodeFields, qrCodeOperations } from './QrCodeDescription';
import { statisticsFields, statisticsOperations } from './StatisticsDescription';
import { folderFields, folderOperations } from './FolderDescription';
import { domainFields, domainOperations } from './DomainDescription';

export class Urlr implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'URLR',
		name: 'urlr',
		icon: 'file:urlr.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with URLR link shortener API',
		defaults: {
			name: 'URLR',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'urlrApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Link',
						value: 'link',
					},
					{
						name: 'QR Code',
						value: 'qrCode',
					},
					{
						name: 'Statistics',
						value: 'statistics',
					},
					{
						name: 'Folder',
						value: 'folder',
					},
					{
						name: 'Domain',
						value: 'domain',
					},
				],
				default: 'link',
			},
			...linkOperations,
			...linkFields,
			...qrCodeOperations,
			...qrCodeFields,
			...statisticsOperations,
			...statisticsFields,
			...folderOperations,
			...folderFields,
			...domainOperations,
			...domainFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0);
		const operation = this.getNodeParameter('operation', 0);

		for (let i = 0; i < items.length; i++) {
			try {
				if (resource === 'link') {
					// Link operations
					if (operation === 'create') {
						const url = this.getNodeParameter('url', i) as string;
						const teamId = this.getNodeParameter('teamId', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as any;

						const body: any = {
							url,
							team_id: teamId,
							...additionalFields,
						};

						// Convert camelCase to snake_case for API
						if (body.domainId) {
							body.domain_id = body.domainId;
							delete body.domainId;
						}
						if (body.folderId) {
							body.folder_id = body.folderId;
							delete body.folderId;
						}
						if (body.expiresAt) {
							body.expires_at = body.expiresAt;
							delete body.expiresAt;
						}
						if (body.utmSource) {
							body.utm_source = body.utmSource;
							delete body.utmSource;
						}
						if (body.utmMedium) {
							body.utm_medium = body.utmMedium;
							delete body.utmMedium;
						}
						if (body.utmCampaign) {
							body.utm_campaign = body.utmCampaign;
							delete body.utmCampaign;
						}

						const responseData = await urlrApiRequest.call(this, 'POST', '/links/create', body);
						returnData.push({ json: responseData });

					} else if (operation === 'edit') {
						const linkId = this.getNodeParameter('linkId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i, {}) as any;

						const body: any = { ...updateFields };

						// Convert camelCase to snake_case
						if (body.folderId) {
							body.folder_id = body.folderId;
							delete body.folderId;
						}
						if (body.expiresAt) {
							body.expires_at = body.expiresAt;
							delete body.expiresAt;
						}

						const responseData = await urlrApiRequest.call(this, 'PATCH', `/links/${linkId}`, body);
						returnData.push({ json: responseData });

					} else if (operation === 'get') {
						const linkId = this.getNodeParameter('linkId', i) as string;
						const responseData = await urlrApiRequest.call(this, 'GET', `/links/${linkId}`);
						returnData.push({ json: responseData });

					} else if (operation === 'getMany') {
						const returnAll = this.getNodeParameter('returnAll', i);
						const filters = this.getNodeParameter('filters', i, {}) as any;
						const qs: any = {};

						if (filters.teamId) qs.team_id = filters.teamId;
						if (filters.folderId) qs.folder_id = filters.folderId;
						if (filters.search) qs.search = filters.search;

						if (returnAll) {
							const responseData = await urlrApiRequestAllItems.call(this, 'GET', '/links', {}, qs);
							responseData.forEach((item) => returnData.push({ json: item }));
						} else {
							const limit = this.getNodeParameter('limit', i);
							qs.limit = limit;
							const responseData = await urlrApiRequest.call(this, 'GET', '/links', {}, qs);
							const items = Array.isArray(responseData) ? responseData : responseData.data || [responseData];
							items.forEach((item: any) => returnData.push({ json: item }));
						}
					}

				} else if (resource === 'qrCode') {
					// QR Code operations
					if (operation === 'create') {
						const linkId = this.getNodeParameter('linkId', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as any;

						const body: any = {
							link_id: linkId,
							...additionalFields,
						};

						// Convert camelCase to snake_case
						if (body.backgroundColor) {
							body.background_color = body.backgroundColor;
							delete body.backgroundColor;
						}

						const responseData = await urlrApiRequest.call(this, 'POST', '/qrcodes/create', body);
						returnData.push({ json: responseData });
					}

				} else if (resource === 'statistics') {
					// Statistics operations
					if (operation === 'get') {
						const linkId = this.getNodeParameter('linkId', i) as string;
						const filters = this.getNodeParameter('filters', i, {}) as any;

						const body: any = {
							link_id: linkId,
						};

						if (filters.startDate) body.start_date = filters.startDate;
						if (filters.endDate) body.end_date = filters.endDate;
						if (filters.groupBy) body.group_by = filters.groupBy;

						const responseData = await urlrApiRequest.call(this, 'POST', '/statistics', body);
						returnData.push({ json: responseData });
					}

				} else if (resource === 'folder') {
					// Folder operations
					if (operation === 'create') {
						const teamId = this.getNodeParameter('teamId', i) as string;
						const name = this.getNodeParameter('name', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as any;

						const body: any = {
							team_id: teamId,
							name,
							...additionalFields,
						};

						if (body.parentId) {
							body.parent_id = body.parentId;
							delete body.parentId;
						}

						const responseData = await urlrApiRequest.call(this, 'POST', '/folders/create', body);
						returnData.push({ json: responseData });

					} else if (operation === 'getMany') {
						const teamId = this.getNodeParameter('teamId', i) as string;
						const responseData = await urlrApiRequest.call(this, 'GET', `/folders/${teamId}`);
						const items = Array.isArray(responseData) ? responseData : responseData.data || [responseData];
						items.forEach((item: any) => returnData.push({ json: item }));
					}

				} else if (resource === 'domain') {
					// Domain operations
					if (operation === 'create') {
						const teamId = this.getNodeParameter('teamId', i) as string;
						const domainName = this.getNodeParameter('domainName', i) as string;

						const body = {
							team_id: teamId,
							domain_name: domainName,
						};

						const responseData = await urlrApiRequest.call(this, 'POST', '/domains/create', body);
						returnData.push({ json: responseData });
					}
				}

			} catch (error) {
				if (this.continueOnFail()) {
					const errorMessage = error instanceof Error ? error.message : String(error);
					returnData.push({ json: { error: errorMessage }, pairedItem: { item: i } });
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
