# 🩷 Contributing

Thank you for your interest in contributing to the this project! By contributing, you can help improve the package, fix bugs, add new features, and ensure its overall quality. This document will guide you through the process of contributing to the project.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Fork the Repository](#fork-the-repository)
  - [Clone the Repository](#clone-the-repository)
- [Setting Up the Development Environment](#setting-up-the-development-environment)
  - [Install Dependencies](#install-dependencies)
  - [Build the Package](#build-the-package)
- [Testing](#testing)
  - [Unit Tests](#unit-tests)
  - [Integration Tests](#integration-tests)
- [Making Changes](#making-changes)
  - [Create a New Branch](#create-a-new-branch)
  - [Commit Guidelines](#commit-guidelines)
- [Submitting a Pull Request](#submitting-a-pull-request)
- [Code of Conduct](#code-of-conduct)
- [License](#license)

<br/>

## Getting Started

Before contributing to this project please read all of the instruction below.

### Prerequisites

Before you start contributing to the NestJS package, you need to have the following software installed on your system:

- Node.js (LTS version)
- npm (Node Package Manager)

### Fork the Repository

To contribute, you'll first need to fork the official repository to your GitHub account. You can do this by clicking the "Fork" button at the top right corner of the repository page.

### Clone the Repository

After forking the repository, you can clone it to your local development environment using the following command:

```bash
git clone https://github.com/jiangtaste/nestjs-resend.git
```

<br/>

## Setting Up the Development Environment

### Install Dependencies

Navigate to the cloned repository and install the project dependencies:

```bash
cd nestjs-resend
npm install
```

<br/>

### Build the Package

To build the package and ensure everything is set up correctly, use the following command:

```bash
npm run build
```

<br/>

## Testing

### Unit Tests

The NestJS package comes with a test suite to ensure the functionality is working as expected. Run the unit tests using the following command:

```bash
npm run test
```

<br/>

## Making Changes

### Create a New Branch

Before making any changes, create a new branch in your local repository. It is a good practice to name your branch appropriately, reflecting the changes you intend to make.

```bash
git checkout -b feature/new-feature
```

### Commit Guidelines

Follow these guidelines when making commits:

- Use clear and descriptive commit messages.
- Use present tense in commit messages (e.g., "Add new feature" instead of "Added new feature").
- Keep commits focused and atomic.

<br/>

## Submitting a Pull Request

Once you've made the necessary changes, pushed them to your forked repository, and are satisfied with your contributions, you can submit a pull request to the main repository. Follow these steps:

1. Go to the original repository on GitHub.
2. Click on "Pull Requests" and then "New Pull Request."
3. Choose the branch you've made the changes on (e.g., `feature/new-feature`).
4. Add a descriptive title and detailed description of the changes made in the pull request.
5. Submit the pull request.

Your pull request will then be reviewed by the maintainers. Please be patient, as the review process may take some time.

<br/>

## Code of Conduct

Contributors to the NestJS package are expected to adhere to the [Code of Conduct](CODE_OF_CONDUCT.md). Please familiarize yourself with these guidelines before participating in the project.

<br/>

## License

By contributing to the NestJS package, you agree that your contributions will be licensed under the project's [LICENSE](LICENSE).
