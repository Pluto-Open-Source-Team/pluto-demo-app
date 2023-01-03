#!/bin/bash

GCLOUD_ADC_PATH="/home/gitpod/.config/gcloud/application_default_credentials.json"

if [ ! -f "$GCLOUD_ADC_PATH" ]; then
    if [ -z "$GCP_ADC_FILE" ]; then
        cat << EOF
GCP_ADC_FILE not set, doing nothing.

This means that invoking the gcloud command will not have a default service credential configured. 
You will not be able to deploy. 

To fix this: 

1. Run `gcloud auth login <gcp-email>` and authenticate
2. Run `gcloud auth application-default login` and authenticate
3. Run `cat ~/.config/gcloud/application_default_credentials.json` and copy the output
4. Go to https://gitpod.io/variables/ and create a new variable:
  - name: GCP_ADC_FILE
  - value: paste-the-output
  - repo: Pluto-Open-Source-Team/Pluto-Policy-Manager

You can safely ignore this message if you don't need to deploy Pluto on GCP.
EOF
        exit 1;
    fi
    echo "$GCP_ADC_FILE" > "$GCLOUD_ADC_PATH"
fi
export GOOGLE_APPLICATION_CREDENTIALS="$GCLOUD_ADC_PATH"
