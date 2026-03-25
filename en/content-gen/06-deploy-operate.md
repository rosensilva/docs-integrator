# Section 10: Deploy & Operate

**Question this section answers:** "How do I ship, run, and secure this?"

**Audience:** Developer or DevOps engineer deploying integrations to production. Has a working integration from Develop and needs to get it running in a real environment.

**Tone:** Practical, operations-focused. Include exact commands, config files, and YAML snippets. Cover failure modes and what to do when things go wrong.

**Boundary rule:** If the code is still on your machine → Develop. Once you're shipping it → Deploy & Operate. This applies to ALL integration types including GenAI agents.

---

## Deploy (11 pages)

### Page: Run Locally

**File:** `en/docs/deploy-operate/deploy/local.md`

**What to cover:**
- `bal run` for local development
- Hot reload during development
- Environment variables for local config
- Testing with Try-It tool
- When to move beyond local

### Page: VM-Based Deployment

**File:** `en/docs/deploy-operate/deploy/vm-based.md`

**What to cover:**
- Build executable JAR: `bal build`
- Standalone deployment (single JAR)
- Centralized deployment (consolidated packages)
- Systemd service configuration
- JVM tuning flags
- Health checks

### Page: Docker & Kubernetes

**File:** `en/docs/deploy-operate/deploy/docker-kubernetes.md`

**What to cover:**
- Auto-generated Dockerfile from `bal build`
- Building Docker image
- Kubernetes YAML generation from Cloud.toml
- Deployment, Service, ConfigMap, Secret manifests
- Helm chart integration
- Liveness/readiness probes
- Complete example: deploy to K8s cluster

### Page: OpenShift

**File:** `en/docs/deploy-operate/deploy/openshift.md`

**What to cover:**
- OpenShift-specific deployment
- Routes and services
- S2I (Source-to-Image) builds
- OpenShift-specific Cloud.toml settings

### Page: Serverless (AWS Lambda, Azure Functions)

**File:** `en/docs/deploy-operate/deploy/serverless.md`

**What to cover:**
- AWS Lambda deployment
- Azure Functions deployment
- Cold start considerations
- Function configuration
- Trigger integration (API Gateway, EventBridge)

### Page: Push to Cloud (WSO2 Integration Platform)

**File:** `en/docs/deploy-operate/deploy/devant.md`

**What to cover:**
- One-click "Push to Cloud" from WSO2 Integrator IDE
- WSO2 Integration Platform dashboard overview
- Environment management in the platform
- Scaling and monitoring in the platform
- CI/CD integration with WSO2 Integration Platform

### Page: Deploy to AWS / Azure / GCP

**File:** `en/docs/deploy-operate/deploy/cloud-providers.md`

**What to cover:**
- AWS: ECS, EKS, Lambda
- Azure: AKS, Container Apps, Functions
- GCP: GKE, Cloud Run
- Cloud-specific Cloud.toml settings

### Page: GraalVM Native Binaries

**File:** `en/docs/deploy-operate/deploy/graalvm.md`

**What to cover:**
- Build native image: `bal build --graalvm`
- Benefits: faster startup, lower memory
- Limitations: reflection, dynamic class loading
- Performance benchmarks vs JVM
- When to use native vs JVM

### Page: Environments (Dev → Test → Prod)

**File:** `en/docs/deploy-operate/deploy/environments.md`

**What to cover:**
- Environment-specific Config.toml
- Profile-based configuration
- Secret management per environment
- Promotion pipeline (dev → staging → prod)

### Page: Managing Configurations

**File:** `en/docs/deploy-operate/deploy/managing-configurations.md`

**What to cover:**
- Centralized configuration management
- Config.toml for per-environment configs
- Environment variable overrides
- Kubernetes ConfigMaps and Secrets
- Vault integration
- Consolidated packages (multiple integrations, shared config)

### Page: Scaling & High Availability

**File:** `en/docs/deploy-operate/deploy/scaling-ha.md`

**What to cover:**
- Horizontal scaling (multiple instances)
- Load balancing considerations
- Sticky sessions (when needed)
- Health check endpoints
- Graceful shutdown
- Database connection pool sizing

---

## CI/CD (4 pages)

### Pages: GitHub Actions, Jenkins, GitLab CI, Azure DevOps

**Files:** `en/docs/deploy-operate/cicd/github-actions.md`, `jenkins.md`, `gitlab.md`, `azure-devops.md`

**For each CI/CD platform, cover:**
- Pipeline configuration file (YAML or Jenkinsfile)
- Build stage: `bal build`
- Test stage: `bal test`
- Docker image build and push
- Deploy to target environment
- Complete pipeline example (copy-paste ready)
- Secrets management in the CI platform

---

## Observe (7+ pages)

### Page: Observability Overview

**File:** `en/docs/deploy-operate/observe/overview.md`

**What to cover:**
- Three pillars: Logging, Metrics, Tracing
- Ballerina's built-in observability support
- Enabling observability: `bal run --observability-included`
- OpenTelemetry support

### Page: Integration Control Plane (ICP)

**File:** `en/docs/deploy-operate/observe/icp.md`

**What to cover:**
- What ICP is — centralized management dashboard
- Connecting integrations to ICP
- Dashboard features: service health, logs, metrics
- Alerting and notifications

### Page: Observability with WSO2 Integration Platform

**File:** `en/docs/deploy-operate/observe/devant.md`

**What to cover:**
- Built-in observability in WSO2 Integration Platform
- Logs, metrics, traces in the platform console
- Setting up alerts

### Pages: Prometheus, Grafana, Jaeger, Zipkin

**Files:** `en/docs/deploy-operate/observe/prometheus.md`, `grafana.md`, `jaeger.md`, `zipkin.md`

**For each tool, cover:**
- Configuration to export data to this tool
- Dashboard setup / import
- Key metrics/traces to monitor
- Alert rules

### Pages: Datadog, New Relic, Elastic Stack, OpenSearch, Moesif

**Files:** `en/docs/deploy-operate/observe/datadog.md`, `new-relic.md`, `elastic.md`, `opensearch.md`, `moesif.md`

**For each, cover:**
- Integration setup (agent, exporter, or API)
- Dashboard configuration
- Key metrics to track

### Page: Custom Metrics

**File:** `en/docs/deploy-operate/observe/custom-metrics.md`
**Status:** EXISTS — review and enhance

**What to cover:**
- Defining custom counters and gauges
- Tagged metrics for dimensions
- Exposing via Prometheus endpoint
- Grafana dashboard queries for custom metrics

---

## Secure (5 pages)

### Page: Runtime Security Best Practices

**File:** `en/docs/deploy-operate/secure/runtime-security.md`

**What to cover:**
- JVM security settings
- Keystore configuration
- Running as non-root
- File system permissions
- Container security best practices

### Page: Authentication (OAuth 2.0, JWT, mTLS)

**File:** `en/docs/deploy-operate/secure/authentication.md`

**What to cover:**
- OAuth 2.0 client credentials and authorization code flows
- JWT validation in services
- mTLS for service-to-service communication
- Configuring auth in Ballerina services
- Complete examples for each auth method

### Page: API Security & Rate Limiting

**File:** `en/docs/deploy-operate/secure/api-security.md`

**What to cover:**
- API key validation
- Rate limiting implementation
- IP whitelisting
- CORS configuration for APIs
- API gateway integration

### Page: Secrets & Encryption

**File:** `en/docs/deploy-operate/secure/secrets-encryption.md`

**What to cover:**
- Keystores and truststores
- Environment variables for secrets
- Kubernetes Secrets
- HashiCorp Vault integration
- Encrypting Config.toml values

### Page: Compliance Considerations

**File:** `en/docs/deploy-operate/secure/compliance.md`

**What to cover:**
- GDPR data handling
- SOC 2 considerations
- HIPAA for healthcare integrations
- Audit logging
- Data residency

---

## Capacity Planning (2 pages)

### Page: Overview & Sizing Guidelines

**File:** `en/docs/deploy-operate/capacity-planning/overview.md`

**What to cover:**
- How to estimate resource requirements
- CPU, memory, and connection pool sizing
- Factors: message size, throughput, number of connectors
- Sizing table by integration complexity

### Page: Performance Reports

**File:** `en/docs/deploy-operate/capacity-planning/performance-reports.md`

**What to cover:**
- Benchmark results per scenario (HTTP passthrough, transformation, database, Kafka)
- Comparison: JVM vs GraalVM native
- Methodology used
- How to run your own benchmarks
