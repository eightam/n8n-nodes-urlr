import {
	IExecuteFunctions,
	IHookFunctions,
	ILoadOptionsFunctions,
	IDataObject,
	IHttpRequestMethods,
	IHttpRequestOptions,
	JsonObject,
	NodeApiError,
} from 'n8n-workflow';

// Cache for access tokens (in-memory, per execution)
const tokenCache = new Map<string, { token: string; expiresAt: number }>();

/**
 * Get or refresh URLR access token
 */
async function getAccessToken(
	this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions,
	credentials: IDataObject,
): Promise<string> {
	const cacheKey = `${credentials.email}`;
	const cached = tokenCache.get(cacheKey);

	// Return cached token if still valid (with 5 min buffer)
	if (cached && cached.expiresAt > Date.now() + 300000) {
		return cached.token;
	}

	// Request new access token
	const options: IHttpRequestOptions = {
		method: 'POST',
		url: 'https://urlr.me/api/v1/access_tokens/create',
		headers: {
			'Content-Type': 'application/json',
		},
		body: {
			username: credentials.email,
			password: credentials.password,
		},
		json: true,
	};

	try {
		const response = await this.helpers.httpRequest(options);
		const accessToken = response.access_token || response.accessToken;

		if (!accessToken) {
			throw new NodeApiError(this.getNode(), {
				message: 'Failed to get access token from URLR API',
				description: 'No access token in response',
			} as JsonObject);
		}

		// Cache token for 1 hour (URLR tokens typically last 24h, but we'll be conservative)
		tokenCache.set(cacheKey, {
			token: accessToken,
			expiresAt: Date.now() + 3600000,
		});

		return accessToken;
	} catch (error) {
		throw new NodeApiError(this.getNode(), error as JsonObject, {
			message: 'Failed to authenticate with URLR API',
			description: 'Please check your email and password',
		});
	}
}

/**
 * Make an authenticated request to URLR API
 */
export async function urlrApiRequest(
	this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	qs: IDataObject = {},
): Promise<any> {
	const credentials = await this.getCredentials('urlrApi');
	const accessToken = await getAccessToken.call(this, credentials);

	const options: IHttpRequestOptions = {
		method,
		url: `https://urlr.me/api/v1${endpoint}`,
		headers: {
			'Authorization': `Bearer ${accessToken}`,
			'Content-Type': 'application/json',
		},
		qs,
		body,
		json: true,
	};

	try {
		return await this.helpers.httpRequest(options);
	} catch (error) {
		throw new NodeApiError(this.getNode(), error as JsonObject);
	}
}

/**
 * Make multiple paginated requests
 */
export async function urlrApiRequestAllItems(
	this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	qs: IDataObject = {},
): Promise<any[]> {
	const returnData: any[] = [];
	let page = 1;
	const limit = 100;

	let responseData;
	do {
		qs.page = page;
		qs.limit = limit;
		responseData = await urlrApiRequest.call(this, method, endpoint, body, qs);

		if (Array.isArray(responseData)) {
			returnData.push(...responseData);
			if (responseData.length < limit) {
				break;
			}
		} else if (responseData.data && Array.isArray(responseData.data)) {
			returnData.push(...responseData.data);
			if (responseData.data.length < limit) {
				break;
			}
		} else {
			returnData.push(responseData);
			break;
		}

		page++;
	} while (true);

	return returnData;
}
