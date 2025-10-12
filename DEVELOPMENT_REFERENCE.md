# Development Reference Guide# Development Reference Guide



This document contains vital technical information, API references, development rules, and lessons learned for Foundry VTT module development.This document contains vital technical information, API references, development rules, and lessons learned for Foundry VTT module development.



## Table of Contents## Table of Contents



- [ApplicationV2 Compatibility](#applicationv2-compatibility)- [ApplicationV2 Compatibility](#applicationv2-compatibility)

- [Development Rules](#development-rules)- [Development Rules](#development-rules)

- [Testing Procedures](#testing-procedures)- [Testing Procedures](#testing-procedures)

- [Known Issues & Solutions](#known-issues--solutions)- [Known Issues & Solutions](#known-issues--solutions)

- [API Reference](#api-reference)- [API Reference](#api-reference)

- [Workflow Guidelines](#workflow-guidelines)- [Workflow Guidelines](#workflow-guidelines)

- [Version Management](#version-management)- [Version Management](#version-management)  



---## 📋 Paul's Development Rules & Workflow



## ApplicationV2 Compatibility### 🌿 Branch Management

- **ALWAYS create new branch BEFORE making any changes**

### Critical Discovery: ApplicationV2 Namespace- Use version-based branch naming: `v13.1.4.x`

- Each feature/fix gets its own branch

**IMPORTANT**: ApplicationV2 is NOT available as a global variable. It exists in the `foundry.applications.api` namespace.- Clean git history is important



```javascript### 🚀 Release Workflow

// ❌ WRONG - This will cause "ApplicationV2 is not defined" error1. **Pre-Release Testing**: Use `pre-release.yml` workflow for testing

if (typeof ApplicationV2 !== 'undefined') {2. **Full Releases**: Use `release.yml` workflow for production

  class MyAppV2 extends ApplicationV2 { }3. **Foundry Submission**: Use `foundry-release.yml` for official package registry

}

### 📊 Versioning Strategy

// ✅ CORRECT - Use the full namespace path- **Stable releases**: `v1.x.x` series (current: v1.3.2)

if (typeof foundry !== 'undefined' && - **V13 development**: `v13.1.x.x` series for Foundry v13 features

    foundry.applications && - **Incremental**: Each fix/feature increments last digit

    foundry.applications.api && 

    foundry.applications.api.ApplicationV2) {## 🔧 Technical Architecture

  class MyAppV2 extends foundry.applications.api.ApplicationV2 { }

}### 📁 File Structure

``````

chat-pruner/

### ApplicationV2 Detection Pattern├── module.js           # V1 Application (main functionality)

├── module-v2.js        # V2 Application (future compatibility)

Use this defensive pattern for ApplicationV2 detection:├── module.json         # Manifest

├── styles.css          # Styling

```javascript└── templates/

/**    ├── chat-pruner.hbs     # V1 template

 * Robust ApplicationV2 availability check    └── chat-pruner-v2.hbs  # V2 template

 */```

function isApplicationV2Available() {

  return typeof foundry !== 'undefined' && ### 🎯 Module APIs

         foundry.applications && 

         foundry.applications.api && #### V1 API (Stable)

         foundry.applications.api.ApplicationV2;```javascript

}// Access: game.modules.get('fvtt-chat-pruner')?.api?.open()

// Class: ChatPrunerApp extends Application

// Usage// Features: Full functionality, delete operations, anchors

if (isApplicationV2Available()) {```

  console.log("ApplicationV2 is available");

  // Create V2 implementation#### V2 API (Development)

} else {```javascript

  console.log("ApplicationV2 not available, using V1 fallback");// Access: game.modules.get('fvtt-chat-pruner')?.api?.openV2()

}// Class: ChatPrunerAppV2 extends ApplicationV2

```// Features: Read-only view, future expansion

```

### ApplicationV2 Template Differences

## 🧩 Foundry VTT API References

Key differences between V1 and V2 templates:

### ApplicationV2 Availability

| Feature | Application V1 | ApplicationV2 |- **Global**: `ApplicationV2` (not available in v13.350)

|---------|---------------|---------------|- **Namespace**: `foundry.applications.api.ApplicationV2` ✅ (available in v13.350)

| Template Structure | Form-based with manual event binding | Modern component-based |- **Detection**: Check both namespaces for compatibility

| Event Handling | Manual `activateListeners()` | Built-in form handling |

| Data Context | `getData()` method | `_prepareContext()` method |### Key FVTT APIs Used

| Form Submission | Custom `_updateObject()` | Static `formHandler()` |```javascript

| Styling Classes | `.app` wrapper | Direct element styling |// Core APIs

game.messages                    // ChatMessage collection

---game.user.isGM                  // GM permission check

game.modules.get(moduleId)       // Module access

## Development Rulesui.notifications.warn()          // User notifications



### 1. Branch-First Development// V13 Specific

foundry.applications.api.ApplicationV2  // V2 base class

**ALWAYS create a new branch before making changes:**game.messages.contents           // Preferred over .values()

```

```bash

# Create and switch to new version branch### Cross-Version Compatibility Patterns

git checkout -b v1.2.3.4```javascript

// Defensive programming examples

# Make your changes...const collection = game.messages;

const all = Array.from(

# Commit and push  collection.contents ?? collection.values?.() ?? []

git add .);

git commit -m "Implement feature X"

git push origin v1.2.3.4// Permission checking

```function canDeleteMessage(msg, user) {

  if (user?.isGM) return true;

### 2. Version Header Management  if (typeof msg?.canUserModify === "function")

    return msg.canUserModify(user, "delete");

Every file must include a version header:  return !!msg.isOwner;

}

```javascript```

/**

 * Module Name - v1.2.3.4## 🚨 Known Issues & Solutions

 * File Purpose Description

 * Compatible with Foundry VTT v11-v13### ApplicationV2 Not Defined Error

 */**Problem**: `ApplicationV2 is not defined` in some Foundry versions  

```**Root Cause**: ApplicationV2 available as `foundry.applications.api.ApplicationV2`  

**Solution**: Check both global and namespaced versions

**Version headers are automatically updated by the pre-release workflow.**```javascript

const ApplicationV2Class = globalThis.ApplicationV2 || foundry?.applications?.api?.ApplicationV2;

### 3. Compatibility Testing```



Test across Foundry VTT versions:### Module Loading Order

**Pattern**: Wrap ApplicationV2 class in availability check

- **v11**: Legacy compatibility**Fallback**: Provide no-op class with helpful error messages

- **v12**: Stable current

- **v13**: Future compatibility with ApplicationV2## 📦 GitHub Actions Workflows



### 4. Defensive Programming### Pre-Release Workflow (`pre-release.yml`)

- **Trigger**: Manual dispatch

Always use defensive checks:- **Purpose**: Testing versions

- **URL**: `https://github.com/paulcheeba/chat-pruner/actions/workflows/pre-release.yml`

```javascript- **Assets**: Creates pre-release with test manifest URL

// Check for game object

if (typeof game !== 'undefined' && game.ready) {### Full Release Workflow (`release.yml`)

  // Safe to use game object- **Trigger**: Manual dispatch  

}- **Purpose**: Production releases

- **Features**: Updates main branch, creates stable release

// Check for API availability

if (foundry?.utils?.mergeObject) {### Foundry Package Workflow (`foundry-release.yml`)

  // Use modern API- **Trigger**: Manual dispatch

} else {- **Purpose**: Submit to Foundry's official package registry

  // Fallback for older versions- **Features**: API-based submission with dry-run support

}

```## 🧪 Testing & Debugging



---### Diagnostic Macro Template

```javascript

## Testing Procedures// Chat Pruner Diagnostic Template

try {

### Console Debugging Macros  console.log("=== Chat Pruner Diagnostic ===");

  console.log("Foundry Version:", game?.version);

Use these macros in Foundry VTT console for testing:  console.log("Global ApplicationV2:", typeof ApplicationV2 !== "undefined");

  console.log("foundry.applications.api.ApplicationV2:", typeof foundry?.applications?.api?.ApplicationV2 !== "undefined");

```javascript  

// 1. Check ApplicationV2 availability  const module = game.modules.get('fvtt-chat-pruner');

console.log("=== ApplicationV2 Availability Check ===");  console.log("Module loaded:", !!module);

console.log("foundry object:", typeof foundry);  console.log("V1 API:", !!module?.api?.open);

console.log("foundry.applications:", typeof foundry?.applications);  console.log("V2 API:", !!module?.api?.openV2);

console.log("foundry.applications.api:", typeof foundry?.applications?.api);  

console.log("ApplicationV2:", typeof foundry?.applications?.api?.ApplicationV2);  // Test specific functionality here

  

// 2. Test V1 Application} catch (error) {

console.log("=== Testing V1 Application ===");  console.error("Diagnostic Error:", error);

if (window.MyModuleApp) {}

  new MyModuleApp().render(true);```

  console.log("V1 Application opened successfully");

} else {### Common Test Cases

  console.error("MyModuleApp not found");1. **V1 Functionality**: Basic chat pruning operations

}2. **V2 Interface**: ApplicationV2 loading and display

3. **Permission Checks**: GM-only access enforcement

// 3. Test V2 Application (if available)4. **Cross-Version**: Test in multiple Foundry versions

console.log("=== Testing V2 Application ===");

if (window.MyModuleAppV2) {## 📝 Development Notes

  new MyModuleAppV2().render(true);

  console.log("V2 Application opened successfully");### Current Development Focus

} else {- ApplicationV2 implementation for future compatibility

  console.log("MyModuleAppV2 not available (normal for v11-v12)");- Maintaining V1 stability while adding V2 features

}- Cross-version compatibility (v11-v13)



// 4. Module Settings Check### Architecture Decisions

console.log("=== Module Settings ===");- **Additive approach**: V2 doesn't replace V1, extends alongside

console.log("Settings:", game.settings.get("my-foundry-module", "exampleSetting"));- **Defensive programming**: Extensive null checks and fallbacks

```- **Namespace flexibility**: Support both global and scoped API access



### Browser Testing### Code Standards

- Use optional chaining (`?.`) for safety

1. **Chrome DevTools**: Primary testing environment- Provide meaningful error messages to users

2. **Firefox**: Secondary compatibility testing- Log diagnostic information for debugging

3. **Console Errors**: Monitor for JavaScript errors- Maintain backward compatibility

4. **Network Tab**: Check for failed resource loads

## 🔄 Recent Changes Log

### Multi-Version Testing

### v13.1.4.3 - Version Tracking & Development Workflow

Test matrix:- Added version headers to all source files (module.js, module-v2.js, styles.css, templates)

- Updated README.md with current version tracking

| Foundry Version | ApplicationV2 | Expected Behavior |- Created comprehensive CHANGELOG.md with version history

|----------------|---------------|-------------------|- Enhanced development workflow with standardized version management

| v11.x | ❌ Not Available | V1 only, V2 skipped |

| v12.x | ❌ Not Available | V1 only, V2 skipped |### v13.1.4.2 - ApplicationV2 Namespace Fix

| v13.x | ✅ Available | Both V1 and V2 available |- Fixed ApplicationV2 detection to use `foundry.applications.api.ApplicationV2`

- Added dual namespace checking (global + foundry.applications.api)

---- Enhanced diagnostic logging

- Resolved "ApplicationV2 not defined" error

## Known Issues & Solutions

### v13.1.4.1 - Enhanced Diagnostics  

### 1. ApplicationV2 Undefined Error- Added comprehensive ApplicationV2 availability checking

- Improved error handling and user feedback

**Error**: `Uncaught ReferenceError: ApplicationV2 is not defined`- Better debugging information



**Solution**: Use the correct namespace:### v13.1.4.0 - Initial V2 Implementation

```javascript- Added ApplicationV2-based interface (read-only)

// Replace this- Maintained full V1 compatibility

class MyAppV2 extends ApplicationV2 { }- Added graceful fallback for missing ApplicationV2



// With this---

class MyAppV2 extends foundry.applications.api.ApplicationV2 { }

```## 📌 Quick Reference Commands



### 2. Template Not Found```bash

# Create new branch (ALWAYS FIRST)

**Error**: Template not loading for ApplicationV2git checkout -b v13.1.4.x



**Solution**: Ensure template path is correct in module.json:# Commit changes

```jsongit add . && git commit -m "Description"

{

  "scripts": ["module-v2.js"],# Push new branch

  "styles": ["styles.css"]git push -u origin v13.1.4.x

}

```# Access APIs in Foundry

game.modules.get('fvtt-chat-pruner')?.api?.open()     # V1

### 3. CSS Not Applied to V2game.modules.get('fvtt-chat-pruner')?.api?.openV2()   # V2

```

**Issue**: Styles not applying to ApplicationV2 elements

---

**Solution**: Use specific V2 selectors:*Last Updated: October 12, 2025*  

```css*Current Version: 13.1.4.3*  

.my-module-v2 {*Maintained by: GitHub Copilot + Paul Cheeba*
  /* V2 specific styles */
}
```

### 4. Hook Timing Issues

**Issue**: Ready hook firing before ApplicationV2 available

**Solution**: Use defensive checks in hooks:
```javascript
Hooks.once('ready', () => {
  if (isApplicationV2Available()) {
    // V2 initialization
  }
});
```

---

## API Reference

### Foundry VTT Core APIs

#### Game Object
```javascript
game.settings.register(moduleId, settingName, config)
game.user.isGM
game.ready
```

#### Hooks System
```javascript
Hooks.once('init', callback)
Hooks.once('ready', callback)
Hooks.on('eventName', callback)
```

#### Utility Functions
```javascript
foundry.utils.mergeObject(original, other)
foundry.utils.deepClone(original)
foundry.utils.setProperty(object, key, value)
```

### ApplicationV2 API

#### Class Definition
```javascript
class MyAppV2 extends foundry.applications.api.ApplicationV2 {
  static DEFAULT_OPTIONS = {
    id: "app-id",
    tag: "form",
    position: { width: 400, height: 300 },
    window: { title: "App Title" }
  };
  
  static PARTS = {
    form: { template: "path/to/template.hbs" }
  };
}
```

#### Lifecycle Methods
```javascript
async _prepareContext(options) {
  // Prepare template data
}

_onRender(context, options) {
  // Post-render setup
}

static async formHandler(event, form, formData) {
  // Handle form submission
}
```

---

## Workflow Guidelines

### GitHub Actions Workflows

#### Pre-Release Workflow
- **Trigger**: Push to version branch (`v1.2.3.4`)
- **Actions**: Update versions, create pre-release
- **Use Case**: Development testing

#### Release Workflow
- **Trigger**: Create version tag (`v1.2.3`)
- **Actions**: Create official release, update manifest
- **Use Case**: Public releases

#### Foundry Release Workflow
- **Trigger**: Official release published
- **Actions**: Update download URLs, prepare for Foundry submission
- **Use Case**: Foundry VTT Package Manager

### Version Numbering

Use semantic versioning with build numbers:
- **MAJOR.MINOR.PATCH.BUILD** (e.g., `1.2.3.4`)
- **MAJOR**: Breaking changes
- **MINOR**: New features
- **PATCH**: Bug fixes
- **BUILD**: Development iterations

### Commit Messages

Use descriptive commit messages:
```
feat: Add ApplicationV2 support for future compatibility
fix: Resolve ApplicationV2 namespace issue
docs: Update development reference with testing procedures
style: Improve V2 application styling
refactor: Consolidate utility functions
```

---

## Version Management

### File Header Updates

The pre-release workflow automatically updates version headers in:
- All `.js` files
- All `.css` files
- All `.hbs` template files

### Manual Version Updates

If updating versions manually:

```bash
# Update all version headers to v1.2.3.4
find . -name "*.js" -o -name "*.css" -o -name "*.hbs" | \
xargs sed -i 's/- v[0-9]\+\.[0-9]\+\.[0-9]\+\(\.[0-9]\+\)\?/- v1.2.3.4/g'

# Update module.json version
sed -i 's/"version": "[^"]*"/"version": "1.2.3.4"/' module.json
```

### Release Checklist

Before creating a release:

- [ ] All tests pass in console
- [ ] V1 application works correctly
- [ ] V2 application works (if ApplicationV2 available)
- [ ] No console errors
- [ ] Version headers updated
- [ ] CHANGELOG.md updated
- [ ] Branch pushed to GitHub
- [ ] Pre-release tested successfully

---

## Best Practices

### 1. Error Handling

Always handle errors gracefully:

```javascript
try {
  if (isApplicationV2Available()) {
    new MyModuleAppV2().render(true);
  } else {
    new MyModuleApp().render(true);
  }
} catch (error) {
  console.error("Module App Error:", error);
  ui.notifications.error("Failed to open module application");
}
```

### 2. User Feedback

Provide clear user feedback:

```javascript
ui.notifications.info("Module loaded successfully");
ui.notifications.warn("Feature not available in this Foundry version");
ui.notifications.error("An error occurred");
```

### 3. Resource Cleanup

Clean up resources properly:

```javascript
class MyModuleApp extends Application {
  close(options) {
    // Custom cleanup
    this.cleanupResources();
    return super.close(options);
  }
  
  cleanupResources() {
    // Remove event listeners, clear timers, etc.
  }
}
```

### 4. Performance Considerations

- Lazy load ApplicationV2 only when needed
- Cache template data when possible
- Use efficient DOM queries
- Minimize re-renders

---

This reference document should be updated as new discoveries and patterns emerge during development.