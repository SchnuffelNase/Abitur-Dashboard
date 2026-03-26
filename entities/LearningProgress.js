{
  "name": "LearningProgress",
  "type": "object",
  "properties": {
    "subject_id": {
      "type": "string",
      "description": "Fach-ID"
    },
    "topic_key": {
      "type": "string",
      "description": "Eindeutiger Schl\u00fcssel des Themas"
    },
    "klasse": {
      "type": "string",
      "description": "10, 11 oder 12"
    },
    "completed": {
      "type": "boolean",
      "default": false
    },
    "notes": {
      "type": "string",
      "description": "Eigene Notizen zum Thema"
    }
  },
  "required": [
    "subject_id",
    "topic_key"
  ]
}