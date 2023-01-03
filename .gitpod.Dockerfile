FROM gitpod/workspace-full:latest

USER root

# Install gcloud SDK
RUN echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] http://packages.cloud.google.com/apt cloud-sdk main" | tee -a /etc/apt/sources.list.d/google-cloud-sdk.list && \
    curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key --keyring /usr/share/keyrings/cloud.google.gpg add - && \
    apt-get update -y && \
    apt-get install google-cloud-sdk -y

# Install Playwright dependencies
RUN apt-get install -y libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libdrm2 \
    libatspi2.0-0 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxrandr2 \
    libgbm1 \
    libxkbcommon0

USER gitpod

# Copy gcloud default config
ARG GCLOUD_CONFIG_DIR=/home/gitpod/.config/gcloud
COPY --chown=gitpod .gitpod/gcloud-default-config $GCLOUD_CONFIG_DIR/configurations/config_default

# Set Application Default Credentials (ADC) based on user-provided env var or prompt to set env
RUN echo ". /workspace/Pluto-Policy-Manager/.gitpod/setup-google-adc.sh" >> ~/.bashrc
