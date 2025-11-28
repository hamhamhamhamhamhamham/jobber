

{{- define "common.env" -}}
- name: PULSAR_SERVICE_URL
  value: pulsar://{{ .Release.Name }}-pulsar-broker.pulsar.svc.cluster.local:6650   

{{- end -}}

{{- define "secret.env" -}}
- name: dckr_pat_EEr_iOrpFdwQI4dbGBMxOCLhrw4   
{{- end -}}