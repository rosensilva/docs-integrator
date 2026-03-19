# Setup Guide

This guide walks you through setting up an OTLP-compatible trace receiver endpoint so the IDE Trace Provider can deliver Ballerina traces for visualization.


## Prerequisites

- Visual Studio Code with the official Ballerina extension installed (provides the built-in OTLP listener on port `59500`), or any OTLP HTTP-compatible trace backend such as Jaeger with OTLP HTTP enabled.

## Step 1: Install the Ballerina VSCode Extension

1. Open Visual Studio Code.
2. Go to the **Extensions** view (`Ctrl+Shift+X` on Windows/Linux, `Cmd+Shift+X` on macOS).
3. Search for **Ballerina** and install the official extension published by WSO2.
4. Reload or restart VS Code when prompted to activate the extension.

:::note
The Ballerina VSCode extension starts a built-in OTLP HTTP listener on port `59500`. This matches the `idetraceprovider` default endpoint (`http://localhost:59500/v1/traces`), so no additional trace backend configuration is needed for local development.
:::

## Step 2: Verify the Trace Receiver Is Active

1. Open a Ballerina project in VS Code to ensure the extension is fully activated.
2. The built-in OTLP trace receiver at `http://localhost:59500/v1/traces` becomes ready
   once the Ballerina extension is active.
3. Trace data sent by the provider will appear in the Ballerina extension's trace visualization panel.

:::tip
To use a custom OTLP backend (e.g., Jaeger), start the backend and confirm it accepts OTLP HTTP POST requests. Note the endpoint URL — you will supply it in `Config.toml` under the `[ballerinax.idetraceprovider]` section.
:::
