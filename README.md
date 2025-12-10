# n8n-nodes-urlr

This is an n8n community node that lets you use [URLR](https://urlr.me/) link shortener in your n8n workflows.

URLR is a European, GDPR-compliant link shortener that provides branded URLs, analytics, and QR code generation.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

### Using npm

```bash
npm install n8n-nodes-urlr
```

### Using Docker

Add the package to your n8n Docker environment variables:

```bash
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -e N8N_CUSTOM_EXTENSIONS="n8n-nodes-urlr" \
  n8nio/n8n
```

## Prerequisites

You need a URLR account to use this node. Sign up at [urlr.me](https://urlr.me/).

## Credentials

This node requires URLR API credentials:

1. Go to your URLR account settings
2. Use your URLR account email and password
3. The node will automatically handle access token generation

## Operations

### Link

- **Create**: Create a new short link
- **Edit**: Edit an existing short link
- **Get**: Get details of a specific link
- **Get Many**: Retrieve multiple links with optional filters

### QR Code

- **Create**: Generate a QR code for a short link

### Statistics

- **Get**: Retrieve analytics and statistics for a link

### Folder

- **Create**: Create a folder to organize links
- **Get Many**: Get all folders for a workspace

### Domain

- **Create**: Add a custom domain to your workspace

## Usage Examples

### Example 1: Shorten a URL

1. Add the URLR node to your workflow
2. Select **Link** as the resource
3. Select **Create** as the operation
4. Enter the URL to shorten
5. Enter your Team ID (workspace ID)
6. Optionally add custom code, UTM parameters, password protection, etc.

### Example 2: Generate QR Code

1. First create a link or get an existing link ID
2. Add the URLR node
3. Select **QR Code** as the resource
4. Select **Create** as the operation
5. Enter the Link ID
6. Customize size, format, and colors as needed

### Example 3: Get Link Analytics

1. Add the URLR node
2. Select **Statistics** as the resource
3. Select **Get** as the operation
4. Enter the Link ID
5. Optionally filter by date range and grouping

### Example 4: Bulk Link Creation

Use the URLR node in a loop to create multiple short links from a list:

1. Start with a node that provides URLs (e.g., Spreadsheet, HTTP Request, etc.)
2. Add a Loop node
3. Add the URLR node inside the loop
4. Configure to create links from each input item

## Compatibility

- Tested with n8n version 1.0+
- Requires Node.js 22+

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
* [URLR API documentation](https://docs.urlr.me/en/api-reference/v1/)
* [URLR website](https://urlr.me/)

## Version History

### 0.1.0

Initial release with support for:
- Link creation, editing, retrieval, and listing
- QR code generation
- Statistics/analytics retrieval
- Folder management
- Custom domain support

## License

[MIT](LICENSE.md)

## Support

For issues, questions, or contributions, please visit the [GitHub repository](https://github.com/yourusername/n8n-nodes-urlr).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Disclaimer

This is a community-maintained node and is not officially affiliated with or endorsed by URLR or n8n.
