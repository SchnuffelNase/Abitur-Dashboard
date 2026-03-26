{
  "name": "GradeRecord",
  "type": "object",
  "properties": {
    "subject_id": {
      "type": "string",
      "description": "Fach-ID z.B. mathe, deutsch"
    },
    "points": {
      "type": "number",
      "description": "Punkte 0-15"
    },
    "semester": {
      "type": "string",
      "description": "z.B. JS1_1"
    },
    "exam_choice": {
      "type": "string",
      "description": "deutsch oder geschichte"
    }
  },
  "required": [
    "subject_id",
    "points"
  ]
}