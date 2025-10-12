# Foundry VTT v13 Module Template - Development Guidelines

This document contains specific guidelines and instructions for GitHub Copilot when working with this Foundry VTT module template.

## Overview

This is a comprehensive template for creating Foundry VTT modules with dual Application architecture support (V1 and ApplicationV2) and professional development workflows. The template is designed to be cross-compatible with Foundry VTT versions 11-13.

## Key Technical Patterns

### ApplicationV2 Namespace Issue
**CRITICAL**: ApplicationV2 is NOT a global variable. It exists in `foundry.applications.api.ApplicationV2`. Always use the full namespace path to avoid "ApplicationV2 is not defined" errors.

```javascript
// ❌ WRONG
class MyAppV2 extends ApplicationV2 { }

// ✅ CORRECT
class MyAppV2 extends foundry.applications.api.ApplicationV2 { }
```

### Version Management
- All files include version headers that are automatically updated by workflows
- Use semantic versioning with build numbers: `MAJOR.MINOR.PATCH.BUILD`
- Pre-release workflow updates all version headers automatically

### Development Workflow
1. Always create branches before making changes (`v1.2.3.4` format)
2. Push branches to trigger pre-release builds
3. Test thoroughly before merging to main
4. Tag main branch for official releases

## File Structure Understanding

- `module.js` - Main Application V1 implementation
- `module-v2.js` - ApplicationV2 support with defensive loading
- `styles.css` - Cross-compatible styling for both V1 and V2
- `templates/` - Handlebars templates for both application types
- `.github/workflows/` - Automated release workflows
- `DEVELOPMENT_REFERENCE.md` - Technical documentation
- `CHANGELOG.md` - Version history tracking

## When Working on This Template

### Customization Tasks
When a user wants to customize this template:

1. **Module Identity**: Update `module.json` with new module details
2. **Class Names**: Replace all instances of `MyModule` with actual module name
3. **File Names**: Rename templates and update references
4. **URLs**: Update all GitHub URLs to point to new repository
5. **Content**: Customize templates, styles, and functionality

### Common Operations

#### Adding New Features
- Follow the dual-application pattern (V1 + V2)
- Add defensive programming checks
- Update both template files if UI changes needed
- Include version headers in new files

#### Fixing Issues
- Check ApplicationV2 namespace usage first
- Verify defensive loading patterns
- Test across multiple Foundry versions
- Update documentation if patterns change

#### Version Updates
- Use the pre-release workflow for testing
- Update CHANGELOG.md with changes
- Ensure all version headers are consistent
- Test pre-release before official release

## Development Rules for Copilot

### 1. Branch Management
Always create a new branch before making changes:
```bash
git checkout -b v1.2.3.4
```

### 2. Version Headers
Every file must include a version header that gets auto-updated:
```javascript
/**
 * Module Name - v1.0.0
 * File Purpose
 * Compatible with Foundry VTT v11-v13
 */
```

### 3. ApplicationV2 Detection
Always use this pattern for ApplicationV2:
```javascript
if (typeof foundry !== 'undefined' && 
    foundry.applications && 
    foundry.applications.api && 
    foundry.applications.api.ApplicationV2) {
  // V2 implementation
}
```

### 4. Testing Requirements
Before any release:
- Test console macros work
- Verify both V1 and V2 applications open (when available)
- Check for JavaScript errors
- Validate across Foundry versions

### 5. Documentation Updates
When making significant changes:
- Update DEVELOPMENT_REFERENCE.md with new patterns
- Add entries to CHANGELOG.md
- Update README.md if user-facing changes
- Include inline code comments

## Workflow Integration

### GitHub Actions
- **Pre-Release**: Triggered by version branches, updates headers, creates test builds
- **Release**: Triggered by tags, creates official releases
- **Foundry Release**: Updates manifest URLs for Foundry VTT integration

### Version Tracking
- Automatic version header updates via workflows
- Semantic versioning enforcement
- Branch-based development with version naming

### Testing Strategy
- Console macros for ApplicationV2 detection
- Multi-version compatibility testing
- Error handling validation
- UI/UX verification across application types

## Common Pitfalls to Avoid

1. **ApplicationV2 Global Reference**: Never assume ApplicationV2 is global
2. **Missing Defensive Checks**: Always check for API availability
3. **Version Header Inconsistency**: Let workflows handle version updates
4. **Single Application Type**: Always implement both V1 and V2 patterns
5. **Hardcoded Paths**: Use configurable module paths and IDs

## Template Customization Checklist

When helping users customize this template:

- [ ] Update `module.json` with new module details
- [ ] Replace all `MyModule` class references
- [ ] Update file names and template paths
- [ ] Modify GitHub repository URLs
- [ ] Customize application templates
- [ ] Update CSS class names and styling
- [ ] Configure module settings
- [ ] Test both V1 and V2 applications
- [ ] Verify workflows function correctly
- [ ] Update documentation to reflect changes

This template represents best practices learned from real-world Foundry VTT module development and should serve as a reliable foundation for new module projects.