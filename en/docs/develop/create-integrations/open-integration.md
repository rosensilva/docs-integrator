---
sidebar_position: 3
---

# Open integration

WSO2 Integrator lets you open existing integration projects directly from the sidebar, without navigating through the VS Code file menu.

## Opening an existing integration

In the WSO2 Integrator sidebar, click **Open**. A file picker opens — navigate to the folder that contains your integration project and select it. The folder must have a `Ballerina.toml` file at its root for WSO2 Integrator to recognize it as an integration project.

<!-- TODO: add screenshot — WSO2 Integrator panel showing the Open button and file picker -->

After the project loads, WSO2 Integrator navigates to the appropriate view based on the project type:

- A single-package integration opens in the [Integration View](../project-views/integration-view.md)
- A workspace project opens in the [Workspace View](../project-views/workspace-view.md)
- A library package opens in the [Library View](../project-views/library-view.md)

## Opening a recent project

The WSO2 Integrator sidebar lists your recently opened projects. Click any project in the list to reopen it directly, without going through the file picker.

<!-- TODO: add screenshot — WSO2 Integrator panel showing the list of recently opened projects -->


## What's next

- [Create a new integration](create-new-integration.md) — start a new project from scratch
- [Explore sample integrations](explore-samples.md) — browse built-in samples to get started quickly
