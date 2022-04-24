FROM gitpod/workspace-full:latest

USER root

# Install gcloud SDK
RUN echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] http://packages.cloud.google.com/apt cloud-sdk main" | tee -a /etc/apt/sources.list.d/google-cloud-sdk.list && \
    curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key --keyring /usr/share/keyrings/cloud.google.gpg add - && \
    apt-get update -y && \
    apt-get install google-cloud-sdk -y

USER gitpod

# Copy gcloud default config
ARG GCLOUD_CONFIG_DIR=/home/gitpod/.config/gcloud
COPY --chown=gitpod gcloud-default-config $GCLOUD_CONFIG_DIR/configurations/config_default

# Set Application Default Credentials (ADC) based on user-provided env var
RUN echo ". /workspace/pluto/scripts/setup-google-adc.sh" >> ~/.bashrc

# Install Google Clasp
RUN bash -c "npm install --global @google/clasp"

# Set ~/.clasprc based on user-provided env var
RUN echo ". /workspace/pluto/scripts/setup-clasprc.sh" >> ~/.bashrc
