# Foundry VTT v13 Module Template

A comprehensive template for creating Foundry VTT modules compatible with v11-v13, featuring dual Application architecture (V1 and ApplicationV2) and professional development workflows.

## Features

- ✅ **Dual Compatibility**: Works with both Application V1 and ApplicationV2 APIs
- ✅ **Version Range**: Compatible with Foundry VTT v11-v13
- ✅ **Professional Workflows**: Automated GitHub Actions for releases
- ✅ **Version Management**: Automatic version header updates across all files
- ✅ **Modern Development**: ES modules, defensive programming patterns
- ✅ **Documentation**: Comprehensive development reference included

## Quick Start

1. **Use this template** to create a new repository
2. **Clone** your new repository locally
3. **Customize** the module details:
   - Update `module.json` with your module details
   - Rename files from `my-module` to your module name
   - Update class names and identifiers
4. **Develop** your module using the provided structure
5. **Test** in Foundry VTT v11-v13
6. **Release** using the automated workflows

## Project Structure

```
foundry-v13-module-template/
├── .github/workflows/          # GitHub Actions workflows
│   ├── release.yml            # Main release workflow
│   ├── pre-release.yml        # Pre-release workflow
│   └── foundry-release.yml    # Foundry VTT submission workflow
├── templates/                  # Handlebars templates
│   ├── my-module.hbs          # Application V1 template
│   └── my-module-v2.hbs       # ApplicationV2 template
├── module.json                # Module manifest
├── module.js                  # Main module (Application V1)
├── module-v2.js              # ApplicationV2 support
├── styles.css                # Module styles
├── DEVELOPMENT_REFERENCE.md   # Development documentation
├── CHANGELOG.md              # Version history
└── README.md                 # This file
```

## Development Workflow

### Branch Management
1. Create feature branches with version naming: `v1.2.3.4`
2. Make changes and test locally
3. Commit with version headers updated
4. Push branch to trigger pre-release
5. Merge to main and tag for official release

### Version Management
- **File Headers**: All `.js`, `.css`, and `.hbs` files include version headers
- **Automatic Updates**: Pre-release workflow updates all version headers
- **Semantic Versioning**: Use `MAJOR.MINOR.PATCH.BUILD` format

### Testing Macros
Use these macros in Foundry VTT console for debugging:

```javascript
// Check ApplicationV2 availability
console.log("ApplicationV2 available:", typeof foundry?.applications?.api?.ApplicationV2 !== 'undefined');

// Open V1 Application
new MyModuleApp().render(true);

// Open V2 Application (if available)
if (window.MyModuleAppV2) new MyModuleAppV2().render(true);
```

## ApplicationV2 Compatibility

This template includes full ApplicationV2 support with defensive loading:

- **Namespace Detection**: Uses `foundry.applications.api.ApplicationV2`
- **Graceful Fallback**: V1 always available, V2 only when supported
- **Future-Proof**: Ready for Foundry VTT v13+ ApplicationV2 adoption

## GitHub Workflows

### Release Workflow (`release.yml`)
- Triggered by version tags (`v1.2.3`)
- Creates official releases
- Updates manifest URLs
- Publishes to GitHub Releases

### Pre-Release Workflow (`pre-release.yml`)
- Triggered by version branches or manual dispatch
- Creates pre-release builds for testing
- Updates version headers automatically
- Perfect for development testing

### Foundry Release Workflow (`foundry-release.yml`)
- Triggered after official releases
- Updates manifest for Foundry VTT Package Manager
- Ready for automated Foundry VTT submission

## Customization Guide

### 1. Module Identity
Update `module.json`:
```json
{
  "id": "your-module-id",
  "title": "Your Module Title",
  "description": "Your module description",
  "authors": [{"name": "Your Name", "email": "your.email@example.com"}],
  "url": "https://github.com/yourusername/your-repo-name"
}
```

### 2. Class Names
Replace throughout codebase:
- `MyModuleApp` → `YourModuleApp`
- `MyModuleAppV2` → `YourModuleAppV2`
- `my-module` → `your-module`
- `my-foundry-module` → `your-foundry-module`

### 3. Templates
Customize `templates/`:
- `my-module.hbs` → Design your V1 interface
- `my-module-v2.hbs` → Design your V2 interface

### 4. Styles
Update `styles.css`:
- Modify color schemes
- Adjust layouts
- Add custom components

## Requirements

- **Foundry VTT**: v11.0.0 - v13.999.999
- **Browser**: Modern browsers with ES2020 support
- **Development**: Git, GitHub account for workflows

## Contributing

1. Fork this template repository
2. Create your feature branch
3. Make your changes
4. Test thoroughly across Foundry versions
5. Submit a pull request

## License

This template is provided under the MIT License. See `LICENSE` file for details.

## Support

- **Issues**: Report bugs or request features via GitHub Issues
- **Documentation**: See `DEVELOPMENT_REFERENCE.md` for detailed technical information
- **Community**: Share your modules built with this template!

---

**Built with ❤️ for the Foundry VTT community**

This template incorporates lessons learned from real-world module development and testing across multiple Foundry VTT versions. It's designed to provide a solid foundation for both simple and complex module development.