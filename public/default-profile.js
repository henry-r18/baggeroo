export const defaultProfile = [
    {
      "label": "Source-Organization",
      "value": "",
      "required": false,
      "tooltip": "Organization transferring the content."
    },
    {
      "label": "Organization-Address",
      "value": "",
      "required": false,
      "tooltip": "Mailing address of the source organization."
    },
    {
      "label": "Contact-Name",
      "value": "",
      "required": false,
      "tooltip": "Person at the source organization who is responsible for the content transfer."
    },
    {
      "label": "Contact-Phone",
      "value": "",
      "required": false,
      "tooltip": "International format telephone number of person or position responsible."
    },
    {
      "label": "Contact-Email",
      "value": "",
      "required": false,
      "tooltip": "Fully qualified email address of person or position responsible."
    },
    {
      "label": "External-Description",
      "value": "",
      "required": false,
      "tooltip": "A brief explanation of the contents and provenance."
    },
    {
      "label": "Bagging-Date",
      "value": "",
      "required": false,
      "tooltip": "Date (YYYY-MM-DD) that the content was prepared for transfer. This metadata element SHOULD NOT be repeated."
    },
    {
      "label": "External-Identifier",
      "value": "",
      "required": false,
      "tooltip": "A sender-supplied identifier for the bag."
    },
    {
      "label": "Bag-Size",
      "value": "",
      "required": false,
      "tooltip": "The size or approximate size of the bag being transferred, followed by an abbreviation such as MB, GB, or TB."
    },
    {
      "label": "Payload-Oxum",
      "value": "",
      "required": false,
      "tooltip": "The 'octetstream sum' of the payload for quickly detecting incomplete bags before performing checksum validation. This element MUST NOT be repeated."
    },
    {
      "label": "Bag-Group-Identifier",
      "value": "",
      "required": false,
      "tooltip": "A sender-supplied identifier for the set, if any, of bags to which it logically belongs. This element SHOULD NOT be repeated."
    },
    {
      "label": "Bag-Count",
      "value": "",
      "required": false,
      "tooltip": "Two numbers separated by 'of', in particular, 'N of T', where T is the total number of bags in a group and N is the ordinal number within the group. This element SHOULD NOT be repeated."
    },
    {
      "label": "Internal-Sender-Identifier",
      "value": "",
      "required": false,
      "tooltip": "An alternate sender-specific identifier for the content and/or bag."
    },
    {
      "label": "Internal-Sender-Description",
      "value": "",
      "required": false,
      "tooltip": "A sender-local explanation of the contents and provenance."
    }
  ]