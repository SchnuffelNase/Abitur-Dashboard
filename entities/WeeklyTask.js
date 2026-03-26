{
  "name": "WeeklyTask",
  "type": "object",
  "properties": {
    "title": {
      "type": "string"
    },
    "subject_id": {
      "type": "string"
    },
    "description": {
      "type": "string"
    },
    "due_day": {
      "type": "string",
      "enum": [
        "Mo",
        "Di",
        "Mi",
        "Do",
        "Fr",
        "Sa",
        "So"
      ]
    },
    "completed": {
      "type": "boolean",
      "default": false
    },
    "priority": {
      "type": "string",
      "enum": [
        "red",
        "orange",
        "green"
      ],
      "default": "orange"
    },
    "week_start": {
      "type": "string",
      "description": "ISO-Datum des Wochenanfangs"
    }
  },
  "required": [
    "title",
    "subject_id"
  ]
}