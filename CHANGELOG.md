# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-10-12

### Added
- Initial Foundry VTT v13 module template
- Dual Application architecture (V1 and ApplicationV2)
- Cross-version compatibility (v11-v13)
- Professional GitHub Actions workflows
- Comprehensive development documentation
- Automatic version management system
- ApplicationV2 defensive loading pattern
- Modern ES module structure
- Responsive CSS styling
- Template examples for both V1 and V2

### Features
- **Application V1**: Full backward compatibility with existing Foundry versions
- **ApplicationV2**: Future-ready implementation for v13+
- **Version Headers**: Automatic version tracking across all files
- **GitHub Workflows**: Automated pre-release and release management
- **Documentation**: Complete development reference and best practices
- **Testing Macros**: Console debugging tools for development
- **Defensive Programming**: Robust error handling and fallback patterns

### Technical Details
- Compatible with Foundry VTT v11.0.0 - v13.999.999
- Uses `foundry.applications.api.ApplicationV2` namespace
- Implements modern ES module patterns
- Includes comprehensive CSS styling for both V1 and V2
- Features responsive design for mobile compatibility

### Documentation
- Complete README.md with setup instructions
- DEVELOPMENT_REFERENCE.md with technical details
- Inline code documentation
- GitHub workflow documentation
- Testing procedures and debugging macros

---

## Template Usage Notes

This changelog serves as a template for your module development. When using this template:

1. **Update the version number** to match your initial release
2. **Modify the date** to your actual release date
3. **Customize the content** to reflect your specific module features
4. **Add new entries** as you develop and release updates

### Changelog Entry Format

```markdown
## [Version] - YYYY-MM-DD

### Added
- New features that were added

### Changed
- Changes to existing functionality

### Deprecated
- Features that will be removed in future versions

### Removed
- Features that were removed

### Fixed
- Bug fixes

### Security
- Security-related changes
```

### Version Numbering

This template uses semantic versioning with build numbers:
- **MAJOR.MINOR.PATCH** for public releases
- **MAJOR.MINOR.PATCH.BUILD** for development versions

Example progression:
- `1.0.0` - Initial release
- `1.0.1` - Bug fix release
- `1.1.0` - Feature release
- `2.0.0` - Breaking changes release
- `1.1.0.1` - Development build

---

*This template was created to provide a solid foundation for Foundry VTT module development with modern practices and cross-version compatibility.*