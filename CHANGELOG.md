# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- License header ESLint check
- JSDocs documentation
- Test coverage with nyc and coverage thresholds
- Fuzzing

### Changed
- Removed npm-run-all dependency and updated scripts configuration
- Added lint:fix script
- Continous integration action now using 'npm ci'

### Dependencies
- Bumped @html-eslint/eslint-plugin from 0.34.0 to 0.35.0
- Bumped eslint-plugin-n from 17.14.0 to 17.15.1
- Bumped eslint from 9.19.0 to 9.21.0
- Bumped @html-eslint/parser from 0.34.0 to 0.35.0
- Bumped @eslint/compat from 1.2.4 to 1.2.7

### CI
- Bumped actions/upload-artifact from 4.6.0 to 4.6.1
- Bumped github/codeql-action from 3.28.8 to 3.28.10
- Bumped codecov/codecov-action from 5.3.1 to 5.4.0
- Bumped ossf/scorecard-action from 2.4.0 to 2.4.1

## [0.0.1] - 2023-11-07

### Added
- Initial release
- ESLint plugin for external includes
- Two core rules:
  - enforce-no-external-url
  - require-script-integrity
- Comprehensive test coverage
- GitHub Actions CI workflow
- Dependabot configuration
- OpenSSF Scorecard integration
- Security best practices implementation
- Repository and package information
- Release workflow configuration

### Documentation
- Added README with badges
- Added usage instructions
- Added rule documentation

### CI
- Added continuous integration workflow
- Added release workflow
- Added CodeQL security analysis
- Added code coverage reporting
- Added dependency management

### Dependencies
Initial dependencies:
- @html-eslint/eslint-plugin
- @html-eslint/parser
- eslint
- mocha
- eslint-doc-generator
- eslint-plugin-eslint-plugin
- eslint-plugin-n
