import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class UrlrApi implements ICredentialType {
	name = 'urlrApi';
	displayName = 'URLR API';
	documentationUrl = 'https://docs.urlr.me/en/api-reference/v1/';
	properties: INodeProperties[] = [
		{
			displayName: 'Email',
			name: 'email',
			type: 'string',
			default: '',
			required: true,
			placeholder: 'your-email@example.com',
			description: 'Your URLR account email address',
		},
		{
			displayName: 'Password',
			name: 'password',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'Your URLR account password',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'Authorization': '={{"Bearer " + $credentials.accessToken}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://urlr.me/api/v1',
			url: '/teams',
			method: 'GET',
		},
	};
}
