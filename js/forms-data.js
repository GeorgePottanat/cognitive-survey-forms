// Form definitions: question wording, option order and printed codes.
// Where a code is printed on the paper form (e.g. "DK (88)") that code is the stored value.
window.FORMS = {
 "INSTRUMENTS": {
  "consent": {
   "key": "consent",
   "title": "Consent for Future Contact",
   "header": "followup",
   "items": [
    {
     "type": "radio",
     "name": "participant_consent",
     "label": "Has the participant consented to being contacted after the study for future research?",
     "options": [
      {
       "v": "yes",
       "l": "Yes"
      },
      {
       "v": "not_discussed",
       "l": "Not yet discussed with participant"
      },
      {
       "v": "no",
       "l": "No (declined)"
      }
     ],
     "required": true
    },
    {
     "type": "textarea",
     "name": "declined_reason",
     "label": "If declined, reason:",
     "show_if": {
      "field": "participant_consent",
      "in": [
       "no"
      ]
     }
    },
    {
     "type": "radio",
     "name": "informant_consent",
     "label": "Has the informant agreed to being contacted after the study for future research?",
     "options": [
      {
       "v": "yes",
       "l": "Yes"
      },
      {
       "v": "not_discussed",
       "l": "Not yet discussed with informant"
      },
      {
       "v": "not_applicable",
       "l": "Not applicable"
      },
      {
       "v": "no",
       "l": "No"
      }
     ],
     "required": true
    }
   ]
  },
  "informant_demographics": {
   "key": "informant_demographics",
   "title": "Demographics (Informant)",
   "header": "study",
   "items": [
    {
     "type": "date",
     "name": "form_date",
     "label": "Date",
     "required": true
    },
    {
     "type": "fieldrow",
     "fields": [
      {
       "name": "first_name",
       "label": "First Name",
       "identifier": true
      },
      {
       "name": "last_name",
       "label": "Last Name",
       "identifier": true
      }
     ]
    },
    {
     "type": "text",
     "name": "address",
     "label": "Address",
     "identifier": true
    },
    {
     "type": "fieldrow",
     "fields": [
      {
       "name": "city",
       "label": "City",
       "identifier": true
      },
      {
       "name": "state",
       "label": "State",
       "identifier": true,
       "size": 6
      },
      {
       "name": "zip",
       "label": "Zip",
       "identifier": true,
       "size": 10
      }
     ]
    },
    {
     "type": "fieldrow",
     "fields": [
      {
       "name": "home_phone",
       "label": "Home Phone",
       "identifier": true
      },
      {
       "name": "cell_phone",
       "label": "Cell Phone",
       "identifier": true
      }
     ]
    },
    {
     "type": "text",
     "name": "email",
     "label": "Email",
     "identifier": true
    },
    {
     "type": "note",
     "text": "(Please note that above personal identifiers are not to be included in the database)"
    },
    {
     "type": "dob",
     "name": "dob",
     "label": "Date of Birth"
    },
    {
     "type": "radio",
     "name": "gender",
     "label": "Gender:",
     "inline": true,
     "options": [
      {
       "v": "male",
       "l": "Male"
      },
      {
       "v": "female",
       "l": "Female"
      }
     ]
    },
    {
     "type": "checkbox",
     "name": "race",
     "label": "Race",
     "options": [
      {
       "v": "white",
       "l": "Caucasian/White"
      },
      {
       "v": "black",
       "l": "Black or African American"
      },
      {
       "v": "asian",
       "l": "Asian"
      },
      {
       "v": "aian",
       "l": "American Indian or Alaska Native"
      },
      {
       "v": "nhpi",
       "l": "Native Hawaiian/ Pacific Islander"
      },
      {
       "v": "other",
       "l": "Other, specify:",
       "specify": "race_other"
      }
     ]
    },
    {
     "type": "radio",
     "name": "ethnicity",
     "label": "Ethnicity",
     "inline": true,
     "options": [
      {
       "v": "hispanic",
       "l": "Hispanic or Latino"
      },
      {
       "v": "not_hispanic",
       "l": "Not Hispanic or Latino"
      }
     ]
    },
    {
     "type": "number",
     "name": "education_years",
     "label": "Years of Education",
     "min": 0,
     "max": 40,
     "step": "1"
    },
    {
     "type": "radio",
     "name": "highest_degree",
     "label": "Highest Degree:",
     "options": [
      {
       "v": "none",
       "l": "None"
      },
      {
       "v": "high_school",
       "l": "High School"
      },
      {
       "v": "ged",
       "l": "GED"
      },
      {
       "v": "associates",
       "l": "Associates Degree"
      },
      {
       "v": "bachelors",
       "l": "Bachelors Degree"
      },
      {
       "v": "masters",
       "l": "Masters Degree"
      },
      {
       "v": "doctorate",
       "l": "Doctorate"
      }
     ]
    },
    {
     "type": "radio",
     "name": "employment",
     "label": "Employment Status",
     "options": [
      {
       "v": "employed",
       "l": "Actively Employed"
      },
      {
       "v": "retired",
       "l": "Retired"
      },
      {
       "v": "disability",
       "l": "Disability"
      }
     ]
    },
    {
     "type": "text",
     "name": "occupation",
     "label": "Occupation:"
    },
    {
     "type": "radio",
     "name": "relationship",
     "label": "Relationship to subject:",
     "options": [
      {
       "v": "spouse",
       "l": "Spouse, partner, or companion (including ex-spouse, ex-partner, fiancé(e), boyfriend, girlfriend)"
      },
      {
       "v": "child",
       "l": "Child (by blood or through marriage or adoption)"
      },
      {
       "v": "sibling",
       "l": "Sibling (by blood or through marriage or adoption)"
      },
      {
       "v": "other_relative",
       "l": "Other relative (by blood or through marriage or adoption)"
      },
      {
       "v": "friend",
       "l": "Friend, neighbor, or someone known through family, friends work or community"
      },
      {
       "v": "paid_caregiver",
       "l": "Paid caregiver, health care provider, or clinician"
      }
     ],
     "required": true
    },
    {
     "type": "initials",
     "name": "collected_by",
     "label": "Collected by:",
     "required": true
    }
   ]
  },
  "coparticipant": {
   "key": "coparticipant",
   "title": "Co-Participant/Informant Questionnaire",
   "header": "followup",
   "items": [
    {
     "type": "radio",
     "name": "collected",
     "label": "Collected?",
     "inline": true,
     "options": [
      {
       "v": "no",
       "l": "No"
      },
      {
       "v": "yes",
       "l": "Yes"
      }
     ],
     "required": true
    },
    {
     "type": "block",
     "show_if": {
      "field": "collected",
      "in": [
       "no"
      ]
     },
     "children": [
      {
       "type": "radio",
       "name": "not_collected_reason",
       "label": "If No, please provide reason:",
       "options": [
        {
         "v": "verbal_refusal",
         "l": "Verbal refusal"
        },
        {
         "v": "informant_unavailable",
         "l": "Informant unavailable (specify below)"
        },
        {
         "v": "other_problem",
         "l": "Other problem (specify below)"
        }
       ],
       "required": true
      },
      {
       "type": "text",
       "name": "not_collected_specify",
       "label": "Specify reason not collected:"
      }
     ]
    },
    {
     "type": "block",
     "show_if": {
      "field": "collected",
      "in": [
       "yes"
      ]
     },
     "children": [
      {
       "type": "date",
       "name": "date_collected",
       "label": "Date Collected: (MM/DD/YYYY)",
       "required": true
      },
      {
       "type": "radio",
       "name": "language",
       "label": "Language of test administration:",
       "inline": true,
       "options": [
        {
         "v": "english",
         "l": "English"
        },
        {
         "v": "spanish",
         "l": "Spanish"
        },
        {
         "v": "other",
         "l": "Other (specify):",
         "specify": "language_other"
        }
       ]
      },
      {
       "type": "radio",
       "name": "relationship",
       "label": "What is co-participant’s relationship to the subject?",
       "required": true,
       "options": [
        {
         "v": "spouse",
         "l": "Spouse, partner, or companion (include ex-spouse, ex-partner, fiancé(e), boyfriend, girlfriend)"
        },
        {
         "v": "child",
         "l": "Child (by blood or through marriage or adoption)"
        },
        {
         "v": "sibling",
         "l": "Sibling (by blood or through marriage or adoption)"
        },
        {
         "v": "other_relative",
         "l": "Other relative (by blood or through marriage or adoption)"
        },
        {
         "v": "friend",
         "l": "Friend, neighbor, or someone known through family, friends, work, or community (e.g., church)"
        },
        {
         "v": "paid_caregiver",
         "l": "Paid caregiver, health care provider, or clinician"
        }
       ]
      },
      {
       "type": "radio",
       "name": "years_known",
       "label": "How long has the co-participant known the subject?",
       "required": true,
       "options": [
        {
         "v": "le1",
         "l": "1 year or less"
        },
        {
         "v": "2_5",
         "l": "2-5 years"
        },
        {
         "v": "6_9",
         "l": "6-9 years"
        },
        {
         "v": "10plus",
         "l": "10+ years"
        }
       ]
      },
      {
       "type": "radio",
       "name": "lives_with",
       "label": "Does the co-participant live with the subject?",
       "options": [
        {
         "v": "no",
         "l": "No"
        },
        {
         "v": "yes",
         "l": "Yes"
        }
       ],
       "required": true
      },
      {
       "type": "block",
       "show_if": {
        "field": "lives_with",
        "in": [
         "no"
        ]
       },
       "children": [
        {
         "type": "radio",
         "name": "visit_freq",
         "label": "If no, approximate frequency of in-person visits?",
         "options": [
          {
           "v": "daily",
           "l": "Daily"
          },
          {
           "v": "3_per_week",
           "l": "At least three times per week"
          },
          {
           "v": "weekly",
           "l": "Weekly"
          },
          {
           "v": "3_per_month",
           "l": "At least three times per month"
          },
          {
           "v": "monthly",
           "l": "Monthly"
          },
          {
           "v": "lt_monthly",
           "l": "Less than once a month"
          }
         ],
         "required": true
        },
        {
         "type": "radio",
         "name": "phone_freq",
         "label": "If no, approximate frequency of telephone contact?",
         "options": [
          {
           "v": "daily",
           "l": "Daily"
          },
          {
           "v": "3_per_week",
           "l": "At least three times per week"
          },
          {
           "v": "weekly",
           "l": "Weekly"
          },
          {
           "v": "3_per_month",
           "l": "At least three times per month"
          },
          {
           "v": "monthly",
           "l": "Monthly"
          },
          {
           "v": "lt_monthly",
           "l": "Less than once a month"
          }
         ],
         "required": true
        }
       ]
      }
     ]
    }
   ]
  },
  "ecog12": {
   "key": "ecog12",
   "title": "ECog-12 (Everyday Cognition): Informant",
   "header": "followup",
   "items": [
    {
     "type": "note",
     "text": "Please refer to the Evaluator’s Instructions Manual for detailed instructions on the administration of this assessment"
    },
    {
     "type": "radio",
     "name": "administered",
     "label": "Was the ECog-12 Informant Form administered?",
     "options": [
      {
       "v": "no",
       "l": "No"
      },
      {
       "v": "yes",
       "l": "Yes"
      }
     ],
     "inline": true,
     "required": true
    },
    {
     "type": "block",
     "show_if": {
      "field": "administered",
      "in": [
       "no"
      ]
     },
     "children": [
      {
       "type": "radio",
       "name": "not_admin_reason",
       "label": "If No, please provide the primary reason:",
       "options": [
        {
         "v": "verbal_refusal",
         "l": "Verbal refusal"
        },
        {
         "v": "informant_unavailable",
         "l": "Informant unavailable (specify below)"
        },
        {
         "v": "other_problem",
         "l": "Other problem (specify below)"
        }
       ],
       "required": true
      },
      {
       "type": "text",
       "name": "not_admin_specify",
       "label": "Specify reason not administered:"
      }
     ]
    },
    {
     "type": "block",
     "show_if": {
      "field": "administered",
      "in": [
       "yes"
      ]
     },
     "children": [
      {
       "type": "date",
       "name": "eval_date",
       "label": "Date of Evaluation: (MM/DD/YYYY)",
       "required": true
      },
      {
       "type": "radio",
       "name": "language",
       "label": "Language of test administration:",
       "inline": true,
       "options": [
        {
         "v": "english",
         "l": "English"
        },
        {
         "v": "spanish",
         "l": "Spanish"
        },
        {
         "v": "other",
         "l": "Other (specify):",
         "specify": "language_other"
        }
       ]
      },
      {
       "type": "radio",
       "name": "years_known",
       "label": "How long have you known the participant?",
       "inline": true,
       "options": [
        {
         "v": "lt10",
         "l": "<10 years"
        },
        {
         "v": "ge10",
         "l": "At least 10 years"
        }
       ]
      },
      {
       "type": "radio",
       "name": "worried",
       "label": "Are you worried or believe that he/she is having problems with their attention, concentration, or memory?",
       "inline": true,
       "options": [
        {
         "v": "no",
         "l": "No"
        },
        {
         "v": "yes",
         "l": "Yes"
        }
       ]
      },
      {
       "type": "matrix",
       "label": "Compared to 10 years ago, have there been any changes in their ability to...",
       "columns": [
        {
         "v": "1",
         "l": "Better or no change"
        },
        {
         "v": "2",
         "l": "Questionable or occasionally worse"
        },
        {
         "v": "3",
         "l": "Consistently a little worse"
        },
        {
         "v": "4",
         "l": "Consistently much worse"
        },
        {
         "v": "dk",
         "l": "Don't Know or N/A"
        }
       ],
       "required": true,
       "required_unless": {
        "field": "discontinued",
        "in": [
         "yes"
        ]
       },
       "rows": [
        {
         "name": "q1",
         "label": "1. Remember where they have placed things (glasses, keys)?"
        },
        {
         "name": "q2",
         "label": "2. Remember the current date or day of the week?"
        },
        {
         "name": "q3",
         "label": "3. Communicate thoughts in a conversation?"
        },
        {
         "name": "q4",
         "label": "4. Understand spoken directions or instructions?"
        },
        {
         "name": "q5",
         "label": "5. Read a map and help with directions when someone else is driving?"
        },
        {
         "name": "q6",
         "label": "6. Find their way around a house/building that you have visited many times?"
        },
        {
         "name": "q7",
         "label": "7. Anticipate weather changes and planning accordingly?"
        },
        {
         "name": "q8",
         "label": "8. Think ahead?"
        },
        {
         "name": "q9",
         "label": "9. Keep their living and workspace organized?"
        },
        {
         "name": "q10",
         "label": "10. Balance their checkbook/ account without error?"
        },
        {
         "name": "q11",
         "label": "11. Do two things at once?"
        },
        {
         "name": "q12",
         "label": "12. Cook or work, and talk at the same time?"
        }
       ]
      },
      {
       "type": "radio",
       "name": "discontinued",
       "label": "Was the questionnaire discontinued?",
       "inline": true,
       "options": [
        {
         "v": "no",
         "l": "No"
        },
        {
         "v": "yes",
         "l": "Yes"
        }
       ],
       "required": true
      },
      {
       "type": "radio",
       "name": "discontinued_reason",
       "label": "If yes, reason for discontinuation:",
       "show_if": {
        "field": "discontinued",
        "in": [
         "yes"
        ]
       },
       "required": true,
       "options": [
        {
         "v": "refusal",
         "l": "Refusal"
        },
        {
         "v": "task_difficulty",
         "l": "Task difficulty (i.e., could not understand)"
        },
        {
         "v": "impairment",
         "l": "Impairment (i.e., visual, hearing, limb/motor problem)"
        }
       ]
      }
     ]
    }
   ]
  },
  "npiq": {
   "key": "npiq",
   "title": "Neuropsychiatric Inventory Questionnaire (NPI-Q) - Informant Assessment",
   "header": "followup",
   "items": [
    {
     "type": "note",
     "text": "Please refer to the Evaluator’s Instructions Manual for detailed instructions on the administration of this assessment"
    },
    {
     "type": "radio",
     "name": "administered",
     "label": "Was the NPI-Q administered?",
     "options": [
      {
       "v": "no",
       "l": "No"
      },
      {
       "v": "yes",
       "l": "Yes"
      }
     ],
     "inline": true,
     "required": true
    },
    {
     "type": "block",
     "show_if": {
      "field": "administered",
      "in": [
       "no"
      ]
     },
     "children": [
      {
       "type": "radio",
       "name": "not_admin_reason",
       "label": "If No, please provide the primary reason:",
       "options": [
        {
         "v": "verbal_refusal",
         "l": "Verbal refusal"
        },
        {
         "v": "informant_unavailable",
         "l": "Informant unavailable (specify below)"
        },
        {
         "v": "other_problem",
         "l": "Other problem (specify below)"
        }
       ],
       "required": true
      },
      {
       "type": "text",
       "name": "not_admin_specify",
       "label": "Specify reason not administered:"
      }
     ]
    },
    {
     "type": "block",
     "show_if": {
      "field": "administered",
      "in": [
       "yes"
      ]
     },
     "children": [
      {
       "type": "date",
       "name": "eval_date",
       "label": "Date of Evaluation: (MM/DD/YYYY)",
       "required": true
      },
      {
       "type": "radio",
       "name": "language",
       "label": "Language of test administration:",
       "inline": true,
       "options": [
        {
         "v": "english",
         "l": "English"
        },
        {
         "v": "spanish",
         "l": "Spanish"
        },
        {
         "v": "other",
         "l": "Other (specify):",
         "specify": "language_other"
        }
       ]
      },
      {
       "type": "radio",
       "name": "co_participant",
       "label": "NPI co-participant:",
       "inline": true,
       "options": [
        {
         "v": "spouse",
         "l": "Spouse"
        },
        {
         "v": "child",
         "l": "Child"
        },
        {
         "v": "other",
         "l": "Other (specify):",
         "specify": "co_participant_other"
        }
       ]
      },
      {
       "type": "npi",
       "required": true,
       "presence": [
        {
         "v": "yes",
         "l": "Yes"
        },
        {
         "v": "no",
         "l": "No"
        },
        {
         "v": "unknown",
         "l": "Unknown"
        }
       ],
       "severity": [
        {
         "v": "1",
         "l": "Mild"
        },
        {
         "v": "2",
         "l": "Moderate"
        },
        {
         "v": "3",
         "l": "Severe"
        },
        {
         "v": "unknown",
         "l": "Unknown"
        }
       ],
       "rows": [
        {
         "name": "q1",
         "label": "1. Delusions — Does the patient have false beliefs, such as thinking that others are stealing from him/her or planning to harm him/her in some way?"
        },
        {
         "name": "q2",
         "label": "2. Hallucinations — Does the patient have hallucinations such as false visions or voices? Does he or she seem to hear or see things that are not present?"
        },
        {
         "name": "q3",
         "label": "3. Agitation/aggression — Is the patient resistive to help from others at times, or hard to handle?"
        },
        {
         "name": "q4",
         "label": "4. Depression/dysphoria — Does the patient seem sad or say that he/she is depressed?"
        },
        {
         "name": "q5",
         "label": "5. Anxiety — Does the patient become upset when separated from you? Does he/she have any other signs of nervousness such as shortness of breath, sighing, being unable to relax, or feeling excessively tense?"
        },
        {
         "name": "q6",
         "label": "6. Elation/euphoria — Does the patient appear to feel too good or act excessively happy?"
        },
        {
         "name": "q7",
         "label": "7. Apathy/ indifference — Does the patient seem less interested in his/her usual activities or in the activities and plans of others?"
        },
        {
         "name": "q8",
         "label": "8. Disinhibition — Does the patient seem to act impulsively, for example, talking to strangers as if he/she knows them, or saying things that may hurt people’s feelings?"
        },
        {
         "name": "q9",
         "label": "9. Irritability/lability — Is the patient impatient and cranky? Does he/she have difficulty coping with delays or waiting for planned activities?"
        },
        {
         "name": "q10",
         "label": "10. Motor disturbance — Does the patient engage in repetitive activities such as pacing around the house, handling buttons, wrapping string, or doing other things repeatedly?"
        },
        {
         "name": "q11",
         "label": "11. Nighttime behaviors — Does the patient awaken you during the night, rise too early in the morning, or take excessive naps during the day?"
        },
        {
         "name": "q12",
         "label": "12. Appetite/eating — Has the patient lost or gained weight, or had a change in the type of food he/she likes?"
        }
       ]
      }
     ]
    }
   ]
  },
  "fas": {
   "key": "fas",
   "title": "Functional Assessment Scale (FAS)",
   "header": "followup",
   "items": [
    {
     "type": "note",
     "text": "Please refer to the Evaluator’s Instructions Manual for detailed instructions on the administration of this assessment"
    },
    {
     "type": "radio",
     "name": "administered",
     "label": "Was the FAS Form administered?",
     "options": [
      {
       "v": "no",
       "l": "No"
      },
      {
       "v": "yes",
       "l": "Yes"
      }
     ],
     "inline": true,
     "required": true
    },
    {
     "type": "block",
     "show_if": {
      "field": "administered",
      "in": [
       "no"
      ]
     },
     "children": [
      {
       "type": "radio",
       "name": "not_admin_reason",
       "label": "If No, please provide the primary reason:",
       "options": [
        {
         "v": "verbal_refusal",
         "l": "Verbal refusal"
        },
        {
         "v": "informant_unavailable",
         "l": "Informant unavailable (specify below)"
        },
        {
         "v": "other_problem",
         "l": "Other problem (specify below)"
        }
       ],
       "required": true
      },
      {
       "type": "text",
       "name": "not_admin_specify",
       "label": "Specify reason not administered:"
      }
     ]
    },
    {
     "type": "block",
     "show_if": {
      "field": "administered",
      "in": [
       "yes"
      ]
     },
     "children": [
      {
       "type": "date",
       "name": "eval_date",
       "label": "Date of Evaluation: (MM/DD/YYYY)",
       "required": true
      },
      {
       "type": "radio",
       "name": "language",
       "label": "Language of test administration:",
       "inline": true,
       "options": [
        {
         "v": "english",
         "l": "English"
        },
        {
         "v": "spanish",
         "l": "Spanish"
        },
        {
         "v": "other",
         "l": "Other (specify):",
         "specify": "language_other"
        }
       ]
      },
      {
       "type": "matrix",
       "label": "In the past four weeks, did the participant have difficulty or need help with:",
       "columns": [
        {
         "v": "na",
         "l": "Not applicable (e.g., never did)"
        },
        {
         "v": "0",
         "l": "Normal"
        },
        {
         "v": "1",
         "l": "Has difficulty, but does by self"
        },
        {
         "v": "2",
         "l": "Requires assistance"
        },
        {
         "v": "3",
         "l": "Dependent"
        },
        {
         "v": "unknown",
         "l": "Unknown"
        }
       ],
       "required": true,
       "rows": [
        {
         "name": "q1",
         "label": "1. Writing checks, paying bills, or balancing a checkbook"
        },
        {
         "name": "q2",
         "label": "2. Assembling tax records, business affairs, or other papers"
        },
        {
         "name": "q3",
         "label": "3. Shopping alone for clothes, household necessities, or groceries"
        },
        {
         "name": "q4",
         "label": "4. Playing a game of skill such as bridge or chess, working on a hobby"
        },
        {
         "name": "q5",
         "label": "5. Heating water, making a cup of coffee, turning off the stove"
        },
        {
         "name": "q6",
         "label": "6. Preparing a balanced meal"
        },
        {
         "name": "q7",
         "label": "7. Keeping track of current events"
        },
        {
         "name": "q8",
         "label": "8. Paying attention to and understanding a TV program, book, or magazine"
        },
        {
         "name": "q9",
         "label": "9. Remembering appointments, family occasions, holidays, medications"
        },
        {
         "name": "q10",
         "label": "10. Traveling out of the neighborhood, driving, or arranging to take public transportation"
        }
       ]
      }
     ]
    }
   ]
  },
  "cdr_informant": {
   "key": "cdr_informant",
   "title": "CDR Interview (Informant)",
   "header": "study",
   "intro": "This is a semi-structured interview. Please ask all of the questions. Ask additional questions necessary to determine CDR rating. Please note responses and additional information. Do not use neuropsychological test scores in CDR rating.",
   "items": [
    {
     "type": "date",
     "name": "form_date",
     "label": "Date",
     "required": true
    },
    {
     "type": "section",
     "label": "MEMORY"
    },
    {
     "type": "textarea",
     "name": "m1",
     "label": "1. How good is the subject’s memory today, as compared to 10 years ago?"
    },
    {
     "type": "textarea",
     "name": "m2",
     "label": "2. Have you noticed any changes in subject's memory recently?",
     "help": "Record spontaneous responses:"
    },
    {
     "type": "note",
     "text": "For each problem identified below, check yes only if this represents a change from years ago, and list the approximate time frame when the problems began."
    },
    {
     "type": "note",
     "text": "“I’m going to ask you a few, more specific questions regarding the subject’s memory. Does he/she: [Codes: No = 0; Yes = 1; DK = 88]"
    },
    {
     "type": "radio",
     "name": "m1a",
     "inline": true,
     "options": [
      {
       "v": "0",
       "l": "no"
      },
      {
       "v": "1",
       "l": "yes"
      },
      {
       "v": "88",
       "l": "DK"
      }
     ],
     "label": "1a. forget appointments or relies more on calendar? (forget to check or checks multiple times / day)"
    },
    {
     "type": "radio",
     "name": "m1b",
     "inline": true,
     "options": [
      {
       "v": "0",
       "l": "no"
      },
      {
       "v": "1",
       "l": "yes"
      },
      {
       "v": "88",
       "l": "DK"
      }
     ],
     "label": "1b. write things down more? (need more written lists or reminders than used to)"
    },
    {
     "type": "radio",
     "name": "m1c",
     "inline": true,
     "options": [
      {
       "v": "0",
       "l": "no"
      },
      {
       "v": "1",
       "l": "yes"
      },
      {
       "v": "88",
       "l": "DK"
      }
     ],
     "label": "1c. repeat the same stories or questions in the same conversation?"
    },
    {
     "type": "radio",
     "name": "m1d",
     "inline": true,
     "options": [
      {
       "v": "0",
       "l": "no"
      },
      {
       "v": "1",
       "l": "yes"
      },
      {
       "v": "88",
       "l": "DK"
      }
     ],
     "label": "1d. forget what people say in conversations or on the phone, forget to pass on messages?"
    },
    {
     "type": "radio",
     "name": "m1e",
     "inline": true,
     "options": [
      {
       "v": "0",
       "l": "no"
      },
      {
       "v": "1",
       "l": "yes"
      },
      {
       "v": "88",
       "l": "DK"
      }
     ],
     "label": "1e. spend more time looking for objects (papers, glasses, keys, wallet, etc.)? (are they forgetting where they parked the car)"
    },
    {
     "type": "radio",
     "name": "m1f",
     "inline": true,
     "options": [
      {
       "v": "0",
       "l": "no"
      },
      {
       "v": "1",
       "l": "yes"
      },
      {
       "v": "88",
       "l": "DK"
      }
     ],
     "label": "1f. more trouble finding the right words he/she wants to use? (do they get stuck in the middle of a sentence, are they at a loss for words?)"
    },
    {
     "type": "radio",
     "name": "m1g",
     "inline": true,
     "options": [
      {
       "v": "0",
       "l": "no"
      },
      {
       "v": "1",
       "l": "yes"
      },
      {
       "v": "88",
       "l": "DK"
      }
     ],
     "label": "1g. talking less over time? (DQ)"
    },
    {
     "type": "text",
     "name": "m1g_year",
     "label": "No = 9999; DK = 8888; Yes= Year:",
     "size": 8
    },
    {
     "type": "radio",
     "name": "m1h",
     "inline": true,
     "options": [
      {
       "v": "0",
       "l": "no"
      },
      {
       "v": "1",
       "l": "yes"
      },
      {
       "v": "88",
       "l": "DK"
      }
     ],
     "label": "1h. more trouble finding names (names of people they see often)?"
    },
    {
     "type": "radio",
     "name": "m1i",
     "inline": true,
     "options": [
      {
       "v": "0",
       "l": "no"
      },
      {
       "v": "1",
       "l": "yes"
      },
      {
       "v": "88",
       "l": "DK"
      }
     ],
     "label": "1i. more trouble recognizing familiar faces? (DQ)"
    },
    {
     "type": "text",
     "name": "m1i_year",
     "label": "No = 9999; DK = 8888; Yes= Year:",
     "size": 8
    },
    {
     "type": "radio",
     "name": "m1j",
     "inline": true,
     "options": [
      {
       "v": "0",
       "l": "no"
      },
      {
       "v": "1",
       "l": "yes"
      },
      {
       "v": "88",
       "l": "DK"
      }
     ],
     "label": "1j. more trouble with other kinds of things? (forgetting to turn off the stove/oven; forgetting to lock doors)"
    },
    {
     "type": "radio",
     "name": "m2r",
     "inline": true,
     "label": "2. In terms of subject's ability to recall recent events, things that have happened lately, would you say that the subject remembers things...",
     "options": [
      {
       "v": "usually",
       "l": "Usually"
      },
      {
       "v": "sometimes",
       "l": "Sometimes"
      },
      {
       "v": "rarely",
       "l": "Rarely"
      },
      {
       "v": "dk",
       "l": "DK"
      }
     ]
    },
    {
     "type": "textarea",
     "name": "m2r_describe",
     "label": "Describe:",
     "rows": 2
    },
    {
     "type": "radio",
     "name": "m3",
     "inline": true,
     "options": [
      {
       "v": "0",
       "l": "Usually (0)"
      },
      {
       "v": "1",
       "l": "Sometimes (1)"
      },
      {
       "v": "2",
       "l": "Rarely (2)"
      },
      {
       "v": "88",
       "l": "DK (88)"
      }
     ],
     "label": "3. Suppose you asked the subject to buy 4 or 5 things at the store, do you think that he/she would remember to buy all of the items without writing them down?"
    },
    {
     "type": "textarea",
     "name": "m3_describe",
     "label": "Describe:",
     "rows": 2
    },
    {
     "type": "note",
     "strong": true,
     "text": "If subject has no memory problem, skip to item 6"
    },
    {
     "type": "radio",
     "name": "m4",
     "inline": true,
     "options": [
      {
       "v": "rarely_never",
       "l": "rarely or never"
      },
      {
       "v": "sometimes",
       "l": "sometimes"
      },
      {
       "v": "usually",
       "l": "usually"
      },
      {
       "v": "dk",
       "l": "DK"
      }
     ],
     "label": "4. Suppose there is a major event, for example, a trip, party, family wedding, do you think that he/she would completely forget that it happened within a few weeks of the event?"
    },
    {
     "type": "textarea",
     "name": "m4_describe",
     "label": "Describe:",
     "rows": 2
    },
    {
     "type": "radio",
     "name": "m5",
     "inline": true,
     "options": [
      {
       "v": "rarely_never",
       "l": "rarely or never"
      },
      {
       "v": "sometimes",
       "l": "sometimes"
      },
      {
       "v": "usually",
       "l": "usually"
      },
      {
       "v": "dk",
       "l": "DK"
      }
     ],
     "label": "5. After a big event like this, do you think he/she would forget important details of what happened?"
    },
    {
     "type": "textarea",
     "name": "m5_describe",
     "label": "Describe:",
     "rows": 2
    },
    {
     "type": "radio",
     "name": "m6",
     "inline": true,
     "options": [
      {
       "v": "rarely_never",
       "l": "rarely or never"
      },
      {
       "v": "sometimes",
       "l": "sometimes"
      },
      {
       "v": "usually",
       "l": "usually"
      },
      {
       "v": "dk",
       "l": "DK"
      }
     ],
     "label": "6. How good is his/her memory for things that have happened a long time ago, for example, does he/she forget important events from the past such as when his/her children were born, when he/she got married, where he/she worked?"
    },
    {
     "type": "textarea",
     "name": "m6_describe",
     "label": "Describe:",
     "rows": 2
    },
    {
     "type": "radio",
     "name": "m7",
     "label": "7. From what you have described, the subject has: (DK = 88)",
     "options": [
      {
       "v": "0",
       "l": "Normal memory (0) (No recent change in memory)"
      },
      {
       "v": "1",
       "l": "Is forgetful (1) (Some mild changes)"
      },
      {
       "v": "2",
       "l": "A problem with memory (2) (That interfere w/ everyday activities)"
      },
      {
       "v": "88",
       "l": "DK (88)"
      }
     ]
    },
    {
     "type": "note",
     "strong": true,
     "text": "If subject does not have memory problems, skip to item 9. Code 99 if Memory box score = 0"
    },
    {
     "type": "radio",
     "name": "m8",
     "inline": true,
     "label": "8. Would you say that his/her memory changes are a consistent problem or an intermittent one?",
     "options": [
      {
       "v": "1",
       "l": "Intermittent (1)"
      },
      {
       "v": "2",
       "l": "Consistent (2)"
      },
      {
       "v": "88",
       "l": "DK (88)"
      },
      {
       "v": "99",
       "l": "No memory problem (99)"
      }
     ]
    },
    {
     "type": "number",
     "name": "m8a_years",
     "step": "0.1",
     "min": 0,
     "label": "8a. If you think back, how long ago did the memory problem start? — Number of years to nearest decimal"
    },
    {
     "type": "radio",
     "name": "m8a_code",
     "inline": true,
     "label": "or",
     "options": [
      {
       "v": "88",
       "l": "DK (88)"
      },
      {
       "v": "99",
       "l": "No memory problem (99)"
      }
     ],
     "exclusive_with": "m8a_years"
    },
    {
     "type": "radio",
     "name": "m8b",
     "inline": true,
     "options": [
      {
       "v": "0",
       "l": "No (0)"
      },
      {
       "v": "1",
       "l": "Yes (1)"
      },
      {
       "v": "88",
       "l": "DK (88)"
      },
      {
       "v": "99",
       "l": "No memory problem (99)"
      }
     ],
     "label": "8b. Has there been some decline in memory during the past year?"
    },
    {
     "type": "radio",
     "name": "m8c",
     "inline": true,
     "options": [
      {
       "v": "0",
       "l": "No (0)"
      },
      {
       "v": "1",
       "l": "Yes (1)"
      },
      {
       "v": "88",
       "l": "DK (88)"
      },
      {
       "v": "99",
       "l": "No memory problem (99)"
      }
     ],
     "label": "8c. Do you think that the memory difficulties he/she has now would have interfered with his/her job if he/she was still working? (or other daily activities about 10 or 15 years ago)"
    },
    {
     "type": "text",
     "name": "m8d",
     "size": 12,
     "label": "8d. When was the last time he / she seemed to be really well or his old self? (DQ) (DK = 8888, NA = 9999)"
    },
    {
     "type": "radio",
     "name": "m8e",
     "inline": true,
     "options": [
      {
       "v": "0",
       "l": "No (0)"
      },
      {
       "v": "1",
       "l": "Yes (1)"
      },
      {
       "v": "88",
       "l": "DK (88)"
      },
      {
       "v": "99",
       "l": "No memory problems (99)"
      }
     ],
     "label": "8e. Is a doctor aware of his/her memory problems? (DQ)"
    },
    {
     "type": "radio",
     "name": "m8f",
     "label": "8f. What does the doctor believe is causing the problems? (DQ)",
     "inline": true,
     "options": [
      {
       "v": "1",
       "l": "1 = AD"
      },
      {
       "v": "2",
       "l": "2 = Dementia"
      },
      {
       "v": "3",
       "l": "3 = Confusion"
      },
      {
       "v": "4",
       "l": "4 = Depression"
      },
      {
       "v": "5",
       "l": "5 = Nothing Wrong"
      },
      {
       "v": "6",
       "l": "6 = PD"
      },
      {
       "v": "7",
       "l": "7 = Other",
       "specify": "m8f_other"
      },
      {
       "v": "88",
       "l": "88 = DK"
      },
      {
       "v": "99",
       "l": "99 = No memory problems"
      }
     ]
    },
    {
     "type": "radio",
     "name": "m8g",
     "inline": true,
     "options": [
      {
       "v": "0",
       "l": "No (0)"
      },
      {
       "v": "1",
       "l": "Yes (1)"
      },
      {
       "v": "88",
       "l": "DK (88)"
      },
      {
       "v": "99",
       "l": "No memory problems (99)"
      }
     ],
     "label": "8g. Did he/she receive any medication for his memory problems? (DQ)"
    },
    {
     "type": "radio",
     "name": "m8h",
     "inline": true,
     "options": [
      {
       "v": "0",
       "l": "No (0)"
      },
      {
       "v": "1",
       "l": "Yes (1)"
      },
      {
       "v": "88",
       "l": "DK (88)"
      },
      {
       "v": "99",
       "l": "No memory problems (99)"
      }
     ],
     "label": "8h. Did he/she receive a CAT scan or MRI of the head? If yes: Date (DQ)"
    },
    {
     "type": "text",
     "name": "m8h_date",
     "label": "8h. If yes: Date",
     "size": 12,
     "show_if": {
      "field": "m8h",
      "in": [
       "1"
      ]
     }
    },
    {
     "type": "radio",
     "name": "m8i",
     "label": "8i. How would you describe the changes in memory you have noticed? Would you say that they have:",
     "options": [
      {
       "v": "1",
       "l": "been stable / stayed the same … 1"
      },
      {
       "v": "2",
       "l": "steady downhill progression / become gradually worse … 2"
      },
      {
       "v": "3",
       "l": "abrupt decline / occurred suddenly but then resolved or leveled off … 3"
      },
      {
       "v": "4",
       "l": "varied from day to day … 4"
      },
      {
       "v": "88",
       "l": "don't know … 88"
      },
      {
       "v": "99",
       "l": "no memory problems … 99"
      }
     ]
    },
    {
     "type": "radio",
     "name": "m8j",
     "inline": true,
     "label": "8j. Did trouble with memory begin suddenly or slowly? (DQ)",
     "options": [
      {
       "v": "0",
       "l": "Suddenly (0)"
      },
      {
       "v": "1",
       "l": "Slowly (1)"
      },
      {
       "v": "88",
       "l": "DK (88)"
      },
      {
       "v": "99",
       "l": "No memory problems (99)"
      }
     ]
    },
    {
     "type": "section",
     "label": "Judgment and Problem Solving"
    },
    {
     "type": "radio",
     "name": "j9",
     "label": "9. In general, if you had to rate his/her abilities to solve problems at the present time, would you consider them:",
     "options": [
      {
       "v": "as_good",
       "l": "As good as they have ever been"
      },
      {
       "v": "good_not_as_good",
       "l": "Good, but not as good as before"
      },
      {
       "v": "fair",
       "l": "Fair"
      },
      {
       "v": "poor",
       "l": "Poor"
      },
      {
       "v": "no_ability",
       "l": "No ability at all"
      }
     ]
    },
    {
     "type": "radio",
     "name": "j10",
     "inline": true,
     "options": [
      {
       "v": "0",
       "l": "(0) No loss"
      },
      {
       "v": "1",
       "l": "(1) Some loss"
      },
      {
       "v": "2",
       "l": "(2) Severe loss"
      },
      {
       "v": "88",
       "l": "DK (88)"
      }
     ],
     "label": "10. Rate his/her ability to cope w/ small sums of money (e.g., make change, leave a small tip)"
    },
    {
     "type": "radio",
     "name": "j11",
     "inline": true,
     "options": [
      {
       "v": "0",
       "l": "(0) No loss"
      },
      {
       "v": "1",
       "l": "(1) Some loss"
      },
      {
       "v": "2",
       "l": "(2) Severe loss"
      },
      {
       "v": "88",
       "l": "DK (88)"
      }
     ],
     "label": "11. Rate his/her ability to handle complicated financial or business transactions (e.g., balance checkbook, pay bills)"
    },
    {
     "type": "radio",
     "name": "j12",
     "label": "12. Can he/she handle a household emergency (plumbing leak, small fire). If problems, give examples.",
     "options": [
      {
       "v": "as_well",
       "l": "As well as before"
      },
      {
       "v": "worse_thinking",
       "l": "Worse than before because of trouble thinking"
      },
      {
       "v": "worse_other",
       "l": "Worse than before, another reason (why?)",
       "specify": "j12_why"
      }
     ]
    },
    {
     "type": "textarea",
     "name": "j12_examples",
     "label": "Examples:",
     "rows": 2
    },
    {
     "type": "radio",
     "name": "j13",
     "inline": true,
     "options": [
      {
       "v": "0",
       "l": "Usually (0)"
      },
      {
       "v": "1",
       "l": "Sometimes (1)"
      },
      {
       "v": "2",
       "l": "Rarely (2)"
      },
      {
       "v": "88",
       "l": "DK (88)"
      }
     ],
     "label": "13. Can he/she understand situations or explanations? If problems, give examples."
    },
    {
     "type": "textarea",
     "name": "j13_examples",
     "label": "Examples:",
     "rows": 2
    },
    {
     "type": "radio",
     "name": "j14",
     "inline": true,
     "options": [
      {
       "v": "0",
       "l": "Usually (0)"
      },
      {
       "v": "1",
       "l": "Sometimes (1)"
      },
      {
       "v": "2",
       "l": "Rarely (2)"
      },
      {
       "v": "88",
       "l": "DK (88)"
      }
     ],
     "label": "14. Does he/she behave appropriately in social situations? If problems, give examples"
    },
    {
     "type": "textarea",
     "name": "j14_examples",
     "label": "Examples:",
     "rows": 2
    },
    {
     "type": "section",
     "label": "Home and Hobbies"
    },
    {
     "type": "radio",
     "name": "h15",
     "inline": true,
     "options": [
      {
       "v": "0",
       "l": "No change (0)"
      },
      {
       "v": "1",
       "l": "Some change (1)"
      },
      {
       "v": "2",
       "l": "Significant Change (2)"
      },
      {
       "v": "88",
       "l": "DK (88)"
      }
     ],
     "label": "15. Have you noticed changes in his/her ability to do household chores (Choose 1-2, Examples: cooking, laundry, cleaning, using household appliances like dishwasher, vacuum, or television, doing grocery shopping, yard work, taking out the garbage, taking care of the car, or fixing things around the house?) [due to a cognitive change]."
    },
    {
     "type": "textarea",
     "name": "h15_examples",
     "label": "If problems, give examples:",
     "rows": 2
    },
    {
     "type": "textarea",
     "name": "h16",
     "rows": 2,
     "label": "16. Does he/she have any hobbies? (Choose 1-2, Examples: sewing, knitting, other handicrafts, painting, reading, photography, gardening, going to theater, movies or symphony, woodworking, playing cards, watching or playing sports?)"
    },
    {
     "type": "radio",
     "name": "h17",
     "inline": true,
     "options": [
      {
       "v": "0",
       "l": "No (0)"
      },
      {
       "v": "1",
       "l": "Yes (1)"
      },
      {
       "v": "88",
       "l": "DK (88)"
      }
     ],
     "label": "17. Do you think there has been a change in these activities? [due to cognitive changes]."
    },
    {
     "type": "number",
     "name": "h18",
     "step": "0.1",
     "min": 0,
     "suffix": "years",
     "label": "18. (If yes) Approximately how long ago did these changes occur?",
     "show_if": {
      "field": "h17",
      "in": [
       "1"
      ]
     }
    },
    {
     "type": "textarea",
     "name": "h19",
     "rows": 2,
     "label": "19. (If subject is in a nursing home or impaired at home): What everyday activities can he/she do well?"
    },
    {
     "type": "radio",
     "name": "h20",
     "inline": true,
     "options": [
      {
       "v": "0",
       "l": "No change (0)"
      },
      {
       "v": "1",
       "l": "Some change (1)"
      },
      {
       "v": "2",
       "l": "Significant Change (2)"
      },
      {
       "v": "88",
       "l": "DK (88)"
      }
     ],
     "label": "20. So, overall you would say there has been ______ in his/her ability to do things around the house?"
    },
    {
     "type": "textarea",
     "name": "h20_describe",
     "label": "Describe:",
     "rows": 2
    },
    {
     "type": "section",
     "label": "DEMOGRAPHICS - OCCUPATIONAL"
    },
    {
     "type": "note",
     "text": "If answers to Q21 and Q22 are known, skip to Q23."
    },
    {
     "type": "radio",
     "name": "o21",
     "inline": true,
     "label": "21. Is the subject still working?",
     "options": [
      {
       "v": "no",
       "l": "No"
      },
      {
       "v": "yes",
       "l": "Yes"
      },
      {
       "v": "na",
       "l": "NA"
      }
     ]
    },
    {
     "type": "text",
     "name": "o22",
     "size": 12,
     "label": "22. (If patient is retired) When did he/she retire?"
    },
    {
     "type": "text",
     "name": "o22b",
     "label": "(If patient is retired) Did he/she retire because of a cognitive change? (i.e. did the subject have any difficulty at work due to cognitive change?)"
    },
    {
     "type": "radio",
     "name": "o23",
     "label": "23. (If subject is not retired) Does he/she have significant difficulty in his/her job because of problems with memory or thinking?",
     "options": [
      {
       "v": "0",
       "l": "Rarely or never = 0"
      },
      {
       "v": "1",
       "l": "Sometimes = 1"
      },
      {
       "v": "2",
       "l": "Usually = 2"
      },
      {
       "v": "88",
       "l": "DK = 88"
      }
     ]
    },
    {
     "type": "section",
     "label": "Changes in Personality"
    },
    {
     "type": "radio",
     "name": "p24",
     "label": "24. Has there been any change in his/her personality or behavior, for example, is he/she more irritable, more passive, less interested in things?",
     "options": [
      {
       "v": "0",
       "l": "No = 0"
      },
      {
       "v": "1",
       "l": "Yes = 1"
      },
      {
       "v": "88",
       "l": "DK = 88"
      }
     ]
    },
    {
     "type": "textarea",
     "name": "p24_describe",
     "label": "Describe:",
     "rows": 2
    },
    {
     "type": "number",
     "name": "p25_years",
     "step": "0.1",
     "min": 0,
     "suffix": "years",
     "label": "25. If yes, for how long have these changes been present?"
    },
    {
     "type": "radio",
     "name": "p25_code",
     "inline": true,
     "exclusive_with": "p25_years",
     "label": "or (If no change in personality, code as 99)",
     "options": [
      {
       "v": "99",
       "l": "No change in personality (99)"
      },
      {
       "v": "88",
       "l": "DK (88)"
      }
     ]
    },
    {
     "type": "radio",
     "name": "p25a",
     "inline": true,
     "options": [
      {
       "v": "0",
       "l": "No (0)"
      },
      {
       "v": "1",
       "l": "Yes (1)"
      },
      {
       "v": "88",
       "l": "DK (88)"
      }
     ],
     "label": "25a. Is he / she more agitated or more nervous than he / she used to be? (DQ)"
    },
    {
     "type": "radio",
     "name": "p25b",
     "inline": true,
     "options": [
      {
       "v": "0",
       "l": "No (0)"
      },
      {
       "v": "1",
       "l": "Yes (1)"
      },
      {
       "v": "88",
       "l": "DK (88)"
      }
     ],
     "label": "25b. Has he/she had any outbursts which seemed out of character?"
    },
    {
     "type": "radio",
     "name": "p25c",
     "inline": true,
     "options": [
      {
       "v": "0",
       "l": "No (0)"
      },
      {
       "v": "1",
       "l": "Yes (1)"
      },
      {
       "v": "88",
       "l": "DK (88)"
      }
     ],
     "label": "25c. Has he/she experienced any delusions or hallucinations?"
    },
    {
     "type": "section",
     "label": "ORIENTATION"
    },
    {
     "type": "matrix",
     "label": "Do you think that he/she knows what day of the week it is:",
     "columns": [
      {
       "v": "usually",
       "l": "Usually"
      },
      {
       "v": "sometimes",
       "l": "Sometimes"
      },
      {
       "v": "rarely_never",
       "l": "Rarely or Never"
      },
      {
       "v": "doesnt_know",
       "l": "Doesn't know"
      }
     ],
     "rows": [
      {
       "name": "or26",
       "label": "26. Day of the Week?"
      },
      {
       "name": "or27",
       "label": "27. Date of the month?"
      },
      {
       "name": "or28",
       "label": "28. Month"
      },
      {
       "name": "or29",
       "label": "29. Year?"
      }
     ]
    },
    {
     "type": "radio",
     "name": "or30",
     "inline": true,
     "label": "30. Does he/she tend to dwell in the past?",
     "options": [
      {
       "v": "0",
       "l": "Rarely (0)"
      },
      {
       "v": "1",
       "l": "Sometimes (1)"
      },
      {
       "v": "2",
       "l": "Often (2)"
      },
      {
       "v": "88",
       "l": "DK (88)"
      }
     ]
    },
    {
     "type": "radio",
     "name": "or31",
     "inline": true,
     "label": "31. Have you noticed if he/she has difficulty with time relationships? (i.e. if you talk about a major event would he/she have difficulty knowing when it happened in relation to another major event?)",
     "options": [
      {
       "v": "rarely",
       "l": "Rarely"
      },
      {
       "v": "sometimes",
       "l": "Sometimes"
      },
      {
       "v": "often",
       "l": "Often"
      },
      {
       "v": "88",
       "l": "DK (88)"
      }
     ]
    },
    {
     "type": "radio",
     "name": "or32",
     "inline": true,
     "options": [
      {
       "v": "0",
       "l": "Usually (0)"
      },
      {
       "v": "1",
       "l": "Sometimes (1)"
      },
      {
       "v": "2",
       "l": "Rarely (2)"
      },
      {
       "v": "88",
       "l": "DK (88)"
      }
     ],
     "label": "32. Can he/she find his/her way about familiar streets?"
    },
    {
     "type": "radio",
     "name": "or33",
     "inline": true,
     "options": [
      {
       "v": "0",
       "l": "Usually (0)"
      },
      {
       "v": "1",
       "l": "Sometimes (1)"
      },
      {
       "v": "2",
       "l": "Rarely (2)"
      },
      {
       "v": "88",
       "l": "DK (88)"
      }
     ],
     "label": "33. Does he/she know how to get from one place to another outside his/her neighborhood?"
    },
    {
     "type": "radio",
     "name": "or34",
     "inline": true,
     "options": [
      {
       "v": "0",
       "l": "Usually (0)"
      },
      {
       "v": "1",
       "l": "Sometimes (1)"
      },
      {
       "v": "2",
       "l": "Rarely (2)"
      },
      {
       "v": "88",
       "l": "DK (88)"
      }
     ],
     "label": "34. Can patient find his/her way about indoors?"
    },
    {
     "type": "section",
     "label": "Community Affairs"
    },
    {
     "type": "radio",
     "name": "c35",
     "inline": true,
     "options": [
      {
       "v": "0",
       "l": "No (0)"
      },
      {
       "v": "1",
       "l": "Yes (1)"
      },
      {
       "v": "88",
       "l": "DK (88)"
      }
     ],
     "label": "35. Did he/she ever drive a car?"
    },
    {
     "type": "radio",
     "name": "c35a",
     "inline": true,
     "options": [
      {
       "v": "0",
       "l": "No (0)"
      },
      {
       "v": "1",
       "l": "Yes (1)"
      },
      {
       "v": "88",
       "l": "DK (88)"
      }
     ],
     "label": "35a. Does he/she drive a car now?"
    },
    {
     "type": "radio",
     "name": "c35b",
     "label": "35b. Why did he / she stop driving?",
     "options": [
      {
       "v": "0",
       "l": "0 = Got lost / confused"
      },
      {
       "v": "1",
       "l": "1 = Poor eyesight"
      },
      {
       "v": "2",
       "l": "2 = Illness"
      },
      {
       "v": "3",
       "l": "3 = Bad coordination / rxn. time/ bad reflexes"
      },
      {
       "v": "4",
       "l": "4 = Frequent accidents"
      },
      {
       "v": "5",
       "l": "5 = Fear / nervous driving"
      },
      {
       "v": "6",
       "l": "6 = Other cognitive problems NOC",
       "specify": "c35b_noc"
      },
      {
       "v": "7",
       "l": "7 = Other",
       "specify": "c35b_other"
      },
      {
       "v": "88",
       "l": "88 = DK"
      },
      {
       "v": "99",
       "l": "99 = NA"
      }
     ]
    },
    {
     "type": "note",
     "text": "If patient is still driving:"
    },
    {
     "type": "radio",
     "name": "c36",
     "inline": true,
     "options": [
      {
       "v": "no",
       "l": "No"
      },
      {
       "v": "yes",
       "l": "Yes"
      }
     ],
     "label": "36. Is he/she driving slower and/or more cautious?"
    },
    {
     "type": "radio",
     "name": "c37",
     "inline": true,
     "options": [
      {
       "v": "no",
       "l": "No"
      },
      {
       "v": "yes",
       "l": "Yes"
      }
     ],
     "label": "37. Is he/she driving faster and/or less cautious?"
    },
    {
     "type": "radio",
     "name": "c38",
     "inline": true,
     "options": [
      {
       "v": "no",
       "l": "No"
      },
      {
       "v": "yes",
       "l": "Yes"
      }
     ],
     "label": "38. Does he/she have trouble making decisions when driving (making turns, signaling, etc)?"
    },
    {
     "type": "radio",
     "name": "c39",
     "inline": true,
     "options": [
      {
       "v": "no",
       "l": "No"
      },
      {
       "v": "yes",
       "l": "Yes"
      }
     ],
     "label": "39. Has he/she had any accidents/close calls?"
    },
    {
     "type": "radio",
     "name": "c40",
     "inline": true,
     "options": [
      {
       "v": "no",
       "l": "No"
      },
      {
       "v": "yes",
       "l": "Yes"
      }
     ],
     "label": "40. Has he/she ever been asked to limit his driving?"
    },
    {
     "type": "radio",
     "name": "c41",
     "inline": true,
     "options": [
      {
       "v": "no",
       "l": "No"
      },
      {
       "v": "yes",
       "l": "Yes"
      }
     ],
     "label": "41. Do you think that changes in vision or other physical problems have affected his/her driving?"
    },
    {
     "type": "radio",
     "name": "c42",
     "inline": true,
     "label": "42. Can he/she shop for his/her needs successfully without any help?",
     "options": [
      {
       "v": "0",
       "l": "Usually = 0"
      },
      {
       "v": "1",
       "l": "Sometimes = 1"
      },
      {
       "v": "2",
       "l": "Rarely or never = 2"
      },
      {
       "v": "88",
       "l": "DK = 88"
      }
     ]
    },
    {
     "type": "radio",
     "name": "c43",
     "inline": true,
     "label": "43. Does he/she belong to any groups? (Choose 1-2, Examples: senior citizens, religious, political, neighborhood, professional)?",
     "options": [
      {
       "v": "1",
       "l": "No = 1"
      },
      {
       "v": "0",
       "l": "Yes = 0"
      }
     ]
    },
    {
     "type": "text",
     "name": "c43_list",
     "label": "List:"
    },
    {
     "type": "radio",
     "name": "c44",
     "inline": true,
     "label": "44. Does he/she carry out activities outside the home?",
     "options": [
      {
       "v": "0",
       "l": "Usually = 0"
      },
      {
       "v": "1",
       "l": "Sometimes = 1"
      },
      {
       "v": "2",
       "l": "Rarely or never = 2"
      },
      {
       "v": "88",
       "l": "DK = 88"
      }
     ]
    },
    {
     "type": "radio",
     "name": "c45",
     "inline": true,
     "label": "45. Is he/she socially withdrawn?",
     "options": [
      {
       "v": "0",
       "l": "No = 0"
      },
      {
       "v": "1",
       "l": "Yes = 1"
      }
     ]
    },
    {
     "type": "text",
     "name": "c45_why",
     "label": "If yes, why?",
     "show_if": {
      "field": "c45",
      "in": [
       "1"
      ]
     }
    },
    {
     "type": "radio",
     "name": "c46",
     "inline": true,
     "label": "46. Would someone casually observing the patient's behavior in the community think that there was something wrong with him/her?",
     "options": [
      {
       "v": "0",
       "l": "No = 0"
      },
      {
       "v": "1",
       "l": "Yes = 1"
      },
      {
       "v": "88",
       "l": "DK = 88"
      }
     ]
    },
    {
     "type": "section",
     "label": "Personal Care Questions for Informant:"
    },
    {
     "type": "note",
     "text": "What is your estimate of his/her mental ability in the following areas: Codes: Yes = 1; No = 0; DK = 8"
    },
    {
     "type": "radio",
     "name": "pc47",
     "inline": true,
     "options": [
      {
       "v": "1",
       "l": "Yes = 1"
      },
      {
       "v": "0",
       "l": "No = 0"
      },
      {
       "v": "8",
       "l": "DK = 8"
      }
     ],
     "label": "47. Dressing: Trouble dressing or caring for self including choosing clothes and tying shoes?"
    },
    {
     "type": "radio",
     "name": "pc48",
     "inline": true,
     "options": [
      {
       "v": "1",
       "l": "Yes = 1"
      },
      {
       "v": "0",
       "l": "No = 0"
      },
      {
       "v": "8",
       "l": "DK = 8"
      }
     ],
     "label": "48. Washing and grooming: Trouble bathing, including getting in and out of the shower or tub and washing independently?"
    },
    {
     "type": "radio",
     "name": "pc49",
     "inline": true,
     "options": [
      {
       "v": "1",
       "l": "Yes = 1"
      },
      {
       "v": "0",
       "l": "No = 0"
      },
      {
       "v": "8",
       "l": "DK = 8"
      }
     ],
     "label": "49. Eating habits: Trouble feeding himself/ herself including cutting meat and buttering bread:"
    },
    {
     "type": "radio",
     "name": "pc50",
     "inline": true,
     "options": [
      {
       "v": "1",
       "l": "Yes = 1"
      },
      {
       "v": "0",
       "l": "No = 0"
      },
      {
       "v": "8",
       "l": "DK = 8"
      }
     ],
     "label": "50. Sphincter/Bladder control: Trouble controlling bladder or bowels?"
    },
    {
     "type": "initials",
     "name": "collected_by",
     "label": "Collected by: (initials)",
     "required": true
    }
   ]
  },
  "cdr_subject": {
   "key": "cdr_subject",
   "title": "CDR Interview (Subject)",
   "header": "study",
   "intro": "This is a semi-structured interview. Please ask all of the questions. Ask additional questions necessary to determine CDR rating. Please note responses and additional information. Do not use neuropsychological test scores in CDR rating.",
   "items": [
    {
     "type": "date",
     "name": "form_date",
     "label": "Date",
     "required": true
    },
    {
     "type": "section",
     "label": "MEMORY - HISTORY OF PRESENT SYMPTOMS"
    },
    {
     "type": "textarea",
     "name": "m1",
     "label": "1. How good was your memory about 10 years ago?"
    },
    {
     "type": "textarea",
     "name": "m2",
     "label": "2. Have you noticed any changes in your memory recently?",
     "help": "Record spontaneous responses:"
    },
    {
     "type": "note",
     "text": "(For each problem identified below, check yes only if this represents a change from years ago, and list the approximate time frame when the problems began)."
    },
    {
     "type": "note",
     "text": "“I’m going to ask you a few, more specific questions regarding your memory. Do you”:"
    },
    {
     "type": "radio",
     "name": "m2a",
     "inline": true,
     "options": [
      {
       "v": "no",
       "l": "no"
      },
      {
       "v": "yes",
       "l": "yes"
      }
     ],
     "label": "2a. forget appointments or rely more on a calendar? (forget to check or checks multiple times / day)"
    },
    {
     "type": "radio",
     "name": "m2b",
     "inline": true,
     "options": [
      {
       "v": "no",
       "l": "no"
      },
      {
       "v": "yes",
       "l": "yes"
      }
     ],
     "label": "2b. write things down more? (need more written reminders than used to)"
    },
    {
     "type": "radio",
     "name": "m2c",
     "inline": true,
     "options": [
      {
       "v": "no",
       "l": "no"
      },
      {
       "v": "yes",
       "l": "yes"
      }
     ],
     "label": "2c. repeat the same questions or stories?"
    },
    {
     "type": "radio",
     "name": "m2d",
     "inline": true,
     "options": [
      {
       "v": "no",
       "l": "no"
      },
      {
       "v": "yes",
       "l": "yes"
      }
     ],
     "label": "2d. forget what people say in conversations or on the phone, forget to pass on messages?"
    },
    {
     "type": "radio",
     "name": "m2e",
     "inline": true,
     "options": [
      {
       "v": "no",
       "l": "no"
      },
      {
       "v": "yes",
       "l": "yes"
      }
     ],
     "label": "2e. spend more time looking for objects (papers, glasses, keys, wallet, etc.)? (are you now forgetting where you parked car)"
    },
    {
     "type": "radio",
     "name": "m2f",
     "inline": true,
     "options": [
      {
       "v": "no",
       "l": "no"
      },
      {
       "v": "yes",
       "l": "yes"
      }
     ],
     "label": "2f. have more trouble finding the words you want to use? (do you get stuck in the middle of a sentence?)"
    },
    {
     "type": "radio",
     "name": "m2g",
     "inline": true,
     "options": [
      {
       "v": "no",
       "l": "no"
      },
      {
       "v": "yes",
       "l": "yes"
      }
     ],
     "label": "2g. have more trouble finding names (of people you see often)?"
    },
    {
     "type": "radio",
     "name": "m2h",
     "inline": true,
     "options": [
      {
       "v": "no",
       "l": "no"
      },
      {
       "v": "yes",
       "l": "yes"
      }
     ],
     "label": "2h. have more trouble with other kinds of things? (leave stove on; car lights on, doors unlocked)"
    },
    {
     "type": "note",
     "strong": true,
     "text": "If subject has memory problems ask 3 and 4 (even if you only suspect). Code 99 if Memory box score = 0"
    },
    {
     "type": "number",
     "name": "m3_years",
     "step": "0.1",
     "min": 0,
     "suffix": "years",
     "label": "3. If you think back, how long ago did you notice the memory changes that we talked about?"
    },
    {
     "type": "radio",
     "name": "m3_code",
     "inline": true,
     "exclusive_with": "m3_years",
     "label": "or",
     "options": [
      {
       "v": "88",
       "l": "DK=88"
      },
      {
       "v": "99",
       "l": "No memory problems = 99"
      }
     ]
    },
    {
     "type": "radio",
     "name": "m4",
     "inline": true,
     "label": "4. Do you think that these changes in your memory have gotten worse in the past year? (If subject does not acknowledge memory problems, code \"99\" and do not ask the question).",
     "options": [
      {
       "v": "0",
       "l": "No = 0"
      },
      {
       "v": "1",
       "l": "Yes = 1"
      },
      {
       "v": "99",
       "l": "No memory problems = 99"
      },
      {
       "v": "88",
       "l": "DK = 88"
      }
     ]
    },
    {
     "type": "radio",
     "name": "m5",
     "inline": true,
     "label": "5. Can you tell me in your own words why you are here today?",
     "options": [
      {
       "v": "0",
       "l": "Knows (0)"
      },
      {
       "v": "1",
       "l": "Vague (1)"
      },
      {
       "v": "2",
       "l": "Gives wrong reason (2)"
      }
     ]
    },
    {
     "type": "section",
     "label": "HOME AND HOBBIES"
    },
    {
     "type": "radio",
     "name": "h6",
     "inline": true,
     "label": "6. Have you noticed changes in your ability to do household chores? (Choose 1-2, Examples: cooking, laundry, cleaning, using household appliances like dishwasher, vacuum, or television, doing grocery shopping, yard work, taking out the garbage, taking care of the car, or fixing things around the house)",
     "options": [
      {
       "v": "0",
       "l": "No change (0)"
      },
      {
       "v": "1",
       "l": "Some change (1)"
      },
      {
       "v": "2",
       "l": "Significant change (2)"
      }
     ]
    },
    {
     "type": "textarea",
     "name": "h7",
     "rows": 2,
     "label": "7. Do you have any hobbies? (Choose 1-2, Examples: sewing, knitting, other handicrafts, painting, reading, photography, gardening, going to theater, movies or symphony, woodworking, playing cards, watching or playing sports?)"
    },
    {
     "type": "radio",
     "name": "h8",
     "inline": true,
     "label": "8. Do you think there has been a change in these activities because of cognitive changes?",
     "options": [
      {
       "v": "0",
       "l": "No (0)"
      },
      {
       "v": "1",
       "l": "Yes (1)"
      },
      {
       "v": "9",
       "l": "No Hobbies (9)"
      },
      {
       "v": "88",
       "l": "DK (88)"
      }
     ]
    },
    {
     "type": "section",
     "label": "ORIENTATION"
    },
    {
     "type": "textarea",
     "name": "or9",
     "rows": 2,
     "label": "9. Does someone always ride with you as a navigator when you drive:?",
     "help": "(Where can subject drive alone? To grocery store? Out of town?)"
    },
    {
     "type": "note",
     "text": "Have you noticed any changes in your sense of direction, for example:"
    },
    {
     "type": "radio",
     "name": "or10",
     "inline": true,
     "options": [
      {
       "v": "no",
       "l": "No"
      },
      {
       "v": "yes",
       "l": "Yes"
      }
     ],
     "label": "10. Have you gotten lost in a familiar area?"
    },
    {
     "type": "radio",
     "name": "or11",
     "inline": true,
     "options": [
      {
       "v": "no",
       "l": "No"
      },
      {
       "v": "yes",
       "l": "Yes"
      }
     ],
     "label": "11. Have you had more difficulty finding your way around outside your own neighborhood?"
    },
    {
     "type": "note",
     "text": "Enter below Orientation errors from BLESSED or if not done previously, ASK:"
    },
    {
     "type": "fieldrow",
     "fields": [
      {
       "name": "ori_street",
       "label": "Current street"
      },
      {
       "name": "ori_city",
       "label": "City"
      },
      {
       "name": "ori_county",
       "label": "County"
      },
      {
       "name": "ori_state",
       "label": "State",
       "size": 6
      }
     ]
    },
    {
     "type": "fieldrow",
     "fields": [
      {
       "name": "ori_date",
       "label": "Date",
       "size": 6
      },
      {
       "name": "ori_month",
       "label": "Month",
       "size": 10
      },
      {
       "name": "ori_year",
       "label": "Year",
       "size": 6
      },
      {
       "name": "ori_dow",
       "label": "Day of week",
       "size": 10
      },
      {
       "name": "ori_time",
       "label": "Time",
       "size": 6
      },
      {
       "name": "ori_season",
       "label": "Season",
       "size": 10
      }
     ]
    },
    {
     "type": "fieldrow",
     "fields": [
      {
       "name": "ori_name",
       "label": "Name"
      },
      {
       "name": "ori_age",
       "label": "age",
       "size": 5
      },
      {
       "name": "ori_when_born",
       "label": "when born",
       "size": 8
      },
      {
       "name": "ori_where_born",
       "label": "where born"
      }
     ]
    },
    {
     "type": "section",
     "label": "COMMUNITY AFFAIRS"
    },
    {
     "type": "note",
     "text": "Have you noticed any changes in your driving, for example:"
    },
    {
     "type": "radio",
     "name": "c12",
     "inline": true,
     "options": [
      {
       "v": "no",
       "l": "No"
      },
      {
       "v": "yes",
       "l": "Yes"
      }
     ],
     "label": "12. Have you had more trouble making decisions when driving (e.g., making turns, signaling)?"
    },
    {
     "type": "radio",
     "name": "c13",
     "inline": true,
     "options": [
      {
       "v": "no",
       "l": "No"
      },
      {
       "v": "yes",
       "l": "Yes"
      }
     ],
     "label": "13. Have you had any accidents/close calls in the past year?"
    },
    {
     "type": "text",
     "name": "c13_describe",
     "label": "Describe:"
    },
    {
     "type": "radio",
     "name": "c14",
     "inline": true,
     "label": "14. Do you belong to any groups (senior citizen, religious, political, professional, volunteer, or social, etc.)?",
     "options": [
      {
       "v": "1",
       "l": "No (1)"
      },
      {
       "v": "0",
       "l": "Yes (0)"
      }
     ]
    },
    {
     "type": "text",
     "name": "c14_list",
     "label": "List:"
    },
    {
     "type": "radio",
     "name": "c15",
     "inline": true,
     "label": "15. Have you attended group functions or meetings in the past few months...",
     "options": [
      {
       "v": "0",
       "l": "As often as you used to (0)"
      },
      {
       "v": "1",
       "l": "Less than you used to (1)"
      },
      {
       "v": "2",
       "l": "Not at all (2)"
      }
     ]
    },
    {
     "type": "radio",
     "name": "c16",
     "inline": true,
     "options": [
      {
       "v": "no",
       "l": "No"
      },
      {
       "v": "yes",
       "l": "Yes"
      }
     ],
     "label": "16. Does someone else help you with shopping (for food or clothes) who previously hadn't? (transportation, decisions, etc.)"
    },
    {
     "type": "text",
     "name": "c16_describe",
     "label": "Describe:"
    },
    {
     "type": "note",
     "text": "If not known from previous evaluation, ask:"
    },
    {
     "type": "radio",
     "name": "c17",
     "inline": true,
     "label": "17. Are you still working?",
     "options": [
      {
       "v": "no",
       "l": "No"
      },
      {
       "v": "yes",
       "l": "Yes"
      },
      {
       "v": "never",
       "l": "Never worked"
      }
     ]
    },
    {
     "type": "text",
     "name": "c17_retire",
     "label": "When did you retire?",
     "size": 12
    },
    {
     "type": "textarea",
     "name": "c18",
     "rows": 2,
     "label": "18. Did memory problems interfere with your ability to do your job?"
    },
    {
     "type": "section",
     "label": "JUDGMENT AND PROBLEM SOLVING"
    },
    {
     "type": "note",
     "text": "If initial response by subject to questions below does not merit a score, press the matter to identify the subject's best understanding of the problem. Circle score."
    },
    {
     "type": "subsection",
     "label": "Similarities"
    },
    {
     "type": "note",
     "text": "Can you tell me how these things are alike?"
    },
    {
     "type": "text",
     "name": "j19_resp",
     "label": "19. turnip – cauliflower"
    },
    {
     "type": "radio",
     "name": "j19",
     "label": "Score (19)",
     "options": [
      {
       "v": "0",
       "l": "0 = vegetables"
      },
      {
       "v": "1",
       "l": "1 = edible foods, living things, can be cooked, etc."
      },
      {
       "v": "2",
       "l": "2 = answers not pertinent; differences; buy them"
      }
     ]
    },
    {
     "type": "text",
     "name": "j20_resp",
     "label": "20. desk – bookcase"
    },
    {
     "type": "radio",
     "name": "j20",
     "label": "Score (20)",
     "options": [
      {
       "v": "0",
       "l": "0 = furniture, office furniture, both hold books"
      },
      {
       "v": "1",
       "l": "1 = wooden, legs"
      },
      {
       "v": "2",
       "l": "2 = not pertinent, differences"
      }
     ]
    },
    {
     "type": "subsection",
     "label": "Differences"
    },
    {
     "type": "note",
     "text": "Can you tell me what is the difference between these things?"
    },
    {
     "type": "text",
     "name": "j21_resp",
     "label": "21. lie – mistake"
    },
    {
     "type": "radio",
     "name": "j21",
     "label": "Score (21)",
     "options": [
      {
       "v": "0",
       "l": "0 = one deliberated, one unintentional"
      },
      {
       "v": "1",
       "l": "1 = one bad, the other good - or explains only one"
      },
      {
       "v": "2",
       "l": "2 = anything else, similarities"
      }
     ]
    },
    {
     "type": "text",
     "name": "j22_resp",
     "label": "22. river – canal"
    },
    {
     "type": "radio",
     "name": "j22",
     "label": "Score (22)",
     "options": [
      {
       "v": "0",
       "l": "0 = natural - artificial"
      },
      {
       "v": "2",
       "l": "2 = anything else"
      }
     ]
    },
    {
     "type": "subsection",
     "label": "Calculations"
    },
    {
     "type": "text",
     "name": "j23_resp",
     "label": "23. How many nickels in a dollar? (20)",
     "size": 10
    },
    {
     "type": "radio",
     "name": "j23",
     "inline": true,
     "label": "Score (23)",
     "options": [
      {
       "v": "1",
       "l": "Correct = 1"
      },
      {
       "v": "0",
       "l": "Incorrect = 0"
      }
     ]
    },
    {
     "type": "text",
     "name": "j24_resp",
     "label": "24. How many quarters in $6.75? (27)",
     "size": 10
    },
    {
     "type": "radio",
     "name": "j24",
     "inline": true,
     "label": "Score (24)",
     "options": [
      {
       "v": "1",
       "l": "Correct = 1"
      },
      {
       "v": "0",
       "l": "Incorrect = 0"
      }
     ]
    },
    {
     "type": "text",
     "name": "j25_resp",
     "label": "25. Subtract 3 from 20 and keep subtracting 3 from each number, all the way down. (20, 17, 14, 11, 8, 5, 2)"
    },
    {
     "type": "radio",
     "name": "j25",
     "inline": true,
     "label": "Score (25)",
     "options": [
      {
       "v": "1",
       "l": "Correct = 1"
      },
      {
       "v": "0",
       "l": "Incorrect = 0"
      }
     ]
    },
    {
     "type": "radio",
     "name": "j26",
     "inline": true,
     "label": "26. Have you noticed any changes in your ability to deal with money, for example, figuring out a tip or getting back correct change?",
     "options": [
      {
       "v": "0",
       "l": "No loss = 0"
      },
      {
       "v": "1",
       "l": "Some loss = 1"
      },
      {
       "v": "2",
       "l": "Severe loss = 2"
      }
     ]
    },
    {
     "type": "radio",
     "name": "j27",
     "inline": true,
     "label": "27. Have you noticed any changes in your ability to balance your checkbook or pay bills? For example, have you bounced any checks, forgotten to pay a bill or paid it twice?",
     "options": [
      {
       "v": "0",
       "l": "No change = 0"
      },
      {
       "v": "1",
       "l": "Some change = 1"
      },
      {
       "v": "2",
       "l": "Severe change = 2"
      },
      {
       "v": "88",
       "l": "DK = 88"
      }
     ]
    },
    {
     "type": "radio",
     "name": "j28",
     "label": "28. Upon arriving in a strange city, how would a person locate a friend there that they wished to see?",
     "help": "(If subject gives an answer that would be coded 1 or 2, then ask, \"How else would you go about finding them?\")",
     "options": [
      {
       "v": "0",
       "l": "0 = try the telephone book, city directory, go to courthouse for a directory, call a mutual friend."
      },
      {
       "v": "1",
       "l": "1 = call the police"
      },
      {
       "v": "2",
       "l": "2 = no clear response"
      }
     ]
    },
    {
     "type": "radio",
     "name": "j29",
     "inline": true,
     "label": "29. Rate the subject's understanding of their memory status. Rate based on: a) subject's awareness of memory difficulties (i.e., when compared with collateral and interviewer's observations); b) response to (item #22) asking why they are here.)",
     "options": [
      {
       "v": "0",
       "l": "Good insight = 0"
      },
      {
       "v": "1",
       "l": "Partial insight = 1"
      },
      {
       "v": "2",
       "l": "Little insight = 2"
      },
      {
       "v": "88",
       "l": "DK = 88"
      }
     ]
    },
    {
     "type": "initials",
     "name": "collected_by",
     "label": "Collected by: (initials)",
     "required": true
    }
   ]
  },
  "cdr_rating": {
   "key": "cdr_rating",
   "title": "CDR (Clinical Dementia Rating)",
   "header": "paper",
   "items": [
    {
     "type": "radio",
     "name": "administered",
     "label": "Was the CDR administered?",
     "inline": true,
     "options": [
      {
       "v": "no",
       "l": "No"
      },
      {
       "v": "yes",
       "l": "Yes"
      }
     ],
     "required": true
    },
    {
     "type": "radio",
     "name": "not_admin_reason",
     "label": "If No, please provide the primary reason:",
     "show_if": {
      "field": "administered",
      "in": [
       "no"
      ]
     },
     "required": true,
     "options": [
      {
       "v": "physical",
       "l": "Physical problem"
      },
      {
       "v": "verbal_refusal",
       "l": "Verbal refusal"
      },
      {
       "v": "cognitive_behavior",
       "l": "Cognitive/behavior problem"
      },
      {
       "v": "other",
       "l": "Other problem (specify):",
       "specify": "not_admin_other"
      }
     ]
    },
    {
     "type": "block",
     "show_if": {
      "field": "administered",
      "in": [
       "yes"
      ]
     },
     "children": [
      {
       "type": "date",
       "name": "eval_date",
       "label": "Date of Evaluation: (MM/DD/YYYY)",
       "required": true
      },
      {
       "type": "section",
       "label": "Section 1: Standard CDR"
      },
      {
       "type": "cdr_table",
       "rows": [
        {
         "name": "memory",
         "label": "1. Memory",
         "options": [
          {
           "v": "0",
           "l": "None – 0",
           "desc": "No memory loss, or slight inconsistent forgetfulness"
          },
          {
           "v": "0.5",
           "l": "Questionable – 0.5",
           "desc": "Consistent slight forgetfulness; partial recollection of events; “benign” forgetfulness"
          },
          {
           "v": "1",
           "l": "Mild – 1",
           "desc": "Moderate memory loss, more marked for recent events; defect interferes with everyday activities"
          },
          {
           "v": "2",
           "l": "Moderate – 2",
           "desc": "Severe memory loss; only highly learned material retained; new material rapidly lost"
          },
          {
           "v": "3",
           "l": "Severe – 3",
           "desc": "Severe memory loss; only fragments remain"
          }
         ],
         "merged_0": false
        },
        {
         "name": "orientation",
         "label": "2. Orientation",
         "options": [
          {
           "v": "0",
           "l": "None – 0",
           "desc": "Fully oriented"
          },
          {
           "v": "0.5",
           "l": "Questionable – 0.5",
           "desc": "Fully oriented except for slight difficulty with time relationships"
          },
          {
           "v": "1",
           "l": "Mild – 1",
           "desc": "Moderate difficulty with time relationships; oriented for place at examination; may have geographic disorientation elsewhere"
          },
          {
           "v": "2",
           "l": "Moderate – 2",
           "desc": "Severe difficulty with time relationships; usually disoriented to time, often to place"
          },
          {
           "v": "3",
           "l": "Severe – 3",
           "desc": "Oriented to person only"
          }
         ],
         "merged_0": false
        },
        {
         "name": "judgment",
         "label": "3. Judgment and problem solving",
         "options": [
          {
           "v": "0",
           "l": "None – 0",
           "desc": "Solves everyday problems, handles business and financial affairs well; judgment good in relation to past performance"
          },
          {
           "v": "0.5",
           "l": "Questionable – 0.5",
           "desc": "Slight impairment in solving problems, similarities, and differences"
          },
          {
           "v": "1",
           "l": "Mild – 1",
           "desc": "Moderate difficulty in handling problems, similarities, and differences; social judgment usually maintained"
          },
          {
           "v": "2",
           "l": "Moderate – 2",
           "desc": "Severely impaired in handling problems, similarities, and differences; social judgment usually impaired"
          },
          {
           "v": "3",
           "l": "Severe – 3",
           "desc": "Unable to make judgments or solve problems"
          }
         ],
         "merged_0": false
        },
        {
         "name": "community",
         "label": "4. Community affairs",
         "options": [
          {
           "v": "0",
           "l": "None – 0",
           "desc": "Independent function at usual level in job, shopping, volunteer and social groups"
          },
          {
           "v": "0.5",
           "l": "Questionable – 0.5",
           "desc": "Slight impairment in these activities"
          },
          {
           "v": "1",
           "l": "Mild – 1",
           "desc": "Unable to function independently at these activities, although may still be engaged in some; appears normal to casual inspection"
          },
          {
           "v": "2",
           "l": "Moderate – 2",
           "desc": "No pretense of independent function outside the home; appears well enough to be taken to functions outside the family home"
          },
          {
           "v": "3",
           "l": "Severe – 3",
           "desc": "No pretense of independent function outside the home; appears too ill to be taken to functions outside the family home"
          }
         ],
         "merged_0": false
        },
        {
         "name": "home_hobbies",
         "label": "5. Home and hobbies",
         "options": [
          {
           "v": "0",
           "l": "None – 0",
           "desc": "Life at home, hobbies, and intellectual interests well maintained"
          },
          {
           "v": "0.5",
           "l": "Questionable – 0.5",
           "desc": "Life at home, hobbies, and intellectual interests slightly impaired"
          },
          {
           "v": "1",
           "l": "Mild – 1",
           "desc": "Mild but definite impairment of function at home; more difficult chores abandoned; more complicated hobbies and interests abandoned"
          },
          {
           "v": "2",
           "l": "Moderate – 2",
           "desc": "Only simple chores preserved; very restricted interests, poorly maintained"
          },
          {
           "v": "3",
           "l": "Severe – 3",
           "desc": "No significant function in the home"
          }
         ],
         "merged_0": false
        },
        {
         "name": "personal_care",
         "label": "6. Personal care",
         "options": [
          {
           "v": "0",
           "l": "None – 0",
           "desc": "Fully capable of self-care (= 0)."
          },
          {
           "v": "1",
           "l": "Mild – 1",
           "desc": "Needs prompting"
          },
          {
           "v": "2",
           "l": "Moderate – 2",
           "desc": "Requires assistance in dressing, hygiene, keeping of personal effects"
          },
          {
           "v": "3",
           "l": "Severe – 3",
           "desc": "Requires much help with personal care; frequent incontinence"
          }
         ],
         "merged_0": true
        }
       ],
       "required": true
      },
      {
       "type": "cdr_global",
       "name": "global_cdr",
       "label": "8. STANDARD GLOBAL CDR",
       "required": true,
       "options": [
        {
         "v": "0",
         "l": "0"
        },
        {
         "v": "0.5",
         "l": "0.5"
        },
        {
         "v": "1",
         "l": "1"
        },
        {
         "v": "2",
         "l": "2"
        },
        {
         "v": "3",
         "l": "3"
        }
       ]
      },
      {
       "type": "section",
       "label": "Section 2: Supplemental CDR"
      },
      {
       "type": "cdr_table",
       "rows": [
        {
         "name": "behavior",
         "label": "1. Behavior, comportment, and personality",
         "options": [
          {
           "v": "0",
           "l": "None – 0",
           "desc": "Socially appropriate behavior"
          },
          {
           "v": "0.5",
           "l": "Questionable – 0.5",
           "desc": "Questionable changes in comportment, empathy, appropriateness of actions"
          },
          {
           "v": "1",
           "l": "Mild – 1",
           "desc": "Mild but definite changes in behavior"
          },
          {
           "v": "2",
           "l": "Moderate – 2",
           "desc": "Moderate behavioral changes, affecting interpersonal relationships and interactions in a significant manner"
          },
          {
           "v": "3",
           "l": "Severe – 3",
           "desc": "Severe behavioral changes, making interpersonal interactions all unidirectional"
          }
         ],
         "merged_0": false
        },
        {
         "name": "language",
         "label": "2. Language",
         "options": [
          {
           "v": "0",
           "l": "None – 0",
           "desc": "No language difficulty, or occasional mild tip-of-the tongue"
          },
          {
           "v": "0.5",
           "l": "Questionable – 0.5",
           "desc": "Consistent mild word-finding difficulties; simplification of word choice; circumlocution; decreased phrase length; and/or mild comprehension difficulties"
          },
          {
           "v": "1",
           "l": "Mild – 1",
           "desc": "Moderate word-finding difficulty in speech; cannot name objects in environment; reduced phrase length and/or agrammatical speech and/or reduced comprehension in conversation and reading"
          },
          {
           "v": "2",
           "l": "Moderate – 2",
           "desc": "Moderate to severe impairments in either speech or comprehension; has difficulty communicating thoughts; writing may be slightly more effective"
          },
          {
           "v": "3",
           "l": "Severe – 3",
           "desc": "Severe comprehension deficits; no intelligible speech"
          }
         ],
         "merged_0": false
        }
       ],
       "required": true
      }
     ]
    }
   ]
  }
 },
 "PACKETS": {
  "informant": {
   "title": "Informant Package",
   "instruments": [
    "consent",
    "informant_demographics",
    "coparticipant",
    "ecog12",
    "npiq",
    "fas",
    "cdr_informant"
   ]
  },
  "subject_cdr": {
   "title": "Subject CDR Package",
   "instruments": [
    "cdr_subject",
    "cdr_informant",
    "cdr_rating"
   ]
  },
  "all": {
   "title": "Complete Visit (all instruments)",
   "instruments": [
    "consent",
    "informant_demographics",
    "coparticipant",
    "ecog12",
    "npiq",
    "fas",
    "cdr_informant",
    "cdr_subject",
    "cdr_rating"
   ]
  }
 },
 "ALL_ORDER": [
  "consent",
  "informant_demographics",
  "coparticipant",
  "ecog12",
  "npiq",
  "fas",
  "cdr_informant",
  "cdr_subject",
  "cdr_rating"
 ]
};
