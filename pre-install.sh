#!/bin/bash

echo $GOOGLE_SERVICES_JSON_BASE64 | base64 -d > ./google-services.json
